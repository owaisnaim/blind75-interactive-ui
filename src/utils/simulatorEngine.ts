import type { Problem } from '../data/problems';

export interface SimFrame {
  step: number;
  totalSteps: number;
  action: string;
  explanation: string;
  javaLine: number;
  variables: Record<string, string | number>;
  visualType: 'array-pointers' | 'sliding-window' | 'dp-grid' | 'linked-list' | 'interval-sweep' | 'tree-node' | 'stack-pipe' | 'heap-balance' | 'matrix-grid';
  visualData: any;
}

export function generateSimulationForProblem(problem: Problem): SimFrame[] {
  // Check if there's a specialized hand-crafted simulation
  const custom = getCustomSimulation(problem);
  if (custom && custom.length > 0) {
    return custom;
  }

  // Otherwise, generate an authentic category-specific simulation using the problem's own 4 flow steps
  return generateDynamicSimulationFromFlow(problem);
}

// =========================================================================
// SPECIALIZED HIGH-FIDELITY SIMULATIONS
// =========================================================================
function getCustomSimulation(p: Problem): SimFrame[] | null {
  switch (p.id) {
    // --- ARRAYS ---
    case 'two-sum': {
      const nums = [2, 7, 11, 15];
      const target = 9;
      return [
        {
          step: 1, totalSteps: 4, action: 'Initialize HashMap',
          explanation: 'Create empty map `prevMap` to store value -> index for O(1) difference lookup.',
          javaLine: 3, variables: { target, prevMap: '{}' },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: 'i', index: -1 }], activeMap: {}, highlightIndices: [] }
        },
        {
          step: 2, totalSteps: 4, action: 'Examine nums[0] = 2',
          explanation: 'diff = 9 - 2 = 7. Is 7 in prevMap? No. Store prevMap.put(2, 0).',
          javaLine: 5, variables: { i: 0, 'nums[i]': 2, diff: 7, prevMap: '{2: 0}' },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: 'i', index: 0 }], activeMap: { '2': 0 }, highlightIndices: [0] }
        },
        {
          step: 3, totalSteps: 4, action: 'Examine nums[1] = 7',
          explanation: 'diff = 9 - 7 = 2. Is 2 in prevMap? YES! It exists at index 0!',
          javaLine: 6, variables: { i: 1, 'nums[i]': 7, diff: 2, 'prevMap[diff]': 0 },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: 'i', index: 1 }], activeMap: { '2': 0 }, highlightIndices: [0, 1] }
        },
        {
          step: 4, totalSteps: 4, action: 'Return Solution Pair [0, 1]',
          explanation: 'Match found: return new int[]{0, 1}. Total time O(N), Space O(N).',
          javaLine: 7, variables: { result: '[0, 1]' },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: '✓', index: 0 }, { name: '✓', index: 1 }], activeMap: { '2': 0 }, highlightIndices: [0, 1], solved: true }
        }
      ];
    }

    case 'best-time-to-buy-and-sell-stock': {
      const prices = [7, 1, 5, 3, 6, 4];
      return [
        {
          step: 1, totalSteps: 5, action: 'Start at Day 0 & Day 1',
          explanation: 'Prices[l]=7, Prices[r]=1. Buying at 7 and selling at 1 is a loss!',
          javaLine: 3, variables: { l: 0, r: 1, maxProfit: 0 },
          visualType: 'array-pointers',
          visualData: { elements: prices, pointers: [{ name: 'Buy (l)', index: 0 }, { name: 'Sell (r)', index: 1 }] }
        },
        {
          step: 2, totalSteps: 5, action: 'Drop to New Valley (l = r)',
          explanation: 'Found cheaper buy price! Move Buy pointer: l = 1 ($1). Advance r to 2 ($5).',
          javaLine: 8, variables: { l: 1, r: 2, buyPrice: 1, currentPrice: 5 },
          visualType: 'array-pointers',
          visualData: { elements: prices, pointers: [{ name: 'Buy (l)', index: 1 }, { name: 'Sell (r)', index: 2 }], highlightIndices: [1] }
        },
        {
          step: 3, totalSteps: 5, action: 'Profit Window: $5 - $1 = $4',
          explanation: 'Sell at 5 for $4 profit! Record new maxProfit = 4. Advance r to 3 ($3).',
          javaLine: 6, variables: { l: 1, r: 2, profit: 4, maxProfit: 4 },
          visualType: 'array-pointers',
          visualData: { elements: prices, pointers: [{ name: 'Buy (l)', index: 1 }, { name: 'Sell (r)', index: 2 }], highlightIndices: [1, 2] }
        },
        {
          step: 4, totalSteps: 5, action: 'Peak Day 4: Sell at $6! Profit = $5',
          explanation: 'Prices[4]=6. Profit = 6 - 1 = $5! New global maximum profit!',
          javaLine: 6, variables: { l: 1, r: 4, profit: 5, maxProfit: 5 },
          visualType: 'array-pointers',
          visualData: { elements: prices, pointers: [{ name: 'Buy (l)', index: 1 }, { name: 'Sell (r)', index: 4 }], highlightIndices: [1, 4] }
        },
        {
          step: 5, totalSteps: 5, action: 'Scan Complete: Max Profit = $5',
          explanation: 'Single O(N) linear sweep with two pointers finds optimal transaction!',
          javaLine: 12, variables: { maxProfit: 5, result: 5 },
          visualType: 'array-pointers',
          visualData: { elements: prices, pointers: [{ name: '★ Buy $1', index: 1 }, { name: '★ Sell $6', index: 4 }], highlightIndices: [1, 4], solved: true }
        }
      ];
    }

    case 'contains-duplicate': {
      const nums = [1, 2, 3, 1];
      return [
        {
          step: 1, totalSteps: 4, action: 'Init Empty HashSet',
          explanation: 'Use HashSet for O(1) set membership insertion.',
          javaLine: 3, variables: { seen: '{}' },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: 'i', index: 0 }], activeMap: {} }
        },
        {
          step: 2, totalSteps: 4, action: 'Add 1 and 2 to Set',
          explanation: 'seen.add(1) = true; seen.add(2) = true. No duplicates yet.',
          javaLine: 5, variables: { seen: '{1, 2}' },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: 'i', index: 1 }], activeMap: { '1': '✓', '2': '✓' }, highlightIndices: [0, 1] }
        },
        {
          step: 3, totalSteps: 4, action: 'Add 3 to Set',
          explanation: 'seen.add(3) = true. Set now contains {1, 2, 3}. Next element is 1.',
          javaLine: 5, variables: { seen: '{1, 2, 3}' },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: 'i', index: 2 }], activeMap: { '1': '✓', '2': '✓', '3': '✓' }, highlightIndices: [0, 1, 2] }
        },
        {
          step: 4, totalSteps: 4, action: 'Collision! seen.add(1) == false!',
          explanation: '1 is already in the HashSet! Duplicate found immediately in O(N) time and O(N) space.',
          javaLine: 6, variables: { duplicate: 1, result: 'true' },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: 'DUP', index: 0 }, { name: 'DUP', index: 3 }], activeMap: { '1': 'DUPLICATE!' }, highlightIndices: [0, 3], solved: true }
        }
      ];
    }

    case 'product-of-array-except-self': {
      const nums = [1, 2, 3, 4];
      return [
        {
          step: 1, totalSteps: 4, action: 'Init Output Array with Prefix 1',
          explanation: 'res[0] = 1. Prefix product passes left to right without division.',
          javaLine: 5, variables: { nums: '[1, 2, 3, 4]', prefix: 1, 'res[0]': 1 },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: 'prefix', index: 0 }] }
        },
        {
          step: 2, totalSteps: 4, action: 'Left Prefix Sweep',
          explanation: 'res[i] = prefix; prefix *= nums[i]. Result after pass: [1, 1, 2, 6].',
          javaLine: 7, variables: { res: '[1, 1, 2, 6]' },
          visualType: 'array-pointers',
          visualData: { elements: [1, 1, 2, 6], pointers: [{ name: 'prefix', index: 3 }] }
        },
        {
          step: 3, totalSteps: 4, action: 'Right Postfix Sweep',
          explanation: 'postfix starts at 1. res[i] *= postfix; postfix *= nums[i] moving backwards.',
          javaLine: 12, variables: { postfix: 4, 'res[2]': 8 },
          visualType: 'array-pointers',
          visualData: { elements: [1, 1, 8, 6], pointers: [{ name: 'postfix', index: 2 }] }
        },
        {
          step: 4, totalSteps: 4, action: 'Final Output: [24, 12, 8, 6]',
          explanation: 'All elements multiplied in O(N) time without using the division operator!',
          javaLine: 16, variables: { result: '[24, 12, 8, 6]' },
          visualType: 'array-pointers',
          visualData: { elements: [24, 12, 8, 6], pointers: [{ name: '★', index: 0 }, { name: '★', index: 3 }], solved: true }
        }
      ];
    }

    case 'maximum-subarray': {
      const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      return [
        {
          step: 1, totalSteps: 5, action: 'Start with nums[0] = -2',
          explanation: 'curSum = -2, maxSub = -2. Negative sum will be reset to 0.',
          javaLine: 4, variables: { n: -2, curSum: -2, maxSub: -2 },
          visualType: 'array-pointers',
          visualData: { elements: arr, pointers: [{ name: 'curr', index: 0 }], curSum: -2, maxSub: -2 }
        },
        {
          step: 2, totalSteps: 5, action: 'curSum < 0 -> Purge debt to 0!',
          explanation: 'Negative running sum discarded. Add 1 -> curSum = 1, maxSub = 1.',
          javaLine: 7, variables: { n: 1, curSum: 1, maxSub: 1 },
          visualType: 'array-pointers',
          visualData: { elements: arr, pointers: [{ name: 'curr', index: 1 }], curSum: 1, maxSub: 1 }
        },
        {
          step: 3, totalSteps: 5, action: 'Encounter 4 -> Fresh positive run',
          explanation: 'curSum was reset, now building positive momentum: curSum = 4, maxSub = 4.',
          javaLine: 9, variables: { n: 4, curSum: 4, maxSub: 4 },
          visualType: 'array-pointers',
          visualData: { elements: arr, pointers: [{ name: 'curr', index: 3 }], curSum: 4, maxSub: 4 }
        },
        {
          step: 4, totalSteps: 5, action: 'Accumulate [4, -1, 2, 1]',
          explanation: 'Running sum reaches 4 - 1 + 2 + 1 = 6. MaxSub updated to 6!',
          javaLine: 10, variables: { curSum: 6, maxSub: 6 },
          visualType: 'array-pointers',
          visualData: { elements: arr, pointers: [{ name: 'curr', index: 6 }], curSum: 6, maxSub: 6 }
        },
        {
          step: 5, totalSteps: 5, action: 'Finish Scan: Max Subarray = 6',
          explanation: 'Contiguous subarray [4, -1, 2, 1] achieves the maximum sum of 6!',
          javaLine: 12, variables: { maxSub: 6, result: 6 },
          visualType: 'array-pointers',
          visualData: { elements: arr, pointers: [{ name: '★', index: 3 }, { name: '★', index: 6 }], highlightIndices: [3, 4, 5, 6], curSum: 6, maxSub: 6, solved: true }
        }
      ];
    }

    case 'container-with-most-water': {
      const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
      return [
        {
          step: 1, totalSteps: 5, action: 'Endpoints: l=0, r=8',
          explanation: 'Width=8, Bottleneck=min(1, 7)=1. Area = 8 * 1 = 8. Height[l] < height[r], so advance left!',
          javaLine: 3, variables: { l: 0, r: 8, 'h[l]': 1, 'h[r]': 7, area: 8, maxArea: 8 },
          visualType: 'array-pointers',
          visualData: { elements: heights, pointers: [{ name: 'L', index: 0 }, { name: 'R', index: 8 }] }
        },
        {
          step: 2, totalSteps: 5, action: 'Advance Left -> l=1, r=8',
          explanation: 'Width=7, Bottleneck=min(8, 7)=7. Area = 7 * 7 = 49! New Record!',
          javaLine: 9, variables: { l: 1, r: 8, 'h[l]': 8, 'h[r]': 7, area: 49, maxArea: 49 },
          visualType: 'array-pointers',
          visualData: { elements: heights, pointers: [{ name: 'L', index: 1 }, { name: 'R', index: 8 }] }
        },
        {
          step: 3, totalSteps: 5, action: 'h[r] <= h[l] -> Decrement Right',
          explanation: 'Width=6, Bottleneck=min(8, 3)=3. Area = 6 * 3 = 18. Smaller than 49.',
          javaLine: 13, variables: { l: 1, r: 7, 'h[l]': 8, 'h[r]': 3, area: 18, maxArea: 49 },
          visualType: 'array-pointers',
          visualData: { elements: heights, pointers: [{ name: 'L', index: 1 }, { name: 'R', index: 7 }] }
        },
        {
          step: 4, totalSteps: 5, action: 'r=6, l=1 -> Two Tall Walls',
          explanation: 'Width=5, Bottleneck=min(8, 8)=8. Area = 5 * 8 = 40.',
          javaLine: 13, variables: { l: 1, r: 6, 'h[l]': 8, 'h[r]': 8, area: 40, maxArea: 49 },
          visualType: 'array-pointers',
          visualData: { elements: heights, pointers: [{ name: 'L', index: 1 }, { name: 'R', index: 6 }] }
        },
        {
          step: 5, totalSteps: 5, action: 'Pointers Converged!',
          explanation: 'Optimal max water area confirmed: 49! Achieved in single linear pass O(N).',
          javaLine: 16, variables: { maxArea: 49, result: 49 },
          visualType: 'array-pointers',
          visualData: { elements: heights, pointers: [{ name: '★', index: 1 }, { name: '★', index: 8 }], solved: true }
        }
      ];
    }

    case '3sum': {
      const nums = [-4, -1, -1, 0, 1, 2];
      return [
        {
          step: 1, totalSteps: 4, action: 'Sort Array First',
          explanation: 'Sorting enables two-pointer convergence and duplicate avoidance in O(N log N).',
          javaLine: 3, variables: { nums: '[-4, -1, -1, 0, 1, 2]' },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: 'i', index: 0 }] }
        },
        {
          step: 2, totalSteps: 4, action: 'Fix i = -1 (Index 1)',
          explanation: 'Target two-sum complement is -( -1 ) = 1. Set l = 2 (-1), r = 5 (2).',
          javaLine: 7, variables: { 'nums[i]': -1, l: 2, r: 5, sum: 0 },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: 'i', index: 1 }, { name: 'L', index: 2 }, { name: 'R', index: 5 }] }
        },
        {
          step: 3, totalSteps: 4, action: 'Triplet Found: -1 + (-1) + 2 = 0',
          explanation: 'Sum is 0! Add [-1, -1, 2] to triplets list. Advance l and decrement r.',
          javaLine: 11, variables: { triplet: '[-1, -1, 2]' },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: '✓', index: 1 }, { name: '✓', index: 2 }, { name: '✓', index: 5 }], highlightIndices: [1, 2, 5] }
        },
        {
          step: 4, totalSteps: 4, action: 'Second Triplet Found: [-1, 0, 1]',
          explanation: 'Pointers meet again at 0 + 1 = 1. Total triplets recorded: [[-1, -1, 2], [-1, 0, 1]].',
          javaLine: 15, variables: { result: '[[-1, -1, 2], [-1, 0, 1]]' },
          visualType: 'array-pointers',
          visualData: { elements: nums, pointers: [{ name: '✓', index: 1 }, { name: '✓', index: 3 }, { name: '✓', index: 4 }], highlightIndices: [1, 3, 4], solved: true }
        }
      ];
    }

    // --- LINKED LIST ---
    case 'reverse-linked-list': {
      const nodes = [1, 2, 3, 4, 5];
      return [
        {
          step: 1, totalSteps: 5, action: 'Init: prev=null, curr=Node(1)',
          explanation: 'Save next node before severing the link.',
          javaLine: 3, variables: { prev: 'null', curr: 1 },
          visualType: 'linked-list',
          visualData: { nodes, prev: null, curr: 0, next: 1, reversedCount: 0 }
        },
        {
          step: 2, totalSteps: 5, action: 'Reverse Node(1) -> null',
          explanation: 'curr.next = prev; prev = curr; curr = next.',
          javaLine: 6, variables: { prev: 1, curr: 2 },
          visualType: 'linked-list',
          visualData: { nodes, prev: 0, curr: 1, next: 2, reversedCount: 1 }
        },
        {
          step: 3, totalSteps: 5, action: 'Reverse Node(2) -> Node(1)',
          explanation: 'Chain is now: null <- 1 <- 2. Pointers advance.',
          javaLine: 7, variables: { prev: 2, curr: 3 },
          visualType: 'linked-list',
          visualData: { nodes, prev: 1, curr: 2, next: 3, reversedCount: 2 }
        },
        {
          step: 4, totalSteps: 5, action: 'Reverse Remaining Nodes',
          explanation: 'Chain is now: null <- 1 <- 2 <- 3 <- 4 <- 5.',
          javaLine: 7, variables: { prev: 5, curr: 'null' },
          visualType: 'linked-list',
          visualData: { nodes, prev: 4, curr: null, next: null, reversedCount: 5 }
        },
        {
          step: 5, totalSteps: 5, action: 'Return prev = Node(5)',
          explanation: 'All links reversed in O(N) single pass and O(1) space!',
          javaLine: 10, variables: { newHead: 5, result: '[5, 4, 3, 2, 1]' },
          visualType: 'linked-list',
          visualData: { nodes, prev: 4, curr: null, next: null, reversedCount: 5, solved: true }
        }
      ];
    }

    case 'linked-list-cycle': {
      const nodes = [3, 2, 0, -4];
      return [
        {
          step: 1, totalSteps: 4, action: 'Init Slow and Fast at Head (3)',
          explanation: 'Floyd\'s Cycle-Finding Algorithm. Slow moves 1 step, Fast moves 2 steps.',
          javaLine: 3, variables: { slow: 3, fast: 3 },
          visualType: 'linked-list',
          visualData: { nodes, slow: 0, fast: 0, cycleIndex: 1 }
        },
        {
          step: 2, totalSteps: 4, action: 'First Leap: slow=Node(2), fast=Node(0)',
          explanation: 'Fast outpaces slow. Cycle loops Node(-4) back to Node(2).',
          javaLine: 6, variables: { slow: 2, fast: 0 },
          visualType: 'linked-list',
          visualData: { nodes, slow: 1, fast: 2, cycleIndex: 1 }
        },
        {
          step: 3, totalSteps: 4, action: 'Second Leap: slow=Node(0), fast=Node(2)',
          explanation: 'Fast looped around the cycle and is now right behind slow!',
          javaLine: 6, variables: { slow: 0, fast: 1 },
          visualType: 'linked-list',
          visualData: { nodes, slow: 2, fast: 1, cycleIndex: 1 }
        },
        {
          step: 4, totalSteps: 4, action: 'Collision! slow == fast at Node(-4)',
          explanation: 'Collision detected! A cycle definitively exists in O(N) time and O(1) space.',
          javaLine: 7, variables: { collisionNode: -4, result: 'true' },
          visualType: 'linked-list',
          visualData: { nodes, slow: 3, fast: 3, cycleIndex: 1, solved: true }
        }
      ];
    }

    // --- STRING ---
    case 'longest-substring-without-repeating-characters': {
      const str = 'abcabcbb';
      return [
        {
          step: 1, totalSteps: 4, action: 'Init: l=0, r=0, seen={}',
          explanation: 'Initialize sliding window and character frequency set.',
          javaLine: 3, variables: { l: 0, r: 0, maxLen: 0 },
          visualType: 'sliding-window',
          visualData: { text: str, left: 0, right: 0, set: [] }
        },
        {
          step: 2, totalSteps: 4, action: 'Expand Right through "abc"',
          explanation: 'No duplicates: seen={\'a\', \'b\', \'c\'}. Window length = 3.',
          javaLine: 8, variables: { l: 0, r: 2, maxLen: 3 },
          visualType: 'sliding-window',
          visualData: { text: str, left: 0, right: 2, set: ['a', 'b', 'c'] }
        },
        {
          step: 3, totalSteps: 4, action: 'Duplicate "a" Encountered!',
          explanation: 'Shrink left pointer, removing \'a\'. Now valid again: seen={\'b\', \'c\', \'a\'}.',
          javaLine: 6, variables: { l: 1, r: 3, duplicate: 'a' },
          visualType: 'sliding-window',
          visualData: { text: str, left: 1, right: 3, set: ['b', 'c', 'a'], duplicate: 'a' }
        },
        {
          step: 4, totalSteps: 4, action: 'Final Answer = 3 ("abc")',
          explanation: 'Longest unique substring length is 3 in O(N) time.',
          javaLine: 12, variables: { maxLen: 3, result: 3 },
          visualType: 'sliding-window',
          visualData: { text: str, left: 1, right: 3, set: ['b', 'c', 'a'], solved: true }
        }
      ];
    }

    case 'valid-parentheses': {
      return [
        {
          step: 1, totalSteps: 4, action: 'Push "(" to Stack',
          explanation: 'Opening bracket detected. Push matching closing ")" to stack.',
          javaLine: 4, variables: { char: '(', stack: "['(']" },
          visualType: 'stack-pipe',
          visualData: { stream: ['(', '{', '}', ')'], streamIndex: 0, stack: ['('] }
        },
        {
          step: 2, totalSteps: 4, action: 'Push "{" to Stack',
          explanation: 'Opening bracket detected. Stack now has 2 elements: ["(", "{"].',
          javaLine: 4, variables: { char: '{', stack: "['(', '{']" },
          visualType: 'stack-pipe',
          visualData: { stream: ['(', '{', '}', ')'], streamIndex: 1, stack: ['(', '{'] }
        },
        {
          step: 3, totalSteps: 4, action: 'Closing "}" Matches Top!',
          explanation: 'stack.pop() matches "{"! Valid LIFO pair eliminated.',
          javaLine: 8, variables: { char: '}', popped: '{', stack: "['(']" },
          visualType: 'stack-pipe',
          visualData: { stream: ['(', '{', '}', ')'], streamIndex: 2, stack: ['('], matchStatus: 'Matched {}' }
        },
        {
          step: 4, totalSteps: 4, action: 'Closing ")" Matches! Stack Empty!',
          explanation: 'All brackets paired and cancelled. Stack isEmpty() -> Valid!',
          javaLine: 12, variables: { stack: '[]', result: 'true' },
          visualType: 'stack-pipe',
          visualData: { stream: ['(', '{', '}', ')'], streamIndex: 3, stack: [], matchStatus: 'All Paired!', solved: true }
        }
      ];
    }

    // --- DYNAMIC PROGRAMMING ---
    case 'climbing-stairs': {
      return [
        {
          step: 1, totalSteps: 4, action: 'Base Cases at Stair 5',
          explanation: 'To reach step 5 from step 4 is 1 way. From step 5 is 1 way. one=1, two=1.',
          javaLine: 3, variables: { one: 1, two: 1, step: 5 },
          visualType: 'dp-grid',
          visualData: { dpTable: [1, 2, 3, 5, 8], activeIndex: 0, label: 'Fibonacci State' }
        },
        {
          step: 2, totalSteps: 4, action: 'Step Backwards: Calculate ways(3)',
          explanation: 'temp = one; one = one + two = 2; two = 1.',
          javaLine: 5, variables: { one: 2, two: 1 },
          visualType: 'dp-grid',
          visualData: { dpTable: [1, 2, 3, 5, 8], activeIndex: 1, label: 'dp[3] = dp[4] + dp[5]' }
        },
        {
          step: 3, totalSteps: 4, action: 'Step Backwards: Calculate ways(2)',
          explanation: 'one = 2 + 1 = 3; two = 2.',
          javaLine: 6, variables: { one: 3, two: 2 },
          visualType: 'dp-grid',
          visualData: { dpTable: [1, 2, 3, 5, 8], activeIndex: 2, label: 'dp[2] = 3' }
        },
        {
          step: 4, totalSteps: 4, action: 'Reach Step 1: Total 8 Ways',
          explanation: 'Final answer = 8 distinct ways in O(N) time and O(1) space!',
          javaLine: 8, variables: { result: 8 },
          visualType: 'dp-grid',
          visualData: { dpTable: [1, 2, 3, 5, 8], activeIndex: 4, label: 'Complete!', solved: true }
        }
      ];
    }

    case 'coin-change': {
      return [
        {
          step: 1, totalSteps: 5, action: 'Initialize DP Table for Amount 7',
          explanation: 'dp[0] = 0 (0 coins for 0). Fill dp[1..7] with infinity sentinel (amount + 1).',
          javaLine: 4, variables: { amount: 7, 'dp[0]': 0 },
          visualType: 'dp-grid',
          visualData: { dpTable: [0, 8, 8, 8, 8, 8, 8, 8], activeIndex: 0, label: 'Coins: [1, 3, 4, 5]' }
        },
        {
          step: 2, totalSteps: 5, action: 'Calculate Amount a = 1..3',
          explanation: 'dp[1]=1 (coin 1), dp[2]=2 (1+1), dp[3]=1 (coin 3).',
          javaLine: 8, variables: { a: 3, 'dp[3]': 1 },
          visualType: 'dp-grid',
          visualData: { dpTable: [0, 1, 2, 1, 8, 8, 8, 8], activeIndex: 3, label: 'Subproblem optimal' }
        },
        {
          step: 3, totalSteps: 5, action: 'Calculate Amount a = 4',
          explanation: 'Using coin 4: 1 + dp[0] = 1 coin. Using coin 1: 1 + dp[3] = 2. Min = 1 coin!',
          javaLine: 9, variables: { a: 4, 'dp[4]': 1 },
          visualType: 'dp-grid',
          visualData: { dpTable: [0, 1, 2, 1, 1, 8, 8, 8], activeIndex: 4, label: 'dp[4] = 1' }
        },
        {
          step: 4, totalSteps: 5, action: 'Calculate Amount a = 7',
          explanation: 'Coin 4 + dp[3]=1+1=2 coins! Coin 3 + dp[4]=1+1=2 coins. Optimal = 2 coins (3 + 4)!',
          javaLine: 11, variables: { a: 7, 'dp[7]': 2 },
          visualType: 'dp-grid',
          visualData: { dpTable: [0, 1, 2, 1, 1, 2, 2, 2], activeIndex: 7, label: 'dp[7] = 2 (Coins: 3 + 4)' }
        },
        {
          step: 5, totalSteps: 5, action: 'Result: 2 Coins',
          explanation: 'Greedy would pick 5+1+1=3 coins. DP finds the true global minimum: 2 coins!',
          javaLine: 13, variables: { result: 2 },
          visualType: 'dp-grid',
          visualData: { dpTable: [0, 1, 2, 1, 1, 2, 2, 2], activeIndex: 7, label: 'Solved!', solved: true }
        }
      ];
    }

    // --- TREE ---
    case 'invert-binary-tree': {
      return [
        {
          step: 1, totalSteps: 4, action: 'Root Node (4) Inspection',
          explanation: 'Check if root is null. Prepare to swap left (2) and right (7).',
          javaLine: 3, variables: { root: 4, left: 2, right: 7 },
          visualType: 'tree-node',
          visualData: {
            nodes: [
              { val: 4, left: 2, right: 7, state: 'active' },
              { val: 2, left: 1, right: 3, state: 'unvisited' },
              { val: 7, left: 6, right: 9, state: 'unvisited' }
            ],
            activeNode: 4, currentCall: 'invertTree(4)'
          }
        },
        {
          step: 2, totalSteps: 4, action: 'Swap Left and Right Children',
          explanation: 'TreeNode temp = root.left; root.left = root.right; root.right = temp.',
          javaLine: 6, variables: { 'root.left': 7, 'root.right': 2 },
          visualType: 'tree-node',
          visualData: {
            nodes: [
              { val: 4, left: 7, right: 2, state: 'active' },
              { val: 7, left: 6, right: 9, state: 'visited' },
              { val: 2, left: 1, right: 3, state: 'visited' }
            ],
            activeNode: 4, currentCall: 'Swapped children of 4'
          }
        },
        {
          step: 3, totalSteps: 4, action: 'Recursively Invert Subtrees',
          explanation: 'invertTree(root.left) and invertTree(root.right) swaps grandchildren.',
          javaLine: 8, variables: { status: 'Subtrees inverted' },
          visualType: 'tree-node',
          visualData: {
            nodes: [
              { val: 4, left: 7, right: 2, state: 'visited' },
              { val: 7, left: 9, right: 6, state: 'visited' },
              { val: 2, left: 3, right: 1, state: 'visited' }
            ],
            activeNode: 7, currentCall: 'invertTree(7) & invertTree(2)'
          }
        },
        {
          step: 4, totalSteps: 4, action: 'Tree Inversion Complete',
          explanation: 'Mirror image created in O(N) time with O(h) recursion space!',
          javaLine: 10, variables: { result: 'Inverted' },
          visualType: 'tree-node',
          visualData: {
            nodes: [
              { val: 4, left: 7, right: 2, state: 'done' },
              { val: 7, left: 9, right: 6, state: 'done' },
              { val: 2, left: 3, right: 1, state: 'done' }
            ],
            activeNode: 4, result: 'Complete', solved: true
          }
        }
      ];
    }

    // --- GRAPH ---
    case 'number-of-islands': {
      return [
        {
          step: 1, totalSteps: 4, action: 'Scan Grid: Encounter Land "1" at (0, 0)',
          explanation: 'Found unvisited land! Increment islandCount = 1 and trigger DFS sink.',
          javaLine: 5, variables: { r: 0, c: 0, islandCount: 1 },
          visualType: 'matrix-grid',
          visualData: {
            grid: [['1', '1', '0'], ['1', '0', '0'], ['0', '0', '1']],
            activeCell: [0, 0],
            visitedCells: [],
            label: 'Island #1 Discovered'
          }
        },
        {
          step: 2, totalSteps: 4, action: 'DFS Flood Fill: Sink Island #1',
          explanation: 'Recursively convert connected land cells from "1" to "0".',
          javaLine: 11, variables: { 'grid[0][0]': '0', 'grid[0][1]': '0', 'grid[1][0]': '0' },
          visualType: 'matrix-grid',
          visualData: {
            grid: [['0', '0', '0'], ['0', '0', '0'], ['0', '0', '1']],
            activeCell: [0, 1],
            visitedCells: [[0, 0], [0, 1], [1, 0]],
            label: 'Island #1 Sunk to Water'
          }
        },
        {
          step: 3, totalSteps: 4, action: 'Continue Scan: Island #2 at (2, 2)',
          explanation: 'Found isolated land at bottom right! Increment islandCount = 2.',
          javaLine: 5, variables: { r: 2, c: 2, islandCount: 2 },
          visualType: 'matrix-grid',
          visualData: {
            grid: [['0', '0', '0'], ['0', '0', '0'], ['0', '0', '1']],
            activeCell: [2, 2],
            visitedCells: [[0, 0], [0, 1], [1, 0]],
            label: 'Island #2 Discovered'
          }
        },
        {
          step: 4, totalSteps: 4, action: 'Grid Traversal Complete: 2 Islands',
          explanation: 'All cells scanned in O(M*N) time without extra memory!',
          javaLine: 8, variables: { islandCount: 2, result: 2 },
          visualType: 'matrix-grid',
          visualData: {
            grid: [['0', '0', '0'], ['0', '0', '0'], ['0', '0', '0']],
            activeCell: [2, 2],
            visitedCells: [[0, 0], [0, 1], [1, 0], [2, 2]],
            label: 'Total Islands: 2',
            solved: true
          }
        }
      ];
    }

    // --- INTERVAL ---
    case 'merge-intervals': {
      const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
      return [
        {
          step: 1, totalSteps: 4, action: 'Sort Intervals by Start Time',
          explanation: 'Arrays.sort by interval[0]. Output begins with [1, 3].',
          javaLine: 3, variables: { intervals: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,3]]' },
          visualType: 'interval-sweep',
          visualData: { intervals, activeIndex: 0, merged: [[1, 3]] }
        },
        {
          step: 2, totalSteps: 4, action: 'Compare [2, 6] with [1, 3]',
          explanation: 'Overlap detected! 2 <= 3. Stretch end: max(3, 6) = 6. Merged to [1, 6].',
          javaLine: 8, variables: { curr: '[2,6]', lastEnd: 3, newEnd: 6 },
          visualType: 'interval-sweep',
          visualData: { intervals, activeIndex: 1, merged: [[1, 6]] }
        },
        {
          step: 3, totalSteps: 4, action: 'Compare [8, 10] with [1, 6]',
          explanation: 'No overlap (8 > 6). Append [8, 10] directly to output.',
          javaLine: 11, variables: { curr: '[8,10]', merged: '[[1,6],[8,10]]' },
          visualType: 'interval-sweep',
          visualData: { intervals, activeIndex: 2, merged: [[1, 6], [8, 10]] }
        },
        {
          step: 4, totalSteps: 4, action: 'Append [15, 18] -> Final Result',
          explanation: 'Merged intervals: [[1, 6], [8, 10], [15, 18]] in O(N log N) time.',
          javaLine: 14, variables: { result: '[[1,6],[8,10],[15,18]]' },
          visualType: 'interval-sweep',
          visualData: { intervals, activeIndex: 3, merged: [[1, 6], [8, 10], [15, 18]], solved: true }
        }
      ];
    }

    // --- HEAP ---
    case 'find-median-from-data-stream': {
      return [
        {
          step: 1, totalSteps: 4, action: 'Init Dual PriorityQueues',
          explanation: 'small (Max-Heap for lower 50%), large (Min-Heap for upper 50%).',
          javaLine: 5, variables: { small: '[]', large: '[]' },
          visualType: 'heap-balance',
          visualData: { maxHeap: [], minHeap: [], label: 'Empty Heaps' }
        },
        {
          step: 2, totalSteps: 4, action: 'Add 3 and 1 to Stream',
          explanation: 'Max-Heap contains [3, 1]. Peek = 3.',
          javaLine: 9, variables: { maxHeap: '[3, 1]', minHeap: '[]', median: 3 },
          visualType: 'heap-balance',
          visualData: { maxHeap: [3, 1], minHeap: [], activeNum: 3, median: 3, label: 'Odd count: median = small.peek()' }
        },
        {
          step: 3, totalSteps: 4, action: 'Add 5 and Balance Heaps',
          explanation: '5 offered to large (Min-Heap). Sizes equal (2 and 1 or 1 and 2).',
          javaLine: 14, variables: { maxHeap: '[3, 1]', minHeap: '[5]' },
          visualType: 'heap-balance',
          visualData: { maxHeap: [3, 1], minHeap: [5], activeNum: 5, median: 3, label: 'Balanced: diff <= 1' }
        },
        {
          step: 4, totalSteps: 4, action: 'Add 7: Calculate Median (3 + 5) / 2 = 4.0',
          explanation: 'Equal sizes (2 & 2): median is average of small.peek() (3) and large.peek() (5) = 4.0!',
          javaLine: 20, variables: { median: 4.0, result: 4.0 },
          visualType: 'heap-balance',
          visualData: { maxHeap: [3, 1], minHeap: [5, 7], median: 4.0, label: 'Median = (3 + 5) / 2.0 = 4.0', solved: true }
        }
      ];
    }
  }

  return null;
}

// =========================================================================
// UNIVERSAL DYNAMIC SIMULATION GENERATOR (COVERS ALL 75 PROBLEMS)
// =========================================================================
function generateDynamicSimulationFromFlow(p: Problem): SimFrame[] {
  const flow = p.flow && p.flow.length >= 3 ? p.flow : [
    'Initialize pointers and state tracking variables.',
    'Iterate through input and check invariant.',
    'Update optimal answer and maintain boundaries.',
    'Return final computed result.'
  ];

  const category = p.category;

  if (category === 'Tree') {
    return [
      {
        step: 1, totalSteps: 4, action: flow[0] || 'Inspect Root Node',
        explanation: 'Check if root == null (base case). Setup recursion or queue.',
        javaLine: 3, variables: { node: 'root', pattern: p.pattern },
        visualType: 'tree-node',
        visualData: {
          nodes: [
            { val: 10, left: 5, right: 15, state: 'active' },
            { val: 5, left: 2, right: 7, state: 'unvisited' },
            { val: 15, left: 12, right: 20, state: 'unvisited' }
          ],
          activeNode: 10, currentCall: 'traverse(root)'
        }
      },
      {
        step: 2, totalSteps: 4, action: flow[1] || 'Recurse on Left Subtree',
        explanation: p.hook,
        javaLine: 6, variables: { node: 'left (5)', status: 'Recursing' },
        visualType: 'tree-node',
        visualData: {
          nodes: [
            { val: 10, left: 5, right: 15, state: 'visited' },
            { val: 5, left: 2, right: 7, state: 'active' },
            { val: 15, left: 12, right: 20, state: 'unvisited' }
          ],
          activeNode: 5, currentCall: 'traverse(5)'
        }
      },
      {
        step: 3, totalSteps: 4, action: flow[2] || 'Recurse on Right Subtree',
        explanation: 'Evaluate right child and compute subproblem result.',
        javaLine: 8, variables: { node: 'right (15)', status: 'Combining' },
        visualType: 'tree-node',
        visualData: {
          nodes: [
            { val: 10, left: 5, right: 15, state: 'visited' },
            { val: 5, left: 2, right: 7, state: 'visited' },
            { val: 15, left: 12, right: 20, state: 'active' }
          ],
          activeNode: 15, currentCall: 'traverse(15)'
        }
      },
      {
        step: 4, totalSteps: 4, action: flow[3] || 'Return Optimal Result',
        explanation: `Solved in ${p.complexity.time} time and ${p.complexity.space} space!`,
        javaLine: 11, variables: { result: 'Optimal', time: p.complexity.time },
        visualType: 'tree-node',
        visualData: {
          nodes: [
            { val: 10, left: 5, right: 15, state: 'done' },
            { val: 5, left: 2, right: 7, state: 'done' },
            { val: 15, left: 12, right: 20, state: 'done' }
          ],
          activeNode: 10, result: 'Complete', solved: true
        }
      }
    ];
  }

  if (category === 'Graph' || category === 'Matrix') {
    return [
      {
        step: 1, totalSteps: 4, action: flow[0] || 'Initialize Grid / Adjacency',
        explanation: 'Set up matrix boundaries and visited state array.',
        javaLine: 3, variables: { rows: 3, cols: 3, status: 'Ready' },
        visualType: 'matrix-grid',
        visualData: {
          grid: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']],
          activeCell: [0, 0],
          visitedCells: [],
          label: 'Start at (0, 0)'
        }
      },
      {
        step: 2, totalSteps: 4, action: flow[1] || 'Explore Neighbors / Cells',
        explanation: p.hook,
        javaLine: 7, variables: { r: 1, c: 1, action: 'Traversing' },
        visualType: 'matrix-grid',
        visualData: {
          grid: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']],
          activeCell: [1, 1],
          visitedCells: [[0, 0], [0, 1], [1, 0]],
          label: 'Active at (1, 1)'
        }
      },
      {
        step: 3, totalSteps: 4, action: flow[2] || 'Update Invariant & Backtrack',
        explanation: 'Mark visited, unwind recursion or advance boundaries.',
        javaLine: 10, variables: { progress: '75%', visited: 6 },
        visualType: 'matrix-grid',
        visualData: {
          grid: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']],
          activeCell: [2, 1],
          visitedCells: [[0, 0], [0, 1], [1, 0], [1, 1], [0, 2], [1, 2]],
          label: 'Shrinking bounds'
        }
      },
      {
        step: 4, totalSteps: 4, action: flow[3] || 'Complete Traversal',
        explanation: `Optimal solution verified in ${p.complexity.time}!`,
        javaLine: 13, variables: { result: 'Success', time: p.complexity.time },
        visualType: 'matrix-grid',
        visualData: {
          grid: [['✓', '✓', '✓'], ['✓', '✓', '✓'], ['✓', '✓', '✓']],
          activeCell: [2, 2],
          visitedCells: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
          label: 'Traversal Complete',
          solved: true
        }
      }
    ];
  }

  if (category === 'Dynamic Programming') {
    return [
      {
        step: 1, totalSteps: 4, action: flow[0] || 'Initialize DP Cache',
        explanation: 'Set up base cases and initial states in DP array.',
        javaLine: 3, variables: { 'dp[0]': 1, size: 6 },
        visualType: 'dp-grid',
        visualData: { dpTable: [1, 0, 0, 0, 0, 0], activeIndex: 0, label: 'Base Case Initialized' }
      },
      {
        step: 2, totalSteps: 4, action: flow[1] || 'Subproblem Transition',
        explanation: p.hook,
        javaLine: 6, variables: { i: 2, 'dp[2]': 2 },
        visualType: 'dp-grid',
        visualData: { dpTable: [1, 1, 2, 0, 0, 0], activeIndex: 2, label: 'Subproblem: dp[2]' }
      },
      {
        step: 3, totalSteps: 4, action: flow[2] || 'Aggregate Optimal Values',
        explanation: 'Apply recurrence relation across previous subproblems.',
        javaLine: 9, variables: { i: 4, 'dp[4]': 5 },
        visualType: 'dp-grid',
        visualData: { dpTable: [1, 1, 2, 3, 5, 0], activeIndex: 4, label: 'Subproblem: dp[4]' }
      },
      {
        step: 4, totalSteps: 4, action: flow[3] || 'Final Answer at dp[N]',
        explanation: `Computed optimal solution in ${p.complexity.time} time!`,
        javaLine: 12, variables: { 'dp[5]': 8, result: 8 },
        visualType: 'dp-grid',
        visualData: { dpTable: [1, 1, 2, 3, 5, 8], activeIndex: 5, label: 'Optimal Result Computed', solved: true }
      }
    ];
  }

  if (category === 'String') {
    const text = 'abcdef';
    return [
      {
        step: 1, totalSteps: 4, action: flow[0] || 'Initialize Pointers & Counters',
        explanation: 'Set up sliding window bounds and character frequency tracking.',
        javaLine: 3, variables: { l: 0, r: 0 },
        visualType: 'sliding-window',
        visualData: { text, left: 0, right: 0, set: ['a'] }
      },
      {
        step: 2, totalSteps: 4, action: flow[1] || 'Expand Window Right',
        explanation: p.hook,
        javaLine: 6, variables: { l: 0, r: 3, windowLen: 4 },
        visualType: 'sliding-window',
        visualData: { text, left: 0, right: 3, set: ['a', 'b', 'c', 'd'] }
      },
      {
        step: 3, totalSteps: 4, action: flow[2] || 'Contract / Verify Invariant',
        explanation: 'Ensure window constraints are strictly maintained.',
        javaLine: 9, variables: { l: 1, r: 4, valid: 'true' },
        visualType: 'sliding-window',
        visualData: { text, left: 1, right: 4, set: ['b', 'c', 'd', 'e'] }
      },
      {
        step: 4, totalSteps: 4, action: flow[3] || 'Return Optimal Substring Result',
        explanation: `Completed in linear ${p.complexity.time} time!`,
        javaLine: 12, variables: { result: 'Optimal', time: p.complexity.time },
        visualType: 'sliding-window',
        visualData: { text, left: 1, right: 4, set: ['b', 'c', 'd', 'e'], solved: true }
      }
    ];
  }

  if (category === 'Interval') {
    const intervals = [[1, 4], [3, 7], [8, 12], [10, 15]];
    return [
      {
        step: 1, totalSteps: 4, action: flow[0] || 'Sort Intervals by Start Time',
        explanation: 'Order intervals to enable linear sweep processing.',
        javaLine: 3, variables: { intervals: '[[1,4],[3,7],[8,12],[10,15]]' },
        visualType: 'interval-sweep',
        visualData: { intervals, activeIndex: 0, merged: [[1, 4]] }
      },
      {
        step: 2, totalSteps: 4, action: flow[1] || 'Detect Overlap Condition',
        explanation: p.hook,
        javaLine: 7, variables: { overlap: 'true', merged: '[1, 7]' },
        visualType: 'interval-sweep',
        visualData: { intervals, activeIndex: 1, merged: [[1, 7]] }
      },
      {
        step: 3, totalSteps: 4, action: flow[2] || 'Process Disjoint Interval',
        explanation: 'No overlap detected with next interval. Append directly.',
        javaLine: 10, variables: { curr: '[8, 12]' },
        visualType: 'interval-sweep',
        visualData: { intervals, activeIndex: 2, merged: [[1, 7], [8, 12]] }
      },
      {
        step: 4, totalSteps: 4, action: flow[3] || 'Merge & Return Final Intervals',
        explanation: `Completed in ${p.complexity.time} optimal time!`,
        javaLine: 13, variables: { result: '[[1,7],[8,15]]' },
        visualType: 'interval-sweep',
        visualData: { intervals, activeIndex: 3, merged: [[1, 7], [8, 15]], solved: true }
      }
    ];
  }

  if (category === 'Heap') {
    return [
      {
        step: 1, totalSteps: 4, action: flow[0] || 'Initialize PriorityQueue',
        explanation: 'Configure heap with custom comparator or dual heap bounds.',
        javaLine: 3, variables: { heapSize: 0 },
        visualType: 'heap-balance',
        visualData: { maxHeap: [3], minHeap: [7], label: 'Heap Initialized' }
      },
      {
        step: 2, totalSteps: 4, action: flow[1] || 'Insert Elements into Heap',
        explanation: p.hook,
        javaLine: 6, variables: { element: 5, heapSize: 3 },
        visualType: 'heap-balance',
        visualData: { maxHeap: [5, 3], minHeap: [7], activeNum: 5, label: 'Sift-up operation' }
      },
      {
        step: 3, totalSteps: 4, action: flow[2] || 'Maintain Heap Capacity & Balance',
        explanation: 'Prune excess elements or balance sizes for O(1) peek.',
        javaLine: 9, variables: { peek: 5 },
        visualType: 'heap-balance',
        visualData: { maxHeap: [5, 3], minHeap: [7, 9], activeNum: 9, label: 'Balanced' }
      },
      {
        step: 4, totalSteps: 4, action: flow[3] || 'Extract Optimal Extrema',
        explanation: `Maintained in ${p.complexity.time} time!`,
        javaLine: 12, variables: { result: 5, time: p.complexity.time },
        visualType: 'heap-balance',
        visualData: { maxHeap: [5, 3], minHeap: [7, 9], median: 5, label: 'Result Found', solved: true }
      }
    ];
  }

  // Default array / two-pointer representation for Arrays & Binary
  const sampleArr = [3, 7, 2, 8, 5];
  return [
    {
      step: 1, totalSteps: 4, action: flow[0] || 'Initialize Pointers & Invariants',
      explanation: 'Set up variables and scan boundaries.',
      javaLine: 3, variables: { i: 0, len: 5 },
      visualType: 'array-pointers',
      visualData: { elements: sampleArr, pointers: [{ name: 'i', index: 0 }], highlightIndices: [0] }
    },
    {
      step: 2, totalSteps: 4, action: flow[1] || 'Scan & Evaluate Invariant',
      explanation: p.hook,
      javaLine: 6, variables: { i: 2, curr: 2 },
      visualType: 'array-pointers',
      visualData: { elements: sampleArr, pointers: [{ name: 'i', index: 2 }], highlightIndices: [2] }
    },
    {
      step: 3, totalSteps: 4, action: flow[2] || 'Advance State & Update Maximum',
      explanation: 'Condition met. Advance pointers or record best candidate.',
      javaLine: 9, variables: { i: 4, best: 8 },
      visualType: 'array-pointers',
      visualData: { elements: sampleArr, pointers: [{ name: 'i', index: 4 }], highlightIndices: [3] }
    },
    {
      step: 4, totalSteps: 4, action: flow[3] || 'Return Optimal Result',
      explanation: `Solved in ${p.complexity.time} time and ${p.complexity.space} space!`,
      javaLine: 12, variables: { result: 'Optimal', time: p.complexity.time },
      visualType: 'array-pointers',
      visualData: { elements: sampleArr, pointers: [{ name: '★', index: 3 }], highlightIndices: [3], solved: true }
    }
  ];
}
