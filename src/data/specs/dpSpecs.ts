import type { ProblemSpec } from '../problemTestCases';

export const dpSpecs: Record<string, ProblemSpec> = {
  'longest-increasing-subsequence': {
    description: `Given an integer array \`nums\`, return *the length of the longest strictly increasing subsequence*.`,
    methodName: 'lengthOfLIS',
    starterJava: `class Solution {
    public int lengthOfLIS(int[] nums) {
        // DP with binary search patience sort: O(N log N)
        
    }
}`,
    constraints: [
      '1 <= nums.length <= 2500',
      '-10^4 <= nums[i] <= 10^4'
    ],
    examples: [
      {
        id: 1,
        input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] },
        displayInput: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]',
        expectedOutput: 4,
        displayOutput: '4',
        explanation: 'The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.'
      },
      {
        id: 2,
        input: { nums: [0, 1, 0, 3, 2, 3] },
        displayInput: 'nums = [0, 1, 0, 3, 2, 3]',
        expectedOutput: 4,
        displayOutput: '4',
        explanation: 'The longest increasing subsequence is [0, 1, 2, 3], therefore the length is 4.'
      },
      {
        id: 3,
        input: { nums: [7, 7, 7, 7, 7, 7, 7] },
        displayInput: 'nums = [7, 7, 7, 7, 7, 7, 7]',
        expectedOutput: 1,
        displayOutput: '1',
        explanation: 'All elements are identical, so any single element of length 1 is the longest strictly increasing subsequence.'
      }
    ],
    hiddenTestCases: []
  },

  'longest-common-subsequence': {
    description: `Given two strings \`text1\` and \`text2\`, return *the length of their longest **common subsequence**.* If there is no common subsequence, return \`0\`.`,
    methodName: 'longestCommonSubsequence',
    starterJava: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        // 2D DP table matching characters
        
    }
}`,
    constraints: [
      '1 <= text1.length, text2.length <= 1000',
      'text1 and text2 consist of only lowercase English characters.'
    ],
    examples: [
      {
        id: 1,
        input: { text1: 'abcde', text2: 'ace' },
        displayInput: 'text1 = "abcde", text2 = "ace"',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: 'The longest common subsequence is "ace" and its length is 3.'
      },
      {
        id: 2,
        input: { text1: 'abc', text2: 'abc' },
        displayInput: 'text1 = "abc", text2 = "abc"',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: 'The longest common subsequence is "abc" and its length is 3.'
      },
      {
        id: 3,
        input: { text1: 'abc', text2: 'def' },
        displayInput: 'text1 = "abc", text2 = "def"',
        expectedOutput: 0,
        displayOutput: '0',
        explanation: 'There is no such common subsequence, so the result is 0.'
      }
    ],
    hiddenTestCases: []
  },

  'word-break': {
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.`,
    methodName: 'wordBreak',
    starterJava: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        // DP boolean array matching prefix substrings
        
    }
}`,
    constraints: [
      '1 <= s.length <= 300',
      '1 <= wordDict.length <= 1000',
      '1 <= wordDict[i].length <= 20',
      'All strings of wordDict are unique.'
    ],
    examples: [
      {
        id: 1,
        input: { s: 'leetcode', wordDict: ['leet', 'code'] },
        displayInput: 's = "leetcode", wordDict = ["leet","code"]',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'Return true because "leetcode" can be segmented as "leet code".'
      },
      {
        id: 2,
        input: { s: 'applepenapple', wordDict: ['apple', 'pen'] },
        displayInput: 's = "applepenapple", wordDict = ["apple","pen"]',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'Return true because "applepenapple" can be segmented as "apple pen apple". Note that you are allowed to reuse a dictionary word.'
      },
      {
        id: 3,
        input: { s: 'catsandog', wordDict: ['cats', 'dog', 'sand', 'and', 'cat'] },
        displayInput: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'Return false because "catsandog" cannot be segmented into words from wordDict.'
      }
    ],
    hiddenTestCases: []
  },

  'combination-sum': {
    description: `Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return *a list of all **unique combinations** of \`candidates\` where the chosen numbers sum to \`target\`*. You may return the combinations in any order. The same number may be chosen unlimited times.`,
    methodName: 'combinationSum',
    starterJava: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Backtracking decision tree (include vs skip)
        
    }
}`,
    constraints: [
      '1 <= candidates.length <= 30',
      '2 <= candidates[i] <= 40',
      'All elements of candidates are distinct.',
      '1 <= target <= 40'
    ],
    examples: [
      {
        id: 1,
        input: { candidates: [2, 3, 6, 7], target: 7 },
        displayInput: 'candidates = [2,3,6,7], target = 7',
        expectedOutput: [[2, 2, 3], [7]],
        displayOutput: '[[2,2,3],[7]]',
        explanation: '2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times. 7 is a candidate, and 7 = 7. These are the only two combinations.'
      },
      {
        id: 2,
        input: { candidates: [2, 3, 5], target: 8 },
        displayInput: 'candidates = [2,3,5], target = 8',
        expectedOutput: [[2, 2, 2, 2], [2, 3, 3], [3, 5]],
        displayOutput: '[[2,2,2,2],[2,3,3],[3,5]]',
        explanation: 'All four combinations sum to 8.'
      },
      {
        id: 3,
        input: { candidates: [2], target: 1 },
        displayInput: 'candidates = [2], target = 1',
        expectedOutput: [],
        displayOutput: '[]',
        explanation: 'The only candidate is 2, which is larger than the target 1, so no combination exists.'
      }
    ],
    hiddenTestCases: []
  },

  'house-robber': {
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected that will automatically contact the police if two adjacent houses were broken into on the same night. Return the maximum amount of money you can rob tonight without alerting the police.`,
    methodName: 'rob',
    starterJava: `class Solution {
    public int rob(int[] nums) {
        // DP: rob = max(rob1 + n, rob2)
        
    }
}`,
    constraints: [
      '1 <= nums.length <= 100',
      '0 <= nums[i] <= 400'
    ],
    examples: [
      {
        id: 1,
        input: { nums: [1, 2, 3, 1] },
        displayInput: 'nums = [1, 2, 3, 1]',
        expectedOutput: 4,
        displayOutput: '4',
        explanation: 'Rob house 1 (money = 1) and house 3 (money = 3). Total = 1 + 3 = 4.'
      },
      {
        id: 2,
        input: { nums: [2, 7, 9, 3, 1] },
        displayInput: 'nums = [2, 7, 9, 3, 1]',
        expectedOutput: 12,
        displayOutput: '12',
        explanation: 'Rob house 1 (2), house 3 (9) and house 5 (1). Total = 12.'
      }
    ],
    hiddenTestCases: []
  },

  'house-robber-ii': {
    description: `All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Return the maximum amount of money you can rob tonight without alerting the police.`,
    methodName: 'rob',
    starterJava: `class Solution {
    public int rob(int[] nums) {
        // Max of robbing nums[0..n-2] vs nums[1..n-1]
        
    }
}`,
    constraints: [
      '1 <= nums.length <= 100',
      '0 <= nums[i] <= 1000'
    ],
    examples: [
      {
        id: 1,
        input: { nums: [2, 3, 2] },
        displayInput: 'nums = [2, 3, 2]',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: 'You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.'
      },
      {
        id: 2,
        input: { nums: [1, 2, 3, 1] },
        displayInput: 'nums = [1, 2, 3, 1]',
        expectedOutput: 4,
        displayOutput: '4',
        explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.'
      },
      {
        id: 3,
        input: { nums: [1, 2, 3] },
        displayInput: 'nums = [1, 2, 3]',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: 'Rob house 3 (money = 3), yielding maximum profit of 3.'
      }
    ],
    hiddenTestCases: []
  },

  'decode-ways': {
    description: `A message containing letters from \`A-Z\` can be encoded into numbers using the mapping 'A' -> "1" ... 'Z' -> "26". Given a string \`s\` containing only digits, return *the number of ways to decode it*.`,
    methodName: 'numDecodings',
    starterJava: `class Solution {
    public int numDecodings(String s) {
        // DP: single digit (1-9) + double digit (10-26)
        
    }
}`,
    constraints: [
      '1 <= s.length <= 100',
      's contains only digits and may contain leading zeroes.'
    ],
    examples: [
      {
        id: 1,
        input: { s: '12' },
        displayInput: 's = "12"',
        expectedOutput: 2,
        displayOutput: '2',
        explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).'
      },
      {
        id: 2,
        input: { s: '226' },
        displayInput: 's = "226"',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: '"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).'
      },
      {
        id: 3,
        input: { s: '06' },
        displayInput: 's = "06"',
        expectedOutput: 0,
        displayOutput: '0',
        explanation: '"06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").'
      }
    ],
    hiddenTestCases: []
  },

  'unique-paths': {
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right at any point in time. Given the two integers \`m\` and \`n\`, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.`,
    methodName: 'uniquePaths',
    starterJava: `class Solution {
    public int uniquePaths(int m, int n) {
        // Combinatorics or 1D row DP
        
    }
}`,
    constraints: ['1 <= m, n <= 100'],
    examples: [
      {
        id: 1,
        input: { m: 3, n: 7 },
        displayInput: 'm = 3, n = 7',
        expectedOutput: 28,
        displayOutput: '28',
        explanation: 'From the top-left corner, there are a total of 28 unique paths to reach the bottom-right corner.'
      },
      {
        id: 2,
        input: { m: 3, n: 2 },
        displayInput: 'm = 3, n = 2',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: 'From the top-left corner, there are 3 ways to reach the bottom-right corner:\n1. Right -> Down -> Down\n2. Down -> Down -> Right\n3. Down -> Right -> Down'
      }
    ],
    hiddenTestCases: []
  },

  'jump-game': {
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position. Return \`true\` *if you can reach the last index, or \`false\` otherwise*.`,
    methodName: 'canJump',
    starterJava: `class Solution {
    public boolean canJump(int[] nums) {
        // Greedy backward goal post shift
        
    }
}`,
    constraints: [
      '1 <= nums.length <= 10^4',
      '0 <= nums[i] <= 10^5'
    ],
    examples: [
      {
        id: 1,
        input: { nums: [2, 3, 1, 1, 4] },
        displayInput: 'nums = [2, 3, 1, 1, 4]',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.'
      },
      {
        id: 2,
        input: { nums: [3, 2, 1, 0, 4] },
        displayInput: 'nums = [3, 2, 1, 0, 4]',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.'
      }
    ],
    hiddenTestCases: []
  }
};
