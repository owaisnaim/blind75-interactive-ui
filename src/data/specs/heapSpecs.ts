import type { ProblemSpec } from '../problemTestCases';

export const heapSpecs: Record<string, ProblemSpec> = {
  'top-k-frequent-elements': {
    description: `Given an integer array \`nums\` and an integer \`k\`, return *the \`k\` most frequent elements*. You may return the answer in **any order**.`,
    methodName: 'topKFrequent',
    starterJava: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Frequency map + bucket sort or min-heap PriorityQueue
        
    }
}`,
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      'k is in the range [1, the number of unique elements in the array].',
      'It is guaranteed that the answer is unique.'
    ],
    examples: [
      {
        id: 1,
        input: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
        displayInput: 'nums = [1,1,1,2,2,3], k = 2',
        expectedOutput: [1, 2],
        displayOutput: '[1,2]',
        explanation: '1 appears 3 times, 2 appears 2 times, and 3 appears 1 time. The 2 most frequent elements are [1, 2].'
      },
      {
        id: 2,
        input: { nums: [1], k: 1 },
        displayInput: 'nums = [1], k = 1',
        expectedOutput: [1],
        displayOutput: '[1]',
        explanation: '1 is the only element, appearing 1 time.'
      }
    ],
    hiddenTestCases: []
  },

  'find-median-from-data-stream': {
    description: `The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.
- For example, for \`arr = [2,3,4]\`, the median is \`3\`.
- For example, for \`arr = [2,3]\`, the median is \`(2 + 3) / 2 = 2.5\`.

Implement the \`MedianFinder\` class:
- \`MedianFinder()\` initializes the \`MedianFinder\` object.
- \`void addNum(int num)\` adds the integer \`num\` from the data stream to the data structure.
- \`double findMedian()\` returns the median of all elements so far. Answers within \`10^-5\` of the actual answer will be accepted.`,
    methodName: 'MedianFinder',
    starterJava: `class MedianFinder {
    public MedianFinder() {
        
    }
    
    public void addNum(int num) {
        
    }
    
    public double findMedian() {
        
    }
}`,
    constraints: [
      '-10^5 <= num <= 10^5',
      'There will be at least one element in the data structure before calling findMedian.',
      'At most 5 * 10^4 calls will be made to addNum and findMedian.'
    ],
    examples: [
      {
        id: 1,
        input: {
          operations: ['MedianFinder', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian'],
          args: [[], [1], [2], [], [3], []]
        },
        displayInput: 'operations = ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]',
        expectedOutput: [null, null, null, 1.5, null, 2.0],
        displayOutput: '[null,null,null,1.5,null,2.0]',
        explanation: 'MedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)\nmedianFinder.addNum(3);    // arr[1, 2, 3]\nmedianFinder.findMedian(); // return 2.0'
      }
    ],
    hiddenTestCases: []
  }
};
