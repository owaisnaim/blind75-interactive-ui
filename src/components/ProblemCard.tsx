import React from 'react';
import { CheckCircle2, Crown, Bookmark, ExternalLink, Play, Lightbulb, ArrowRight, Zap, Code2, Timer } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/problems';
import type { Problem } from '../data/problems';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface ProblemCardProps {
  problem: Problem;
  isSolved: boolean;
  isMastered: boolean;
  isReview: boolean;
  onToggleSolved: (id: string) => void;
  onToggleMastered: (id: string) => void;
  onToggleReview: (id: string) => void;
  onInspectFlow: (problem: Problem) => void;
  onStartTimedMock?: (problem: Problem) => void;
  onStartRaid?: (problem: Problem) => void;
  onOpenVisualizer?: (problem: Problem) => void;
  onOpenFlowLab?: (problem: Problem) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  isSolved,
  isMastered,
  isReview,
  onToggleSolved,
  onToggleMastered,
  onToggleReview,
  onInspectFlow,
  onStartTimedMock,
  onStartRaid,
  onOpenVisualizer,
  onOpenFlowLab,
}) => {
  const handleStartTimedMock = onStartTimedMock || onStartRaid || (() => {});
  const handleOpenVisualizer = onOpenVisualizer || onOpenFlowLab || (() => {});
  const categoryConfig = CATEGORIES_CONFIG[problem.category];

  const handleSolveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSolved) {
      sound.playSolve();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899']
      });
    } else {
      sound.playClick();
    }
    onToggleSolved(problem.id);
  };

  const handleMasterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playLevelUp();
    if (!isMastered) {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#fbbf24', '#f59e0b', '#d97706']
      });
    }
    onToggleMastered(problem.id);
  };

  const getDifficultyBadge = () => {
    switch (problem.difficulty) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div
      onClick={() => onInspectFlow(problem)}
      className={`group relative rounded-2xl border transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer ${
        isSolved
          ? 'bg-slate-900/40 border-emerald-500/30 shadow-sm'
          : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700 hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              #{problem.number}
            </span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getDifficultyBadge()}`}>
              {problem.difficulty}
            </span>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${categoryConfig.badgeBg}`}>
              {problem.category}
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleSolveClick}
              title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved (+XP)'}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isSolved
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleMasterClick}
              title={isMastered ? 'Mastered!' : 'Mark as Mastered (Deep Flow)'}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isMastered
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-sm'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-amber-300 hover:border-amber-500/50'
              }`}
            >
              <Crown className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onToggleReview(problem.id);
              }}
              title={isReview ? 'Marked for Review' : 'Save for Review'}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isReview
                  ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-purple-300 hover:border-purple-500/50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Problem Title */}
        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2.5 flex items-center justify-between">
          <span>{problem.title}</span>
          <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 flex items-center gap-1">
            +{problem.xp} XP
          </span>
        </h3>

        {/* Algorithmic Pattern Tag */}
        <div className="flex items-center gap-1.5 mb-3">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-medium text-cyan-300/90">{problem.pattern}</span>
        </div>

        {/* Core Intuition Box */}
        <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3 mb-4 group-hover:border-slate-700/80 transition-colors">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{problem.hook}"
            </p>
          </div>
        </div>
      </div>

      {/* Footer Details & Action Bar */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
            title="Open problem on LeetCode"
          >
            <ExternalLink className="w-3 h-3 text-amber-400" />
            <span>LeetCode</span>
          </a>

          <a
            href={problem.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-medium border border-rose-500/20 transition-all"
            title="Watch NeetCode Video Explanation"
          >
            <Play className="w-3 h-3 text-rose-400 fill-rose-400" />
            <span>Solution</span>
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStartTimedMock(problem);
            }}
            className="p-1 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-indigo-400 transition-all cursor-pointer"
            title="Start Timed Practice Session on this problem"
          >
            <Timer className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenVisualizer(problem);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-all cursor-pointer shadow-sm"
            title="Launch Visual Step-by-Step Visualizer for this problem"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Visualize</span>
          </button>

          <button
            onClick={() => onInspectFlow(problem)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            title="Open in-app LeetCode Code Editor and Test Runner"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Solve</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
