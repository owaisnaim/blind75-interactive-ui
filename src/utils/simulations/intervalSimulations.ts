import type { SimFrame } from './types';

export const INTERVAL_SIMULATIONS: Record<string, () => SimFrame[]> = {
  'insert-interval': () => {
    const original = [[1, 3], [6, 9]];
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize List and Index i = 0',
        explanation: 'Create empty result list `res`. Start checking existing intervals against newInterval [2, 5].',
        javaLine: 3, variables: { i: 0, 'newInterval[0]': 2, 'newInterval[1]': 5, res: '[]' },
        visualType: 'interval-sweep',
        visualData: { label: 'Insert [2, 5] into [[1,3], [6,9]]', intervals: original, activeIdx: 0, merged: [], maxVal: 12 }
      },
      {
        step: 2, totalSteps: 4, action: 'Check Non-overlapping Left Intervals',
        explanation: 'intervals[0] = [1, 3]. Does intervals[0][1] (3) < newInterval[0] (2)? No, they overlap! Enter merge loop.',
        javaLine: 11, variables: { i: 0, 'intervals[0]': '[1, 3]', overlap: true },
        visualType: 'interval-sweep',
        visualData: { label: 'Merging [1, 3] with [2, 5]', intervals: original, activeIdx: 0, merged: [], maxVal: 12 }
      },
      {
        step: 3, totalSteps: 4, action: 'Merge Overlapping Interval [1, 3] into [1, 5]',
        explanation: 'newInterval[0] = Math.min(2, 1) = 1. newInterval[1] = Math.max(5, 3) = 5. Merged newInterval is now [1, 5].',
        javaLine: 12, variables: { i: 1, 'newInterval': '[1, 5]' },
        visualType: 'interval-sweep',
        visualData: { label: 'Merged Interval is [1, 5]', intervals: original, activeIdx: 1, merged: [[1, 5]], maxVal: 12 }
      },
      {
        step: 4, totalSteps: 4, action: 'Add Remaining Interval [6, 9] and Return',
        explanation: 'intervals[1] = [6, 9] starts after 5. Append [6, 9] directly to result. Final list: [[1, 5], [6, 9]].',
        javaLine: 19, variables: { result: '[[1, 5], [6, 9]]' },
        visualType: 'interval-sweep',
        visualData: { label: 'Final Merged Result: [[1, 5], [6, 9]]', intervals: original, activeIdx: -1, merged: [[1, 5], [6, 9]], maxVal: 12 }
      }
    ];
  },

  'merge-intervals': () => {
    const input = [[1, 3], [2, 6], [8, 10], [15, 18]];
    return [
      {
        step: 1, totalSteps: 4, action: 'Sort Intervals by Start Time',
        explanation: 'Sort intervals by start coordinate. Add first interval [1, 3] to result list `res`.',
        javaLine: 5, variables: { 'res[0]': '[1, 3]', i: 1 },
        visualType: 'interval-sweep',
        visualData: { label: 'Sorted Intervals. Initialized with [1, 3]', intervals: input, activeIdx: 0, merged: [[1, 3]], maxVal: 20 }
      },
      {
        step: 2, totalSteps: 4, action: 'Compare [2, 6] with Prev [1, 3]',
        explanation: 'intervals[1][0] (2) <= prev[1] (3): Overlap detected! Extend prev[1] = Math.max(3, 6) = 6.',
        javaLine: 9, variables: { i: 1, 'curr': '[2, 6]', 'prev': '[1, 6]' },
        visualType: 'interval-sweep',
        visualData: { label: 'Overlap! Merged to [1, 6]', intervals: input, activeIdx: 1, merged: [[1, 6]], maxVal: 20 }
      },
      {
        step: 3, totalSteps: 4, action: 'Process Non-overlapping [8, 10]',
        explanation: 'intervals[2][0] (8) > prev[1] (6): No overlap. Push [8, 10] directly into `res`.',
        javaLine: 11, variables: { i: 2, 'curr': '[8, 10]', 'res': '[[1, 6], [8, 10]]' },
        visualType: 'interval-sweep',
        visualData: { label: 'No overlap: Push [8, 10]', intervals: input, activeIdx: 2, merged: [[1, 6], [8, 10]], maxVal: 20 }
      },
      {
        step: 4, totalSteps: 4, action: 'Process [15, 18] and Return Final Matrix',
        explanation: 'intervals[3][0] (15) > 10: No overlap. Push [15, 18]. Return [[1, 6], [8, 10], [15, 18]].',
        javaLine: 14, variables: { result: '[[1, 6], [8, 10], [15, 18]]' },
        visualType: 'interval-sweep',
        visualData: { label: 'All Merged: [[1, 6], [8, 10], [15, 18]]', intervals: input, activeIdx: -1, merged: [[1, 6], [8, 10], [15, 18]], maxVal: 20 }
      }
    ];
  },

  'non-overlapping-intervals': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Sort Intervals by End Time (Greedy)',
        explanation: 'Sort by intervals[i][1]. Sorted: [[1, 2], [2, 3], [1, 3], [3, 4]]. Set prevEnd = 2, count = 0.',
        javaLine: 3, variables: { prevEnd: 2, count: 0 },
        visualType: 'interval-sweep',
        visualData: { label: 'Sorted by End: [[1,2], [2,3], [1,3], [3,4]]', intervals: [[1, 2], [2, 3], [1, 3], [3, 4]], activeIdx: 0, merged: [[1, 2]], maxVal: 6 }
      },
      {
        step: 2, totalSteps: 4, action: 'Evaluate [2, 3]',
        explanation: 'intervals[1][0] (2) >= prevEnd (2): No overlap! Keep [2, 3] and update prevEnd = 3.',
        javaLine: 10, variables: { i: 1, 'curr': '[2, 3]', prevEnd: 3, count: 0 },
        visualType: 'interval-sweep',
        visualData: { label: 'Compatible: Keep [2, 3]', intervals: [[1, 2], [2, 3], [1, 3], [3, 4]], activeIdx: 1, merged: [[1, 2], [2, 3]], maxVal: 6 }
      },
      {
        step: 3, totalSteps: 4, action: 'Evaluate [1, 3] (Collision)',
        explanation: 'intervals[2][0] (1) < prevEnd (3): Overlap! Greedily remove interval [1, 3] to minimize conflicts. count++ = 1.',
        javaLine: 8, variables: { i: 2, 'curr': '[1, 3]', count: 1, action: 'Drop [1, 3]' },
        visualType: 'interval-sweep',
        visualData: { label: 'Conflict! Erase [1, 3]', intervals: [[1, 2], [2, 3], [1, 3], [3, 4]], activeIdx: 2, merged: [[1, 2], [2, 3]], maxVal: 6 }
      },
      {
        step: 4, totalSteps: 4, action: 'Evaluate [3, 4] and Return Min Removals',
        explanation: 'intervals[3][0] (3) >= prevEnd (3): Valid. Keep [3, 4]. Total removals required = 1.',
        javaLine: 13, variables: { count: 1, result: 1 },
        visualType: 'interval-sweep',
        visualData: { label: 'Optimal Non-overlapping Set. Removals = 1', intervals: [[1, 2], [2, 3], [1, 3], [3, 4]], activeIdx: 3, merged: [[1, 2], [2, 3], [3, 4]], maxVal: 6 }
      }
    ];
  },

  'meeting-rooms': () => {
    const meetings = [[0, 30], [5, 10], [15, 20]];
    return [
      {
        step: 1, totalSteps: 4, action: 'Sort Meetings by Start Time',
        explanation: 'Sort meetings by start time: [[0, 30], [5, 10], [15, 20]]. Check for consecutive conflicts.',
        javaLine: 3, variables: { totalMeetings: 3, i: 1 },
        visualType: 'interval-sweep',
        visualData: { label: 'Meetings Sorted by Start Time', intervals: meetings, activeIdx: 0, merged: [[0, 30]], maxVal: 35 }
      },
      {
        step: 2, totalSteps: 4, action: 'Compare Meeting 0 [0, 30] and Meeting 1 [5, 10]',
        explanation: 'intervals[1][0] (5) < intervals[0][1] (30): Overlap detected! Meeting 1 starts before Meeting 0 finishes.',
        javaLine: 5, variables: { 'prevEnd': 30, 'currStart': 5, overlap: true },
        visualType: 'interval-sweep',
        visualData: { label: 'Conflict: [5, 10] starts during [0, 30]!', intervals: meetings, activeIdx: 1, merged: [[0, 30]], maxVal: 35 }
      },
      {
        step: 3, totalSteps: 4, action: 'Trigger Conflict Violation',
        explanation: 'Since one person cannot be in two meetings at once, return false immediately.',
        javaLine: 6, variables: { conflictFound: true, returnVal: 'false' },
        visualType: 'interval-sweep',
        visualData: { label: 'Schedule clash: cannot attend all meetings', intervals: meetings, activeIdx: 1, merged: [], maxVal: 35 }
      },
      {
        step: 4, totalSteps: 4, action: 'Final Decision: false',
        explanation: 'Time Complexity: O(N log N) due to sorting, Space Complexity: O(1).',
        javaLine: 9, variables: { canAttend: false },
        visualType: 'interval-sweep',
        visualData: { label: 'Result: false (Overlapping schedule)', intervals: meetings, activeIdx: -1, merged: [], maxVal: 35 }
      }
    ];
  },

  'meeting-rooms-ii': () => {
    const intervals = [[0, 30], [5, 10], [15, 20]];
    return [
      {
        step: 1, totalSteps: 4, action: 'Separate & Sort Starts and Ends',
        explanation: 'Extract starts [0, 5, 15] and ends [10, 20, 30]. Both arrays sorted in ascending order.',
        javaLine: 10, variables: { 'starts': '[0, 5, 15]', 'ends': '[10, 20, 30]', s: 0, e: 0, rooms: 0 },
        visualType: 'interval-sweep',
        visualData: { label: 'Starts: [0, 5, 15] | Ends: [10, 20, 30]', intervals, activeIdx: 0, merged: [[0, 30]], maxVal: 35 }
      },
      {
        step: 2, totalSteps: 4, action: 'Start = 0: Allocate Room 1',
        explanation: 'starts[0] (0) < ends[0] (10): A meeting starts before any previous ends. rooms = 1, s = 1.',
        javaLine: 16, variables: { s: 1, e: 0, rooms: 1, maxRooms: 1 },
        visualType: 'interval-sweep',
        visualData: { label: 'Time 0: Room 1 Allocated', intervals, activeIdx: 0, merged: [[0, 30]], maxVal: 35 }
      },
      {
        step: 3, totalSteps: 4, action: 'Start = 5: Allocate Room 2 (Peak Concurrency)',
        explanation: 'starts[1] (5) < ends[0] (10): Another meeting starts! rooms = 2, maxRooms = 2, s = 2.',
        javaLine: 16, variables: { s: 2, e: 0, rooms: 2, maxRooms: 2 },
        visualType: 'interval-sweep',
        visualData: { label: 'Time 5: Room 2 Allocated (Peak 2 Rooms)', intervals, activeIdx: 1, merged: [[0, 30], [5, 10]], maxVal: 35 }
      },
      {
        step: 4, totalSteps: 4, action: 'Process Remainder & Return Peak Rooms = 2',
        explanation: 'starts[2] (15) > ends[0] (10): Room freed (rooms=1), then occupied again (rooms=2). Max simultaneous rooms = 2.',
        javaLine: 24, variables: { result: 2, maxRooms: 2 },
        visualType: 'interval-sweep',
        visualData: { label: 'Minimum Conference Rooms Required = 2', intervals, activeIdx: -1, merged: [[0, 30], [5, 10], [15, 20]], maxVal: 35 }
      }
    ];
  }
};
