import type { SimFrame } from './types';

export const binarySimulations: Record<string, SimFrame[]> = {
  'number-of-1-bits': [
    {
      step: 1, totalSteps: 4, action: 'Init Hamming Weight Count',
      explanation: 'n = 11 (binary 0000 1011). Check lowest bit with (n & 1).',
      javaLine: 3, variables: { n: 11, count: 0 },
      visualType: 'bit-binary',
      visualData: {
        label: 'Binary Representation of 11',
        bits: ['0', '0', '0', '0', '1', '0', '1', '1'],
        activeBit: 7,
        operation: 'n & 1 == 1 -> count++'
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Right Shift: n >>>= 1',
      explanation: 'Unsigned shift drops lowest bit. n becomes 5 (binary 0000 0101). Lowest bit is 1!',
      javaLine: 5, variables: { n: 5, count: 1 },
      visualType: 'bit-binary',
      visualData: {
        label: 'Shifted Right: n = 5',
        bits: ['0', '0', '0', '0', '0', '1', '0', '1'],
        activeBit: 7,
        operation: '5 & 1 == 1 -> count = 2'
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Next Shifts: n = 2 then n = 1',
      explanation: 'n = 2 has bit 0. Shift again: n = 1 has bit 1 -> count becomes 3.',
      javaLine: 5, variables: { n: 1, count: 3 },
      visualType: 'bit-binary',
      visualData: {
        label: 'Final Bit Check: n = 1',
        bits: ['0', '0', '0', '0', '0', '0', '0', '1'],
        activeBit: 7,
        operation: '1 & 1 == 1 -> count = 3'
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Finished: Total Set Bits = 3',
      explanation: 'n reaches 0. Total 1-bits in 11 is 3 in O(1) 32-bit time!',
      javaLine: 7, variables: { result: 3 },
      visualType: 'bit-binary',
      visualData: {
        label: 'Hamming Weight Complete',
        bits: ['0', '0', '0', '0', '0', '0', '0', '0'],
        operation: 'Total 1-bits: 3',
        solved: true
      }
    }
  ],

  'counting-bits': [
    {
      step: 1, totalSteps: 4, action: 'Initialize DP Array ans[0..5]',
      explanation: 'ans[0] = 0. Use recurrence: ans[i] = ans[i >> 1] + (i & 1).',
      javaLine: 3, variables: { n: 5, 'ans[0]': 0 },
      visualType: 'dp-grid',
      visualData: { dpTable: [0, 0, 0, 0, 0, 0], activeIndex: 0, label: 'ans[0] = 0' }
    },
    {
      step: 2, totalSteps: 4, action: 'ans[1] = ans[0] + 1 = 1, ans[2] = 1',
      explanation: 'i=1: ans[0] + 1 = 1. i=2 (even): ans[1] + 0 = 1.',
      javaLine: 5, variables: { i: 2, 'ans[1]': 1, 'ans[2]': 1 },
      visualType: 'dp-grid',
      visualData: { dpTable: [0, 1, 1, 0, 0, 0], activeIndex: 2, label: 'ans[2] = ans[1] + (2 & 1) = 1' }
    },
    {
      step: 3, totalSteps: 4, action: 'Compute ans[3]=2, ans[4]=1',
      explanation: 'i=3 (odd): ans[1] + 1 = 2. i=4 (even): ans[2] + 0 = 1.',
      javaLine: 5, variables: { i: 4, 'ans[3]': 2, 'ans[4]': 1 },
      visualType: 'dp-grid',
      visualData: { dpTable: [0, 1, 1, 2, 1, 0], activeIndex: 4, label: 'ans[4] = ans[2] + (4 & 1) = 1' }
    },
    {
      step: 4, totalSteps: 4, action: 'Final ans[5] = ans[2] + 1 = 2',
      explanation: 'Result array: [0, 1, 1, 2, 1, 2] computed in linear O(N) single pass!',
      javaLine: 7, variables: { result: '[0, 1, 1, 2, 1, 2]' },
      visualType: 'dp-grid',
      visualData: { dpTable: [0, 1, 1, 2, 1, 2], activeIndex: 5, label: 'Completed [0..5]', solved: true }
    }
  ],

  'missing-number': [
    {
      step: 1, totalSteps: 4, action: 'Initialize XOR Accumulator: res = n = 3',
      explanation: 'Use XOR property: x ^ x = 0 and x ^ 0 = x. Start with res = nums.length = 3.',
      javaLine: 3, variables: { res: 3, n: 3 },
      visualType: 'array-pointers',
      visualData: { elements: [3, 0, 1], pointers: [{ name: 'i', index: 0 }], activeMap: { 'res': 3 } }
    },
    {
      step: 2, totalSteps: 4, action: 'XOR Index 0 and nums[0]=3',
      explanation: 'res = res ^ 0 ^ nums[0] = 3 ^ 0 ^ 3 = 0.',
      javaLine: 5, variables: { i: 0, 'nums[0]': 3, res: 0 },
      visualType: 'array-pointers',
      visualData: { elements: [3, 0, 1], pointers: [{ name: 'i', index: 0 }], activeMap: { 'res': 0 } }
    },
    {
      step: 3, totalSteps: 4, action: 'XOR Index 1 and nums[1]=0',
      explanation: 'res = res ^ 1 ^ nums[1] = 0 ^ 1 ^ 0 = 1.',
      javaLine: 5, variables: { i: 1, 'nums[1]': 0, res: 1 },
      visualType: 'array-pointers',
      visualData: { elements: [3, 0, 1], pointers: [{ name: 'i', index: 1 }], activeMap: { 'res': 1 } }
    },
    {
      step: 4, totalSteps: 4, action: 'XOR Index 2 and nums[2]=1 -> Missing = 2',
      explanation: 'res = res ^ 2 ^ nums[2] = 1 ^ 2 ^ 1 = 2! All paired numbers cancel out, leaving the missing number 2.',
      javaLine: 7, variables: { missing: 2, result: 2 },
      visualType: 'array-pointers',
      visualData: { elements: [3, 0, 1], pointers: [{ name: 'MISSING: 2', index: 2 }], activeMap: { 'missing': 2 }, solved: true }
    }
  ],

  'sum-of-two-integers': [
    {
      step: 1, totalSteps: 4, action: 'Input a = 1, b = 2',
      explanation: 'Bitwise addition: (a ^ b) is sum without carry; ((a & b) << 1) is the carry.',
      javaLine: 3, variables: { a: 1, b: 2 },
      visualType: 'bit-binary',
      visualData: {
        label: 'Initial Registers',
        bits: ['0', '0', '0', '0', '0', '0', '1', '1'],
        operation: 'a=0001, b=0010'
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Calculate Carry: (a & b) << 1',
      explanation: '1 & 2 = 0. carry = 0 << 1 = 0. No carry generated!',
      javaLine: 5, variables: { carry: 0 },
      visualType: 'bit-binary',
      visualData: {
        label: 'Carry Check',
        bits: ['0', '0', '0', '0', '0', '0', '0', '0'],
        operation: 'carry = (1 & 2) << 1 = 0'
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Compute Sum: a = a ^ b',
      explanation: '1 ^ 2 = 3 (binary 0011). b is set to carry (0).',
      javaLine: 6, variables: { a: 3, b: 0 },
      visualType: 'bit-binary',
      visualData: {
        label: 'a = 1 ^ 2 = 3',
        bits: ['0', '0', '0', '0', '0', '0', '1', '1'],
        activeBit: 6,
        operation: 'a = 3, b = 0'
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Carry is 0 -> Final Sum = 3',
      explanation: 'Addition complete in hardware bitwise logic without using the + operator!',
      javaLine: 8, variables: { result: 3 },
      visualType: 'bit-binary',
      visualData: {
        label: 'Result: 3',
        bits: ['0', '0', '0', '0', '0', '0', '1', '1'],
        operation: 'Output: 3',
        solved: true
      }
    }
  ],

  'reverse-bits': [
    {
      step: 1, totalSteps: 4, action: 'Init Output: result = 0',
      explanation: 'Iterate 32 times: shift result left, append (n & 1), then unsigned right shift n.',
      javaLine: 3, variables: { result: 0, bitsProcessed: 0 },
      visualType: 'bit-binary',
      visualData: {
        label: 'Initial 32-bit state',
        bits: ['0', '0', '0', '0', '1', '0', '1', '1'],
        operation: 'result = (result << 1) | (n & 1)'
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Read Bit 0 (1) -> Shift to MSB',
      explanation: 'Low bit is 1. Shifted into result position.',
      javaLine: 5, variables: { bit: 1, result: 1 },
      visualType: 'bit-binary',
      visualData: {
        label: 'First bit reversed',
        bits: ['1', '0', '0', '0', '0', '0', '0', '0'],
        activeBit: 0,
        operation: 'bit 0 moved to MSB'
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Process Remaining 31 Bits',
      explanation: 'Each bit is extracted and shifted into reverse mirrored position.',
      javaLine: 6, variables: { progress: '32/32 bits' },
      visualType: 'bit-binary',
      visualData: {
        label: 'Reversing 32 bits',
        bits: ['1', '1', '0', '1', '0', '0', '0', '0'],
        operation: 'n >>>= 1 in loop'
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Reverse Complete: 964176192',
      explanation: 'Complete 32-bit integer reversed in O(1) constant time!',
      javaLine: 8, variables: { result: '964176192' },
      visualType: 'bit-binary',
      visualData: {
        label: 'Reversed 32-bit integer',
        bits: ['1', '1', '0', '1', '0', '0', '0', '0'],
        operation: 'Result = 964176192',
        solved: true
      }
    }
  ]
};
