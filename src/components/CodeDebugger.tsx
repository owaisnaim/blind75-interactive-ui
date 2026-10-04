import React, { useState } from 'react';
import { Bug, CheckCircle2, XCircle, ArrowRight, Lightbulb, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface BugCase {
  id: string;
  problemTitle: string;
  buggyCode: string;
  failingInput: string;
  expectedOutput: string;
  buggyOutput: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  verdict: string;
}

export type CrimeCase = BugCase;

const DEBUG_CASES: BugCase[] = [
  {
    id: 'case-1',
    problemTitle: 'Maximum Subarray (Kadane’s Fatal Flaw)',
    buggyCode: `class Solution {
    public int maxSubArray(int[] nums) {
        int curSum = 0;
        int maxSum = 0; // <--- BUG: Initializing to 0!
        
        for (int n : nums) {
            if (curSum < 0) {
                curSum = 0;
            }
            curSum += n;
            maxSum = Math.max(maxSum, curSum);
        }
        return maxSum;
    }
}`,
    failingInput: `nums = [-5, -2, -9, -1]`,
    expectedOutput: `-1 (the max single element)`,
    buggyOutput: `0 (WRONG!)`,
    question: 'Why does this Java submission fail on LeetCode test cases with negative numbers?',
    options: [
      {
        text: 'curSum is not reset when n is negative.',
        isCorrect: false,
        explanation: 'curSum is checked for < 0 properly.'
      },
      {
        text: 'maxSum is initialized to 0. If all numbers are negative, 0 is returned instead of the max negative number.',
        isCorrect: true,
        explanation: 'Correct! If all elements are negative, the maximum subarray is the largest negative element (e.g. -1). Initializing maxSum to 0 yields 0, which was never in the array! Initialize maxSum = nums[0].'
      },
      {
        text: 'Java int overflow on negative numbers.',
        isCorrect: false,
        explanation: '32-bit signed ints represent numbers down to -2^31.'
      }
    ],
    verdict: 'Always initialize maxSum = nums[0] (or Integer.MIN_VALUE), never 0!'
  },
  {
    id: 'case-2',
    problemTitle: 'Two Sum (The Premature Insert)',
    buggyCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            seen.put(nums[i], i); // <--- BUG: Storing before checking!
            int diff = target - nums[i];
            if (seen.containsKey(diff)) {
                return new int[]{seen.get(diff), i};
            }
        }
        return new int[]{};
    }
}`,
    failingInput: `nums = [3, 2, 4], target = 6`,
    expectedOutput: `[1, 2] (indices of 2 + 4)`,
    buggyOutput: `[0, 0] (WRONG! Used element at index 0 twice!)`,
    question: 'Why did this method return [0, 0] instead of [1, 2] in Java?',
    options: [
      {
        text: 'Target 6 cannot be achieved with array [3, 2, 4].',
        isCorrect: false,
        explanation: '2 + 4 = 6, which exists at indices 1 and 2.'
      },
      {
        text: 'It put nums[i] into the map BEFORE checking diff, allowing 3 to pair with itself (6 - 3 = 3)!',
        isCorrect: true,
        explanation: 'Spot on! For target=6 and n=3: 6 - 3 = 3. Since 3 was inserted into seen first, seen contained 3, returning [0, 0]! You must check `seen.containsKey(diff)` BEFORE `seen.put(nums[i], i)`.'
      },
      {
        text: 'HashMap requires custom hashCode() for Integer.',
        isCorrect: false,
        explanation: 'java.lang.Integer already implements hashCode().'
      }
    ],
    verdict: 'Check `seen.containsKey(diff)` BEFORE calling `seen.put(nums[i], i)`!'
  },
  {
    id: 'case-3',
    problemTitle: 'Reorder List (The Missing Unlink)',
    buggyCode: `class Solution {
    public void reorderList(ListNode head) {
        // 1. Find middle
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // 2. Reverse second half
        ListNode second = slow.next;
        // slow.next = null; // <--- BUG: Omitted!
        ListNode prev = null;
        while (second != null) {
            ListNode next = second.next;
            second.next = prev;
            prev = second;
            second = next;
        }
        // 3. Merge halves...
    }
}`,
    failingInput: `head = [1, 2, 3, 4]`,
    expectedOutput: `[1, 4, 2, 3]`,
    buggyOutput: `Memory Limit Exceeded / Infinite Cycle!`,
    question: 'Why did the execution encounter an infinite loop during merge?',
    options: [
      {
        text: 'Fast pointer must move 3 steps instead of 2.',
        isCorrect: false,
        explanation: 'Fast moving 2 steps is the standard middle finding algorithm.'
      },
      {
        text: 'The middle link was never severed (slow.next = null was omitted), creating a circular cycle between the two halves.',
        isCorrect: true,
        explanation: 'Deadly mistake! If slow.next is not set to null, node 2 still points to node 3 while the reversed second half points node 3 back to node 4. When merged, a cycle forms in memory!'
      },
      {
        text: 'ListNode cannot be reordered in-place in Java.',
        isCorrect: false,
        explanation: 'Linked lists are designed for in-place pointer updates.'
      }
    ],
    verdict: 'When splitting a linked list in half, ALWAYS sever the connection: `slow.next = null`!'
  }
];

export const CodeDebugger: React.FC<{ onAddXp: (amount: number) => void }> = ({ onAddXp }) => {
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [solvedCases, setSolvedCases] = useState<string[]>([]);

  const currentCase = DEBUG_CASES[activeCaseIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const opt = currentCase.options[idx];
    if (opt.isCorrect) {
      sound.playCorrect();
      setSolvedCases(prev => [...new Set([...prev, currentCase.id])]);
      onAddXp(100);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } else {
      sound.playWrong();
    }
  };

  const handleNextCase = () => {
    sound.playClick();
    setSelectedOpt(null);
    setIsAnswered(false);
    setActiveCaseIdx((activeCaseIdx + 1) % DEBUG_CASES.length);
  };

  return (
    <section className="rounded-3xl border border-rose-500/30 bg-slate-900 p-6 md:p-8 shadow-xl text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shadow-sm shrink-0">
            <ShieldAlert className="w-6 h-6 shrink-0 text-rose-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl md:text-2xl font-black text-white m-0">Code Debugger: Spot the Logical Error</h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                Exercise {activeCaseIdx + 1} of {DEBUG_CASES.length}
              </span>
            </div>
            <p className="text-xs text-slate-400 m-0">Analyze flawed implementations, identify edge case failures, and master core invariants</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 custom-scroll shrink-0">
          {DEBUG_CASES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playClick();
                setActiveCaseIdx(i);
                setSelectedOpt(null);
                setIsAnswered(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 whitespace-nowrap ${
                activeCaseIdx === i
                  ? 'bg-rose-600 text-white shadow-sm'
                  : solvedCases.includes(c.id)
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <span>Case #{i + 1}</span>
              {solvedCases.includes(c.id) && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Case Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Faulty Code Snippet */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Bug className="w-4 h-4 shrink-0" />
              Flawed Implementation
            </span>
            <span className="text-xs font-semibold text-slate-400">{currentCase.problemTitle}</span>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-200/90 leading-relaxed overflow-x-auto shadow-inner">
            <code>{currentCase.buggyCode}</code>
          </pre>
        </div>

        {/* Test Case Failure & Outputs */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Test Case Failure & Outputs
            </div>
            <div className="text-xs font-mono">
              <span className="text-slate-500 block text-[10px]">FAILING INPUT:</span>
              <span className="text-amber-300 font-bold">{currentCase.failingInput}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <span className="text-emerald-400 block text-[10px] font-bold">EXPECTED:</span>
                <span className="text-emerald-300 font-bold">{currentCase.expectedOutput}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30">
                <span className="text-rose-400 block text-[10px] font-bold">ACTUAL RETURN:</span>
                <span className="text-rose-300 font-bold">{currentCase.buggyOutput}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30">
            <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 mb-1">
              <Lightbulb className="w-4 h-4 shrink-0 text-amber-400" />
              Root Cause Analysis
            </div>
            <p className="text-xs text-white font-medium">
              {currentCase.question}
            </p>
          </div>
        </div>
      </div>

      {/* Diagnostic Options */}
      <div className="space-y-3 mb-6">
        {currentCase.options.map((opt, idx) => {
          const isChosen = selectedOpt === idx;
          let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

          if (isAnswered) {
            if (opt.isCorrect) {
              btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold ring-2 ring-emerald-500/40';
            } else if (isChosen) {
              btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300';
            } else {
              btnStyle = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-50';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-xl border text-xs text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <div>
                  <div className="leading-relaxed">{opt.text}</div>
                  {isAnswered && (isChosen || opt.isCorrect) && (
                    <div className="mt-1.5 text-[11px] text-slate-400 italic">
                      {opt.explanation}
                    </div>
                  )}
                </div>
              </div>

              {isAnswered && (
                <div className="shrink-0 mt-0.5">
                  {opt.isCorrect && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />}
                  {isChosen && !opt.isCorrect && <XCircle className="w-5 h-5 shrink-0 text-rose-400" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Case Verdict & Next Button */}
      {isAnswered && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
          <div>
            <span className="text-[10px] font-bold text-amber-400 font-mono block">ROOT CAUSE & ENGINEERING TAKEAWAY:</span>
            <span className="text-xs font-semibold text-slate-200">"{currentCase.verdict}"</span>
          </div>

          <button
            onClick={handleNextCase}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Next Debugging Case</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      )}
    </section>
  );
};

export const BugDetective = CodeDebugger;
