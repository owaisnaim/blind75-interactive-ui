import React, { useState } from 'react';
import { X, Compass, Zap, Lightbulb, Code2 } from 'lucide-react';
import { CORE_PATTERNS } from '../data/problems';
import { sound } from '../utils/audio';

interface DecisionTreeModalProps {
  onClose: () => void;
}

export const DecisionTreeModal: React.FC<DecisionTreeModalProps> = ({
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'decisionTree' | 'archetypes' | 'java'>('java');

  const DECISION_PATHS = [
    {
      domain: 'Arrays & Strings',
      steps: [
        {
          question: 'Is the array sorted (or almost sorted / rotated)?',
          yes: 'Binary Search (Inflection check) or Two Pointers converging from endpoints (e.g. 3Sum, Search in Rotated Array).',
          no: 'Proceed to subarray / hash questions below.'
        },
        {
          question: 'Are you looking for contiguous subarrays or substrings with constraints?',
          yes: 'Sliding Window! Expand right to gain valid conditions, shrink left to shave excess (e.g. Minimum Window Substring, Longest Substring Without Repeating).',
          no: 'Consider Hash Map, Prefix Sum, or Kadane.'
        },
        {
          question: 'Looking for Maximum Subarray Sum or Running Aggregates?',
          yes: 'Kadane’s Algorithm: drop current prefix immediately if it turns negative! (e.g. Maximum Subarray, Best Time to Buy and Sell Stock).',
          no: 'Check if you need two passes: Prefix and Postfix arrays (e.g. Product of Array Except Self).'
        },
        {
          question: 'Need fast O(1) pair matching or frequency checking?',
          yes: 'Hash Map or 26-element integer frequency array (e.g. Two Sum, Valid Anagram, Group Anagrams).',
          no: 'Expand around center for palindromes!'
        }
      ]
    },
    {
      domain: 'Linked Lists',
      steps: [
        {
          question: 'Need to reverse or rewire links?',
          yes: '3-Pointer Dance (prev, curr, nxt). Always store nxt before severing curr.next!',
          no: 'Consider runners or dummy node.'
        },
        {
          question: 'Detecting loops or middle elements?',
          yes: 'Floyd’s Tortoise & Hare: Slow takes 1 step, Fast takes 2 steps. Collision proves a cycle!',
          no: 'Dummy head node: simplifies head deletions and merging.'
        }
      ]
    },
    {
      domain: 'Trees & Graphs',
      steps: [
        {
          question: 'Level-by-level inspection or shortest unweighted path?',
          yes: 'BFS with Queue: snapshot `len(queue)` at the start of each level iteration!',
          no: 'DFS recursion for depth, subtree matching, or path backtracking.'
        },
        {
          question: 'Directed prerequisites or task scheduling?',
          yes: 'Topological Sort (Kahn’s Indegree BFS or 3-state DFS cycle detection). Cycle = impossible.',
          no: 'Union-Find (Disjoint Set) for undirected connected components and cycle checking in O(alpha(N)).'
        },
        {
          question: 'Searching words by prefixes or grid dictionary?',
          yes: 'Trie (Prefix Tree) with multi-way branching children map. Combine with Backtracking DFS for Word Search II.',
          no: 'Validate BST bounds: keep (low, high) ranges at every node.'
        }
      ]
    },
    {
      domain: 'Dynamic Programming vs Greedy vs Heaps',
      steps: [
        {
          question: 'Are you choosing between options at step i that overlap with future steps?',
          yes: 'Dynamic Programming: draw decision tree, identify state (dp[i] or dp[i][j]), formulate recurrence (rob-or-skip, include-or-exclude).',
          no: 'Greedy: if a local choice never invalidates future optimal choices (e.g. Jump Game, Non-overlapping intervals by earliest end time).'
        },
        {
          question: 'Need dynamic Top-K elements or rolling median from a stream?',
          yes: 'Heap: Min-Heap of size K for Top K largest (O(N log K)), or Dual-Heap (Max + Min) for running median (O(log N) insert, O(1) median).',
          no: 'Bucket Sort for frequency in pure O(N) linear time (e.g. Top K Frequent Elements).'
        }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200 text-left">
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white m-0">
                Algorithmic Pattern & Decision Guide
              </h3>
              <p className="text-xs text-slate-400 m-0">Systematic reference to classify problems and select optimal patterns</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-xl bg-slate-800 p-1 border border-slate-700">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('decisionTree');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'decisionTree' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Decision Tree
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('archetypes');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'archetypes' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Core Patterns
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('java');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'java' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Java Collections & Methods</span>
              </button>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'decisionTree' ? (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-white">The Golden Interview Habit:</span> Never start coding immediately. Run through this 3-question filter in your head:
                  <ol className="list-decimal ml-4 mt-1 space-y-0.5 text-slate-300">
                    <li>What is the brute force time? (Can I eliminate duplicate work with a Hash Table or Pointer?)</li>
                    <li>Does sorting unlock monotonicity or binary search?</li>
                    <li>Is there an invariant I can maintain (e.g., sliding window balance, two-heap median)?</li>
                  </ol>
                </div>
              </div>

              {DECISION_PATHS.map((path, idx) => (
                <div key={idx} className="border border-slate-800 rounded-2xl p-5 bg-slate-950/50">
                  <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {path.domain}
                  </h4>

                  <div className="space-y-3">
                    {path.steps.map((st, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                        <div className="font-bold text-white mb-2 flex items-center gap-2">
                          <span className="text-amber-400 font-mono">Q{sIdx + 1}:</span>
                          <span>{st.question}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 leading-relaxed">
                            <span className="font-bold text-emerald-400">YES → </span>
                            {st.yes}
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 leading-relaxed">
                            <span className="font-bold text-slate-300">NO → </span>
                            {st.no}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'archetypes' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CORE_PATTERNS.map((pt, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-white text-sm mb-1.5">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      {pt.name}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {pt.description}
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 mb-2">
                      <span className="text-[11px] font-bold text-amber-300 block mb-0.5">When to use:</span>
                      <span className="text-[11px] text-slate-300 italic">{pt.trigger}</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Examples: </span>
                    {pt.example}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <span>Java DSA Quick Reference (LeetCode Ready)</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Essential collections, idiom templates, and subtle traps in Java technical interviews.
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold">
                  Java 17/21
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Map & Set */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-cyan-300 font-mono">1. HashMap & HashSet</div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-cyan-200 overflow-x-auto">
{`Map<Integer, Integer> map = new HashMap<>();
map.put(key, val);
map.getOrDefault(key, 0); // Crucial for counters
map.containsKey(key);

Set<Integer> set = new HashSet<>();
if (!set.add(num)) {
    // Returns false if duplicate!
}`}
                  </pre>
                </div>

                {/* 2. Deque (Stack & Queue) */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-indigo-300 font-mono">2. Stack & Queue (Use ArrayDeque!)</div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-indigo-200 overflow-x-auto">
{`// Stack (LIFO): Avoid legacy java.util.Stack!
Deque<Integer> stack = new ArrayDeque<>();
stack.push(val);
int top = stack.pop();
int peek = stack.peek();

// Queue (FIFO - BFS):
Queue<TreeNode> q = new ArrayDeque<>();
q.offer(node);
TreeNode curr = q.poll();`}
                  </pre>
                </div>

                {/* 3. PriorityQueue (Heaps) */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-rose-300 font-mono">3. PriorityQueue (Min/Max Heap)</div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-rose-200 overflow-x-auto">
{`// Min-Heap (default):
PriorityQueue<Integer> minH = new PriorityQueue<>();

// Max-Heap:
PriorityQueue<Integer> maxH = new PriorityQueue<>(Collections.reverseOrder());

// Custom Object / Coordinate comparator:
PriorityQueue<int[]> pq = new PriorityQueue<>(
    (a, b) -> Integer.compare(a[0], b[0]) // Avoid a[0]-b[0] overflow!
);`}
                  </pre>
                </div>

                {/* 4. Sorting & Arrays */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-300 font-mono">4. Sorting & Arrays</div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-emerald-200 overflow-x-auto">
{`// Primitive array sort:
Arrays.sort(nums); // O(N log N) Dual-Pivot Quicksort

// 2D Interval Sort:
Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

// Convert List<int[]> to int[][]:
res.toArray(new int[res.size()][]);`}
                  </pre>
                </div>

                {/* 5. Strings & Char Arrays */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-purple-300 font-mono">5. String Performance</div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-purple-200 overflow-x-auto">
{`// Fast character loop:
for (char c : s.toCharArray()) { ... }

// Mutable string (O(N) vs String O(N^2)):
StringBuilder sb = new StringBuilder();
sb.append('a').append("bc");
sb.reverse().toString();

// Substring: s.substring(start, endExclusive)`}
                  </pre>
                </div>

                {/* 6. Binary & Math Traps */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-amber-300 font-mono">6. Binary & Overflow Guards</div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-amber-200 overflow-x-auto">
{`// Safe mid-point without overflow:
int mid = left + (right - left) / 2;

// Built-in bit operations:
int bits = Integer.bitCount(n);

// Unsigned right shift:
int unsigned = n >>> 1;`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
