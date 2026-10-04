import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, XCircle, ArrowRight, Zap, Trophy } from 'lucide-react';
import type { Problem } from '../data/problems';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface PatternQuizProps {
  problems: Problem[];
  onAddXp: (amount: number) => void;
  onClose: () => void;
}

interface Question {
  problem: Problem;
  questionType: 'pattern' | 'hook';
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const PatternQuiz: React.FC<PatternQuizProps> = ({
  problems,
  onAddXp,
  onClose,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const generateQuestion = (): Question => {
    // Pick a random problem
    const prob = problems[Math.floor(Math.random() * problems.length)];
    const isPattern = Math.random() > 0.5;

    if (isPattern) {
      // Pick 3 other random distinct patterns
      const allPatterns = Array.from(new Set(problems.map(p => p.pattern))).filter(p => p !== prob.pattern);
      const shuffledOthers = allPatterns.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [prob.pattern, ...shuffledOthers].sort(() => 0.5 - Math.random());
      return {
        problem: prob,
        questionType: 'pattern',
        options,
        correctAnswer: prob.pattern,
        explanation: prob.hook
      };
    } else {
      // Guess the Hook / Intuition
      const allHooks = problems.filter(p => p.id !== prob.id).map(p => p.hook);
      const shuffledOthers = allHooks.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [prob.hook, ...shuffledOthers].sort(() => 0.5 - Math.random());
      return {
        problem: prob,
        questionType: 'hook',
        options,
        correctAnswer: prob.hook,
        explanation: `Optimal Pattern: ${prob.pattern} (${prob.complexity.time})`
      };
    }
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, []);

  const handleSelectOption = (option: string) => {
    if (isAnswered || !currentQuestion) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      sound.playCorrect();
      setScore(s => s + 1);
      setStreak(st => st + 1);
      onAddXp(25);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    } else {
      sound.playWrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentQuestion(generateQuestion());
  };

  if (!currentQuestion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 shrink-0">
              <Sparkles className="w-5 h-5 shrink-0" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 m-0 flex-wrap">
                <span>Pattern Recognition Quiz</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 shrink-0">
                  Pattern Identification
                </span>
              </h3>
              <p className="text-xs text-slate-400 m-0">Test your ability to identify the optimal algorithmic pattern and time complexity</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 self-end sm:self-auto shrink-0 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
              <Zap className="w-4 h-4 shrink-0 text-amber-400" />
              <span className="text-xs font-bold text-amber-300">{streak} Streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
              <Trophy className="w-4 h-4 shrink-0 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">{score} Solved</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="p-6">
          <div className="mb-4">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700 mr-2">
              Problem #{currentQuestion.problem.number}
            </span>
            <span className="text-xs text-slate-400">
              {currentQuestion.problem.category} • {currentQuestion.problem.difficulty}
            </span>
            <h2 className="text-xl font-black text-white mt-1.5">
              {currentQuestion.problem.title}
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              {currentQuestion.questionType === 'pattern' ? (
                <>
                  <Zap className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Which algorithmic pattern solves this with optimal time & space?</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 shrink-0 text-purple-400" />
                  <span>What is the core algorithmic intuition / invariant for this problem?</span>
                </>
              )}
            </div>
            {currentQuestion.questionType === 'pattern' ? (
              <p className="text-xs text-slate-300 italic">
                Hint: Consider whether you need a hash table, pointer boundaries, or dynamic programming state transitions.
              </p>
            ) : (
              <p className="text-xs text-slate-300 italic">
                Algorithmic Pattern: {currentQuestion.problem.pattern}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQuestion.correctAnswer;

              let btnClass = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40';
              if (isAnswered) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                } else if (isSelected) {
                  btnClass = 'bg-rose-500/20 border-rose-500 text-rose-300';
                } else {
                  btnClass = 'bg-slate-950/30 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-xs text-left flex items-center justify-between transition-all cursor-pointer ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0 ml-3">
                      {isCorrect && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 shrink-0 text-rose-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {isAnswered && (
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 animate-in fade-in duration-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>The Invariant / Mental Trick:</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "{currentQuestion.explanation}"
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Next Run</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
