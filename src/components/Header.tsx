import React from 'react';
import { Flame, Trophy, Volume2, VolumeX, Compass, Sparkles, RefreshCw, Crown, Sun, Moon, Code2, Timer } from 'lucide-react';
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
  onOpenBossRaid: () => void;
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
  onOpenBossRaid,
  onResetProgress,
}) => {
  const levelInfo = calculateLevel(userState.xp);
  const solvedCount = userState.solved.length;
  const masteredCount = userState.mastered.length;
  const solvedPct = Math.round((solvedCount / totalProblems) * 100);

  return (
    <header className="relative border-b border-slate-800 bg-slate-950 sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm border border-indigo-500/40">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-white m-0">LeetCode 75 Flow</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  NeetCode 75 Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 m-0">Interactive DSA Pattern Visualizer & Code Sandbox</p>
            </div>
          </div>

          {/* Quick Utility icons for mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-white cursor-pointer"
              title={theme === 'white' ? 'Switch to Black Theme' : 'Switch to White Theme'}
            >
              {theme === 'white' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={onToggleSound}
              className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-white cursor-pointer"
              title="Toggle Sound FX"
            >
              {userState.soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Level, XP and Stats Bar */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center">
          {/* Level Badge */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2 px-3 flex items-center gap-3 min-w-[210px] shadow-inner">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-sm shadow-sm">
              {levelInfo.level}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-300 truncate max-w-[110px]">{levelInfo.title}</span>
                <span className="text-slate-400 font-mono text-[11px]">{userState.xp} XP</span>
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
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-2 rounded-xl" title="Consecutive day streak">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="text-sm font-bold text-white">{userState.streak}d</span>
          </div>

          {/* Solved Progress Counter */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-2 rounded-xl" title="Total Problems Solved">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-white">{solvedCount}</span>
            <span className="text-xs text-slate-500">/{totalProblems}</span>
            <span className="text-xs font-semibold text-emerald-400 ml-1">({solvedPct}%)</span>
          </div>

          {/* Mastered Counter */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-2 rounded-xl" title="Mastered Problems">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-amber-300">{masteredCount}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => {
              sound.playClick();
              onOpenQuiz();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm border border-indigo-500/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Pattern Quiz
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenDecisionTree();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Pattern Guide
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenBossRaid();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <Timer className="w-3.5 h-3.5 text-rose-400" />
            Timed Mock
          </button>

          <button
            onClick={onToggleTheme}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer font-semibold text-xs shadow-sm hover:scale-105 active:scale-95"
            title={theme === 'white' ? 'Switch to Black Theme (Dark Mode)' : 'Switch to White Theme (Light Mode)'}
          >
            {theme === 'white' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                <span>Black Theme</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>White Theme</span>
              </>
            )}
          </button>

          <button
            onClick={onToggleSound}
            className="hidden md:flex p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Toggle Sound Effects"
          >
            {userState.soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={onResetProgress}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-500 hover:text-rose-400 transition-all cursor-pointer"
            title="Reset Progress"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
