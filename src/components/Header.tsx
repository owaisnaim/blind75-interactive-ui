import React from 'react';
import { Flame, Trophy, Volume2, VolumeX, Compass, Sparkles, RefreshCw, Sun, Moon, Code2, Timer } from 'lucide-react';
import { calculateLevel } from '../utils/storage';
import type { UserState } from '../utils/storage';
import { sound } from '../utils/audio';

interface HeaderProps {
  userState: UserState;
  totalProblems: number;
  theme: 'black' | 'white';
  onToggleTheme: () => void;
  onToggleSound: () => void;
  onOpenQuiz: () => void;
  onOpenDecisionTree: () => void;
  onOpenTimedMock?: () => void;
  onOpenBossRaid?: () => void;
  onResetProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userState,
  totalProblems,
  theme,
  onToggleTheme,
  onToggleSound,
  onOpenQuiz,
  onOpenDecisionTree,
  onOpenTimedMock,
  onOpenBossRaid,
  onResetProgress,
}) => {
  const handleOpenTimedMock = onOpenTimedMock || onOpenBossRaid || (() => {});
  const levelInfo = calculateLevel(userState.xp);
  const solvedCount = userState.solved.length;
  const solvedPct = Math.round((solvedCount / totalProblems) * 100);

  return (
    <header className="relative border-b border-slate-800 bg-slate-950 sticky top-0 z-40 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-3 xl:gap-4">
        {/* Row 1 on mobile/tablet: Logo and Brand + Mobile Utilities */}
        <div className="flex items-center justify-between w-full xl:w-auto gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm border border-indigo-500/40 shrink-0">
              <Code2 className="w-5 h-5 text-white shrink-0" />
            </div>
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-white m-0 truncate">LeetCode 75 Flow</h1>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 hidden xs:inline">
                  NeetCode 75 Edition
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 m-0 truncate">Interactive DSA Pattern Visualizer & Code Sandbox</p>
            </div>
          </div>

          {/* Quick Utility icons for mobile/tablet */}
          <div className="flex items-center gap-1.5 xl:hidden shrink-0">
            <button
              onClick={onToggleTheme}
              className="h-9 w-9 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              title={theme === 'white' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'white' ? <Moon className="w-4 h-4 text-indigo-400 shrink-0" /> : <Sun className="w-4 h-4 text-amber-400 shrink-0" />}
            </button>
            <button
              onClick={onToggleSound}
              className="h-9 w-9 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              title="Toggle Sound FX"
            >
              {userState.soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400 shrink-0" /> : <VolumeX className="w-4 h-4 text-slate-500 shrink-0" />}
            </button>
            <button
              onClick={onResetProgress}
              className="h-9 w-9 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-500 hover:text-rose-400 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              title="Reset Progress"
            >
              <RefreshCw className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Center: Fixed Level, Streak & Solved Stats Bar (NO SLIDE, NO SCROLL) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 shrink-0 flex-wrap">
          {/* Level Badge */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2 px-3 flex items-center gap-2.5 min-w-[150px] sm:min-w-[185px] shadow-inner shrink-0">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-sm shadow-sm shrink-0">
              {levelInfo.level}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-300 truncate max-w-[80px] sm:max-w-[105px]">{levelInfo.title}</span>
                <span className="text-slate-400 font-mono text-[11px] shrink-0">{userState.xp} XP</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 h-9 rounded-xl shrink-0" title="Consecutive day streak">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse shrink-0" />
            <span className="text-sm font-bold text-white">{userState.streak}d</span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Streak</span>
          </div>

          {/* Solved Progress Counter */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 h-9 rounded-xl shrink-0" title="Total Problems Solved">
            <Trophy className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-sm font-bold text-white">{solvedCount}</span>
            <span className="text-xs text-slate-500">/{totalProblems}</span>
            <span className="text-xs font-semibold text-emerald-400 ml-0.5">({solvedPct}%)</span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline ml-0.5">Solved</span>
          </div>
        </div>

        {/* Right: Action Buttons & Desktop Utilities */}
        <div className="flex items-center justify-center xl:justify-end gap-2 shrink-0 flex-wrap">
          <button
            onClick={() => {
              sound.playClick();
              onOpenQuiz();
            }}
            className="h-9 flex items-center gap-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm border border-indigo-500/30 transition-all hover:brightness-110 active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Pattern Quiz</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenDecisionTree();
            }}
            className="h-9 flex items-center gap-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all hover:brightness-110 active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
          >
            <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Pattern Guide</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              handleOpenTimedMock();
            }}
            className="h-9 flex items-center gap-1.5 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-all hover:brightness-110 active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
          >
            <Timer className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Timed Mock</span>
          </button>

          {/* Desktop Utilities (Theme, Sound, Reset) */}
          <div className="hidden xl:flex items-center gap-1.5 shrink-0 ml-1">
            <button
              onClick={onToggleTheme}
              className="h-9 w-9 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              title={theme === 'white' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'white' ? <Moon className="w-4 h-4 text-indigo-400 shrink-0" /> : <Sun className="w-4 h-4 text-amber-400 shrink-0" />}
            </button>
            <button
              onClick={onToggleSound}
              className="h-9 w-9 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              title="Toggle Sound FX"
            >
              {userState.soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400 shrink-0" /> : <VolumeX className="w-4 h-4 text-slate-500 shrink-0" />}
            </button>
            <button
              onClick={onResetProgress}
              className="h-9 w-9 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-500 hover:text-rose-400 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              title="Reset Progress"
            >
              <RefreshCw className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
