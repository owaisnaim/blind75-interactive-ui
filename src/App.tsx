import { useState, useEffect, useMemo, useRef } from 'react';
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
import { loadUserState, saveUserState, INITIAL_STATE, calculateLevel } from './utils/storage';
import type { UserState } from './utils/storage';
import { sound } from './utils/audio';

export function App() {
  const [userState, setUserState] = useState<UserState>(() => loadUserState());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'unsolved' | 'solved' | 'review'>('all');
  const [mainTab, setMainTab] = useState<'problems' | 'visualizer' | 'debugger'>('problems');

  // Modals state
  const [activeModalProblem, setActiveModalProblem] = useState<Problem | null>(null);
  const [timedMockProblem, setTimedMockProblem] = useState<Problem | null>(null);
  const [visualizerProblem, setVisualizerProblem] = useState<Problem | null>(null);
  const [isTimedMockOpen, setIsTimedMockOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDecisionTreeOpen, setIsDecisionTreeOpen] = useState(false);

  // Ref for scrolling to questions section
  const questionsSectionRef = useRef<HTMLDivElement>(null);

  // Handle topic category selection with smooth scroll to questions
  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
    setTimeout(() => {
      questionsSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  };

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

  // Random unsolved problem trigger
  const handleRandomUnsolved = () => {
    sound.playClick();
    const unsolved = PROBLEMS_DATA.filter(p => !userState.solved.includes(p.id));
    if (unsolved.length === 0) {
      alert("Incredible work! You have solved all 75 problems in the curriculum!");
      return;
    }
    const rand = unsolved[Math.floor(Math.random() * unsolved.length)];
    setActiveModalProblem(rand);
  };

  // Reset Progress
  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your progress, solved status, and notes?")) {
      setUserState(INITIAL_STATE);
      sound.playClick();
    }
  };

  // Add XP from Quiz / Boss Raid
  const handleAddXp = (amount: number) => {
    setUserState(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  // Start Timed Practice from card
  const handleStartTimedMock = (problem: Problem) => {
    setTimedMockProblem(problem);
    setIsTimedMockOpen(true);
  };

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return PROBLEMS_DATA.filter(problem => {
      // Category filter
      if (selectedCategory && problem.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty && problem.difficulty !== selectedDifficulty) {
        return false;
      }

      // Status filter
      if (selectedStatus === 'solved' && !userState.solved.includes(problem.id)) {
        return false;
      }
      if (selectedStatus === 'unsolved' && userState.solved.includes(problem.id)) {
        return false;
      }
      if (selectedStatus === 'review' && !userState.reviewLater.includes(problem.id)) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = problem.title.toLowerCase().includes(q);
        const matchesPattern = problem.pattern.toLowerCase().includes(q);
        const matchesHook = problem.hook.toLowerCase().includes(q);
        const matchesCategory = problem.category.toLowerCase().includes(q);
        return matchesTitle || matchesPattern || matchesHook || matchesCategory;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedStatus, userState]);

  const levelInfo = calculateLevel(userState.xp);
  const solvedCount = userState.solved.length;
  const solvedPct = Math.round((solvedCount / PROBLEMS_DATA.length) * 100);

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

      {/* Main Workbench Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-4 sm:py-5 space-y-4">
        {/* Workbench Control Deck: Segmented Mode Selector & Quick Triggers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-slate-900 border border-slate-800 rounded-xl shadow-xs">
          {/* Segmented View Switcher */}
          <div className="inline-flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => {
                sound.playClick();
                setMainTab('problems');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                mainTab === 'problems'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Problem Catalog</span>
              <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                75
              </span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setMainTab('visualizer');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                mainTab === 'visualizer'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Algorithm Visualizer</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setMainTab('debugger');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                mainTab === 'debugger'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Code Debugger</span>
            </button>
          </div>

          {/* Quick Tactical Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRandomUnsolved}
              className="h-8 flex items-center gap-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shrink-0"
              title="Launch a random unsolved problem"
            >
              <Shuffle className="w-3.5 h-3.5 shrink-0" />
              <span>Random Unsolved</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIsQuizOpen(true);
              }}
              className="h-8 flex items-center gap-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-colors cursor-pointer shrink-0"
              title="Test pattern recognition skills"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Pattern Quiz (+25 XP)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIsDecisionTreeOpen(true);
              }}
              className="h-8 flex items-center gap-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-xs border border-cyan-500/30 transition-colors cursor-pointer shrink-0"
              title="Pattern cheat sheet and decision tree"
            >
              <span>Cheat Sheet</span>
            </button>
          </div>
        </div>

        {/* View 1: Problem Catalog (Topics + Problems) */}
        {mainTab === 'problems' && (
          <div className="space-y-5">
            {/* Curriculum Header & Status Telemetry */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
              <div className="max-w-xl">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight mb-1">
                  The 75 Essential LeetCode Patterns
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every problem pairs core algorithmic intuition with step-by-step memory simulation and invariant test sandboxes.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-400">Level {levelInfo.level}:</span>
                  <span className="font-bold text-amber-400">
                    <span className="font-mono">{userState.xp}</span> XP
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-400">Solved:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {solvedCount} / {PROBLEMS_DATA.length} ({solvedPct}%)
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-400">Review:</span>
                  <span className="font-mono font-bold text-purple-400">
                    {userState.reviewLater.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Topic Categories Matrix */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Topic Matrix</span>
                </h3>
                {selectedCategory && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedCategory(null);
                    }}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    <span>Clear Filter ({selectedCategory})</span>
                    <X className="w-3.5 h-3.5 shrink-0" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
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
                      onSelect={handleSelectCategory}
                    />
                  );
                })}
              </div>
            </div>

            {/* Filter Controls & Search Bar */}
            <div
              ref={questionsSectionRef}
              id="questions-section"
              className="scroll-mt-28 xl:scroll-mt-20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800"
            >
              {/* Search Box */}
              <div className="relative flex-1 min-w-0">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by problem name, pattern, or intuition..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-2 max-w-full">
                {/* Status Filter */}
                <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 overflow-x-auto max-w-full custom-scroll shrink-0">
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
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        selectedStatus === st.id ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                {/* Difficulty Filter */}
                <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 overflow-x-auto max-w-full custom-scroll shrink-0">
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
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        selectedDifficulty === d.id ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
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
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400">
                  Showing <span className="font-bold text-white font-mono">{filteredProblems.length}</span> of <span className="font-mono">{PROBLEMS_DATA.length}</span> problems
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
                <div className="p-12 text-center rounded-xl bg-slate-900/30 border border-slate-800">
                  <p className="text-sm text-slate-400 mb-2">No matching problems found for your active filters.</p>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setSelectedDifficulty(null);
                      setSelectedStatus('all');
                    }}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
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

        {/* View 2: Interactive Algorithm Visualizer Studio */}
        {mainTab === 'visualizer' && (
          <VisualizerStudio
            initialProblemId={visualizerProblem?.id || 'two-sum'}
            onOpenProblemFlowLab={(p) => setVisualizerProblem(p)}
          />
        )}

        {/* View 3: Code Debugger */}
        {mainTab === 'debugger' && <CodeDebugger onAddXp={handleAddXp} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-5 text-center text-xs text-slate-500">
        <p className="m-0">
          LeetCode 75 Flow: Master core DSA patterns, visual execution, and coding interview invariants.
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
