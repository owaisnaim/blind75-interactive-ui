import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Send,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Clock,
  Zap,
  Maximize2,
  Minimize2,
  BookOpen,
  Code2,
  AlertTriangle,
  FileText,
  Pause,
  ExternalLink,
  Layers,
  History,
  AlignLeft,
  HelpCircle,
  AlertCircle,
  Terminal,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Timer
} from 'lucide-react';
import type { Problem } from '../data/problems';
import { getProblemSpec } from '../data/problemTestCases';
import type { TestCase } from '../data/problemTestCases';
import { executeCode, type ExecutionResult } from '../utils/codeRunner';
import { JAVA_SOLUTIONS } from '../data/javaSolutions';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface SubmissionRecord {
  id: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compile Error';
  runtimeMs: number;
  memoryMb: number;
  beatsPercent: number;
  passedCount: number;
  totalCases: number;
  code: string;
  timestamp: string;
}

interface CodingArenaProps {
  problem: Problem;
  allProblems?: Problem[];
  onSelectProblem?: (problem: Problem) => void;
  onProblemSolved: (id: any) => void;
  onAddXp: (amount: number) => void;
  onOpenVisualizer?: (problem: Problem) => void;
  onOpenFlowLab?: (problem: Problem) => void;
  activeTab?: 'arena' | 'visualizer' | 'blueprint';
  onSelectTab?: (tab: 'arena' | 'visualizer' | 'blueprint') => void;
  onClose?: () => void;
  onStartTimedMock?: () => void;
  onStartRaid?: () => void;
}

// Inline Markdown and mathematical notation renderer
export const FormattedMarkdownText: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  const formatInline = (str: string): React.ReactNode[] => {
    // Convert power exponents like 10^4 -> 10⁴, 2^31 -> 2³¹
    const supers: Record<string, string> = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻'
    };
    const withSuperscripts = str.replace(/\^([0-9-]+)/g, (_, exp) => {
      return exp.split('').map((ch: string) => supers[ch] || ch).join('');
    });

    const tokens = withSuperscripts.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

    return tokens.map((tok, idx) => {
      if (tok.startsWith('`') && tok.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-[11px] font-semibold"
          >
            {tok.slice(1, -1)}
          </code>
        );
      }
      if (tok.startsWith('**') && tok.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-white">
            {tok.slice(2, -2)}
          </strong>
        );
      }
      if (tok.startsWith('*') && tok.endsWith('*')) {
        return (
          <em key={idx} className="italic text-slate-200">
            {tok.slice(1, -1)}
          </em>
        );
      }
      return tok;
    });
  };

  const paragraphs = content.split(/\n\s*\n/);

  return (
    <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
      {paragraphs.map((p, pIdx) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split(/\n[-*]\s+/).filter(Boolean);
          return (
            <ul key={pIdx} className="list-disc list-inside space-y-1.5 pl-1">
              {items.map((item, iIdx) => (
                <li key={iIdx} className="leading-relaxed">
                  {formatInline(item.replace(/^[-*]\s+/, ''))}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={pIdx} className="leading-relaxed">
            {formatInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};


export const CodingArena: React.FC<CodingArenaProps> = ({
  problem,
  allProblems = [],
  onSelectProblem,
  onProblemSolved,
  onAddXp,
  onOpenVisualizer,
  onOpenFlowLab,
  activeTab = 'arena',
  onSelectTab,
  onClose,
  onStartTimedMock,
  onStartRaid,
}) => {
  const handleOpenVisualizer = onOpenVisualizer || onOpenFlowLab;
  const handleStartTimedMock = onStartTimedMock || onStartRaid;
  const spec = getProblemSpec(problem.id, problem.title, problem.category, problem.hook);

  // Core Editor State
  const [code, setCode] = useState<string>(spec.starterJava);
  const [fontSize, setFontSize] = useState<'text-xs' | 'text-sm' | 'text-base'>('text-sm');
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState<boolean>(false);

  // Navigation Prev / Next
  const currentIndex = allProblems.findIndex(p => p.id === problem.id);
  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex >= 0 && currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  // Left Panel Tab State
  const [leftTab, setLeftTab] = useState<'description' | 'editorial' | 'submissions'>('description');
  const [mobilePane, setMobilePane] = useState<'problem' | 'code'>('code');
  const [hintLevel, setHintLevel] = useState<number>(0);

  // Submissions State
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);

  // Interview Stopwatch Timer
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Console & Test Runner State (collapsed by default to maximize coding height)
  const [isConsoleExpanded, setIsConsoleExpanded] = useState<boolean>(false);
  const [consoleHeight, setConsoleHeight] = useState<number | null>(null);
  const [consoleTab, setConsoleTab] = useState<'testcase' | 'result'>('testcase');
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
  const [selectedResultCaseIdx, setSelectedResultCaseIdx] = useState<number>(0);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  // Custom Testcase Input
  const [isCustomTab, setIsCustomTab] = useState<boolean>(false);
  const [customParams, setCustomParams] = useState<Record<string, string>>(() => {
    const firstEx = spec.examples[0]?.input || {};
    const initial: Record<string, string> = {};
    for (const [k, v] of Object.entries(firstEx)) {
      initial[k] = typeof v === 'object' ? JSON.stringify(v) : String(v);
    }
    return initial;
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const isDraggingConsoleRef = useRef<boolean>(false);
  const dragStartYRef = useRef<number>(0);
  const dragStartHRef = useRef<number>(0);

  // Expand console to 50% of the code screen height if not already set
  const expandConsole = (tab?: 'testcase' | 'result') => {
    if (tab) setConsoleTab(tab);
    setIsConsoleExpanded(true);
    if (!consoleHeight) {
      const containerH = rightPanelRef.current?.clientHeight || (window.innerHeight * 0.7);
      setConsoleHeight(Math.max(260, Math.round(containerH * 0.5)));
    }
  };

  const toggleConsole = () => {
    if (isConsoleExpanded) {
      setIsConsoleExpanded(false);
    } else {
      expandConsole();
    }
  };

  // Draggable console drawer resize handlers
  const handleConsoleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingConsoleRef.current = true;
    dragStartYRef.current = e.clientY;
    const defaultH = Math.round((rightPanelRef.current?.clientHeight || 700) * 0.5);
    dragStartHRef.current = consoleHeight || defaultH;

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDraggingConsoleRef.current) return;
      const delta = dragStartYRef.current - ev.clientY; // dragging up increases console height
      const containerH = rightPanelRef.current?.clientHeight || window.innerHeight;
      const minH = 120;
      const maxH = Math.max(minH, Math.min(containerH - 120, window.innerHeight * 0.85));
      const nextH = Math.min(maxH, Math.max(minH, dragStartHRef.current + delta));
      setConsoleHeight(nextH);
    };

    const handleMouseUp = () => {
      isDraggingConsoleRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleConsoleTouchDragStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    isDraggingConsoleRef.current = true;
    dragStartYRef.current = touch.clientY;
    const defaultH = Math.round((rightPanelRef.current?.clientHeight || 700) * 0.5);
    dragStartHRef.current = consoleHeight || defaultH;

    const handleTouchMove = (ev: TouchEvent) => {
      if (!isDraggingConsoleRef.current) return;
      const t = ev.touches[0];
      if (!t) return;
      const delta = dragStartYRef.current - t.clientY;
      const containerH = rightPanelRef.current?.clientHeight || window.innerHeight;
      const minH = 120;
      const maxH = Math.max(minH, Math.min(containerH - 120, window.innerHeight * 0.85));
      const nextH = Math.min(maxH, Math.max(minH, dragStartHRef.current + delta));
      setConsoleHeight(nextH);
    };

    const handleTouchEnd = () => {
      isDraggingConsoleRef.current = false;
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
  };

  // Synchronize line numbers gutter scroll with editor textarea
  const handleEditorScroll = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Stopwatch interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setStopwatchSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Sync state when problem changes
  useEffect(() => {
    setCode(spec.starterJava);
    setLastResult(null);
    setSelectedResultCaseIdx(0);
    setIsAccepted(false);
    setActiveCaseIdx(0);
    setIsCustomTab(false);
    setHintLevel(0);
    setLeftTab('description');
    setConsoleTab('testcase');

    // Update custom params default
    const firstEx = spec.examples[0]?.input || {};
    const initial: Record<string, string> = {};
    for (const [k, v] of Object.entries(firstEx)) {
      initial[k] = typeof v === 'object' ? JSON.stringify(v) : String(v);
    }
    setCustomParams(initial);
  }, [problem.id, spec.starterJava]);

  // Timer format (MM:SS)
  const formattedTime = useMemo(() => {
    const mins = Math.floor(stopwatchSeconds / 60);
    const secs = stopwatchSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [stopwatchSeconds]);

  // Format Code Indentation utility
  const handleFormatCode = () => {
    sound.playClick();
    const lines = code.split('\n');
    let indent = 0;
    const formatted: string[] = [];

    for (let rawLine of lines) {
      let line = rawLine.trim();
      if (!line) {
        formatted.push('');
        continue;
      }

      // Check if line begins with closing brackets
      const closingMatches = line.match(/^[}\])]+/);
      if (closingMatches) {
        indent = Math.max(0, indent - closingMatches[0].length);
      }

      formatted.push('    '.repeat(indent) + line);

      // Count opened brackets
      const openMatches = (line.match(/[{[(]/g) || []).length;
      let closeMatches = (line.match(/[}\])]/g) || []).length;

      if (closingMatches) {
        closeMatches -= closingMatches[0].length;
      }

      indent = Math.max(0, indent + openMatches - closeMatches);
    }

    setCode(formatted.join('\n'));
  };

  // Smart editor keyboard controls: auto-indent, bracket expansion, dedent, shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const start = target.selectionStart;
    const end = target.selectionEnd;

    // 1. Shortcuts: Ctrl+Enter / Cmd+Enter to Run; Ctrl+Shift+Enter to Submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        handleSubmit();
      } else {
        handleRunCode();
      }
      return;
    }

    // 2. Tab & Shift+Tab: Indent / Unindent by 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        const textBefore = code.substring(0, start);
        const lastNewline = textBefore.lastIndexOf('\n');
        const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
        const linePrefix = code.substring(lineStart, start);
        const matchSpaces = linePrefix.match(/^ {1,4}/);
        if (matchSpaces) {
          const count = matchSpaces[0].length;
          const newCode = code.substring(0, lineStart) + code.substring(lineStart + count);
          setCode(newCode);
          setTimeout(() => {
            target.selectionStart = target.selectionEnd = Math.max(lineStart, start - count);
          }, 0);
        }
      } else {
        const newCode = code.substring(0, start) + '    ' + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + 4;
        }, 0);
      }
      return;
    }

    // 3. Enter key: Smart auto-indentation & bracket pair splitting
    if (e.key === 'Enter') {
      e.preventDefault();
      const textBefore = code.substring(0, start);
      const textAfter = code.substring(end);
      const lastNewline = textBefore.lastIndexOf('\n');
      const currentLine = lastNewline === -1 ? textBefore : textBefore.substring(lastNewline + 1);

      const indentMatch = currentLine.match(/^(\s*)/);
      const baseIndent = indentMatch ? indentMatch[1] : '';

      const trimmedBefore = currentLine.trimEnd();
      const isOpenBrace =
        trimmedBefore.endsWith('{') || trimmedBefore.endsWith('(') || trimmedBefore.endsWith('[');
      const isBracePair =
        (trimmedBefore.endsWith('{') && textAfter.startsWith('}')) ||
        (trimmedBefore.endsWith('(') && textAfter.startsWith(')')) ||
        (trimmedBefore.endsWith('[') && textAfter.startsWith(']'));

      if (isBracePair) {
        const innerIndent = baseIndent + '    ';
        const insertion = '\n' + innerIndent + '\n' + baseIndent;
        const newCode = textBefore + insertion + textAfter;
        setCode(newCode);
        setTimeout(() => {
          const cursorPosition = start + 1 + innerIndent.length;
          target.selectionStart = target.selectionEnd = cursorPosition;
        }, 0);
      } else {
        const extraIndent = isOpenBrace ? '    ' : '';
        const totalIndent = baseIndent + extraIndent;
        const insertion = '\n' + totalIndent;
        const newCode = textBefore + insertion + textAfter;
        setCode(newCode);
        setTimeout(() => {
          const cursorPosition = start + insertion.length;
          target.selectionStart = target.selectionEnd = cursorPosition;
        }, 0);
      }
      return;
    }

    // 4. Backspace: Delete 4 spaces at once if on indentation
    if (e.key === 'Backspace' && start === end && start >= 4) {
      const textBefore = code.substring(0, start);
      const lastNewline = textBefore.lastIndexOf('\n');
      const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
      const textOnLineBeforeCursor = code.substring(lineStart, start);

      if (/^ +$/.test(textOnLineBeforeCursor) && textOnLineBeforeCursor.endsWith('    ')) {
        e.preventDefault();
        const newCode = code.substring(0, start - 4) + code.substring(start);
        setCode(newCode);
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start - 4;
        }, 0);
        return;
      }
    }

    // 5. Auto-closing pairs: (), [], {}, "", ''
    const pairs: Record<string, string> = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'"
    };

    if (pairs[e.key] && start === end) {
      const closeChar = pairs[e.key];
      if ((e.key === '"' || e.key === "'") && start > 0 && /\w/.test(code[start - 1])) {
        return;
      }
      e.preventDefault();
      const newCode = code.substring(0, start) + e.key + closeChar + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
      return;
    }

    // 6. Over-typing closing character if already present
    if (['}', ')', ']', '"', "'"].includes(e.key) && start === end && code[start] === e.key) {
      e.preventDefault();
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
      return;
    }
  };

  // Run Sample Test Cases
  const handleRunCode = async () => {
    sound.playClick();
    setIsRunning(true);
    expandConsole('result');

    let casesToRun: TestCase[] = [...spec.examples];
    if (isCustomTab) {
      try {
        const parsedInputs: Record<string, any> = {};
        for (const [k, v] of Object.entries(customParams)) {
          try {
            parsedInputs[k] = JSON.parse(v);
          } catch {
            parsedInputs[k] = v;
          }
        }

        let expectedOutput: any = spec.examples[0]?.expectedOutput;
        let displayOutput: string = spec.examples[0]?.displayOutput || (typeof expectedOutput === 'object' ? JSON.stringify(expectedOutput) : String(expectedOutput));

        const optimalCode = JAVA_SOLUTIONS[problem.id];
        if (optimalCode) {
          try {
            const refRes = await executeCode(optimalCode, spec.methodName, [{
              id: 99,
              input: parsedInputs,
              displayInput: Object.entries(parsedInputs).map(([k, v]) => `${k} = ${JSON.stringify(v)}`).join(', '),
              expectedOutput: '__UNKNOWN__',
              displayOutput: '__UNKNOWN__',
            }]);
            if (refRes.testCaseResults && refRes.testCaseResults.length > 0 && refRes.status !== 'Compile Error' && refRes.status !== 'Runtime Error') {
              const resActual = refRes.testCaseResults[0].actual;
              try {
                expectedOutput = JSON.parse(resActual);
              } catch {
                expectedOutput = resActual;
              }
              displayOutput = resActual;
            }
          } catch (e) {
            console.warn('Could not compute reference output for custom test case:', e);
          }
        }

        casesToRun = [
          {
            id: 99,
            input: parsedInputs,
            displayInput: Object.entries(parsedInputs).map(([k, v]) => `${k} = ${JSON.stringify(v)}`).join(', '),
            expectedOutput,
            displayOutput
          }
        ];
      } catch (err: any) {
        alert('Invalid parameter formatting: ' + err.message);
        setIsRunning(false);
        return;
      }
    }

    const result = await executeCode(code, spec.methodName, casesToRun);
    setLastResult(result);
    setIsRunning(false);

    if (result.testCaseResults && result.testCaseResults.length > 0) {
      const firstFailed = result.testCaseResults.findIndex(r => !r.passed);
      setSelectedResultCaseIdx(firstFailed !== -1 ? firstFailed : 0);
    } else {
      setSelectedResultCaseIdx(0);
    }

    if (result.status === 'Accepted') {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  // Submit against full test suite
  const handleSubmit = async () => {
    sound.playClick();
    setIsSubmitting(true);
    expandConsole('result');

    const fullSuite: TestCase[] = [...spec.examples, ...(spec.hiddenTestCases || [])];
    const result = await executeCode(code, spec.methodName, fullSuite);

    setLastResult(result);
    setIsSubmitting(false);

    if (result.testCaseResults && result.testCaseResults.length > 0) {
      const firstFailed = result.testCaseResults.findIndex(r => !r.passed);
      setSelectedResultCaseIdx(firstFailed !== -1 ? firstFailed : 0);
    } else {
      setSelectedResultCaseIdx(0);
    }

    // Record submission
    const newSubmission: SubmissionRecord = {
      id: Date.now().toString(),
      status: result.status,
      runtimeMs: result.runtimeMs,
      memoryMb: result.memoryMb,
      beatsPercent: result.beatsPercent,
      passedCount: result.totalPassed,
      totalCases: result.totalCases,
      code: code,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setSubmissions(prev => [newSubmission, ...prev]);

    if (result.status === 'Accepted') {
      setIsAccepted(true);
      sound.playSolve();
      sound.playLevelUp();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6']
      });
      onProblemSolved(problem.id);
      onAddXp(problem.xp);
    } else {
      sound.playWrong();
    }
  };

  // Insert reference solution into editor
  const handleLoadSolution = () => {
    sound.playClick();
    const optimal = JAVA_SOLUTIONS[problem.id];
    if (optimal) {
      setCode(optimal);
      sound.playLevelUp();
    }
  };

  // Confirm Reset Code
  const handleConfirmReset = () => {
    sound.playClick();
    setCode(spec.starterJava);
    setLastResult(null);
    setSelectedResultCaseIdx(0);
    setIsAccepted(false);
    setShowResetConfirm(false);
  };

  // Copy code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = code.split('\n').length;
  const currentExample = spec.examples[activeCaseIdx] || spec.examples[0];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden text-left bg-slate-950 text-slate-100">
      {/* ======================================================== */}
      {/* 1. LEETCODE TOP UTILITY & NAVIGATION BAR                 */}
      {/* ======================================================== */}
      <div className="px-3 sm:px-4 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0 flex-wrap min-h-[44px]">
        {/* Left: Problem Prev/Next Navigation, Title, Badges & View Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Prev / Next Arrows */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => prevProblem && onSelectProblem?.(prevProblem)}
              disabled={!prevProblem}
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
              title={prevProblem ? `Previous: #${prevProblem.number} ${prevProblem.title}` : 'First problem'}
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
            </button>
            <span className="text-[11px] font-mono text-slate-400 px-1 font-semibold shrink-0">
              #{problem.number}
            </span>
            <button
              onClick={() => nextProblem && onSelectProblem?.(nextProblem)}
              disabled={!nextProblem}
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
              title={nextProblem ? `Next: #${nextProblem.number} ${nextProblem.title}` : 'Last problem'}
            >
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          <h2 className="text-sm sm:text-base font-black text-white truncate max-w-[120px] sm:max-w-xs md:max-w-sm">
            {problem.title}
          </h2>

          {/* Difficulty Badge */}
          <span
            className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
              problem.difficulty === 'Easy'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : problem.difficulty === 'Medium'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {problem.difficulty}
          </span>

          <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 hidden md:inline shrink-0">
            +{problem.xp} XP
          </span>

          {/* Mobile Pane Switcher: Visible on screens < 1024px */}
          <div className="flex lg:hidden items-center p-0.5 bg-slate-950 border border-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setMobilePane('problem')}
              className={`px-2 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                mobilePane === 'problem' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Problem
            </button>
            <button
              onClick={() => setMobilePane('code')}
              className={`px-2 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                mobilePane === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Code
            </button>
          </div>

          {/* View Switcher Pills */}
          {onSelectTab && (
            <div className="hidden sm:flex items-center gap-1 ml-1 p-0.5 bg-slate-950 border border-slate-800 rounded-lg shrink-0">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('arena');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeTab === 'arena'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Code & Solve in interactive judge"
              >
                <Code2 className="w-4 h-4 shrink-0" />
                <span>Code</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('visualizer');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeTab === 'visualizer'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Step-by-step visual animation"
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Visualizer</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('blueprint');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeTab === 'blueprint'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Algorithm blueprint & notes"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Strategy</span>
              </button>
            </div>
          )}
        </div>

        {/* Center: Interview Stopwatch Pacing Tool */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 shrink-0">
          <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="font-bold">{formattedTime}</span>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-0.5 hover:text-white transition-colors cursor-pointer ml-1 shrink-0"
            title={isTimerRunning ? 'Pause Stopwatch' : 'Start Stopwatch'}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 shrink-0" />}
          </button>
          <button
            onClick={() => {
              setIsTimerRunning(false);
              setStopwatchSeconds(0);
            }}
            className="p-0.5 hover:text-white transition-colors cursor-pointer text-slate-500 shrink-0"
            title="Reset Stopwatch"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

        {/* Right: Actions, Run, Submit, External, Close */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {handleStartTimedMock && (
            <button
              onClick={() => {
                sound.playClick();
                handleStartTimedMock();
              }}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 text-xs font-semibold cursor-pointer shrink-0"
              title="Timed Mock Interview"
            >
              <Timer className="w-4 h-4 shrink-0" />
              <span>Mock</span>
            </button>
          )}

          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer hidden sm:flex shrink-0"
            title="Open on LeetCode"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>

          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 shrink-0"
            title="Run code against sample test cases (Ctrl + Enter)"
          >
            <Play className="w-4 h-4 fill-current text-slate-300 shrink-0" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm disabled:opacity-50 shrink-0"
            title="Submit solution for evaluation (Ctrl + Shift + Enter)"
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
          </button>

          {onClose && (
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1 shrink-0"
              title="Close Coding Arena"
            >
              <X className="w-4 h-4 shrink-0" />
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN WORKSPACE: 2-COLUMN SPLIT PANES                  */}
      {/* ======================================================== */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-0">
        {/* ====================================================== */}
        {/* LEFT COLUMN: Problem Hub (Description, Editorial, Subs) */}
        {/* ====================================================== */}
        {!isFocusMode && (
          <div className={`${mobilePane === 'problem' ? 'flex' : 'hidden'} lg:flex lg:col-span-4 border-r border-slate-800 flex-col overflow-hidden min-h-0 bg-slate-950`}>
            {/* Left Hub Tab Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-2 shrink-0">
              <div className="flex items-center overflow-x-auto">
                <button
                  onClick={() => setLeftTab('description')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                    leftTab === 'description'
                      ? 'border-indigo-500 text-indigo-400 bg-slate-950/60'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Description</span>
                </button>

                <button
                  onClick={() => setLeftTab('editorial')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                    leftTab === 'editorial'
                      ? 'border-indigo-500 text-indigo-400 bg-slate-950/60'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Editorial & Strategy</span>
                </button>

                <button
                  onClick={() => setLeftTab('submissions')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                    leftTab === 'submissions'
                      ? 'border-indigo-500 text-indigo-400 bg-slate-950/60'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Submissions</span>
                  {submissions.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
                      {submissions.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Quick Collapse Left Panel Button (Zen Mode) */}
              <button
                onClick={() => setIsFocusMode(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-[11px] font-medium shrink-0 cursor-pointer"
                title="Collapse problem description panel for full-width code editor (Zen Mode)"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Collapse</span>
              </button>
            </div>

            {/* Left Hub Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scroll">
              {/* TAB 1: DESCRIPTION */}
              {leftTab === 'description' && (
                <>
                  {/* Pattern Header Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Algorithmic Pattern: {problem.pattern}
                    </span>

                    {handleOpenVisualizer && (
                      <button
                        onClick={() => handleOpenVisualizer(problem)}
                        className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 px-2 py-1 rounded bg-indigo-950/60 border border-indigo-500/30"
                      >
                        <Layers className="w-3 h-3" />
                        <span>Step Visualizer</span>
                      </button>
                    )}
                  </div>

                  {/* Core Intuition Hook */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-200 leading-relaxed">
                      <span className="font-bold text-amber-400 mr-1.5">Core Intuition:</span>
                      <span className="italic">"{problem.hook}"</span>
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 shadow-sm">
                    <FormattedMarkdownText content={spec.description} />
                  </div>

                  {/* Formatted Examples */}
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Examples</span>
                    </h4>
                    {spec.examples.map((ex, i) => (
                      <div key={ex.id || i} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 font-mono text-xs shadow-sm">
                        <div className="text-slate-400 font-bold text-[11px] flex items-center justify-between">
                          <span>Example {i + 1}:</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5">
                          <div>
                            <span className="text-slate-500 font-semibold">Input: </span>
                            <span className="text-cyan-300 font-semibold break-all">{ex.displayInput}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-semibold">Output: </span>
                            <span className="text-emerald-400 font-bold break-all">{ex.displayOutput}</span>
                          </div>
                        </div>
                        {ex.explanation && (
                          <div className="text-xs text-slate-300 pt-1.5 border-t border-slate-800/80 font-sans leading-relaxed">
                            <span className="font-bold text-amber-400">Explanation: </span>
                            <FormattedMarkdownText content={ex.explanation} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2.5 shadow-sm">
                    <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                      <span>Constraints:</span>
                    </h4>
                    <ul className="space-y-1.5 pl-1">
                      {spec.constraints.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300 text-xs">
                          <span className="text-slate-500 select-none">•</span>
                          <div>
                            <FormattedMarkdownText content={c} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hints Accordion */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                        Algorithmic Hints
                      </span>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="border border-slate-800 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setHintLevel(hintLevel === 1 ? 0 : 1)}
                          className="w-full px-3 py-2 bg-slate-900 hover:bg-slate-850 flex items-center justify-between text-xs font-semibold text-slate-300 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                            <span>Hint 1: Conceptual Intuition</span>
                          </div>
                          {hintLevel === 1 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {hintLevel >= 1 && (
                          <div className="p-3 bg-slate-950 text-xs text-slate-300 border-t border-slate-800 italic">
                            {problem.hook}
                          </div>
                        )}
                      </div>

                      <div className="border border-slate-800 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setHintLevel(hintLevel === 2 ? 0 : 2)}
                          className="w-full px-3 py-2 bg-slate-900 hover:bg-slate-850 flex items-center justify-between text-xs font-semibold text-slate-300 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Hint 2: Implementation Invariant</span>
                          </div>
                          {hintLevel === 2 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {hintLevel >= 2 && (
                          <div className="p-3 bg-slate-950 text-xs text-slate-300 border-t border-slate-800 space-y-1">
                            {problem.flow.slice(0, 2).map((step, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={problem.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LeetCode Official</span>
                    </a>

                    <a
                      href={problem.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-rose-400" />
                      <span>NeetCode Video</span>
                    </a>
                  </div>
                </>
              )}

              {/* TAB 2: EDITORIAL & STRATEGY */}
              {leftTab === 'editorial' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Official Algorithmic Strategy
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed italic p-3 rounded-xl bg-slate-900 border border-slate-800">
                      "{problem.hook}"
                    </p>
                  </div>

                  {/* Step by step flow */}
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                      Step-by-Step Blueprint
                    </h4>
                    <div className="space-y-2">
                      {problem.flow.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pitfalls */}
                  <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Common Trap to Avoid
                    </div>
                    <p className="text-xs text-rose-200/90 leading-relaxed">
                      {problem.pitfall}
                    </p>
                  </div>

                  {/* Complexities */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">TIME COMPLEXITY</span>
                      <span className="text-indigo-400 font-bold">{problem.complexity.time}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">SPACE COMPLEXITY</span>
                      <span className="text-emerald-400 font-bold">{problem.complexity.space}</span>
                    </div>
                  </div>

                  {/* Reference Solution Code with Quick Insert */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                        Optimal Reference Solution (Java)
                      </span>

                      <button
                        onClick={handleLoadSolution}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                        title="Load this tested optimal solution into the code editor"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Insert into Editor</span>
                      </button>
                    </div>

                    <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-200 overflow-x-auto max-h-[300px] leading-relaxed custom-scroll">
                      <code>{JAVA_SOLUTIONS[problem.id] || problem.starterCode || '// Reference solution'}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 3: SUBMISSIONS HISTORY */}
              {leftTab === 'submissions' && (
                <div className="space-y-3">
                  {submissions.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      <History className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                      <p className="font-bold text-slate-400">No submissions yet for this problem.</p>
                      <p className="mt-1">Click "Submit" to test your code against the full suite and track benchmarks!</p>
                    </div>
                  ) : (
                    submissions.map((sub, idx) => (
                      <div
                        key={sub.id}
                        className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 transition-all hover:border-slate-700"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className={`font-black flex items-center gap-1.5 ${
                              sub.status === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {sub.status === 'Accepted' ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            {sub.status}
                          </span>

                          <span className="font-mono text-[10px] text-slate-500">{sub.timestamp}</span>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                          <span>Runtime: <strong className="text-slate-200">{sub.runtimeMs} ms</strong></span>
                          <span>Passed: <strong className="text-slate-200">{sub.passedCount}/{sub.totalCases}</strong></span>
                          {sub.status === 'Accepted' && (
                            <span className="text-amber-400 font-bold">Beats {sub.beatsPercent}%</span>
                          )}
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-slate-500">Submission #{submissions.length - idx}</span>
                          <button
                            onClick={() => {
                              setCode(sub.code);
                              sound.playClick();
                            }}
                            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                          >
                            Restore this Code
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* RIGHT COLUMN: Code Editor + Collapsible Console Drawer  */}
        {/* ====================================================== */}
        <div ref={rightPanelRef} className={`${mobilePane === 'code' ? 'flex' : 'hidden'} lg:flex ${isFocusMode ? 'lg:col-span-12' : 'lg:col-span-8'} flex-col overflow-hidden min-h-0 bg-slate-950`}>
          {/* Editor Action Toolbar */}
          <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0 flex-wrap">
            {/* Language & Actions */}
            <div className="flex items-center gap-2">
              {isFocusMode && (
                <button
                  onClick={() => setIsFocusMode(false)}
                  className="px-2.5 py-1 rounded-md bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/30 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer mr-1"
                  title="Show problem description and editorial panel"
                >
                  <PanelLeftOpen className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
                  <span>Show Problem</span>
                </button>
              )}

              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 flex items-center gap-1.5 shadow-sm">
                <Code2 className="w-3.5 h-3.5 shrink-0" />
                <span>Java 21</span>
              </span>

              {/* Format Code */}
              <button
                onClick={handleFormatCode}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Format Code Indentation (4 Spaces)"
              >
                <AlignLeft className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Format</span>
              </button>

              {/* Load Reference Solution */}
              <button
                onClick={handleLoadSolution}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Load Optimal Java Reference Solution"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span className="hidden md:inline">Load Solution</span>
              </button>

              {/* Reset to starter code with confirm */}
              <button
                onClick={() => setShowResetConfirm(true)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Reset Code to Starter Template"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Right Tools: Copy, Font Size, Fullscreen */}
            <div className="flex items-center gap-1.5">
              {/* Copy */}
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy code to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 shrink-0 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
              </button>

              {/* Font Size */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                <button
                  onClick={() => setFontSize('text-xs')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                    fontSize === 'text-xs' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Small Font"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('text-sm')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                    fontSize === 'text-sm' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Medium Font"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('text-base')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                    fontSize === 'text-base' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Large Font"
                >
                  A+
                </button>
              </div>

              {/* Shortcuts Tooltip */}
              <button
                onClick={() => setShowShortcutsHelp(!showShortcutsHelp)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Keyboard Shortcuts Guide"
              >
                <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              </button>

              {/* Focus / Fullscreen Toggle */}
              <button
                onClick={() => setIsFocusMode(!isFocusMode)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isFocusMode
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title={isFocusMode ? 'Restore split view' : 'Maximize code editor'}
              >
                {isFocusMode ? <Minimize2 className="w-3.5 h-3.5 shrink-0" /> : <Maximize2 className="w-3.5 h-3.5 shrink-0" />}
              </button>
            </div>
          </div>

          {/* Shortcuts Help Box */}
          {showShortcutsHelp && (
            <div className="p-3 bg-slate-900 border-b border-slate-800 text-xs flex items-center justify-between gap-4 font-mono text-slate-300">
              <div className="flex items-center gap-4 flex-wrap">
                <span><kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700">Enter</kbd> Run Code</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700">Shift</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700">Enter</kbd> Submit</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700">Tab</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700">Shift+Tab</kbd> Indent/Dedent</span>
              </div>
              <button
                onClick={() => setShowShortcutsHelp(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Code Editor Body with Line Numbers */}
          <div className="flex-1 flex overflow-hidden min-h-0 bg-slate-950">
            {/* Line numbers gutter */}
            <div
              ref={gutterRef}
              className="w-11 py-3 bg-slate-950 text-slate-600 select-none text-right pr-2 leading-6 font-mono text-xs border-r border-slate-900 shrink-0 overflow-hidden"
            >
              {Array.from({ length: Math.max(30, lineCount + 5) }).map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>

            {/* Interactive textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={handleEditorScroll}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className={`flex-1 p-3 bg-slate-950 text-slate-100 resize-none focus:outline-none leading-6 font-mono custom-scroll overflow-y-auto selection:bg-indigo-600/40 ${fontSize}`}
              placeholder="// Write your Java solution here..."
            />
          </div>

          {/* ====================================================== */}
          {/* BOTTOM DRAWER: Collapsible Testcases & Console Runner  */}
          {/* ====================================================== */}
          <div
            style={isConsoleExpanded && consoleHeight ? { height: `${consoleHeight}px` } : undefined}
            className={`border-t border-slate-800 bg-slate-900 flex flex-col shrink-0 ${isConsoleExpanded ? '' : 'h-auto'}`}
          >
            {/* Draggable Resize Handle (Visible when expanded) */}
            {isConsoleExpanded && (
              <div
                onMouseDown={handleConsoleDragStart}
                onTouchStart={handleConsoleTouchDragStart}
                className="h-2 w-full bg-slate-900 hover:bg-indigo-600 active:bg-indigo-500 cursor-row-resize flex items-center justify-center transition-colors select-none shrink-0 group border-b border-slate-800/80"
                title="Drag up or down to resize console"
              >
                <div className="w-12 h-1 rounded-full bg-slate-700 group-hover:bg-slate-300 transition-colors" />
              </div>
            )}

            {/* Drawer Header Toolbar */}
            <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-800/80 bg-slate-900 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => expandConsole('testcase')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    consoleTab === 'testcase' && isConsoleExpanded
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Testcase
                </button>

                <button
                  onClick={() => expandConsole('result')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    consoleTab === 'result' && isConsoleExpanded
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Test Result</span>
                  {lastResult && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        lastResult.status === 'Accepted' ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                  )}
                </button>
              </div>

              {/* Console Toggle Minimize / Maximize */}
              <button
                onClick={toggleConsole}
                className="p-1 rounded text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
                title={isConsoleExpanded ? 'Collapse Console Drawer' : 'Expand Console Drawer (Half Screen)'}
              >
                <span className="text-[11px] font-mono font-semibold">Console</span>
                {isConsoleExpanded ? <ChevronDown className="w-3.5 h-3.5 shrink-0" /> : <ChevronUp className="w-3.5 h-3.5 shrink-0" />}
              </button>
            </div>

            {/* Drawer Body (Expandable) */}
            {isConsoleExpanded && (
              <div className="p-3 bg-slate-950 overflow-y-auto flex-1 custom-scroll min-h-0">
                {/* 1. TESTCASE TAB */}
                {consoleTab === 'testcase' && (
                  <div className="space-y-3">
                    {/* Case Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {spec.examples.map((ex, idx) => (
                        <button
                          key={ex.id}
                          onClick={() => {
                            sound.playClick();
                            setIsCustomTab(false);
                            setActiveCaseIdx(idx);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            !isCustomTab && activeCaseIdx === idx
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          Case {idx + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          sound.playClick();
                          setIsCustomTab(true);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                          isCustomTab
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        + Custom
                      </button>
                    </div>

                    {/* Standard Testcase Parameter Fields */}
                    {!isCustomTab ? (
                      <div className="space-y-2 font-mono text-xs">
                        {Object.entries(currentExample.input || {}).map(([paramName, paramVal]) => (
                          <div key={paramName} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                            <span className="text-slate-400 font-bold text-[11px] shrink-0">{paramName} =</span>
                            <span className="text-cyan-300 font-semibold break-all text-right">
                              {typeof paramVal === 'object' ? JSON.stringify(paramVal) : String(paramVal)}
                            </span>
                          </div>
                        ))}
                        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                          <span className="text-slate-400 font-bold text-[11px] shrink-0">Expected =</span>
                          <span className="text-emerald-400 font-semibold break-all text-right font-mono">
                            {currentExample.displayOutput || (typeof currentExample.expectedOutput === 'object' ? JSON.stringify(currentExample.expectedOutput) : String(currentExample.expectedOutput))}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Custom Parameter Editor */
                      <div className="space-y-2 font-mono text-xs">
                        {Object.entries(customParams).map(([paramName, paramVal]) => (
                          <div key={paramName} className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                            <span className="text-slate-400 font-bold text-[11px] shrink-0">{paramName} =</span>
                            <input
                              type="text"
                              value={paramVal}
                              onChange={(e) => {
                                const nextVal = e.target.value;
                                setCustomParams(prev => ({ ...prev, [paramName]: nextVal }));
                              }}
                              className="flex-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-cyan-300 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                            />
                          </div>
                        ))}
                        <p className="text-[11px] text-slate-500 italic px-1">
                          Run Code to evaluate this custom input against the reference engine.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. TEST RESULT TAB */}
                {consoleTab === 'result' && (
                  <div>
                    {!lastResult ? (
                      <div className="text-center py-6 text-slate-500 text-xs">
                        <Terminal className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                        <p>You must run or submit your code first to see execution results.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 animate-in fade-in duration-200">
                        {/* Result Status Header */}
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            {lastResult.status === 'Accepted' ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-400" />
                            )}
                            <span
                              className={`text-base font-black tracking-tight ${
                                lastResult.status === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {lastResult.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs font-mono">
                            <span className="text-slate-300">
                              Runtime: <strong className="text-white">{lastResult.runtimeMs} ms</strong>
                            </span>
                            {lastResult.status === 'Accepted' && (
                              <span className="text-amber-400 font-bold">
                                Beats {lastResult.beatsPercent}%
                              </span>
                            )}
                            <span className="text-slate-400">
                              Passed: {lastResult.totalPassed} / {lastResult.totalCases}
                            </span>
                          </div>
                        </div>

                        {/* Compiler error trace (if compile error) */}
                        {lastResult.status === 'Compile Error' && (
                          <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-500/40 font-mono text-xs text-rose-300 whitespace-pre-wrap leading-relaxed space-y-1.5">
                            <div className="font-bold text-rose-400 flex items-center gap-1.5">
                              <AlertCircle className="w-4 h-4 text-rose-400" />
                              <span>Compilation / Syntax Error:</span>
                            </div>
                            <div className="text-slate-200 bg-black/40 p-2.5 rounded border border-rose-500/20">
                              {lastResult.message || 'Error occurred during transpilation or compilation.'}
                            </div>
                          </div>
                        )}

                        {/* Test Cases Inspector (Render for both Accepted and Failed results) */}
                        {lastResult.testCaseResults && lastResult.testCaseResults.length > 0 && (
                          <div className="space-y-3">
                            {/* Case selector tabs */}
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                              {lastResult.testCaseResults.map((tc, idx) => {
                                const isSelected = (selectedResultCaseIdx || 0) === idx;
                                return (
                                  <button
                                    key={tc.id || idx}
                                    onClick={() => {
                                      sound.playClick();
                                      setSelectedResultCaseIdx(idx);
                                    }}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                                      isSelected
                                        ? tc.passed
                                          ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400/50'
                                          : 'bg-rose-600 text-white shadow-sm ring-1 ring-rose-400/50'
                                        : tc.passed
                                          ? 'bg-slate-900 border border-emerald-900/50 text-emerald-400 hover:text-emerald-300'
                                          : 'bg-slate-900 border border-rose-900/50 text-rose-400 hover:text-rose-300'
                                    }`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full ${tc.passed ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                                    <span>Case {idx + 1}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Active Case Details */}
                            {(() => {
                              const activeResult = lastResult.testCaseResults[selectedResultCaseIdx] || lastResult.testCaseResults[0];
                              if (!activeResult) return null;
                              return (
                                <div className="space-y-2.5">
                                  {/* Input */}
                                  <div className="space-y-1">
                                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Input</span>
                                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs break-all">
                                      {activeResult.displayInput}
                                    </div>
                                  </div>

                                  {/* Your Output vs Expected Output */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                      <span className={`block text-[10px] uppercase font-bold tracking-wider ${activeResult.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        Your Output
                                      </span>
                                      <div className={`p-2.5 rounded-lg bg-slate-900 border font-mono text-xs break-all font-semibold ${
                                        activeResult.passed ? 'border-emerald-500/30 text-emerald-300' : 'border-rose-500/30 text-rose-300'
                                      }`}>
                                        {activeResult.actual ?? 'null'}
                                      </div>
                                    </div>
                                    <div className="space-y-1">
                                      <span className="text-emerald-400 block text-[10px] uppercase font-bold tracking-wider">
                                        Expected Output
                                      </span>
                                      <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-emerald-300 font-mono text-xs break-all font-semibold">
                                        {activeResult.expected}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Stdout Output (if user code logged anything) */}
                                  {activeResult.stdout && activeResult.stdout.trim() && (
                                    <div className="space-y-1">
                                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                                        <span>Stdout</span>
                                      </span>
                                      <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-200 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto custom-scroll">
                                        {activeResult.stdout}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        )}

                        {/* Runtime/Execution Error Details if not Compile Error */}
                        {lastResult.status !== 'Compile Error' && lastResult.message && (
                          <div className="p-3 rounded-lg bg-slate-900 border border-rose-500/40 font-mono text-xs text-rose-300 whitespace-pre-wrap leading-relaxed">
                            <div className="font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                              <span>Runtime Information:</span>
                            </div>
                            {lastResult.message}
                          </div>
                        )}

                        {/* Acceptance Celebration Banner */}
                        {lastResult.status === 'Accepted' && isAccepted && (
                          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-bold text-emerald-400 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 shrink-0 text-amber-400 animate-spin" />
                            <span>Accepted! You mastered this problem and earned +{problem.xp} XP!</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. SAFETY CONFIRMATION MODAL: RESET CODE                 */}
      {/* ======================================================== */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-150">
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Reset Code to Starter Template?</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This will discard your current modifications and restore the default Java boilerplate. Are you sure you want to proceed?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-sm"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
