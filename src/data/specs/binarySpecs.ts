import type { ProblemSpec } from '../problemTestCases';

export const binarySpecs: Record<string, ProblemSpec> = {
  'sum-of-two-integers': {
    description: `Given two integers \`a\` and \`b\`, return *the sum of the two integers without using the operators \`+\` and \`-\`*.`,
    methodName: 'getSum',
    starterJava: `class Solution {
    public int getSum(int a, int b) {
        // Bitwise adder using XOR and carry shift
        
    }
}`,
    constraints: ['-1000 <= a, b <= 1000'],
    examples: [
      {
        id: 1,
        input: { a: 1, b: 2 },
        displayInput: 'a = 1, b = 2',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: '1 + 2 = 3.'
      },
      {
        id: 2,
        input: { a: 2, b: 3 },
        displayInput: 'a = 2, b = 3',
        expectedOutput: 5,
        displayOutput: '5',
        explanation: '2 + 3 = 5.'
      }
    ],
    hiddenTestCases: [
      {
        id: 3,
        input: { a: -1, b: 1 },
        displayInput: 'a = -1, b = 1',
        expectedOutput: 0,
        displayOutput: '0'
      }
    ]
  },

  'number-of-1-bits': {
    description: `Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).`,
    methodName: 'hammingWeight',
    starterJava: `class Solution {
    public int hammingWeight(int n) {
        // Brian Kernighan n & (n - 1)
        
    }
}`,
    constraints: ['1 <= n <= 2^31 - 1'],
    examples: [
      {
        id: 1,
        input: { n: 11 },
        displayInput: 'n = 11 (00000000000000000000000000001011)',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: 'The input binary string has a total of three set bits.'
      },
      {
        id: 2,
        input: { n: 128 },
        displayInput: 'n = 128 (00000000000000000000000010000000)',
        expectedOutput: 1,
        displayOutput: '1',
        explanation: 'The input binary string has a total of one set bit.'
      }
    ],
    hiddenTestCases: [
      {
        id: 3,
        input: { n: 2147483645 },
        displayInput: 'n = 2147483645',
        expectedOutput: 30,
        displayOutput: '30'
      }
    ]
  },

  'counting-bits': {
    description: `Given an integer \`n\`, return *an array \`ans\` of length \`n + 1\` such that for each \`i\` (\`0 <= i <= n\`), \`ans[i]\` is the **number of \`1\`'s** in the binary representation of \`i\`*.`,
    methodName: 'countBits',
    starterJava: `class Solution {
    public int[] countBits(int n) {
        // DP: dp[i] = dp[i >> 1] + (i & 1)
        
    }
}`,
    constraints: ['0 <= n <= 10^5'],
    examples: [
      {
        id: 1,
        input: { n: 2 },
        displayInput: 'n = 2',
        expectedOutput: [0, 1, 1],
        displayOutput: '[0, 1, 1]',
        explanation: '0 --> 0\n1 --> 1\n2 --> 10'
      },
      {
        id: 2,
        input: { n: 5 },
        displayInput: 'n = 5',
        expectedOutput: [0, 1, 1, 2, 1, 2],
        displayOutput: '[0, 1, 1, 2, 1, 2]',
        explanation: '0 --> 0\n1 --> 1\n2 --> 10\n3 --> 11\n4 --> 100\n5 --> 101'
      }
    ],
    hiddenTestCases: [
      {
        id: 3,
        input: { n: 0 },
        displayInput: 'n = 0',
        expectedOutput: [0],
        displayOutput: '[0]'
      }
    ]
  },

  'missing-number': {
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return *the only number in the range that is missing from the array*.`,
    methodName: 'missingNumber',
    starterJava: `class Solution {
    public int missingNumber(int[] nums) {
        // XOR cancellation or Gauss summation
        
    }
}`,
    constraints: [
      'n == nums.length',
      '1 <= n <= 10^4',
      '0 <= nums[i] <= n',
      'All the numbers of nums are unique.'
    ],
    examples: [
      {
        id: 1,
        input: { nums: [3, 0, 1] },
        displayInput: 'nums = [3, 0, 1]',
        expectedOutput: 2,
        displayOutput: '2',
        explanation: 'n = 3 since there are 3 numbers, so all numbers are in the range [0, 3]. 2 is the missing number in the range since it does not appear in nums.'
      },
      {
        id: 2,
        input: { nums: [0, 1] },
        displayInput: 'nums = [0, 1]',
        expectedOutput: 2,
        displayOutput: '2',
        explanation: 'n = 2 since there are 2 numbers, so all numbers are in the range [0, 2]. 2 is the missing number in the range since it does not appear in nums.'
      },
      {
        id: 3,
        input: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] },
        displayInput: 'nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]',
        expectedOutput: 8,
        displayOutput: '8',
        explanation: 'n = 9 since there are 9 numbers, so all numbers are in the range [0, 9]. 8 is the missing number in the range since it does not appear in nums.'
      }
    ],
    hiddenTestCases: [
      {
        id: 4,
        input: { nums: [1] },
        displayInput: 'nums = [1]',
        expectedOutput: 0,
        displayOutput: '0'
      }
    ]
  },

  'reverse-bits': {
    description: `Reverse bits of a given 32 bits unsigned integer.

**Note:**
- Note that in some languages, such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
- In Java, the compiler represents the signed integers using 2's complement notation.`,
    methodName: 'reverseBits',
    starterJava: `public class Solution {
    // you need treat n as an unsigned value
    public int reverseBits(int n) {
        // Shift bits from n into res
        
    }
}`,
    constraints: ['The input must be a binary string of length 32'],
    examples: [
      {
        id: 1,
        input: { n: 43261596 },
        displayInput: 'n = 00000010100101000001111010011100',
        expectedOutput: 964176192,
        displayOutput: '964176192 (00111001011110000010100101000000)',
        explanation: 'The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.'
      }
    ],
    hiddenTestCases: [
      {
        id: 2,
        input: { n: 1 },
        displayInput: 'n = 1',
        expectedOutput: -2147483648,
        displayOutput: '-2147483648 (10000000000000000000000000000000)'
      }
    ]
  }
};
