import type { SimFrame } from './types';

export const HEAP_SIMULATIONS: Record<string, () => SimFrame[]> = {
  'top-k-frequent-elements': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Count Frequencies with HashMap',
        explanation: 'nums = [1, 1, 1, 2, 2, 3], k = 2. Frequencies: 1 appears 3 times, 2 appears 2 times, 3 appears 1 time.',
        javaLine: 4, variables: { 'count.size': 3, k: 2 },
        visualType: 'frequency-map',
        visualData: {
          label: 'Frequency Map: {1: 3, 2: 2, 3: 1}',
          counts: { '1': 3, '2': 2, '3': 1 },
          activeChar: '1'
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Populate Frequency Buckets (index = frequency)',
        explanation: 'bucket[1] = [3], bucket[2] = [2], bucket[3] = [1]. Maximum possible frequency is nums.length (6).',
        javaLine: 11, variables: { 'bucket[3]': '[1]', 'bucket[2]': '[2]', 'bucket[1]': '[3]' },
        visualType: 'frequency-map',
        visualData: {
          label: 'Bucket Array (O(N) sort by frequency)',
          counts: { '1': 3, '2': 2, '3': 1 },
          groups: [
            { key: 'Freq 3', items: ['1'] },
            { key: 'Freq 2', items: ['2'] },
            { key: 'Freq 1', items: ['3'] }
          ]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Extract Top-1: Number 1 from Bucket 3',
        explanation: 'Scan buckets backwards from index 6 down. At bucket[3], extract 1. res[0] = 1, idx = 1 < k (2).',
        javaLine: 18, variables: { idx: 1, 'res[0]': 1 },
        visualType: 'frequency-map',
        visualData: {
          label: 'Extracted Most Frequent Element: 1',
          counts: { '1': 3, '2': 2, '3': 1 },
          activeChar: '1',
          groups: [
            { key: 'Freq 3 (Selected)', items: ['1'] },
            { key: 'Freq 2', items: ['2'] },
            { key: 'Freq 1', items: ['3'] }
          ]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Extract Top-2: Number 2 from Bucket 2 and Return [1, 2]',
        explanation: 'At bucket[2], extract 2. idx reaches k = 2. Return [1, 2]. Linear Time O(N), Space O(N).',
        javaLine: 24, variables: { result: '[1, 2]' },
        visualType: 'frequency-map',
        visualData: {
          label: 'Top 2 Frequent Elements: [1, 2]',
          counts: { '1': 3, '2': 2, '3': 1 },
          activeChar: '2',
          groups: [
            { key: 'Freq 3 (Selected)', items: ['1'] },
            { key: 'Freq 2 (Selected)', items: ['2'] },
            { key: 'Freq 1', items: ['3'] }
          ]
        }
      }
    ];
  },

  'find-median-from-data-stream': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'addNum(1): Insert into Max-Heap',
        explanation: 'Insert 1 into max-heap `small`. small: [1], large: []. Median is small.peek() = 1.0.',
        javaLine: 10, variables: { num: 1, 'small.size': 1, 'large.size': 0 },
        visualType: 'heap-balance',
        visualData: {
          label: 'Insert 1 -> Max-Heap has 1',
          maxHeap: [1],
          minHeap: [],
          median: 1.0
        }
      },
      {
        step: 2, totalSteps: 4, action: 'addNum(2): Balance between Heaps',
        explanation: 'Insert 2 into small. Since 2 > large.peek (or small size > large size + 1), balance 2 into `large` min-heap. small: [1], large: [2].',
        javaLine: 17, variables: { num: 2, 'small': '[1]', 'large': '[2]' },
        visualType: 'heap-balance',
        visualData: {
          label: 'Balanced: small=[1], large=[2]',
          maxHeap: [1],
          minHeap: [2],
          median: 1.5
        }
      },
      {
        step: 3, totalSteps: 4, action: 'findMedian(): Equal Sizes -> (1 + 2) / 2.0 = 1.5',
        explanation: 'Both heaps have size 1. Median = (small.peek() + large.peek()) / 2.0 = (1 + 2) / 2.0 = 1.5.',
        javaLine: 27, variables: { 'small.peek()': 1, 'large.peek()': 2, median: 1.5 },
        visualType: 'heap-balance',
        visualData: {
          label: 'Median of [1, 2] = 1.5',
          maxHeap: [1],
          minHeap: [2],
          median: 1.5
        }
      },
      {
        step: 4, totalSteps: 4, action: 'addNum(3): small=[2, 1], large=[3] -> Median = 2.0',
        explanation: 'Insert 3: small absorbs 2, large holds 3. small.size (2) > large.size (1). Median is small.peek() = 2.0. Time O(log N) per insert, O(1) median.',
        javaLine: 25, variables: { num: 3, 'small': '[2, 1]', 'large': '[3]', median: 2.0 },
        visualType: 'heap-balance',
        visualData: {
          label: 'Stream: [1, 2, 3] -> Median = 2.0',
          maxHeap: [2, 1],
          minHeap: [3],
          median: 2.0
        }
      }
    ];
  }
};
