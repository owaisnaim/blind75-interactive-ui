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
      className={`group relative text-left rounded-xl border p-3 transition-colors flex flex-col justify-between cursor-pointer ${
        isSelected
          ? 'bg-slate-800/90 border-amber-400/80 ring-1 ring-amber-400/40 shadow-xs'
          : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/90'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className={`p-1.5 rounded-lg ${config.color} text-white shadow-xs shrink-0`}>
          <IconComponent className="w-4 h-4 shrink-0" />
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs font-semibold text-white font-mono">{solved}/{total}</div>
          <div className="text-[10px] text-slate-400 font-medium">{pct}%</div>
        </div>
      </div>

      <div>
        <div className="text-[11px] font-medium text-slate-400 truncate">{category}</div>
        <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
          {config.realm}
        </div>
        <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-2 border border-slate-800/80">
          <div
            className={`h-full rounded-full ${config.color}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </button>
  );
};

export const RealmCard = TopicCard;
