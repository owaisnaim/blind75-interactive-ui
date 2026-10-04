import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Timer, CheckCircle2, Trophy, ArrowRight, Check } from 'lucide-react';
import type { Problem } from '../data/problems';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface TimedMockModalProps {
  selectedProblem: Problem | null;
  allProblems: Problem[];
  onProblemSolved: (id: string) => void;
  onAddXp: (amount: number) => void;
  onClose: () => void;
}

export type BossRaidModalProps = TimedMockModalProps;

export const TimedMockModal: React.FC<TimedMockModalProps> = ({
  selectedProblem,
  allProblems,
  onProblemSolved,
  onAddXp,
  onClose,
}) => {
  const [problem] = useState<Problem>(
    selectedProblem || allProblems[Math.floor(Math.random() * allProblems.length)]
  );

  const [totalSeconds, setTotalSeconds] = useState(20 * 60); // 20 minutes default
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [isVictory, setIsVictory] = useState(false);

  const STAGES = [
    { title: 'Clarify & Constraints', desc: 'Read problem, identify constraints, write 2 input/output test cases.' },
    { title: 'Invariant & State', desc: 'Select pattern (Two Pointers, DP, Stack), define pointers or state transitions.' },
    { title: 'Core Implementation', desc: 'Implement solution cleanly adhering to time/space constraints.' },
    { title: 'Edge Cases & Complexity', desc: 'Trace through edge cases (empty, single element, duplicates, bounds) and confirm O(T) / O(S).' }
  ];

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    sound.playClick();
    setIsActive(!isActive);
  };

  const resetTimer = (mins: number) => {
    sound.playClick();
    setIsActive(false);
    setTotalSeconds(mins * 60);
    setTimeLeft(mins * 60);
    setCurrentStage(0);
    setIsVictory(false);
  };

  const handleStageStrike = (idx: number) => {
    if (idx !== currentStage || isVictory) return;
    sound.playClick();
    const newStage = idx + 1;
    setCurrentStage(newStage);

    if (newStage >= STAGES.length) {
      setIsVictory(true);
      setIsActive(false);
      sound.playLevelUp();
      onProblemSolved(problem.id);
      onAddXp(problem.xp + 100); // Completion bonus
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPct = Math.round((currentStage / STAGES.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200 text-left">
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center shadow-sm">
              <Timer className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white m-0">TIMED MOCK SESSION: TECHNICAL PRACTICE</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-indigo-500/30">
                  {problem.difficulty} Difficulty
                </span>
              </div>
              <p className="text-xs text-slate-400 m-0">Solve under timed technical interview conditions without hints or distractions</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Target Problem Info */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono text-cyan-400">Target Problem #{problem.number}</div>
              <h2 className="text-lg font-black text-white">{problem.title}</h2>
              <div className="text-xs text-slate-400 italic mt-0.5">"{problem.hook}"</div>
            </div>

            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-slate-700 whitespace-nowrap"
            >
              Open on LeetCode
            </a>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                SESSION PROGRESS: {progressPct}%
              </span>
              <span className="text-slate-400 font-mono">
                {isVictory ? 'COMPLETED' : `Stage ${currentStage} of ${STAGES.length}`}
              </span>
            </div>
            <div className="w-full bg-slate-950 border border-slate-800 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full rounded-full transition-all duration-500 bg-indigo-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Countdown Clock & Controls */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border border-slate-800/80">
            <div className="text-5xl font-black font-mono tracking-wider text-white mb-4 drop-shadow">
              {formatTime(timeLeft)}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTimer}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {isActive ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause Timer
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    Start Timer
                  </>
                )}
              </button>

              <button
                onClick={() => resetTimer(20)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Reset to 20 mins"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 ml-2">
                {[15, 20, 25].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => resetTimer(mins)}
                    className={`px-2 py-1 rounded text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                      totalSeconds === mins * 60 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Stage Interview Workflow */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              Interview Workflow (Phased Execution)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STAGES.map((stg, idx) => {
                const isCompleted = idx < currentStage;
                const isCurrent = idx === currentStage;

                return (
                  <button
                    key={idx}
                    onClick={() => handleStageStrike(idx)}
                    disabled={!isCurrent || isVictory}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 opacity-90'
                        : isCurrent
                        ? 'bg-indigo-950/30 border-indigo-500/60 text-white shadow-sm hover:scale-[1.02] cursor-pointer'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold flex items-center gap-1.5">
                        {isCompleted && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        Stage {idx + 1}: {stg.title}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">25%</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {stg.desc}
                    </p>
                    {isCurrent && !isVictory && (
                      <div className="mt-2 text-[11px] font-bold text-indigo-400 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" />
                        Click to Mark Stage Complete
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Victory Splash */}
          {isVictory && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center animate-in zoom-in duration-300">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-lg mb-1">
                <Trophy className="w-5 h-5 text-amber-400" />
                PROBLEM SOLVED! SESSION COMPLETE!
              </div>
              <p className="text-xs text-emerald-200">
                You solved {problem.title} under timed interview conditions and earned +{problem.xp + 100} XP!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const BossRaidModal = TimedMockModal;
