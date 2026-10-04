import React from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Code2, Eye, ExternalLink, Lightbulb, ArrowRight } from 'lucide-react';
import type { Problem } from '../data/problems';
import type { SimFrame } from '../utils/simulatorEngine';

interface ProblemVisualizerProps {
  frame: SimFrame | null;
  problem: Problem;
  javaCode: string;
  isPlaying: boolean;
  currentFrameIdx: number;
  totalFrames: number;
  playbackSpeed: number;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  onSeek: (idx: number) => void;
  onSetSpeed: (speedMs: number) => void;
}

export const ProblemVisualizer: React.FC<ProblemVisualizerProps> = ({
  frame,
  problem,
  javaCode,
  isPlaying,
  currentFrameIdx,
  totalFrames,
  playbackSpeed,
  onPlayPause,
  onStepForward,
  onStepBack,
  onReset,
  onSeek,
  onSetSpeed,
}) => {
  const javaLines = javaCode.split('\n');

  return (
    <div className="space-y-5 text-left">
      {/* 1. Mental Trigger / Invariant Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <div className="text-xs text-slate-200">
            <span className="font-bold text-amber-400 mr-1.5">Core Intuition:</span>
            <span className="italic">"{problem.hook}"</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/30"
          >
            <span>LeetCode</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
          <a
            href={problem.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/30"
          >
            <span>Video</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </div>

      {/* 2. Responsive Workbench Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left Column (Canvas Stage + Playback Bar) */}
        <div className="xl:col-span-7 2xl:col-span-8 flex flex-col space-y-4">
          {/* Visual Canvas Stage */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 min-h-[380px] lg:min-h-[460px] flex flex-col justify-center items-center shadow-inner relative overflow-hidden flex-1">
            {/* Step Indicator Header */}
        <div className="absolute top-3 left-4 text-xs font-mono text-cyan-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold">Step {frame ? frame.step : 0} of {frame ? frame.totalSteps : 0}:</span>
          <span className="text-slate-300">{frame?.action}</span>
        </div>

        {/* Dynamic Visualizer based on Visual Type */}
        {frame ? (
          <div className="w-full flex flex-col items-center justify-center my-auto py-5">
            {/* TYPE 1: Array & Pointers */}
            {frame.visualType === 'array-pointers' && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-2.5 flex-wrap">
                  {(frame.visualData.elements || []).map((val: any, idx: number) => {
                    const pointer = (frame.visualData.pointers || []).find((pt: any) => pt.index === idx);
                    const isHighlighted = (frame.visualData.highlightIndices || []).includes(idx);

                    return (
                      <div key={idx} className="flex flex-col items-center relative">
                        {pointer && (
                          <div className="absolute -top-7 animate-bounce px-2 py-0.5 rounded bg-indigo-500 text-white font-mono text-[10px] font-bold shadow-lg">
                            {pointer.name}
                          </div>
                        )}

                        <div
                          className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${
                            isHighlighted
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/50 scale-105 shadow-sm'
                              : pointer
                              ? 'bg-indigo-600 border-indigo-400 text-white scale-105 shadow-sm'
                              : 'bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="text-base">{val}</span>
                          <span className="text-[9px] text-slate-500 font-normal">[{idx}]</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Active HashMap or Metrics Panel */}
                {frame.visualData.activeMap && Object.keys(frame.visualData.activeMap).length > 0 && (
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-mono">
                    <span className="text-indigo-400 font-bold">HashMap:</span>
                    {Object.entries(frame.visualData.activeMap).map(([k, v]) => (
                      <span key={k} className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[11px]">
                        {k} → {String(v)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TYPE 2: Sliding Window */}
            {frame.visualType === 'sliding-window' && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-2 flex-wrap relative p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  {((frame.visualData.text ? frame.visualData.text.split('') : frame.visualData.elements) || []).map((val: any, idx: number) => {
                    const isInside = idx >= frame.visualData.left && idx <= frame.visualData.right;
                    const isLeft = idx === frame.visualData.left;
                    const isRight = idx === frame.visualData.right;

                    return (
                      <div key={idx} className="flex flex-col items-center relative">
                        {isLeft && (
                          <div className="absolute -top-7 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-mono text-[10px] font-bold shadow animate-bounce">
                            L
                          </div>
                        )}
                        {isRight && (
                          <div className="absolute -bottom-7 px-2 py-0.5 rounded bg-rose-500 text-white font-mono text-[10px] font-bold shadow animate-bounce">
                            R
                          </div>
                        )}

                        <div
                          className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${
                            isInside
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-2 ring-cyan-500/40 scale-105'
                              : 'bg-slate-900 border-slate-800/80 text-slate-500'
                          }`}
                        >
                          <span className="text-base">{val}</span>
                          <span className="text-[9px] opacity-60">[{idx}]</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {frame.visualData.set && (
                  <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Seen Set:</span>
                    <span className="text-cyan-400 font-bold">&#123; {frame.visualData.set.join(', ')} &#125;</span>
                  </div>
                )}
              </div>
            )}

            {/* TYPE 3: DP Grid */}
            {frame.visualType === 'dp-grid' && (
              <div className="flex flex-col items-center gap-3">
                {frame.visualData.label && (
                  <span className="text-xs font-mono text-purple-400 font-bold">{frame.visualData.label}</span>
                )}
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {(frame.visualData.dpTable || []).map((val: any, idx: number) => (
                    <div
                      key={idx}
                      className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${
                        idx === frame.visualData.activeIndex
                          ? 'bg-purple-600 border-purple-400 text-white ring-2 ring-purple-400 scale-110 shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="text-sm">{val === 8 ? '∞' : val}</span>
                      <span className="text-[9px] text-slate-500">dp[{idx}]</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TYPE 4: Linked List */}
            {frame.visualType === 'linked-list' && (
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {(frame.visualData.nodes || []).map((nodeVal: any, idx: number) => {
                  const isCurr = frame.visualData.curr === idx;
                  const isPrev = frame.visualData.prev === idx;
                  const isSlow = frame.visualData.slow === idx;
                  const isFast = frame.visualData.fast === idx;

                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold transition-all relative ${
                          isCurr || isSlow
                            ? 'bg-indigo-600 border-indigo-400 text-white scale-110 ring-2 ring-cyan-400'
                            : isPrev
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {isCurr && <span className="absolute -top-3 text-[9px] bg-cyan-400 text-slate-950 px-1 rounded font-bold">curr</span>}
                        {isPrev && <span className="absolute -bottom-3 text-[9px] bg-emerald-500 text-white px-1 rounded font-bold">prev</span>}
                        {isSlow && <span className="absolute -top-3 text-[9px] bg-indigo-500 text-white px-1 rounded font-bold">slow</span>}
                        {isFast && <span className="absolute -bottom-3 text-[9px] bg-rose-500 text-white px-1 rounded font-bold">fast</span>}
                        <span>{nodeVal}</span>
                      </div>
                      {idx < frame.visualData.nodes.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TYPE 5: Interval Sweep */}
            {frame.visualType === 'interval-sweep' && (
              <div className="w-full max-w-xl space-y-3">
                <div className="text-xs text-slate-400 font-mono">Interval Sweep Progress:</div>
                <div className="space-y-2">
                  {(frame.visualData.merged || []).map((inv: number[], i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400 w-16">[{inv[0]}, {inv[1]}]</span>
                      <div className="flex-1 bg-slate-900 h-6 rounded-lg overflow-hidden relative border border-slate-800">
                        <div
                          className="h-full bg-indigo-500 rounded transition-all duration-300"
                          style={{
                            marginLeft: `${(inv[0] / 20) * 100}%`,
                            width: `${Math.max(12, ((inv[1] - inv[0]) / 20) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TYPE 6: Binary Tree Visualizer */}
            {frame.visualType === 'tree-node' && (
              <div className="flex flex-col items-center gap-3">
                {frame.visualData.currentCall && (
                  <span className="text-xs font-mono text-cyan-400 font-bold bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                    Call: {frame.visualData.currentCall}
                  </span>
                )}
                <div className="flex flex-col items-center gap-4">
                  {/* Level 1: Root */}
                  <div className="flex justify-center">
                    {frame.visualData.nodes?.slice(0, 1).map((n: any, idx: number) => (
                      <div
                        key={idx}
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-bold text-base transition-all duration-300 ${
                          n.val === frame.visualData.activeNode
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-4 ring-cyan-400/40 scale-110 shadow-sm'
                            : n.state === 'done'
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {n.val}
                      </div>
                    ))}
                  </div>

                  {/* Level 2: Children */}
                  <div className="flex justify-center gap-10">
                    {frame.visualData.nodes?.slice(1, 3).map((n: any, idx: number) => (
                      <div
                        key={idx}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                          n.val === frame.visualData.activeNode
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-4 ring-cyan-400/40 scale-110 shadow-sm'
                            : n.state === 'done'
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {n.val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TYPE 7: Matrix & Grid Visualizer */}
            {frame.visualType === 'matrix-grid' && (
              <div className="flex flex-col items-center gap-3">
                {frame.visualData.label && (
                  <span className="text-xs font-mono text-cyan-400 font-bold">{frame.visualData.label}</span>
                )}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800">
                  {(frame.visualData.grid || []).map((row: any[], rIdx: number) =>
                    row.map((val: any, cIdx: number) => {
                      const isActive = frame.visualData.activeCell?.[0] === rIdx && frame.visualData.activeCell?.[1] === cIdx;
                      const isVisited = (frame.visualData.visitedCells || []).some(
                        (cell: number[]) => cell[0] === rIdx && cell[1] === cIdx
                      );

                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`w-12 h-12 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${
                            isActive
                              ? 'bg-cyan-500/30 border-cyan-400 text-white ring-2 ring-cyan-400 scale-110 shadow-lg'
                              : isVisited
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span>{val}</span>
                          <span className="text-[8px] opacity-50">({rIdx},{cIdx})</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* TYPE 8: Dual Heap Balancer */}
            {frame.visualType === 'heap-balance' && (
              <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                {frame.visualData.label && (
                  <span className="text-xs font-mono text-amber-400 font-bold">{frame.visualData.label}</span>
                )}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-center">
                    <span className="text-xs font-bold text-indigo-400 block mb-2 font-mono">Max-Heap (Lower 50%)</span>
                    <div className="flex items-center justify-center gap-1.5 flex-wrap min-h-[40px]">
                      {(frame.visualData.maxHeap || []).map((v: any, i: number) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold shadow">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-center">
                    <span className="text-xs font-bold text-purple-400 block mb-2 font-mono">Min-Heap (Upper 50%)</span>
                    <div className="flex items-center justify-center gap-1.5 flex-wrap min-h-[40px]">
                      {(frame.visualData.minHeap || []).map((v: any, i: number) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-mono text-xs font-bold shadow">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {frame.visualData.median !== undefined && (
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold shadow">
                    Current Median = {frame.visualData.median}
                  </div>
                )}
              </div>
            )}

            {/* TYPE 9: Stack Pipe */}
            {frame.visualType === 'stack-pipe' && (
              <div className="flex items-center justify-center gap-8">
                {/* Input Stream */}
                <div className="text-center">
                  <span className="text-xs font-mono text-slate-400 block mb-2">Input Characters</span>
                  <div className="flex items-center gap-1.5">
                    {(frame.visualData.stream || []).map((ch: string, idx: number) => (
                      <div
                        key={idx}
                        className={`w-9 h-10 rounded-lg border flex items-center justify-center font-mono font-bold ${
                          idx === frame.visualData.streamIndex
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40'
                            : idx < frame.visualData.streamIndex
                            ? 'bg-slate-900 border-slate-800 text-slate-600'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        {ch}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack Container */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-mono text-indigo-400 font-bold block mb-1">Stack (LIFO)</span>
                  <div className="w-20 min-h-[100px] border-b-4 border-l-4 border-r-4 border-indigo-500 rounded-b-2xl bg-slate-900/60 p-2 flex flex-col-reverse items-center gap-1.5 shadow-inner">
                    {(frame.visualData.stack || []).map((item: string, idx: number) => (
                      <div
                        key={idx}
                        className="w-full py-1.5 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold text-center shadow"
                      >
                        {item}
                      </div>
                    ))}
                    {(!frame.visualData.stack || frame.visualData.stack.length === 0) && (
                      <span className="text-[10px] text-slate-600 font-mono italic my-auto">Empty</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-xs text-slate-500 font-mono">Loading simulation frames...</div>
        )}
      </div>

      {/* 3. Playback Controls Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center shrink-0">
          <button
            onClick={onStepBack}
            disabled={currentFrameIdx === 0}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-30 cursor-pointer transition-all shrink-0"
            title="Step Backward"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
          </button>

          <button
            onClick={onPlayPause}
            disabled={currentFrameIdx >= totalFrames - 1}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0 ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 shrink-0" /> : <Play className="w-4 h-4 shrink-0 fill-slate-950" />}
            {isPlaying ? 'Pause' : 'Auto-Play Flow'}
          </button>

          <button
            onClick={onStepForward}
            disabled={currentFrameIdx >= totalFrames - 1}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-30 cursor-pointer transition-all shrink-0"
            title="Step Forward"
          >
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer transition-all shrink-0"
            title="Reset Flow"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* Timeline Slider */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-sm">
          <span className="text-[11px] font-mono text-slate-400 shrink-0">
            Step {currentFrameIdx + 1} / {totalFrames}
          </span>
          <input
            type="range"
            min="0"
            max={totalFrames > 0 ? totalFrames - 1 : 0}
            value={currentFrameIdx}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Playback speed selector */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <span>Speed:</span>
          {[
            { label: '0.5x', ms: 1500 },
            { label: '1x', ms: 1000 },
            { label: '2x', ms: 500 },
          ].map(sp => (
            <button
              key={sp.label}
              onClick={() => onSetSpeed(sp.ms)}
              className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                playbackSpeed === sp.ms
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Right Column: Java Code Execution Sync + Variable Watch */}
    <div className="xl:col-span-5 2xl:col-span-4 flex flex-col space-y-4">
      {/* Java Code Line Tracer */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col shadow-lg flex-1 min-h-[260px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Code2 className="w-4 h-4 shrink-0 text-cyan-400" />
              Java Execution Sync
            </span>
            <span className="text-[11px] font-mono text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 shrink-0">
              Line {frame?.javaLine || 1}
            </span>
          </div>

          <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto max-h-56 custom-scroll">
            {javaLines.map((line, lIdx) => {
              const lineNum = lIdx + 1;
              const isCurrentLine = frame && frame.javaLine === lineNum;
              return (
                <div
                  key={lIdx}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    isCurrentLine
                      ? 'bg-amber-400/20 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-slate-600 inline-block w-6 select-none">{lineNum}</span>
                  <span>{line}</span>
                </div>
              );
            })}
          </pre>
        </div>

        {/* Variable Watch Window & Reasoning */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-mono">
              <Eye className="w-4 h-4 shrink-0 text-indigo-400" />
              Live Variables Watch
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {frame && Object.entries(frame.variables).map(([k, v]) => (
                <div key={k} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs">
                  <span className="text-slate-500 block text-[10px] mb-0.5">{k}</span>
                  <span className="text-cyan-300 font-bold truncate block">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Invariant Explanation Callout */}
          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-slate-200">
            <span className="font-bold text-cyan-400 flex items-center gap-1.5 mb-1">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Step Invariant:</span>
            </span>
            {frame?.explanation}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
