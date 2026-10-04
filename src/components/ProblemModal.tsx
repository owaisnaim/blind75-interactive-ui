import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Timer,
  BookOpen,
  Layers,
  Lightbulb,
  AlertTriangle,
  Clock,
  HardDrive,
  Sparkles,
  Code2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/problems';
import type { Problem } from '../data/problems';
import { JAVA_SOLUTIONS } from '../data/javaSolutions';
import { sound } from '../utils/audio';
import { CodingArena } from './CodingArena';
import { ProblemVisualizer } from './ProblemVisualizer';
import { generateSimulationForProblem } from '../utils/simulatorEngine';
import confetti from 'canvas-confetti';

interface ProblemModalProps {
  problem: Problem | null;
  allProblems?: Problem[];
  onSelectProblem?: (problem: Problem) => void;
  userNotes: string;
  onSaveNotes: (id: string, notes: string) => void;
  onClose: () => void;
  onStartTimedMock?: (problem: Problem) => void;
  onStartRaid?: (problem: Problem) => void;
  onOpenVisualizer?: (problem: Problem) => void;
  onOpenFlowLab?: (problem: Problem) => void;
  onProblemSolved: (id: string) => void;
  onAddXp: (amount: number) => void;
}

export const ProblemModal: React.FC<ProblemModalProps> = ({
  problem,
  allProblems = [],
  onSelectProblem,
  userNotes,
  onSaveNotes,
  onClose,
  onStartTimedMock,
  onStartRaid,
  onOpenVisualizer,
  onOpenFlowLab,
  onProblemSolved,
  onAddXp,
}) => {
  const handleStartTimedMock = onStartTimedMock || onStartRaid || (() => {});
  const handleOpenVisualizer = onOpenVisualizer || onOpenFlowLab || (() => {});
  if (!problem) return null;

  const [activeTab, setActiveTab] = useState<'arena' | 'visualizer' | 'blueprint'>('arena');
  const [localNotes, setLocalNotes] = useState(userNotes || '');
  const [copiedJava, setCopiedJava] = useState(false);

  // Synchronize localNotes when problem changes or prop changes
  useEffect(() => {
    setLocalNotes(userNotes || '');
  }, [problem.id, userNotes]);

  // Navigation Prev / Next Problem
  const currentIndex = allProblems.findIndex(p => p.id === problem.id);
  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex >= 0 && currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  // Persistent Interview Stopwatch Timer across tabs
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

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

  const formattedTime = useMemo(() => {
    const mins = Math.floor(stopwatchSeconds / 60);
    const secs = stopwatchSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [stopwatchSeconds]);

  // Visualizer frames (sync)
  const frames = useMemo(() => generateSimulationForProblem(problem), [problem]);
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000);

  useEffect(() => {
    setCurrentFrameIdx(0);
    setIsPlaying(false);
  }, [problem.id]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isPlaying && currentFrameIdx < frames.length - 1) {
      timer = setTimeout(() => {
        setCurrentFrameIdx(i => i + 1);
        sound.playClick();
      }, playbackSpeed);
    } else if (isPlaying && currentFrameIdx >= frames.length - 1) {
      setIsPlaying(false);
      sound.playLevelUp();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentFrameIdx, frames.length, playbackSpeed]);

  const currentFrame = frames[currentFrameIdx] || frames[0] || null;
  const javaCode = JAVA_SOLUTIONS[problem.id] || problem.starterCode || '// Java solution';

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalNotes(val);
    onSaveNotes(problem.id, val);
  };

  const handleCopyJava = () => {
    navigator.clipboard.writeText(javaCode);
    setCopiedJava(true);
    sound.playClick();
    setTimeout(() => setCopiedJava(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 bg-slate-950 animate-in fade-in duration-200 text-left">
      <div
        className="bg-slate-950 w-screen h-screen max-w-none max-h-none rounded-none border-none flex flex-col shadow-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ======================================================== */}
        {/* UNIFIED TOP UTILITY BAR FOR VISUALIZER & BLUEPRINT TABS   */}
        {/* (CodingArena renders its own bar when activeTab === 'arena') */}
        {/* ======================================================== */}
        {activeTab !== 'arena' && (
          <div className="px-3 sm:px-4 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0 flex-wrap min-h-[44px]">
            {/* Left: Problem Prev/Next Navigation, Title, Badges & View Switcher */}
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              {/* Prev / Next Arrows */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 shrink-0">
                <button
                  onClick={() => prevProblem && onSelectProblem?.(prevProblem)}
                  disabled={!prevProblem}
                  className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title={prevProblem ? `Previous: #${prevProblem.number} ${prevProblem.title}` : 'First problem'}
                >
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                </button>
                <span className="text-[11px] font-mono text-slate-400 px-1 font-semibold">
                  #{problem.number}
                </span>
                <button
                  onClick={() => nextProblem && onSelectProblem?.(nextProblem)}
                  disabled={!nextProblem}
                  className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title={nextProblem ? `Next: #${nextProblem.number} ${nextProblem.title}` : 'Last problem'}
                >
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5 truncate max-w-[160px] sm:max-w-[260px] md:max-w-none">
                <span className="truncate">{problem.title}</span>
              </h2>

              {/* Difficulty & XP Badges */}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                  problem.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : problem.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {problem.difficulty}
              </span>

              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${CATEGORIES_CONFIG[problem.category]?.badgeBg || 'bg-slate-800 text-slate-300 border-slate-700'} hidden sm:inline`}>
                {problem.category}
              </span>

              <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 hidden md:inline shrink-0">
                +{problem.xp} XP
              </span>

              {/* View Switcher Pills */}
              <div className="flex items-center gap-1 ml-1 sm:ml-2 p-0.5 bg-slate-950 border border-slate-800 rounded-lg shrink-0">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('arena');
                  }}
                  className="px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1 text-slate-400 hover:text-white"
                  title="Code & Solve in interactive judge"
                >
                  <Code2 className="w-4 h-4 shrink-0" />
                  <span>Code</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('visualizer');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
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
                    setActiveTab('blueprint');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
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
            </div>

            {/* Center: Interview Stopwatch Pacing Tool */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 shrink-0">
              <Clock className="w-4 h-4 shrink-0 text-indigo-400" />
              <span className="font-bold">{formattedTime}</span>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsTimerRunning(!isTimerRunning);
                }}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isTimerRunning ? 'Pause Stopwatch' : 'Start Stopwatch'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5 shrink-0 text-amber-400" /> : <Play className="w-3.5 h-3.5 shrink-0 text-emerald-400" />}
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsTimerRunning(false);
                  setStopwatchSeconds(0);
                }}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset Stopwatch"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>

            {/* Right: Actions & Close */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  sound.playClick();
                  handleStartTimedMock(problem);
                }}
                className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 text-xs font-semibold cursor-pointer shrink-0"
                title="Timed Mock Interview"
              >
                <Timer className="w-4 h-4 shrink-0" />
                <span>Mock</span>
              </button>

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
                onClick={() => {
                  sound.playClick();
                  setActiveTab('arena');
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
                title="Go to Code & Solve"
              >
                <Code2 className="w-4 h-4 shrink-0" />
                <span>Code & Solve</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1 shrink-0"
                title="Close Window"
              >
                <X className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MAIN FULL-SCREEN WORKSPACE BODY                           */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-hidden p-0 flex flex-col min-h-0 bg-slate-950">
          {/* TAB 1: CODING ARENA (IN-APP LEETCODE SOLVER) */}
          {activeTab === 'arena' && (
            <CodingArena
              problem={problem}
              allProblems={allProblems}
              onSelectProblem={onSelectProblem}
              onProblemSolved={onProblemSolved}
              onAddXp={onAddXp}
              onOpenVisualizer={handleOpenVisualizer}
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onClose={onClose}
              onStartTimedMock={() => handleStartTimedMock(problem)}
            />
          )}

          {/* TAB 2: FULL-SCREEN INTERACTIVE STEP VISUALIZER WORKBENCH */}
          {activeTab === 'visualizer' && (
            <div className="flex-1 w-full h-full overflow-y-auto custom-scroll p-3 sm:p-6 bg-slate-950">
              <ProblemVisualizer
                frame={currentFrame}
                problem={problem}
                javaCode={javaCode}
                isPlaying={isPlaying}
                currentFrameIdx={currentFrameIdx}
                totalFrames={frames.length}
                playbackSpeed={playbackSpeed}
                onPlayPause={() => {
                  sound.playClick();
                  setIsPlaying(!isPlaying);
                }}
                onStepForward={() => {
                  if (currentFrameIdx < frames.length - 1) {
                    sound.playClick();
                    setCurrentFrameIdx(i => i + 1);
                  }
                }}
                onStepBack={() => {
                  if (currentFrameIdx > 0) {
                    sound.playClick();
                    setCurrentFrameIdx(i => i - 1);
                  }
                }}
                onReset={() => {
                  sound.playClick();
                  setIsPlaying(false);
                  setCurrentFrameIdx(0);
                }}
                onSeek={(idx) => {
                  sound.playClick();
                  setCurrentFrameIdx(idx);
                }}
                onSetSpeed={(speed) => setPlaybackSpeed(speed)}
              />
            </div>
          )}

          {/* TAB 3: FULL-SCREEN ALGORITHM & NOTES 2-COLUMN STUDIO */}
          {activeTab === 'blueprint' && (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-0 bg-slate-950">
              {/* LEFT COLUMN (7 COLS): Algorithm Blueprint & Reference */}
              <div className="lg:col-span-7 border-r border-slate-800 flex flex-col overflow-y-auto custom-scroll p-4 sm:p-6 space-y-5">
                {/* 1. Core Intuition Box */}
                <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 shadow-sm">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                      <Lightbulb className="w-4 h-4 shrink-0" />
                      <span>CORE ALGORITHMIC INTUITION</span>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                      Pattern: {problem.pattern}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed italic">
                    "{problem.hook}"
                  </p>
                </div>

                {/* 2. Step-by-Step Implementation Strategy */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2 font-mono">
                    <BookOpen className="w-4 h-4 shrink-0 text-cyan-400" />
                    Step-by-Step Implementation Strategy
                  </h4>
                  <div className="space-y-2.5">
                    {problem.flow.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Deadly Pitfall / Interview Trap */}
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-1">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>DEADLY PITFALL / INTERVIEW TRAP</span>
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed">
                    {problem.pitfall}
                  </p>
                </div>

                {/* 4. Complexity Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                      <Clock className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Time Complexity</div>
                      <div className="text-xs font-bold text-indigo-300 font-mono">{problem.complexity.time}</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <HardDrive className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Space Complexity</div>
                      <div className="text-xs font-bold text-emerald-300 font-mono">{problem.complexity.space}</div>
                    </div>
                  </div>
                </div>

                {/* 5. Optimal Java Reference Solution */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Code2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      Optimal Java 21 Reference Solution
                    </span>
                    <button
                      onClick={handleCopyJava}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedJava ? <Check className="w-3.5 h-3.5 shrink-0 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
                      <span>{copiedJava ? 'Copied!' : 'Copy Java Code'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto max-h-72 custom-scroll selection:bg-indigo-600/40">
                    {javaCode}
                  </pre>
                </div>
              </div>

              {/* RIGHT COLUMN (5 COLS): Dedicated Personal Notes & Scratchpad */}
              <div className="lg:col-span-5 flex flex-col h-full bg-slate-950 overflow-hidden">
                {/* Notes Header */}
                <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-purple-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Personal Interview Notes
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <span className="text-emerald-400 font-semibold">✓ Auto-saved</span>
                    <span>•</span>
                    <span>{localNotes.length} chars</span>
                  </div>
                </div>

                {/* Quick Insert Template Chips */}
                <div className="px-3 py-2 bg-slate-950 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto shrink-0 custom-scroll">
                  <span className="text-[10px] text-slate-500 font-bold uppercase shrink-0">Templates:</span>
                  <button
                    onClick={() => {
                      const addition = `\n### ⏱️ Time & Space Complexity\n- Time: ${problem.complexity.time}\n- Space: ${problem.complexity.space}\n`;
                      const updated = localNotes + addition;
                      setLocalNotes(updated);
                      onSaveNotes(problem.id, updated);
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-white hover:border-slate-700 whitespace-nowrap cursor-pointer transition-colors"
                  >
                    + Complexity
                  </button>
                  <button
                    onClick={() => {
                      const addition = `\n### ⚠️ Edge Cases to Remember\n- Null or empty input\n- Single element\n- Negative values / integer overflow\n`;
                      const updated = localNotes + addition;
                      setLocalNotes(updated);
                      onSaveNotes(problem.id, updated);
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-white hover:border-slate-700 whitespace-nowrap cursor-pointer transition-colors"
                  >
                    + Edge Cases
                  </button>
                  <button
                    onClick={() => {
                      const addition = `\n### 💡 Key Invariant\n- ${problem.hook}\n`;
                      const updated = localNotes + addition;
                      setLocalNotes(updated);
                      onSaveNotes(problem.id, updated);
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-white hover:border-slate-700 whitespace-nowrap cursor-pointer transition-colors"
                  >
                    + Invariant
                  </button>
                </div>

                {/* Full-Height Notes Textarea */}
                <div className="flex-1 p-3 overflow-hidden min-h-0 flex flex-col">
                  <textarea
                    value={localNotes}
                    onChange={handleNotesChange}
                    placeholder={`Write your personal interview notes, takeaways, or mental models for #${problem.number} ${problem.title}...\n\nExample:\n- How I identified this pattern\n- Pitfalls I encountered during mock interviews\n- Alternative approaches (e.g. iterative vs recursive)`}
                    className="w-full flex-1 bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed custom-scroll selection:bg-indigo-600/40"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
