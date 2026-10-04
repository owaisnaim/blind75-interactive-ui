import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, Zap, Sparkles, Search, Layers, Waves, GitBranch, AlertCircle, Droplets, AlertOctagon } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { PROBLEMS_DATA } from '../data/problems';
import type { Problem } from '../data/problems';
import { JAVA_SOLUTIONS } from '../data/javaSolutions';
import { generateSimulationForProblem } from '../utils/simulatorEngine';
import { ProblemVisualizer } from './ProblemVisualizer';

type ClassicMode = 'water' | 'kadane' | 'window' | 'tortoise' | 'brackets';

export interface VisualizerStudioProps {
  initialProblemId?: string;
  onOpenProblemFlowLab?: (problem: Problem) => void;
}

export type FlowLabProps = VisualizerStudioProps;

export const VisualizerStudio: React.FC<VisualizerStudioProps> = ({ initialProblemId }) => {
  const [labView, setLabView] = useState<'all75' | 'classic'>('all75');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProblemId, setSelectedProblemId] = useState<string>(initialProblemId || 'two-sum');
  const [activeClassicMode, setActiveClassicMode] = useState<ClassicMode>('water');

  useEffect(() => {
    if (initialProblemId) {
      setSelectedProblemId(initialProblemId);
      setLabView('all75');
    }
  }, [initialProblemId]);

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return PROBLEMS_DATA.filter((p) => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(p.number).includes(searchQuery);
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Current problem selected for Flow Lab
  const currentProblem = useMemo(() => {
    return PROBLEMS_DATA.find((p) => p.id === selectedProblemId) || filteredProblems[0] || PROBLEMS_DATA[0];
  }, [selectedProblemId, filteredProblems]);

  // Frames generated synchronously for current problem
  const frames = useMemo(() => {
    return generateSimulationForProblem(currentProblem);
  }, [currentProblem]);

  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000);

  // Reset playback when problem changes
  useEffect(() => {
    setCurrentFrameIdx(0);
    setIsPlaying(false);
  }, [currentProblem.id]);

  // Auto-play timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isPlaying && currentFrameIdx < frames.length - 1) {
      timer = setTimeout(() => {
        setCurrentFrameIdx((i) => i + 1);
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

  const handleStepForward = () => {
    if (currentFrameIdx < frames.length - 1) {
      sound.playClick();
      setCurrentFrameIdx((i) => i + 1);
    }
  };

  const handleStepBack = () => {
    if (currentFrameIdx > 0) {
      sound.playClick();
      setCurrentFrameIdx((i) => i - 1);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setIsPlaying(false);
    setCurrentFrameIdx(0);
  };

  const currentFrame = frames[currentFrameIdx] || frames[0] || null;
  const javaCode = JAVA_SOLUTIONS[currentProblem.id] || currentProblem.starterCode || '// Java solution';

  const categories = ['All', 'Arrays', 'Binary', 'Dynamic Programming', 'Graph', 'Interval', 'Linked List', 'Matrix', 'String', 'Tree', 'Heap'];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4 md:p-8 shadow-sm relative overflow-hidden text-left space-y-6">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400 animate-spin" />
            Interactive Algorithm Visualizer
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3 flex-wrap">
            <span>Algorithm Visualizer</span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold uppercase tracking-wider shrink-0">
              {labView === 'all75' ? 'All 75 Questions' : '5 Classic Simulators'}
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Don't just stare at code. <strong>Step through, watch memory mutate</strong>, and build deep intuition for all 75 questions in Java.
          </p>
        </div>

        {/* Top View Toggle: 75 Questions vs Classic Sandboxes */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-2xl shrink-0 flex-wrap">
          <button
            onClick={() => {
              sound.playClick();
              setLabView('all75');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              labView === 'all75'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>75 Problems Visualizer</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setLabView('classic');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              labView === 'classic'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 shrink-0" />
            <span>5 Classic Simulators</span>
          </button>
        </div>
      </div>

      {/* VIEW A: 75 QUESTIONS FLOW LAB (DEFAULT) */}
      {labView === 'all75' && (
        <div className="space-y-6">
          {/* Category Pills & Search Filter */}
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Category filter tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full custom-scroll">
                {categories.map((cat) => {
                  const count =
                    cat === 'All'
                      ? PROBLEMS_DATA.length
                      : PROBLEMS_DATA.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        sound.playClick();
                        setSelectedCategory(cat);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {cat} <span className="opacity-60 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Search box */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 shrink-0 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search problem, pattern..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Quick Problem Select Ribbon */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scroll">
              {filteredProblems.map((prob) => {
                const isSelected = prob.id === currentProblem.id;
                return (
                  <button
                    key={prob.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedProblemId(prob.id);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-2 shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-slate-400">#{prob.number}</span>
                    <span>{prob.title}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {prob.difficulty}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Problem Visualizer Stage */}
          <div className="p-4 md:p-6 rounded-3xl bg-slate-950/60 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 min-w-0 flex-wrap">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
                  #{currentProblem.number}
                </span>
                <h3 className="text-lg md:text-xl font-black text-white m-0 truncate">
                  {currentProblem.title}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold shrink-0">
                  {currentProblem.pattern}
                </span>
              </div>
              <span className="text-xs font-mono text-amber-400 shrink-0">+{currentProblem.xp} XP</span>
            </div>

            <ProblemVisualizer
              frame={currentFrame}
              problem={currentProblem}
              javaCode={javaCode}
              isPlaying={isPlaying}
              currentFrameIdx={currentFrameIdx}
              totalFrames={frames.length}
              playbackSpeed={playbackSpeed}
              onPlayPause={() => {
                sound.playClick();
                setIsPlaying(!isPlaying);
              }}
              onStepForward={handleStepForward}
              onStepBack={handleStepBack}
              onReset={handleReset}
              onSeek={(idx) => {
                sound.playClick();
                setCurrentFrameIdx(idx);
              }}
              onSetSpeed={(speed) => setPlaybackSpeed(speed)}
            />
          </div>
        </div>
      )}

      {/* VIEW B: 5 CLASSIC PHYSICS SANDBOXES */}
      {labView === 'classic' && (
        <div className="space-y-6">
          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-2xl w-full md:w-auto">
            {[
              { id: 'water', label: 'Container With Most Water', subtitle: 'Two Pointers (Greedy)', Icon: Waves },
              { id: 'kadane', label: 'Maximum Subarray', subtitle: "Kadane's Algorithm", Icon: Zap },
              { id: 'window', label: 'Longest Substring', subtitle: 'Sliding Window', Icon: Search },
              { id: 'tortoise', label: 'Linked List Cycle', subtitle: "Floyd's Fast & Slow Pointers", Icon: GitBranch },
              { id: 'brackets', label: 'Valid Parentheses', subtitle: 'LIFO Stack Matching', Icon: Layers },
            ].map((tab) => {
              const TabIcon = tab.Icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveClassicMode(tab.id as ClassicMode);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-left shrink-0 ${
                    activeClassicMode === tab.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <TabIcon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </div>
                  <div className="text-[10px] font-normal opacity-70 ml-5.5">{tab.subtitle}</div>
                </button>
              );
            })}
          </div>

          {/* Classic Simulator Canvases */}
          <div className="min-h-[420px]">
            {activeClassicMode === 'water' && <WaterContainerSimulator />}
            {activeClassicMode === 'kadane' && <KadaneSimulator />}
            {activeClassicMode === 'window' && <SlidingWindowSimulator />}
            {activeClassicMode === 'tortoise' && <TortoiseHareSimulator />}
            {activeClassicMode === 'brackets' && <StackBracketsSimulator />}
          </div>
        </div>
      )}
    </section>
  );
};

// =========================================================================
// 1. CONTAINER WITH MOST WATER SIMULATOR
// =========================================================================
const WaterContainerSimulator: React.FC = () => {
  const [heights, setHeights] = useState<number[]>([1, 8, 6, 2, 5, 4, 8, 3, 7]);
  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(8);
  const [maxArea, setMaxArea] = useState<number>(49);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const currentWidth = right - left;
  const currentBottleneck = Math.min(heights[left], heights[right]);
  const currentArea = currentWidth > 0 ? currentWidth * currentBottleneck : 0;

  // Auto-play step
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isPlaying && left < right) {
      timer = setTimeout(() => {
        stepGreedy();
      }, 700);
    } else if (left >= right && isPlaying) {
      setIsPlaying(false);
      sound.playLevelUp();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, left, right]);

  const stepGreedy = () => {
    if (left >= right) return;
    const hL = heights[left];
    const hR = heights[right];
    const area = (right - left) * Math.min(hL, hR);

    let nextL = left;
    let nextR = right;
    let reason = '';

    if (hL < hR) {
      nextL = left + 1;
      reason = `Left bar (${hL}) is shorter than Right (${hR}). Moving Left -> to find a taller bottleneck!`;
      sound.playClick();
    } else {
      nextR = right - 1;
      reason = `Right bar (${hR}) is shorter or equal to Left (${hL}). Moving Right <- to find a taller bottleneck!`;
      sound.playClick();
    }

    if (area > maxArea) {
      setMaxArea(area);
    }

    setHistory(prev => [reason, ...prev.slice(0, 4)]);
    setLeft(nextL);
    setRight(nextR);
  };

  const handleReset = () => {
    sound.playClick();
    setIsPlaying(false);
    setLeft(0);
    setRight(heights.length - 1);
    setMaxArea(0);
    setHistory(['Pointers reset to endpoints. Click "Step" or "Auto-Solve" to watch the greedy logic!']);
  };

  const handleRandomize = () => {
    sound.playClick();
    setIsPlaying(false);
    const newArr = Array.from({ length: 9 }, () => Math.floor(Math.random() * 8) + 1);
    setHeights(newArr);
    setLeft(0);
    setRight(newArr.length - 1);
    setMaxArea(0);
    setHistory(['New randomized heights loaded.']);
  };

  return (
    <div className="space-y-6">
      {/* Explanation Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
            <Waves className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-300">
              GREEDY TWO-POINTER INVARIANT
            </div>
            <div className="text-xs text-slate-300">
              "Area is trapped by the shorter wall. Shifting the taller wall can ONLY decrease width without raising height. You MUST advance the runt!"
            </div>
          </div>
        </div>

        {/* Real-time Math Scoreboard */}
        <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 font-mono">WIDTH (R - L)</div>
            <div className="text-sm font-bold text-white font-mono">{currentWidth}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono">BOTTLENECK</div>
            <div className="text-sm font-bold text-rose-400 font-mono">{currentBottleneck}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono">CURRENT AREA</div>
            <div className="text-sm font-black text-cyan-300 font-mono">{currentArea}</div>
          </div>
          <div className="border-l border-slate-800 pl-3">
            <div className="text-[10px] text-amber-400 font-mono">RECORD MAX</div>
            <div className="text-sm font-black text-amber-300 font-mono">{maxArea}</div>
          </div>
        </div>
      </div>

      {/* Visual Water Tank Canvas */}
      <div className="relative h-64 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-end justify-between overflow-hidden shadow-inner">
        {/* Animated Water Reservoir Fill between Left & Right */}
        {left < right && (
          <div
            className="absolute bottom-4 bg-cyan-500/20 border-t-2 border-cyan-400 transition-all duration-300 pointer-events-none"
            style={{
              left: `${(left / (heights.length - 1)) * 90 + 5}%`,
              width: `${((right - left) / (heights.length - 1)) * 90}%`,
              height: `${(currentBottleneck / 9) * 200}px`,
            }}
          >
            <div className="w-full text-center text-xs font-mono font-bold text-cyan-200 mt-2 flex items-center justify-center gap-1">
              <Droplets className="w-3.5 h-3.5 inline text-cyan-300" />
              <span>Area: {currentArea}</span>
            </div>
          </div>
        )}

        {/* Vertical Height Bars */}
        {heights.map((h, idx) => {
          const isLeft = idx === left;
          const isRight = idx === right;
          const isShorted = (isLeft && h <= heights[right]) || (isRight && h <= heights[left]);
          const barHeightPct = (h / 9) * 100;

          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end relative z-10 mx-1">
              {/* Pointer Badges on Top */}
              {isLeft && (
                <div className="absolute -top-7 animate-bounce px-2 py-0.5 rounded-md bg-indigo-500 text-white font-mono text-[11px] font-bold shadow-sm">
                  L [{h}]
                </div>
              )}
              {isRight && (
                <div className="absolute -top-7 animate-bounce px-2 py-0.5 rounded-md bg-rose-500 text-white font-mono text-[11px] font-bold shadow-sm">
                  R [{h}]
                </div>
              )}

              {/* Bar Element */}
              <div
                className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 relative flex items-center justify-center font-mono text-[11px] font-bold ${
                  isShorted
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                    : isLeft || isRight
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                    : 'bg-slate-800 border border-slate-700/60 text-slate-300 hover:bg-slate-700'
                }`}
                style={{ height: `${barHeightPct}%` }}
              >
                <span className="mb-2">{h}</span>
              </div>

              {/* Index Number */}
              <span className="text-[10px] font-mono text-slate-500 mt-1">i={idx}</span>
            </div>
          );
        })}
      </div>

      {/* Control Buttons & Reasoning Feed */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              setIsPlaying(!isPlaying);
            }}
            disabled={left >= right}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            {isPlaying ? 'Pause' : 'Auto-Solve Flow'}
          </button>

          <button
            onClick={stepGreedy}
            disabled={left >= right || isPlaying}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all cursor-pointer disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4 text-cyan-400" />
            Step 1 Pointer
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Reset Pointers"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleRandomize}
            className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-amber-500/20 transition-colors cursor-pointer"
          >
            Randomize Heights
          </button>
        </div>

        {/* Live Reasoning Callout */}
        <div className="flex-1 max-w-md p-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{history[0] || 'Start by evaluating endpoints: L=0, R=8.'}</span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. KADANE’S ALGORITHM (ENERGY RESET SIMULATOR)
// =========================================================================
const KadaneSimulator: React.FC = () => {
  const [nums] = useState<number[]>([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [curSum, setCurSum] = useState<number>(0);
  const [maxSum, setMaxSum] = useState<number>(-2);
  const [wasReset, setWasReset] = useState<boolean>(false);
  const [historyLog, setHistoryLog] = useState<string>('Click "Step Kadane" to advance running sum.');

  const stepKadane = () => {
    if (currentIdx >= nums.length) return;
    const n = nums[currentIdx];
    sound.playClick();

    let newSum = curSum;
    let didReset = false;

    if (curSum < 0) {
      newSum = 0;
      didReset = true;
      setWasReset(true);
      setTimeout(() => setWasReset(false), 800);
    }

    newSum += n;
    const newMax = Math.max(maxSum, newSum);

    setCurSum(newSum);
    setMaxSum(newMax);
    setCurrentIdx(c => c + 1);

    if (didReset) {
      setHistoryLog(`SUM WAS NEGATIVE (${curSum})! Reset to 0! Restarting streak with ${n}.`);
    } else {
      setHistoryLog(`Added ${n} -> Running sum: ${newSum}. Max subarray recorded: ${newMax}.`);
    }

    if (currentIdx + 1 === nums.length) {
      sound.playLevelUp();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    sound.playClick();
    setCurrentIdx(0);
    setCurSum(0);
    setMaxSum(nums[0]);
    setHistoryLog('Reset to start.');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300">
              KADANE'S GREEDY RESET INVARIANT
            </div>
            <div className="text-xs text-slate-300">
              "Any running subarray prefix that sums to less than 0 cannot contribute positively to subsequent elements—reset running sum to 0 immediately."
            </div>
          </div>
        </div>

        {/* Meters */}
        <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 font-mono">CURRENT SUM</div>
            <div className={`text-base font-black font-mono transition-colors ${curSum < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {curSum}
            </div>
          </div>
          <div className="border-l border-slate-800 pl-3">
            <div className="text-[10px] text-amber-400 font-mono">RECORD MAX SUBARRAY</div>
            <div className="text-base font-black text-amber-300 font-mono">{maxSum}</div>
          </div>
        </div>
      </div>

      {/* Array Elements Visualizer */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col justify-center min-h-[180px]">
        {wasReset && (
          <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center z-20 pointer-events-none animate-pulse">
            <span className="px-4 py-2 rounded-xl bg-rose-600 text-white font-black text-sm uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-white" />
              <span>NEGATIVE BAGGAGE PURGED TO 0!</span>
            </span>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 flex-wrap">
          {nums.map((n, i) => {
            const isProcessed = i < currentIdx;
            const isCurrent = i === currentIdx;

            return (
              <div
                key={i}
                className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-300 relative ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-400 scale-110 shadow-sm text-amber-300 ring-2 ring-amber-400/50'
                    : isProcessed
                    ? n >= 0
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-3 text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 rounded-full">
                    Scanner
                  </span>
                )}
                <span className="text-sm font-bold">{n > 0 ? `+${n}` : n}</span>
                <span className="text-[10px] text-slate-500">[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={stepKadane}
            disabled={currentIdx >= nums.length}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-40"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            Step Kadane ({currentIdx}/{nums.length})
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 max-w-md p-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
          {historyLog}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. SLIDING WINDOW SUBSTRING SCANNER
// =========================================================================
const SlidingWindowSimulator: React.FC = () => {
  const [text] = useState<string>('pwwkew');
  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(0);
  const [seenSet, setSeenSet] = useState<Set<string>>(new Set());
  const [maxLen, setMaxLen] = useState<number>(0);
  const [alertMsg, setAlertMsg] = useState<string>('Expand Right to ingest characters into current window.');

  const stepWindow = () => {
    if (right >= text.length) return;
    const char = text[right];
    sound.playClick();

    if (seenSet.has(char)) {
      // Duplicate! Must shrink left
      const charLeft = text[left];
      const nextSet = new Set(seenSet);
      nextSet.delete(charLeft);
      setSeenSet(nextSet);
      setLeft(l => l + 1);
      setAlertMsg(`Duplicate '${char}' detected in window! Shrinking left pointer (evicting '${charLeft}').`);
    } else {
      // Valid! Expand right
      const nextSet = new Set(seenSet);
      nextSet.add(char);
      setSeenSet(nextSet);
      const curLen = right - left + 1;
      setMaxLen(m => Math.max(m, curLen));
      setRight(r => r + 1);
      setAlertMsg(`Valid character '${char}'! Expanded window size to ${curLen}.`);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setLeft(0);
    setRight(0);
    setSeenSet(new Set());
    setMaxLen(0);
    setAlertMsg('Reset scanner.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
            <Search className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-purple-300">
              SLIDING WINDOW INVARIANT
            </div>
            <div className="text-xs text-slate-300">
              "Expand Right to discover new terrain. The moment a duplicate violates the invariant, slide Left forward until the intruder is evicted!"
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 font-mono">CURRENT WINDOW LEN</div>
            <div className="text-base font-black text-cyan-300 font-mono">{Math.max(0, right - left)}</div>
          </div>
          <div className="border-l border-slate-800 pl-3">
            <div className="text-[10px] text-purple-400 font-mono">MAX UNIQUE LENGTH</div>
            <div className="text-base font-black text-purple-300 font-mono">{maxLen}</div>
          </div>
        </div>
      </div>

      {/* String Stream */}
      <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[140px] relative overflow-hidden">
        <div className="flex items-center gap-2 font-mono text-lg font-bold">
          {text.split('').map((char, idx) => {
            const inWindow = idx >= left && idx < right;
            const isLeft = idx === left;
            const isRight = idx === right;

            return (
              <div
                key={idx}
                className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 relative ${
                  inWindow
                    ? 'bg-purple-600 border-purple-400 text-white shadow-sm scale-105'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {isLeft && (
                  <span className="absolute -top-3.5 text-[10px] bg-indigo-500 text-white px-1.5 rounded font-bold">
                    L
                  </span>
                )}
                {isRight && (
                  <span className="absolute -bottom-3.5 text-[10px] bg-cyan-400 text-slate-950 px-1.5 rounded font-bold">
                    R
                  </span>
                )}
                <span>{char}</span>
                <span className="text-[9px] text-slate-500">{idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Hash Set View */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">HashSet Memory:</span>
        <div className="flex items-center gap-2">
          {Array.from(seenSet).length === 0 ? (
            <span className="text-xs text-slate-600 italic">Empty</span>
          ) : (
            Array.from(seenSet).map(c => (
              <span key={c} className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                '{c}'
              </span>
            ))
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={stepWindow}
            disabled={right >= text.length && seenSet.size === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
            Step Window
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 max-w-md p-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
          {alertMsg}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. FLOYD’S TORTOISE & HARE (CYCLE DETECTION SIMULATOR)
// =========================================================================
const TortoiseHareSimulator: React.FC = () => {
  // 6 nodes: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> loops back to 2
  const nodes = [0, 1, 2, 3, 4, 5];
  const nextNodeMap: Record<number, number> = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 2 };

  const [slow, setSlow] = useState<number>(0);
  const [fast, setFast] = useState<number>(0);
  const [stepCount, setStepCount] = useState<number>(0);
  const [hasCollided, setHasCollided] = useState<boolean>(false);

  const stepRace = () => {
    if (hasCollided) return;
    sound.playClick();
    const nextSlow = nextNodeMap[slow];
    const nextFast = nextNodeMap[nextNodeMap[fast]];

    setSlow(nextSlow);
    setFast(nextFast);
    setStepCount(s => s + 1);

    if (nextSlow === nextFast) {
      setHasCollided(true);
      sound.playLevelUp();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSlow(0);
    setFast(0);
    setStepCount(0);
    setHasCollided(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
            <GitBranch className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-300">
              FLOYD’S CYCLE DETECTION (TORTOISE & HARE)
            </div>
            <div className="text-xs text-slate-300">
              "Two runners on a closed loop with speed ratio 2:1 are mathematically GUARANTEED to collide in at most loop-length steps!"
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 font-mono">STEPS TAKEN</div>
            <div className="text-base font-black text-white font-mono">{stepCount}</div>
          </div>
          <div className="border-l border-slate-800 pl-3">
            <div className="text-[10px] text-indigo-400 font-mono">STATUS</div>
            <div className="text-xs font-bold text-amber-300 font-mono">
              {hasCollided ? (
                <span className="flex items-center gap-1 text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5 inline" />
                  <span>COLLISION AT NODE {slow}</span>
                </span>
              ) : (
                'Racing...'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Linked List Track */}
      <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[180px]">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {nodes.map((n) => {
            const isSlowHere = slow === n;
            const isFastHere = fast === n;
            const isLoopHead = n === 2;

            return (
              <div key={n} className="flex items-center gap-2">
                <div
                  className={`w-16 h-16 rounded-2xl border flex flex-col items-center justify-center font-mono relative transition-all duration-300 ${
                    hasCollided && slow === n
                      ? 'bg-rose-600 border-rose-400 text-white ring-4 ring-rose-500/50 scale-115'
                      : isLoopHead
                      ? 'bg-indigo-950/60 border-indigo-400 text-indigo-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  {isLoopHead && (
                    <span className="absolute -top-3 text-[9px] bg-indigo-500 text-white px-1.5 rounded font-bold">
                      Loop Entry
                    </span>
                  )}

                  {/* Runners */}
                  <div className="flex items-center gap-1 text-xs absolute -bottom-3">
                    {isSlowHere && <span className="px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-bold text-[9px] shadow-sm">Slow 1x</span>}
                    {isFastHere && <span className="px-1 py-0.2 rounded bg-cyan-400 text-slate-950 font-bold text-[9px] shadow-sm">Fast 2x</span>}
                  </div>

                  <span className="text-base font-bold">Node {n}</span>
                </div>

                {n < nodes.length - 1 && <span className="text-slate-500 font-bold text-sm">→</span>}
                {n === nodes.length - 1 && (
                  <span className="text-indigo-400 font-bold text-xs ml-1 flex items-center gap-1">
                    ↺ loops to Node 2
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={stepRace}
            disabled={hasCollided}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-40"
          >
            <Play className="w-4 h-4 fill-white" />
            Step Pointers (Slow 1x, Fast 2x)
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Reset Pointers"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-slate-400 italic">
          {hasCollided
            ? `Both pointers met at Node ${slow}! Cycle proven in O(N) time with O(1) memory.`
            : 'Slow pointer advances 1 node; Fast pointer advances 2 nodes per step.'}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 5. VALID PARENTHESES LIFO STACK SIMULATOR
// =========================================================================
const StackBracketsSimulator: React.FC = () => {
  const [stream, setStream] = useState<string>('{[()]}');
  const [stack, setStack] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isBroken, setIsBroken] = useState<boolean>(false);
  const [log, setLog] = useState<string>('Step through string to watch bracket matches.');

  const matchMap: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

  const stepStack = () => {
    if (currentIdx >= stream.length || isBroken) return;
    const char = stream[currentIdx];
    sound.playClick();

    if (char === '(' || char === '[' || char === '{') {
      setStack(s => [...s, char]);
      setLog(`Pushed opening brace '${char}' onto stack.`);
      setCurrentIdx(i => i + 1);
    } else {
      // Closing brace
      const expected = matchMap[char];
      if (stack.length > 0 && stack[stack.length - 1] === expected) {
        sound.playCorrect();
        setStack(s => s.slice(0, -1));
        setLog(`Matched '${expected}' with '${char}'! Popped from stack.`);
        setCurrentIdx(i => i + 1);
        if (currentIdx + 1 === stream.length && stack.length === 1) {
          sound.playLevelUp();
          confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        }
      } else {
        sound.playWrong();
        setIsBroken(true);
        setLog(`MISMATCH! Expected '${expected}' but got '${stack[stack.length - 1] || 'Empty'}'!`);
      }
    }
  };

  const handleReset = (str = '{[()]}') => {
    sound.playClick();
    setStream(str);
    setStack([]);
    setCurrentIdx(0);
    setIsBroken(false);
    setLog('Stack reset.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
            <Layers className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-300">
              LIFO STACK MATCHING INVARIANT
            </div>
            <div className="text-xs text-slate-300">
              "The most recently opened bracket must be the very first one to close. A stack perfectly enforces this chronological pairing."
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['{[()]}', '()[]{}', '([)]', '{[}'].map((preset) => (
            <button
              key={preset}
              onClick={() => handleReset(preset)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Stack Pipe and Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Stream input */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <div className="text-xs font-mono text-slate-400 mb-3">INPUT STREAM:</div>
          <div className="flex items-center justify-center gap-2 font-mono text-2xl font-bold">
            {stream.split('').map((c, i) => (
              <span
                key={i}
                className={`px-3 py-2 rounded-xl border transition-all ${
                  i === currentIdx
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 scale-110 shadow-sm'
                    : i < currentIdx
                    ? 'bg-slate-900 border-slate-800 text-slate-500'
                    : 'bg-slate-900 border-slate-800 text-slate-100'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Stack Cylinder Pipe */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-mono text-slate-400 mb-2">STACK (LIFO PIPE):</div>
          <div className="w-32 h-44 border-x-4 border-b-4 border-slate-700 rounded-b-2xl p-2 flex flex-col-reverse gap-1.5 bg-slate-900/60 overflow-hidden shadow-inner">
            {stack.map((item, idx) => (
              <div
                key={idx}
                className="w-full py-1.5 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm text-center shadow-sm animate-in slide-in-from-top-4 duration-200"
              >
                {item}
              </div>
            ))}
            {stack.length === 0 && (
              <div className="text-[11px] text-slate-600 text-center my-auto italic">
                Empty Pipe
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={stepStack}
            disabled={currentIdx >= stream.length || isBroken}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
            Step Character
          </button>

          <button
            onClick={() => handleReset(stream)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 max-w-md p-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
          {log}
        </div>
      </div>
    </div>
  );
};

export const FlowLab = VisualizerStudio;

