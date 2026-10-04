import type { SimFrame } from './types';

export const DP_SIMULATIONS: Record<string, () => SimFrame[]> = {
  'climbing-stairs': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Define Subproblems (Bottom-Up Fibonacci)',
        explanation: 'To reach step n, one can come from step n-1 or n-2. Base cases: one = 1, two = 1.',
        javaLine: 3, variables: { n: 5, one: 1, two: 1, i: 0 },
        visualType: 'dp-grid',
        visualData: { label: 'dp array: Ways to reach each step', dpTable: [1, 1, 2, 3, 5, 8], activeIndex: 0 }
      },
      {
        step: 2, totalSteps: 4, action: 'Compute dp[2] and dp[3]',
        explanation: 'dp[2] = 1 + 1 = 2 ways. dp[3] = 2 + 1 = 3 ways. Rolling pointers save O(N) space.',
        javaLine: 5, variables: { i: 2, temp: 2, one: 3, two: 2 },
        visualType: 'dp-grid',
        visualData: { label: 'Rolling State: one = 3, two = 2', dpTable: [1, 1, 2, 3, 5, 8], activeIndex: 3 }
      },
      {
        step: 3, totalSteps: 4, action: 'Compute dp[4] = 5 Ways',
        explanation: 'one = 3 + 2 = 5, two = 3. Reaching 4th stair has 5 distinct combinations.',
        javaLine: 6, variables: { i: 3, one: 5, two: 3 },
        visualType: 'dp-grid',
        visualData: { label: 'Rolling State: one = 5, two = 3', dpTable: [1, 1, 2, 3, 5, 8], activeIndex: 4 }
      },
      {
        step: 4, totalSteps: 4, action: 'Compute dp[5] = 8 Ways and Return',
        explanation: 'one = 5 + 3 = 8. For n = 5 stairs, there are 8 distinct ways. Time O(N), Space O(1).',
        javaLine: 9, variables: { result: 8 },
        visualType: 'dp-grid',
        visualData: { label: 'Final Answer: 8 Ways to Climb 5 Stairs', dpTable: [1, 1, 2, 3, 5, 8], activeIndex: 5 }
      }
    ];
  },

  'coin-change': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize dp Array with Infinity (amount+1)',
        explanation: 'coins = [1, 2, 5], amount = 7. dp[0] = 0 (0 coins for 0 sum). All other dp[a] = ∞.',
        javaLine: 4, variables: { amount: 7, 'dp[0]': 0, 'dp[1..7]': '∞' },
        visualType: 'dp-grid',
        visualData: { label: 'dp[a] = min coins to make amount a', dpTable: [0, 999, 999, 999, 999, 999, 999, 999], activeIndex: 0 }
      },
      {
        step: 2, totalSteps: 4, action: 'Evaluate Small Amounts a = 1, 2',
        explanation: 'dp[1] = min(∞, 1 + dp[0]) = 1. dp[2] with coin 2 = 1 + dp[0] = 1 coin.',
        javaLine: 9, variables: { a: 2, c: 2, 'dp[2]': 1 },
        visualType: 'dp-grid',
        visualData: { label: 'dp table after amounts 1 & 2', dpTable: [0, 1, 1, 2, 2, 999, 999, 999], activeIndex: 2 }
      },
      {
        step: 3, totalSteps: 4, action: 'Evaluate Amount a = 5 with Coin 5',
        explanation: 'dp[5] = min(dp[5], 1 + dp[5 - 5]) = 1 + dp[0] = 1 coin of value 5.',
        javaLine: 9, variables: { a: 5, c: 5, 'dp[5]': 1 },
        visualType: 'dp-grid',
        visualData: { label: 'dp[5] reached using coin 5', dpTable: [0, 1, 1, 2, 2, 1, 2, 999], activeIndex: 5 }
      },
      {
        step: 4, totalSteps: 4, action: 'Compute dp[7] = 2 (5 + 2) and Return',
        explanation: 'dp[7] = min(1 + dp[6], 1 + dp[5], 1 + dp[2]) = 1 + dp[2] = 2 coins (5 + 2). Return 2.',
        javaLine: 14, variables: { result: 2, coinsUsed: '[5, 2]' },
        visualType: 'dp-grid',
        visualData: { label: 'Optimal: dp[7] = 2 coins', dpTable: [0, 1, 1, 2, 2, 1, 2, 2], activeIndex: 7 }
      }
    ];
  },

  'longest-increasing-subsequence': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize LIS DP Array with 1s',
        explanation: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]. Every single element is trivially an increasing subsequence of length 1.',
        javaLine: 4, variables: { 'lis.length': 8, max: 1 },
        visualType: 'dp-grid',
        visualData: { label: 'Initial LIS Table: all 1s', dpTable: [1, 1, 1, 1, 1, 1, 1, 1], activeIndex: 0 }
      },
      {
        step: 2, totalSteps: 4, action: 'Process from Right: nums[5] = 7',
        explanation: 'nums[5]=7 < nums[6]=101, lis[5] = max(1, 1 + lis[6]) = 2. nums[5]=7 < nums[7]=18, lis[5] = 2.',
        javaLine: 10, variables: { i: 5, 'nums[i]': 7, 'lis[5]': 2 },
        visualType: 'dp-grid',
        visualData: { label: 'nums[5]=7 -> LIS is 2 ([7, 101] or [7, 18])', dpTable: [1, 1, 1, 1, 1, 2, 1, 1], activeIndex: 5 }
      },
      {
        step: 3, totalSteps: 4, action: 'Process nums[3] = 5 and nums[2] = 2',
        explanation: 'nums[3]=5 < 7, lis[3] = 1 + lis[5] = 3. nums[2]=2 < 5, lis[2] = 1 + lis[3] = 4.',
        javaLine: 10, variables: { i: 2, 'nums[i]': 2, 'lis[2]': 4, subsequence: '[2, 5, 7, 101]' },
        visualType: 'dp-grid',
        visualData: { label: 'nums[2]=2 -> LIS is 4 ([2, 3/5, 7, 101/18])', dpTable: [1, 1, 4, 3, 3, 2, 1, 1], activeIndex: 2 }
      },
      {
        step: 4, totalSteps: 4, action: 'Return Max LIS Length = 4',
        explanation: 'Maximum value across all lis[i] is 4. Time O(N^2) or O(N log N) with binary search tails.',
        javaLine: 15, variables: { maxLIS: 4 },
        visualType: 'dp-grid',
        visualData: { label: 'Global Longest Increasing Subsequence = 4', dpTable: [1, 1, 4, 3, 3, 2, 1, 1], activeIndex: 2 }
      }
    ];
  },

  'longest-common-subsequence': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize 2D DP Table of Size (m+1) x (n+1)',
        explanation: 'text1 = "abcde", text2 = "ace". Initialize matrix dp[6][4] with 0s for base cases.',
        javaLine: 4, variables: { m: 5, n: 3, 'dp[m][n]': 0 },
        visualType: 'dp-grid',
        visualData: {
          label: '2D DP Matrix for LCS("abcde", "ace")',
          rowHeaders: ['a', 'b', 'c', 'd', 'e', '∅'],
          colHeaders: ['a', 'c', 'e', '∅'],
          matrix: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          activeCell: [4, 2]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Match Character \'e\' at i=4, j=2',
        explanation: 'text1.charAt(4) == text2.charAt(2) (\'e\' == \'e\'): dp[4][2] = 1 + dp[5][3] = 1.',
        javaLine: 9, variables: { i: 4, j: 2, match: 'e == e', 'dp[4][2]': 1 },
        visualType: 'dp-grid',
        visualData: {
          label: 'Match \'e\': dp[4][2] = 1 + dp[5][3] = 1',
          rowHeaders: ['a', 'b', 'c', 'd', 'e', '∅'],
          colHeaders: ['a', 'c', 'e', '∅'],
          matrix: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
          ],
          activeCell: [4, 2]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Match Character \'c\' at i=2, j=1',
        explanation: 'text1.charAt(2) == text2.charAt(1) (\'c\' == \'c\'): dp[2][1] = 1 + dp[3][2] = 1 + 1 = 2.',
        javaLine: 9, variables: { i: 2, j: 1, match: 'c == c', 'dp[2][1]': 2 },
        visualType: 'dp-grid',
        visualData: {
          label: 'Match \'c\': dp[2][1] = 1 + dp[3][2] = 2',
          rowHeaders: ['a', 'b', 'c', 'd', 'e', '∅'],
          colHeaders: ['a', 'c', 'e', '∅'],
          matrix: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 2, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
          ],
          activeCell: [2, 1]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Match Character \'a\' at i=0, j=0 & Return 3',
        explanation: 'text1.charAt(0) == text2.charAt(0) (\'a\' == \'a\'): dp[0][0] = 1 + dp[1][1] = 1 + 2 = 3. LCS is "ace".',
        javaLine: 15, variables: { result: 3, lcs: 'ace' },
        visualType: 'dp-grid',
        visualData: {
          label: 'Final LCS = 3 ("ace")',
          rowHeaders: ['a', 'b', 'c', 'd', 'e', '∅'],
          colHeaders: ['a', 'c', 'e', '∅'],
          matrix: [
            [3, 2, 1, 0],
            [2, 2, 1, 0],
            [2, 2, 1, 0],
            [1, 1, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
          ],
          activeCell: [0, 0]
        }
      }
    ];
  },

  'word-break': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize boolean dp Array of Size n+1',
        explanation: 's = "leetcode", wordDict = ["leet", "code"]. Set base case dp[8] = true (empty string is valid).',
        javaLine: 4, variables: { 's.length': 8, 'dp[8]': 'true' },
        visualType: 'dp-grid',
        visualData: { label: 'dp[i] = can s[i..n] be segmented into dictionary words', dpTable: [0, 0, 0, 0, 0, 0, 0, 0, 1], activeIndex: 8 }
      },
      {
        step: 2, totalSteps: 4, action: 'Check Suffix at i = 4: "code"',
        explanation: 'i = 4, "code" matches wordDict word "code". i + 4 = 8, dp[8] is true -> dp[4] = true.',
        javaLine: 9, variables: { i: 4, match: 'code', 'dp[4]': 'true' },
        visualType: 'dp-grid',
        visualData: { label: 'Matched "code" at i=4 -> dp[4] = true', dpTable: [0, 0, 0, 0, 1, 0, 0, 0, 1], activeIndex: 4 }
      },
      {
        step: 3, totalSteps: 4, action: 'Check Prefix at i = 0: "leet"',
        explanation: 'i = 0, "leet" matches wordDict. i + 4 = 4, dp[4] is true -> dp[0] = true.',
        javaLine: 9, variables: { i: 0, match: 'leet', 'dp[0]': 'true' },
        visualType: 'dp-grid',
        visualData: { label: 'Matched "leet" at i=0 -> dp[0] = true', dpTable: [1, 0, 0, 0, 1, 0, 0, 0, 1], activeIndex: 0 }
      },
      {
        step: 4, totalSteps: 4, action: 'Return dp[0] = true',
        explanation: 'Entire string "leetcode" can be cleanly segmented into "leet" + "code". Return true.',
        javaLine: 14, variables: { result: 'true' },
        visualType: 'dp-grid',
        visualData: { label: 'Segmentation Valid: "leet" + "code"', dpTable: [1, 0, 0, 0, 1, 0, 0, 0, 1], activeIndex: 0 }
      }
    ];
  },

  'combination-sum': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Start DFS Search Tree (candidates = [2, 3, 6, 7], target = 7)',
        explanation: 'Begin root recursion: i = 0, total = 0, cur = []. Two branches: include candidates[i] or skip.',
        javaLine: 4, variables: { i: 0, total: 0, target: 7, cur: '[]' },
        visualType: 'tree-node',
        visualData: { currentCall: 'dfs(0, total=0)', activeNode: 0, nodes: [{ val: 0, state: 'active' }, { val: 2 }, { val: 3 }] }
      },
      {
        step: 2, totalSteps: 4, action: 'Branch 1: Take 2 -> 2 -> 2 -> 2 (total = 8 > 7: Backtrack)',
        explanation: 'Exploring [2, 2, 2, 2]: total = 8 exceeds target 7! Backtrack to [2, 2, 2].',
        javaLine: 14, variables: { total: 8, target: 7, action: 'Backtrack' },
        visualType: 'tree-node',
        visualData: { currentCall: 'dfs(0, total=8 > 7)', activeNode: 8, nodes: [{ val: 0 }, { val: 2 }, { val: 8, state: 'done' }] }
      },
      {
        step: 3, totalSteps: 4, action: 'Find Valid Combination: [2, 2, 3] = 7',
        explanation: 'Replace last 2 with 3: cur = [2, 2, 3], total = 7 == target. Add [2, 2, 3] to result list!',
        javaLine: 10, variables: { cur: '[2, 2, 3]', total: 7, found: 'true' },
        visualType: 'tree-node',
        visualData: { currentCall: 'total == target: [2, 2, 3]', activeNode: 7, nodes: [{ val: 0 }, { val: 4 }, { val: 7, state: 'done' }] }
      },
      {
        step: 4, totalSteps: 4, action: 'Find Second Combination: [7] = 7 and Return',
        explanation: 'Skip to candidate 7: cur = [7], total = 7. All solutions found: [[2, 2, 3], [7]].',
        javaLine: 10, variables: { result: '[[2, 2, 3], [7]]' },
        visualType: 'tree-node',
        visualData: { currentCall: 'dfs complete', activeNode: 7, nodes: [{ val: 0 }, { val: 7, state: 'done' }, { val: 7, state: 'done' }] }
      }
    ];
  },

  'house-robber': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize Variables rob1 = 0, rob2 = 0',
        explanation: 'nums = [2, 7, 9, 3, 1]. Invariant: rob2 represents max loot up to house i-1; rob1 up to house i-2.',
        javaLine: 3, variables: { rob1: 0, rob2: 0 },
        visualType: 'dp-grid',
        visualData: { label: 'Houses: [2, 7, 9, 3, 1] | DP states', dpTable: [2, 7, 9, 3, 1], activeIndex: 0 }
      },
      {
        step: 2, totalSteps: 4, action: 'Process House 0 (2) & House 1 (7)',
        explanation: 'House 0: temp = max(2+0, 0)=2. rob1=0, rob2=2. House 1: temp = max(7+0, 2)=7. rob1=2, rob2=7.',
        javaLine: 5, variables: { n: 7, rob1: 2, rob2: 7 },
        visualType: 'dp-grid',
        visualData: { label: 'After House 1: rob1=2, rob2=7', dpTable: [2, 7, 9, 3, 1], activeIndex: 1 }
      },
      {
        step: 3, totalSteps: 4, action: 'Process House 2 (9): Choose (9 + rob1) = 11',
        explanation: 'temp = max(9 + 2, 7) = 11. Robbing House 0 and House 2 yields 11 loot! rob1=7, rob2=11.',
        javaLine: 5, variables: { n: 9, rob1: 7, rob2: 11 },
        visualType: 'dp-grid',
        visualData: { label: 'House 2 loot = 11 (Houses [0, 2])', dpTable: [2, 7, 11, 3, 1], activeIndex: 2 }
      },
      {
        step: 4, totalSteps: 4, action: 'Process House 3 & 4 and Return Max Loot = 12',
        explanation: 'House 3: temp = max(3+7, 11) = 11. House 4: temp = max(1+11, 11) = 12. Rob houses 0, 2, 4 -> 2 + 9 + 1 = 12!',
        javaLine: 9, variables: { result: 12, optimalHouses: '[2, 9, 1]' },
        visualType: 'dp-grid',
        visualData: { label: 'Max Loot = 12 (Houses [2, 9, 1])', dpTable: [2, 7, 11, 11, 12], activeIndex: 4 }
      }
    ];
  },

  'house-robber-ii': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Decompose Circular Street into Two Linear Problems',
        explanation: 'nums = [2, 3, 2]. House 0 and House n-1 are adjacent! Subproblem 1: rob(0..n-2). Subproblem 2: rob(1..n-1).',
        javaLine: 4, variables: { totalHouses: 3, range1: '[0..1]', range2: '[1..2]' },
        visualType: 'dp-grid',
        visualData: { label: 'Circular Ring: Split into [2, 3] and [3, 2]', dpTable: [2, 3, 2], activeIndex: 0 }
      },
      {
        step: 2, totalSteps: 4, action: 'Solve Subproblem 1: helper(nums, 0, 1)',
        explanation: 'Subproblem 1 houses: [2, 3]. Max loot is Math.max(2, 3) = 3.',
        javaLine: 10, variables: { range: '0..1', loot1: 3 },
        visualType: 'dp-grid',
        visualData: { label: 'Subproblem 1 (Skip Last House): Loot = 3', dpTable: [2, 3], activeIndex: 1 }
      },
      {
        step: 3, totalSteps: 4, action: 'Solve Subproblem 2: helper(nums, 1, 2)',
        explanation: 'Subproblem 2 houses: [3, 2]. Max loot is Math.max(3, 2) = 3.',
        javaLine: 10, variables: { range: '1..2', loot2: 3 },
        visualType: 'dp-grid',
        visualData: { label: 'Subproblem 2 (Skip First House): Loot = 3', dpTable: [3, 2], activeIndex: 0 }
      },
      {
        step: 4, totalSteps: 4, action: 'Combine Results: Math.max(loot1, loot2) = 3',
        explanation: 'Best loot possible avoiding adjacent circular trigger is 3. Time O(N), Space O(1).',
        javaLine: 4, variables: { result: 3 },
        visualType: 'dp-grid',
        visualData: { label: 'Optimal Circular Loot = 3', dpTable: [2, 3, 2], activeIndex: 1 }
      }
    ];
  },

  'decode-ways': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize dp Array (s = "226")',
        explanation: 'dp[i] = number of decodings for suffix s[i..n]. Base case: dp[3] = 1 (empty string).',
        javaLine: 4, variables: { s: '226', n: 3, 'dp[3]': 1 },
        visualType: 'dp-grid',
        visualData: { label: 'dp table for "226"', dpTable: [0, 0, 0, 1], activeIndex: 3 }
      },
      {
        step: 2, totalSteps: 4, action: 'Process s[2] = \'6\'',
        explanation: 's[2] != \'0\': dp[2] = dp[3] = 1 (decodes as \'F\').',
        javaLine: 11, variables: { i: 2, char: '6', 'dp[2]': 1 },
        visualType: 'dp-grid',
        visualData: { label: 's[2]=\'6\' -> 1 decoding ("F")', dpTable: [0, 0, 1, 1], activeIndex: 2 }
      },
      {
        step: 3, totalSteps: 4, action: 'Process s[1] = \'2\': Check Single and Two-digit "26"',
        explanation: 'Single digit \'2\' (dp[2]=1). Two digits "26" <= 26 is valid \'Z\' (dp[3]=1). dp[1] = dp[2] + dp[3] = 2.',
        javaLine: 13, variables: { i: 1, 's[1..2]': '26', 'dp[1]': 2 },
        visualType: 'dp-grid',
        visualData: { label: 's[1]=\'2\' -> "2"+"6" (BF) or "26" (Z) -> 2 decodings', dpTable: [0, 2, 1, 1], activeIndex: 1 }
      },
      {
        step: 4, totalSteps: 4, action: 'Process s[0] = \'2\': Check Single and "22" & Return 3',
        explanation: 'dp[0] = dp[1] (single \'2\') + dp[2] (two-digit "22" <= 26) = 2 + 1 = 3 decodings ("BBF", "BZ", "VF"). Return 3.',
        javaLine: 17, variables: { result: 3, decodings: '["BBF", "BZ", "VF"]' },
        visualType: 'dp-grid',
        visualData: { label: 'Final Total Decodings = 3', dpTable: [3, 2, 1, 1], activeIndex: 0 }
      }
    ];
  },

  'unique-paths': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize Bottom Row of 1s (m=3, n=7)',
        explanation: 'Every cell in the bottom row has exactly 1 path to reach the destination (moving only right).',
        javaLine: 4, variables: { m: 3, n: 7, row: '[1, 1, 1, 1, 1, 1, 1]' },
        visualType: 'dp-grid',
        visualData: { label: 'Bottom row: all 1s', dpTable: [1, 1, 1, 1, 1, 1, 1], activeIndex: 6 }
      },
      {
        step: 2, totalSteps: 4, action: 'Compute Row 1 from Bottom (Moving Right to Left)',
        explanation: 'newRow[j] = newRow[j+1] + row[j]. Reaching (1, 5) = 1 + 1 = 2 paths. (1, 0) accumulates to 7.',
        javaLine: 10, variables: { i: 1, 'row[0]': 7, 'row[5]': 2 },
        visualType: 'dp-grid',
        visualData: { label: 'Row 1 (second from bottom): [7, 6, 5, 4, 3, 2, 1]', dpTable: [7, 6, 5, 4, 3, 2, 1], activeIndex: 0 }
      },
      {
        step: 3, totalSteps: 4, action: 'Compute Top Row (Row 0)',
        explanation: 'newRow[5] = 2 + 1 = 3. newRow[4] = 3 + 3 = 6. Propagate backwards across row 0.',
        javaLine: 10, variables: { i: 0, 'newRow[4]': 6, 'newRow[5]': 3 },
        visualType: 'dp-grid',
        visualData: { label: 'Row 0 computing: [28, 21, 15, 10, 6, 3, 1]', dpTable: [28, 21, 15, 10, 6, 3, 1], activeIndex: 3 }
      },
      {
        step: 4, totalSteps: 4, action: 'Return Start Cell row[0] = 28 Paths',
        explanation: 'Top-left corner (0, 0) has 28 distinct unique paths to bottom-right corner (2, 6). Time O(M*N), Space O(N).',
        javaLine: 14, variables: { result: 28 },
        visualType: 'dp-grid',
        visualData: { label: 'Total Unique Paths = 28', dpTable: [28, 21, 15, 10, 6, 3, 1], activeIndex: 0 }
      }
    ];
  },

  'jump-game': () => {
    const nums = [2, 3, 1, 1, 4];
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize Goal at Last Index (goal = 4)',
        explanation: 'nums = [2, 3, 1, 1, 4]. Working backwards: can earlier indices jump to `goal`?',
        javaLine: 3, variables: { goal: 4, 'nums.length': 5 },
        visualType: 'array-pointers',
        visualData: { elements: nums, pointers: [{ name: 'goal', index: 4 }], highlightIndices: [4] }
      },
      {
        step: 2, totalSteps: 4, action: 'Evaluate i = 3: nums[3] = 1',
        explanation: 'i + nums[i] = 3 + 1 = 4 >= goal (4): Success! Shift goal to index 3.',
        javaLine: 6, variables: { i: 3, 'nums[3]': 1, 'newGoal': 3 },
        visualType: 'array-pointers',
        visualData: { elements: nums, pointers: [{ name: 'i', index: 3 }, { name: 'goal', index: 3 }], highlightIndices: [3] }
      },
      {
        step: 3, totalSteps: 4, action: 'Evaluate i = 1: nums[1] = 3',
        explanation: 'i + nums[i] = 1 + 3 = 4 >= goal (2 or 3): Shift goal to index 1.',
        javaLine: 6, variables: { i: 1, 'nums[1]': 3, 'newGoal': 1 },
        visualType: 'array-pointers',
        visualData: { elements: nums, pointers: [{ name: 'i', index: 1 }, { name: 'goal', index: 1 }], highlightIndices: [1] }
      },
      {
        step: 4, totalSteps: 4, action: 'Evaluate i = 0: nums[0] = 2 -> Goal reaches 0!',
        explanation: '0 + 2 >= 1: Goal reaches index 0! Since goal == 0, return true. Time O(N), Space O(1).',
        javaLine: 9, variables: { goal: 0, result: 'true' },
        visualType: 'array-pointers',
        visualData: { elements: nums, pointers: [{ name: 'goal', index: 0 }], highlightIndices: [0] }
      }
    ];
  }
};
