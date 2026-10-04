import React from 'react';
import { Layers, Cpu, Sparkles, Network, Clock, GitCommit, Grid, Terminal, GitBranch, ShieldAlert } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/problems';
import { sound } from '../utils/audio';

interface TopicCardProps {
  category: keyof typeof CATEGORIES_CONFIG;
  total: number;
  solved: number;
  isSelected: boolean;
  onSelect: (category: string | null) => void;
}

export type RealmCardProps = TopicCardProps;

const ICON_MAP = {
  Layers: Layers,
  Cpu: Cpu,
  Sparkles: Sparkles,
  Network: Network,
  Clock: Clock,
  GitCommit: GitCommit,
  Grid: Grid,
  Terminal: Terminal,
  GitBranch: GitBranch,
  ShieldAlert: ShieldAlert,
};

export const TopicCard: React.FC<TopicCardProps> = ({
  category,
  total,
  solved,
  isSelected,
  onSelect,
}) => {
  const config = CATEGORIES_CONFIG[category];
  const IconComponent = ICON_MAP[config.icon as keyof typeof ICON_MAP] || Sparkles;
  const pct = Math.round((solved / total) * 100);

  const handleClick = () => {
    sound.playClick();
    onSelect(isSelected ? null : category);
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative text-left rounded-2xl border p-3 sm:p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
        isSelected
          ? 'bg-slate-800/90 border-amber-400 ring-2 ring-amber-400/30 shadow-sm scale-[1.02]'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className={`p-2 sm:p-2.5 rounded-xl ${config.color} text-white shadow-sm shrink-0`}>
          <IconComponent className="w-5 h-5 shrink-0" />
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs font-bold text-white font-mono">{solved}/{total}</div>
          <div className="text-[10px] text-slate-400 font-semibold">{pct}%</div>
        </div>
      </div>

      <div>
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{category}</div>
        <div className="text-sm font-black text-white group-hover:text-amber-300 transition-colors truncate">
          {config.realm}
        </div>
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-2.5 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${config.color}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </button>
  );
};

export const RealmCard = TopicCard;
