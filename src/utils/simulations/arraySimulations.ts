import type { SimFrame } from './types';

export const arraySimulations: Record<string, SimFrame[]> = {
  'two-sum': [
    {
      step: 1, totalSteps: 4, action: 'Initialize HashMap',
      explanation: 'Create empty Map<Integer, Integer> prevMap to store value -> index for O(1) difference lookup.',
      javaLine: 3, variables: { target: 9, prevMap: '{}' },
      visualType: 'array-pointers',
      visualData: { elements: [2, 7, 11, 15], pointers: [{ name: 'i', index: -1 }], activeMap: {}, highlightIndices: [] }
    },
    {
      step: 2, totalSteps: 4, action: 'Examine nums[0] = 2',
      explanation: 'diff = 9 - 2 = 7. Is 7 in prevMap? No. Store prevMap.put(2, 0).',
      javaLine: 5, variables: { i: 0, 'nums[i]': 2, diff: 7, prevMap: '{2: 0}' },
      visualType: 'array-pointers',
      visualData: { elements: [2, 7, 11, 15], pointers: [{ name: 'i', index: 0 }], activeMap: { '2': 0 }, highlightIndices: [0] }
    },
    {
      step: 3, totalSteps: 4, action: 'Examine nums[1] = 7',
      explanation: 'diff = 9 - 7 = 2. Is 2 in prevMap? YES! It exists at index 0!',
      javaLine: 6, variables: { i: 1, 'nums[i]': 7, diff: 2, 'prevMap[diff]': 0 },
      visualType: 'array-pointers',
      visualData: { elements: [2, 7, 11, 15], pointers: [{ name: 'i', index: 1 }], activeMap: { '2': 0 }, highlightIndices: [0, 1] }
    },
    {
      step: 4, totalSteps: 4, action: 'Return Solution Pair [0, 1]',
      explanation: 'Match found: return new int[]{0, 1}. Total time O(N), Space O(N).',
      javaLine: 7, variables: { result: '[0, 1]' },
      visualType: 'array-pointers',
      visualData: { elements: [2, 7, 11, 15], pointers: [{ name: '✓', index: 0 }, { name: '✓', index: 1 }], activeMap: { '2': 0 }, highlightIndices: [0, 1], solved: true }
    }
  ],

  'best-time-to-buy-and-sell-stock': [
    {
      step: 1, totalSteps: 5, action: 'Start at Day 0 & Day 1',
      explanation: 'prices[l]=7, prices[r]=1. Buying at 7 and selling at 1 is a loss!',
      javaLine: 3, variables: { l: 0, r: 1, maxProfit: 0 },
      visualType: 'array-pointers',
      visualData: { elements: [7, 1, 5, 3, 6, 4], pointers: [{ name: 'Buy (l)', index: 0 }, { name: 'Sell (r)', index: 1 }] }
    },
    {
      step: 2, totalSteps: 5, action: 'Drop to New Valley (l = r)',
      explanation: 'Found cheaper buy price! Move Buy pointer: l = 1 ($1). Advance r to 2 ($5).',
      javaLine: 6, variables: { l: 1, r: 2, buyPrice: 1, currentPrice: 5 },
      visualType: 'array-pointers',
      visualData: { elements: [7, 1, 5, 3, 6, 4], pointers: [{ name: 'Buy (l)', index: 1 }, { name: 'Sell (r)', index: 2 }], highlightIndices: [1] }
    },
    {
      step: 3, totalSteps: 5, action: 'Profit Window: $5 - $1 = $4',
      explanation: 'Sell at 5 for $4 profit! Record new maxProfit = 4. Advance r to 3 ($3).',
      javaLine: 7, variables: { l: 1, r: 2, profit: 4, maxProfit: 4 },
      visualType: 'array-pointers',
      visualData: { elements: [7, 1, 5, 3, 6, 4], pointers: [{ name: 'Buy (l)', index: 1 }, { name: 'Sell (r)', index: 2 }], highlightIndices: [1, 2] }
    },
    {
      step: 4, totalSteps: 5, action: 'Peak Day 4: Sell at $6! Profit = $5',
      explanation: 'prices[4]=6. Profit = 6 - 1 = $5! New global maximum profit!',
      javaLine: 7, variables: { l: 1, r: 4, profit: 5, maxProfit: 5 },
      visualType: 'array-pointers',
      visualData: { elements: [7, 1, 5, 3, 6, 4], pointers: [{ name: 'Buy (l)', index: 1 }, { name: 'Sell (r)', index: 4 }], highlightIndices: [1, 4] }
    },
    {
      step: 5, totalSteps: 5, action: 'Scan Complete: Max Profit = $5',
      explanation: 'Single O(N) linear sweep with two pointers finds optimal transaction!',
      javaLine: 10, variables: { maxProfit: 5, result: 5 },
      visualType: 'array-pointers',
      visualData: { elements: [7, 1, 5, 3, 6, 4], pointers: [{ name: '★ Buy $1', index: 1 }, { name: '★ Sell $6', index: 4 }], highlightIndices: [1, 4], solved: true }
    }
  ],

  'contains-duplicate': [
    {
      step: 1, totalSteps: 4, action: 'Init Empty HashSet',
      explanation: 'Use Set<Integer> seen = new HashSet<>() for O(1) membership checks.',
      javaLine: 3, variables: { seen: '{}' },
      visualType: 'array-pointers',
      visualData: { elements: [1, 2, 3, 1], pointers: [{ name: 'i', index: 0 }], activeMap: {} }
    },
    {
      step: 2, totalSteps: 4, action: 'Add 1 and 2 to Set',
      explanation: 'seen.add(1) = true; seen.add(2) = true. No duplicates yet.',
      javaLine: 5, variables: { seen: '{1, 2}' },
      visualType: 'array-pointers',
      visualData: { elements: [1, 2, 3, 1], pointers: [{ name: 'i', index: 1 }], activeMap: { '1': '✓', '2': '✓' }, highlightIndices: [0, 1] }
    },
    {
      step: 3, totalSteps: 4, action: 'Add 3 to Set',
      explanation: 'seen.add(3) = true. Set now contains {1, 2, 3}. Next element is 1.',
      javaLine: 5, variables: { seen: '{1, 2, 3}' },
      visualType: 'array-pointers',
      visualData: { elements: [1, 2, 3, 1], pointers: [{ name: 'i', index: 2 }], activeMap: { '1': '✓', '2': '✓', '3': '✓' }, highlightIndices: [0, 1, 2] }
    },
    {
      step: 4, totalSteps: 4, action: 'Collision! seen.add(1) == false!',
      explanation: '1 is already in the HashSet! Duplicate found immediately in O(N) time and O(N) space.',
      javaLine: 6, variables: { duplicate: 1, result: 'true' },
      visualType: 'array-pointers',
      visualData: { elements: [1, 2, 3, 1], pointers: [{ name: 'DUP', index: 0 }, { name: 'DUP', index: 3 }], activeMap: { '1': 'DUPLICATE!' }, highlightIndices: [0, 3], solved: true }
    }
  ],

  'product-of-array-except-self': [
    {
      step: 1, totalSteps: 4, action: 'Init Output Array with Prefix 1',
      explanation: 'res[0] = 1. Prefix product passes left to right without division.',
      javaLine: 4, variables: { nums: '[1, 2, 3, 4]', prefix: 1, 'res[0]': 1 },
      visualType: 'array-pointers',
      visualData: { elements: [1, 2, 3, 4], pointers: [{ name: 'prefix', index: 0 }] }
    },
    {
      step: 2, totalSteps: 4, action: 'Left Prefix Sweep',
      explanation: 'res[i] = prefix; prefix *= nums[i]. Result after pass: [1, 1, 2, 6].',
      javaLine: 6, variables: { res: '[1, 1, 2, 6]' },
      visualType: 'array-pointers',
      visualData: { elements: [1, 1, 2, 6], pointers: [{ name: 'prefix', index: 3 }] }
    },
    {
      step: 3, totalSteps: 4, action: 'Right Postfix Sweep',
      explanation: 'postfix starts at 1. res[i] *= postfix; postfix *= nums[i] moving backwards.',
      javaLine: 10, variables: { postfix: 4, 'res[2]': 8 },
      visualType: 'array-pointers',
      visualData: { elements: [1, 1, 8, 6], pointers: [{ name: 'postfix', index: 2 }] }
    },
    {
      step: 4, totalSteps: 4, action: 'Final Output: [24, 12, 8, 6]',
      explanation: 'All elements multiplied in O(N) time without using the division operator!',
      javaLine: 14, variables: { result: '[24, 12, 8, 6]' },
      visualType: 'array-pointers',
      visualData: { elements: [24, 12, 8, 6], pointers: [{ name: '★', index: 0 }, { name: '★', index: 3 }], solved: true }
    }
  ],

  'maximum-subarray': [
    {
      step: 1, totalSteps: 5, action: 'Start with nums[0] = -2',
      explanation: 'curSum = -2, maxSub = -2. Negative sum will be reset to 0.',
      javaLine: 4, variables: { n: -2, curSum: -2, maxSub: -2 },
      visualType: 'array-pointers',
      visualData: { elements: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: 'curr', index: 0 }], curSum: -2, maxSub: -2 }
    },
    {
      step: 2, totalSteps: 5, action: 'curSum < 0 -> Purge debt to 0!',
      explanation: 'Negative running sum discarded. Add 1 -> curSum = 1, maxSub = 1.',
      javaLine: 6, variables: { n: 1, curSum: 1, maxSub: 1 },
      visualType: 'array-pointers',
      visualData: { elements: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: 'curr', index: 1 }], curSum: 1, maxSub: 1 }
    },
    {
      step: 3, totalSteps: 5, action: 'Encounter 4 -> Fresh positive run',
      explanation: 'curSum was reset, now building positive momentum: curSum = 4, maxSub = 4.',
      javaLine: 7, variables: { n: 4, curSum: 4, maxSub: 4 },
      visualType: 'array-pointers',
      visualData: { elements: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: 'curr', index: 3 }], curSum: 4, maxSub: 4 }
    },
    {
      step: 4, totalSteps: 5, action: 'Accumulate [4, -1, 2, 1]',
      explanation: 'Running sum reaches 4 - 1 + 2 + 1 = 6. MaxSub updated to 6!',
      javaLine: 7, variables: { curSum: 6, maxSub: 6 },
      visualType: 'array-pointers',
      visualData: { elements: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: 'curr', index: 6 }], curSum: 6, maxSub: 6 }
    },
    {
      step: 5, totalSteps: 5, action: 'Finish Scan: Max Subarray = 6',
      explanation: 'Contiguous subarray [4, -1, 2, 1] achieves the maximum sum of 6!',
      javaLine: 10, variables: { maxSub: 6, result: 6 },
      visualType: 'array-pointers',
      visualData: { elements: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: '★', index: 3 }, { name: '★', index: 6 }], highlightIndices: [3, 4, 5, 6], curSum: 6, maxSub: 6, solved: true }
    }
  ],

  'maximum-product-subarray': [
    {
      step: 1, totalSteps: 4, action: 'Initialize Max and Min Trackers',
      explanation: 'Track both curMax and curMin because a negative number can turn a minimum into a maximum.',
      javaLine: 4, variables: { res: 2, curMax: 2, curMin: 2 },
      visualType: 'array-pointers',
      visualData: { elements: [2, 3, -2, 4], pointers: [{ name: 'i', index: 0 }], highlightIndices: [0] }
    },
    {
      step: 2, totalSteps: 4, action: 'Multiply by 3: curMax = 6',
      explanation: 'curMax = max(3, 2 * 3, 2 * 3) = 6. curMin = 3. Global res = 6.',
      javaLine: 7, variables: { n: 3, curMax: 6, curMin: 3, res: 6 },
      visualType: 'array-pointers',
      visualData: { elements: [2, 3, -2, 4], pointers: [{ name: 'i', index: 1 }], highlightIndices: [0, 1] }
    },
    {
      step: 3, totalSteps: 4, action: 'Encounter Negative (-2): Swap Max & Min',
      explanation: 'Negative factor flips signs! curMax = max(-2, 6 * -2, 3 * -2) = -2, curMin = -12.',
      javaLine: 8, variables: { n: -2, curMax: -2, curMin: -12, res: 6 },
      visualType: 'array-pointers',
      visualData: { elements: [2, 3, -2, 4], pointers: [{ name: 'i', index: 2 }], highlightIndices: [1, 2] }
    },
    {
      step: 4, totalSteps: 4, action: 'Finish with 4: Maximum Product = 6',
      explanation: 'Contiguous subarray [2, 3] gives maximum product 6 in O(N) time and O(1) space!',
      javaLine: 12, variables: { res: 6 },
      visualType: 'array-pointers',
      visualData: { elements: [2, 3, -2, 4], pointers: [{ name: '★', index: 0 }, { name: '★', index: 1 }], highlightIndices: [0, 1], solved: true }
    }
  ],

  'find-minimum-in-rotated-sorted-array': [
    {
      step: 1, totalSteps: 4, action: 'Initialize Binary Search: l=0, r=6',
      explanation: 'nums[l]=4, nums[r]=2. Since nums[l] > nums[r], array is rotated!',
      javaLine: 3, variables: { l: 0, r: 6, 'nums[l]': 4, 'nums[r]': 2 },
      visualType: 'array-pointers',
      visualData: { elements: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: 'L', index: 0 }, { name: 'R', index: 6 }] }
    },
    {
      step: 2, totalSteps: 4, action: 'Examine Mid = 3 (val 7)',
      explanation: 'nums[mid] >= nums[l] (7 >= 4): left half is normally sorted. Inflection must be in right half! l = mid + 1 = 4.',
      javaLine: 6, variables: { mid: 3, 'nums[mid]': 7, l: 4, r: 6 },
      visualType: 'array-pointers',
      visualData: { elements: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: 'L', index: 4 }, { name: 'M', index: 3 }, { name: 'R', index: 6 }] }
    },
    {
      step: 3, totalSteps: 4, action: 'Examine New Mid = 5 (val 1)',
      explanation: 'nums[mid] (1) <= nums[r] (2): minimum is at mid or to the left. r = mid = 5.',
      javaLine: 8, variables: { mid: 5, 'nums[mid]': 1, l: 4, r: 5 },
      visualType: 'array-pointers',
      visualData: { elements: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: 'L', index: 4 }, { name: 'M', index: 5 }, { name: 'R', index: 5 }] }
    },
    {
      step: 4, totalSteps: 4, action: 'Pointers Converge at Index 4 (val 0)',
      explanation: 'Found the minimum element 0 in O(log N) logarithmic time!',
      javaLine: 12, variables: { result: 0 },
      visualType: 'array-pointers',
      visualData: { elements: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: 'MIN: 0', index: 4 }], highlightIndices: [4], solved: true }
    }
  ],

  'search-in-rotated-sorted-array': [
    {
      step: 1, totalSteps: 4, action: 'Init Binary Search: Target = 0',
      explanation: 'l = 0, r = 6, mid = 3 (val 7). Compare target with mid.',
      javaLine: 4, variables: { l: 0, r: 6, mid: 3, target: 0 },
      visualType: 'array-pointers',
      visualData: { elements: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: 'L', index: 0 }, { name: 'M', index: 3 }, { name: 'R', index: 6 }] }
    },
    {
      step: 2, totalSteps: 4, action: 'Left Half [4..7] is Sorted',
      explanation: 'nums[l] <= nums[mid] (4 <= 7). Is target in [4..7]? No (0 < 4). Search right: l = mid + 1 = 4.',
      javaLine: 8, variables: { l: 4, r: 6 },
      visualType: 'array-pointers',
      visualData: { elements: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: 'L', index: 4 }, { name: 'R', index: 6 }] }
    },
    {
      step: 3, totalSteps: 4, action: 'New Mid = 5 (val 1)',
      explanation: 'nums[mid] = 1. Target 0 < 1. Search left within right half: r = mid - 1 = 4.',
      javaLine: 11, variables: { mid: 5, 'nums[mid]': 1, r: 4 },
      visualType: 'array-pointers',
      visualData: { elements: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: 'L', index: 4 }, { name: 'M', index: 5 }, { name: 'R', index: 4 }] }
    },
    {
      step: 4, totalSteps: 4, action: 'Target Found at Index 4 (val 0)',
      explanation: 'nums[4] == 0 == target! Return index 4 in O(log N) time.',
      javaLine: 6, variables: { result: 4 },
      visualType: 'array-pointers',
      visualData: { elements: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: 'TARGET (4)', index: 4 }], highlightIndices: [4], solved: true }
    }
  ],

  '3sum': [
    {
      step: 1, totalSteps: 4, action: 'Sort Array First',
      explanation: 'Arrays.sort(nums) enables two-pointer convergence and duplicate avoidance in O(N log N).',
      javaLine: 3, variables: { nums: '[-4, -1, -1, 0, 1, 2]' },
      visualType: 'array-pointers',
      visualData: { elements: [-4, -1, -1, 0, 1, 2], pointers: [{ name: 'i', index: 0 }] }
    },
    {
      step: 2, totalSteps: 4, action: 'Fix i = -1 (Index 1)',
      explanation: 'Target two-sum complement is -( -1 ) = 1. Set l = 2 (-1), r = 5 (2).',
      javaLine: 6, variables: { 'nums[i]': -1, l: 2, r: 5, sum: 0 },
      visualType: 'array-pointers',
      visualData: { elements: [-4, -1, -1, 0, 1, 2], pointers: [{ name: 'i', index: 1 }, { name: 'L', index: 2 }, { name: 'R', index: 5 }] }
    },
    {
      step: 3, totalSteps: 4, action: 'Triplet Found: -1 + (-1) + 2 = 0',
      explanation: 'Sum is 0! Add [-1, -1, 2] to triplets list. Advance l and decrement r.',
      javaLine: 9, variables: { triplet: '[-1, -1, 2]' },
      visualType: 'array-pointers',
      visualData: { elements: [-4, -1, -1, 0, 1, 2], pointers: [{ name: '✓', index: 1 }, { name: '✓', index: 2 }, { name: '✓', index: 5 }], highlightIndices: [1, 2, 5] }
    },
    {
      step: 4, totalSteps: 4, action: 'Second Triplet Found: [-1, 0, 1]',
      explanation: 'Pointers meet again at 0 + 1 = 1. Total triplets recorded: [[-1, -1, 2], [-1, 0, 1]].',
      javaLine: 13, variables: { result: '[[-1, -1, 2], [-1, 0, 1]]' },
      visualType: 'array-pointers',
      visualData: { elements: [-4, -1, -1, 0, 1, 2], pointers: [{ name: '✓', index: 1 }, { name: '✓', index: 3 }, { name: '✓', index: 4 }], highlightIndices: [1, 3, 4], solved: true }
    }
  ],

  'container-with-most-water': [
    {
      step: 1, totalSteps: 5, action: 'Endpoints: l=0, r=8',
      explanation: 'Width=8, Bottleneck=min(1, 7)=1. Area = 8 * 1 = 8. Height[l] < height[r], so advance left!',
      javaLine: 3, variables: { l: 0, r: 8, 'h[l]': 1, 'h[r]': 7, area: 8, maxArea: 8 },
      visualType: 'array-pointers',
      visualData: { elements: [1, 8, 6, 2, 5, 4, 8, 3, 7], pointers: [{ name: 'L', index: 0 }, { name: 'R', index: 8 }] }
    },
    {
      step: 2, totalSteps: 5, action: 'Advance Left -> l=1, r=8',
      explanation: 'Width=7, Bottleneck=min(8, 7)=7. Area = 7 * 7 = 49! New Record!',
      javaLine: 7, variables: { l: 1, r: 8, 'h[l]': 8, 'h[r]': 7, area: 49, maxArea: 49 },
      visualType: 'array-pointers',
      visualData: { elements: [1, 8, 6, 2, 5, 4, 8, 3, 7], pointers: [{ name: 'L', index: 1 }, { name: 'R', index: 8 }] }
    },
    {
      step: 3, totalSteps: 5, action: 'h[r] <= h[l] -> Decrement Right',
      explanation: 'Width=6, Bottleneck=min(8, 3)=3. Area = 6 * 3 = 18. Smaller than 49.',
      javaLine: 10, variables: { l: 1, r: 7, 'h[l]': 8, 'h[r]': 3, area: 18, maxArea: 49 },
      visualType: 'array-pointers',
      visualData: { elements: [1, 8, 6, 2, 5, 4, 8, 3, 7], pointers: [{ name: 'L', index: 1 }, { name: 'R', index: 7 }] }
    },
    {
      step: 4, totalSteps: 5, action: 'r=6, l=1 -> Two Tall Walls',
      explanation: 'Width=5, Bottleneck=min(8, 8)=8. Area = 5 * 8 = 40.',
      javaLine: 10, variables: { l: 1, r: 6, 'h[l]': 8, 'h[r]': 8, area: 40, maxArea: 49 },
      visualType: 'array-pointers',
      visualData: { elements: [1, 8, 6, 2, 5, 4, 8, 3, 7], pointers: [{ name: 'L', index: 1 }, { name: 'R', index: 6 }] }
    },
    {
      step: 5, totalSteps: 5, action: 'Pointers Converged!',
      explanation: 'Optimal max water area confirmed: 49! Achieved in single linear pass O(N).',
      javaLine: 13, variables: { maxArea: 49, result: 49 },
      visualType: 'array-pointers',
      visualData: { elements: [1, 8, 6, 2, 5, 4, 8, 3, 7], pointers: [{ name: '★', index: 1 }, { name: '★', index: 8 }], solved: true }
    }
  ]
};
