import { useState, useEffect, useMemo } from 'react';
import { Search, Shuffle, Bookmark, CheckCircle2, Circle, Sparkles, Filter, Play, ShieldAlert, Code2, X } from 'lucide-react';
import { Header } from './components/Header';
import { ProblemCard } from './components/ProblemCard';
import { ProblemModal } from './components/ProblemModal';
import { TimedMockModal } from './components/TimedMockModal';
import { PatternQuiz } from './components/PatternQuiz';
import { DecisionTreeModal } from './components/DecisionTreeModal';
import { TopicCard } from './components/TopicCard';
import { PROBLEMS_DATA, CATEGORIES_CONFIG } from './data/problems';
import type { Problem } from './data/problems';
import { VisualizerStudio } from './components/VisualizerStudio';
import { CodeDebugger } from './components/CodeDebugger';
import { VisualizerModal } from './components/VisualizerModal';
import { loadUserState, saveUserState, INITIAL_STATE } from './utils/storage';
import type { UserState } from './utils/storage';
import { sound } from './utils/audio';

export function App() {
  const [userState, setUserState] = useState<UserState>(() => loadUserState());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'unsolved' | 'solved' | 'review'>('all');
  const [mainTab, setMainTab] = useState<'visualizer' | 'problems' | 'debugger'>('visualizer');

  // Modals state
  const [activeModalProblem, setActiveModalProblem] = useState<Problem | null>(null);
  const [timedMockProblem, setTimedMockProblem] = useState<Problem | null>(null);
  const [visualizerProblem, setVisualizerProblem] = useState<Problem | null>(null);
  const [isTimedMockOpen, setIsTimedMockOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDecisionTreeOpen, setIsDecisionTreeOpen] = useState(false);

  // Sync sound setting
  useEffect(() => {
    sound.enabled = userState.soundEnabled;
  }, [userState.soundEnabled]);

  // Sync theme setting to document
  useEffect(() => {
    const root = document.documentElement;
    const isLight = userState.theme === 'white';
    if (isLight) {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
      root.setAttribute('data-theme', 'dark');
    }
  }, [userState.theme]);

  // Save state on change
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  // Toggle Theme (White / Black)
  const handleToggleTheme = () => {
    setUserState(prev => {
      const nextTheme = prev.theme === 'white' ? 'black' : 'white';
      sound.playClick();
      return { ...prev, theme: nextTheme };
    });
  };

  // Toggle Sound FX
  const handleToggleSound = () => {
    setUserState(prev => {
      const nextVal = !prev.soundEnabled;
      sound.enabled = nextVal;
      if (nextVal) sound.playClick();
      return { ...prev, soundEnabled: nextVal };
    });
  };

  // Toggle Solved
  const handleToggleSolved = (id: string) => {
    setUserState(prev => {
      const isAlready = prev.solved.includes(id);
      const prob = PROBLEMS_DATA.find(p => p.id === id);
      const xpDelta = prob ? prob.xp : 50;

      return {
        ...prev,
        solved: isAlready ? prev.solved.filter(x => x !== id) : [...prev.solved, id],
        xp: isAlready ? Math.max(0, prev.xp - xpDelta) : prev.xp + xpDelta
      };
    });
  };

  // Toggle Review
  const handleToggleReview = (id: string) => {
    setUserState(prev => {
      const isAlready = prev.reviewLater.includes(id);
      return {
        ...prev,
        reviewLater: isAlready ? prev.reviewLater.filter(x => x !== id) : [...prev.reviewLater, id]
      };
    });
  };

  // Save notes
  const handleSaveNotes = (id: string, notes: string) => {
    setUserState(prev => ({
      ...prev,
      userNotes: { ...prev.userNotes, [id]: notes }
    }));
  };

  // Add XP
  const handleAddXp = (amount: number) => {
    setUserState(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    if (window.confirm('Reset all progress, XP, and notes? This cannot be undone.')) {
      sound.playClick();
      setUserState(INITIAL_STATE);
    }
  };

  // Start Timed Mock on specific problem
  const handleStartTimedMock = (problem: Problem) => {
    setTimedMockProblem(problem);
    setIsTimedMockOpen(true);
    setActiveModalProblem(null);
  };

  // Pick random unsolved problem
  const handleRandomUnsolved = () => {
    sound.playClick();
    const unsolved = PROBLEMS_DATA.filter(p => !userState.solved.includes(p.id));
    const pool = unsolved.length > 0 ? unsolved : PROBLEMS_DATA;
    const randomPick = pool[Math.floor(Math.random() * pool.length)];
    setActiveModalProblem(randomPick);
  };

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return PROBLEMS_DATA.filter(p => {
      // Category filter
      if (selectedCategory && p.category !== selectedCategory) return false;

      // Difficulty filter
      if (selectedDifficulty && p.difficulty !== selectedDifficulty) return false;

      // Status filter
      if (selectedStatus === 'solved' && !userState.solved.includes(p.id)) return false;
      if (selectedStatus === 'unsolved' && userState.solved.includes(p.id)) return false;
      if (selectedStatus === 'review' && !userState.reviewLater.includes(p.id)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesPattern = p.pattern.toLowerCase().includes(q);
        const matchesHook = p.hook.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        return matchesTitle || matchesPattern || matchesHook || matchesCategory;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedStatus, userState]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        userState.theme === 'white'
          ? 'bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white'
          : 'bg-black text-slate-100 selection:bg-rose-500 selection:text-white'
      }`}
    >
      {/* Header Bar */}
      <Header
        userState={userState}
        totalProblems={PROBLEMS_DATA.length}
        theme={userState.theme || 'black'}
        onToggleTheme={handleToggleTheme}
        onToggleSound={handleToggleSound}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenDecisionTree={() => setIsDecisionTreeOpen(true)}
        onOpenTimedMock={() => {
          setTimedMockProblem(null);
          setIsTimedMockOpen(true);
        }}
        onResetProgress={handleResetProgress}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Hero Banner / Quick Pitch */}
        <div className="relative rounded-3xl p-6 md:p-8 bg-slate-900 border border-slate-800 shadow-sm overflow-hidden text-left">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Structured Technical Interview Preparation
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
              The 75 Essential LeetCode Problems: Understood by Pattern & Intuition.
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-5">
              Every problem below is paired with <span className="text-amber-300 font-semibold">Core Algorithmic Intuition</span> and a <span className="text-cyan-300 font-semibold">Step-by-Step Implementation Strategy</span>. Master foundational data structures and verify solutions under timed interview conditions.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRandomUnsolved}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                Random Unsolved Problem
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsQuizOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                Pattern Recognition Quiz (+25 XP)
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsDecisionTreeOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-cyan-500/30 transition-all cursor-pointer"
              >
                Pattern Cheat Sheet
              </button>
            </div>
          </div>
        </div>

        {/* Mode Switcher Bar */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-2xl mx-auto shadow-sm">
          <button
            onClick={() => {
              sound.playClick();
              setMainTab('visualizer');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              mainTab === 'visualizer'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Play className="w-4 h-4 shrink-0" />
            <span><span className="hidden sm:inline">Algorithm </span>Visualizer</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setMainTab('debugger');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              mainTab === 'debugger'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span><span className="hidden sm:inline">Code </span>Debugger</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setMainTab('problems');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              mainTab === 'problems'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-4 h-4 shrink-0" />
            <span><span className="hidden sm:inline">Problem </span>Catalog</span>
          </button>
        </div>

        {/* View 1: Interactive Algorithm Visualizer Studio */}
        {mainTab === 'visualizer' && (
          <VisualizerStudio
            initialProblemId={visualizerProblem?.id || 'two-sum'}
            onOpenProblemFlowLab={(p) => setVisualizerProblem(p)}
          />
        )}

        {/* View 2: Code Debugger */}
        {mainTab === 'debugger' && <CodeDebugger onAddXp={handleAddXp} />}

        {/* View 3: Problem Catalog (Topics + Problems) */}
        {mainTab === 'problems' && (
          <div className="space-y-8">
            {/* Topic Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4 text-indigo-400 shrink-0" />
                  Topic Categories
                </h3>
            {selectedCategory && (
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(null);
                }}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
              >
                <span>Clear Topic Filter</span>
                <X className="w-3.5 h-3.5 shrink-0" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {(Object.keys(CATEGORIES_CONFIG) as Array<keyof typeof CATEGORIES_CONFIG>).map((cat) => {
              const total = PROBLEMS_DATA.filter(p => p.category === cat).length;
              const solved = PROBLEMS_DATA.filter(p => p.category === cat && userState.solved.includes(p.id)).length;
              return (
                <TopicCard
                  key={cat}
                  category={cat}
                  total={total}
                  solved={solved}
                  isSelected={selectedCategory === cat}
                  onSelect={setSelectedCategory}
                />
              );
            })}
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          {/* Search Box */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by problem name, pattern (e.g. Sliding Window), or intuition hook..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 max-w-full">
            {/* Status Filter */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 overflow-x-auto max-w-full custom-scroll shrink-0">
              {[
                { id: 'all', label: 'All', icon: Circle },
                { id: 'unsolved', label: 'To Do', icon: Circle },
                { id: 'solved', label: 'Solved', icon: CheckCircle2 },
                { id: 'review', label: 'Review', icon: Bookmark },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedStatus(st.id as typeof selectedStatus);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedStatus === st.id ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 overflow-x-auto max-w-full custom-scroll shrink-0">
              {[
                { id: null, label: 'Any' },
                { id: 'Easy', label: 'Easy' },
                { id: 'Medium', label: 'Med' },
                { id: 'Hard', label: 'Hard' },
              ].map((d) => (
                <button
                  key={d.label}
                  onClick={() => {
                    sound.playClick();
                    setSelectedDifficulty(d.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedDifficulty === d.id ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-400 font-mono">
              Showing <span className="font-bold text-white">{filteredProblems.length}</span> of {PROBLEMS_DATA.length} problems
            </span>
            {filteredProblems.length < PROBLEMS_DATA.length && (
              <button
                onClick={() => {
                  sound.playClick();
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSelectedDifficulty(null);
                  setSelectedStatus('all');
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredProblems.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/30 border border-slate-800/80">
              <p className="text-sm text-slate-400 mb-2">No matching problems found for your active filters.</p>
              <button
                onClick={() => {
                  sound.playClick();
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSelectedDifficulty(null);
                  setSelectedStatus('all');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProblems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  isSolved={userState.solved.includes(problem.id)}
                  isReview={userState.reviewLater.includes(problem.id)}
                  onToggleSolved={handleToggleSolved}
                  onToggleReview={handleToggleReview}
                  onInspectFlow={(p) => setActiveModalProblem(p)}
                  onStartTimedMock={handleStartTimedMock}
                  onOpenVisualizer={(p) => setVisualizerProblem(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )}
  </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p className="m-0">
          LeetCode 75 Flow • Master core DSA patterns, visual execution, and coding interview invariants.
        </p>
      </footer>

      {/* Modals */}
      {activeModalProblem && (
        <ProblemModal
          problem={activeModalProblem}
          allProblems={PROBLEMS_DATA}
          onSelectProblem={(p) => setActiveModalProblem(p)}
          userNotes={userState.userNotes[activeModalProblem.id] || ''}
          onSaveNotes={handleSaveNotes}
          onClose={() => setActiveModalProblem(null)}
          onStartTimedMock={handleStartTimedMock}
          onOpenVisualizer={(p) => {
            setActiveModalProblem(null);
            setVisualizerProblem(p);
          }}
          onProblemSolved={(id) => {
            if (!userState.solved.includes(id)) {
              handleToggleSolved(id);
            }
          }}
          onAddXp={handleAddXp}
        />
      )}

      {visualizerProblem && (
        <VisualizerModal
          problem={visualizerProblem}
          allProblems={PROBLEMS_DATA}
          onSelectProblem={(p) => setVisualizerProblem(p)}
          onClose={() => setVisualizerProblem(null)}
        />
      )}

      {isTimedMockOpen && (
        <TimedMockModal
          selectedProblem={timedMockProblem}
          allProblems={PROBLEMS_DATA}
          onProblemSolved={(id) => {
            if (!userState.solved.includes(id)) {
              handleToggleSolved(id);
            }
          }}
          onAddXp={handleAddXp}
          onClose={() => {
            setIsTimedMockOpen(false);
            setTimedMockProblem(null);
          }}
        />
      )}

      {isQuizOpen && (
        <PatternQuiz
          problems={PROBLEMS_DATA}
          onAddXp={handleAddXp}
          onClose={() => setIsQuizOpen(false)}
        />
      )}

      {isDecisionTreeOpen && (
        <DecisionTreeModal
          onClose={() => setIsDecisionTreeOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
