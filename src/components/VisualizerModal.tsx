import React, { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import type { Problem } from '../data/problems';
import { JAVA_SOLUTIONS } from '../data/javaSolutions';
import { generateSimulationForProblem } from '../utils/simulatorEngine';
import { ProblemVisualizer } from './ProblemVisualizer';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export interface VisualizerModalProps {
  problem: Problem;
  allProblems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  onClose: () => void;
}

export type InteractiveFlowLabModalProps = VisualizerModalProps;

export const VisualizerModal: React.FC<VisualizerModalProps> = ({
  problem,
  allProblems,
  onSelectProblem,
  onClose,
}) => {
  // Synchronous frame generation guarantees no empty frame glitch
  const frames = useMemo(() => generateSimulationForProblem(problem), [problem]);
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms per step

  // Reset index whenever problem changes
  useEffect(() => {
    setCurrentFrameIdx(0);
    setIsPlaying(false);
  }, [problem.id]);

  // Auto-play timer
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

  const handleStepForward = () => {
    if (currentFrameIdx < frames.length - 1) {
      sound.playClick();
      setCurrentFrameIdx(i => i + 1);
    }
  };

  const handleStepBack = () => {
    if (currentFrameIdx > 0) {
      sound.playClick();
      setCurrentFrameIdx(i => i - 1);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setIsPlaying(false);
    setCurrentFrameIdx(0);
  };

  const handleSeek = (idx: number) => {
    sound.playClick();
    setCurrentFrameIdx(idx);
  };

  const currentFrame = frames[currentFrameIdx] || frames[0] || null;
  const javaCode = JAVA_SOLUTIONS[problem.id] || problem.starterCode || '// Java solution in progress';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 bg-slate-950 animate-in fade-in duration-200 text-left">
      <div
        className="bg-slate-950 w-screen h-screen max-w-none max-h-none rounded-none border-none flex flex-col shadow-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-3 sm:px-4 py-2 border-b border-slate-800 bg-slate-900 flex items-center justify-between gap-3 shrink-0 flex-wrap min-h-[44px]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                #{problem.number}
              </span>
              <h2 className="text-base font-bold text-white m-0 truncate max-w-[150px] sm:max-w-[280px] md:max-w-none">
                {problem.title}
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 hidden sm:inline">
                {problem.pattern}
              </span>
            </div>
            <span className="text-xs text-slate-400 hidden lg:inline">• Interactive Step-by-Step Flow Simulator</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Switcher dropdown to any of the 75 questions */}
            <select
              value={problem.id}
              onChange={(e) => {
                const found = allProblems.find(p => p.id === e.target.value);
                if (found) {
                  sound.playClick();
                  onSelectProblem(found);
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer max-w-[150px] sm:max-w-[240px] truncate"
            >
              {allProblems.map(p => (
                <option key={p.id} value={p.id}>
                  #{p.number} {p.title} ({p.category})
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Close Visualizer"
            >
              <X className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-6 overflow-y-auto flex-1 custom-scroll bg-slate-950">
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
            onStepForward={handleStepForward}
            onStepBack={handleStepBack}
            onReset={handleReset}
            onSeek={handleSeek}
            onSetSpeed={(speed) => setPlaybackSpeed(speed)}
          />
        </div>
      </div>
    </div>
  );
};

export const InteractiveFlowLabModal = VisualizerModal;

