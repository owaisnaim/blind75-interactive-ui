import React from 'react';
import { Flame, Trophy, Volume2, VolumeX, Compass, RefreshCw, Sun, Moon, Timer } from 'lucide-react';
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
    <header className="relative border-b border-slate-800 bg-slate-950 sticky top-0 z-40 px-4 lg:px-8 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-3">
        {/* Brand & Platform Info */}
        <div className="flex items-center justify-between w-full xl:w-auto gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs border border-indigo-400/30 shrink-0 font-mono font-bold text-xs">
              &gt;_
            </div>
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white m-0 truncate">
                  LeetCode 75 Flow
                </h1>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-900 text-slate-400 border border-slate-800 shrink-0 hidden xs:inline">
                  NeetCode 75
                </span>
              </div>
              <p className="text-[11px] text-slate-400 m-0 truncate">Interactive DSA Pattern Visualizer & Sandbox</p>
            </div>
          </div>

          {/* Quick Utility icons for mobile/tablet */}
          <div className="flex items-center gap-1.5 xl:hidden shrink-0">
            <button
              onClick={onToggleTheme}
              className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
              title={theme === 'white' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'white' ? <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> : <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
            </button>
            <button
              onClick={onToggleSound}
              className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
              title="Toggle Sound FX"
            >
              {userState.soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
            </button>
            <button
              onClick={onResetProgress}
              className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 flex items-center justify-center cursor-pointer transition-colors shadow-xs"
              title="Reset Progress"
            >
              <RefreshCw className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>

        {/* Center: Level, Streak & Solved Telemetry Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
          {/* Level Badge */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-1.5 px-2.5 flex items-center gap-2 min-w-[150px] sm:min-w-[175px] shadow-inner shrink-0">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 font-mono">
              {levelInfo.level}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-300 truncate max-w-[80px] sm:max-w-[100px]">{levelInfo.title}</span>
                <span className="text-slate-400 text-[11px] shrink-0"><span className="font-mono">{userState.xp}</span> XP</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-amber-400 h-full rounded-full transition-colors duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 h-8 rounded-lg shrink-0" title="Consecutive day streak">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 shrink-0" />
            <span className="text-xs font-bold text-white"><span className="font-mono">{userState.streak}</span>d</span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Streak</span>
          </div>

          {/* Solved Progress Counter */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 h-8 rounded-lg shrink-0" title="Total Problems Solved">
            <Trophy className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold text-white"><span className="font-mono">{solvedCount}/{totalProblems}</span></span>
            <span className="text-[11px] font-semibold text-emerald-400">({solvedPct}%)</span>
          </div>
        </div>

        {/* Right: Quick Launch Tools & Desktop Utilities */}
        <div className="flex items-center justify-center xl:justify-end gap-1.5 shrink-0 flex-wrap">
          <button
            onClick={() => {
              sound.playClick();
              onOpenDecisionTree();
            }}
            className="h-8 flex items-center gap-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors cursor-pointer shrink-0"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Pattern Guide</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              handleOpenTimedMock();
            }}
            className="h-8 flex items-center gap-1.5 px-2.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors cursor-pointer shrink-0"
          >
            <Timer className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>Timed Mock</span>
          </button>

          {/* Desktop Utilities (Theme, Sound, Reset) */}
          <div className="hidden xl:flex items-center gap-1 shrink-0 ml-1">
            <button
              onClick={onToggleTheme}
              className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
              title={theme === 'white' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'white' ? <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> : <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
            </button>
            <button
              onClick={onToggleSound}
              className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
              title="Toggle Sound FX"
            >
              {userState.soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
            </button>
            <button
              onClick={onResetProgress}
              className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 flex items-center justify-center cursor-pointer transition-colors shadow-xs"
              title="Reset Progress"
            >
              <RefreshCw className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
