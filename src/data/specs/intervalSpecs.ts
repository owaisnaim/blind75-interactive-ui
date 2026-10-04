import type { ProblemSpec } from '../problemTestCases';

export const intervalSpecs: Record<string, ProblemSpec> = {
  'insert-interval': {
    description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\` sorted in ascending order by \`start_i\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`start_i\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).`,
    methodName: 'insert',
    starterJava: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        // Greedily collect non-overlapping intervals and merge overlapping ones
        
    }
}`,
    constraints: [
      '0 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^5',
      'intervals is sorted by start_i in ascending order.',
      'newInterval.length == 2',
      '0 <= start <= end <= 10^5'
    ],
    examples: [
      {
        id: 1,
        input: { intervals: [[1, 3], [6, 9]], newInterval: [2, 5] },
        displayInput: 'intervals = [[1,3],[6,9]], newInterval = [2,5]',
        expectedOutput: [[1, 5], [6, 9]],
        displayOutput: '[[1,5],[6,9]]',
        explanation: 'Because the new interval [2,5] overlaps with [1,3], merge them into [1,5].'
      },
      {
        id: 2,
        input: { intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval: [4, 8] },
        displayInput: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]',
        expectedOutput: [[1, 2], [3, 10], [12, 16]],
        displayOutput: '[[1,2],[3,10],[12,16]]',
        explanation: 'Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10], merge into [3,10].'
      }
    ],
    hiddenTestCases: []
  },

  'merge-intervals': {
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.`,
    methodName: 'merge',
    starterJava: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Sort by start time and merge overlaps linearly
        
    }
}`,
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^4'
    ],
    examples: [
      {
        id: 1,
        input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
        displayInput: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        expectedOutput: [[1, 6], [8, 10], [15, 18]],
        displayOutput: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].'
      },
      {
        id: 2,
        input: { intervals: [[1, 4], [4, 5]] },
        displayInput: 'intervals = [[1,4],[4,5]]',
        expectedOutput: [[1, 5]],
        displayOutput: '[[1,5]]',
        explanation: 'Intervals [1,4] and [4,5] are considered overlapping.'
      }
    ],
    hiddenTestCases: []
  },

  'non-overlapping-intervals': {
    description: `Given an array of intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return *the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping*.`,
    methodName: 'eraseOverlapIntervals',
    starterJava: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        // Greedy interval scheduling: sort by end time
        
    }
}`,
    constraints: [
      '1 <= intervals.length <= 10^5',
      'intervals[i].length == 2',
      '-5 * 10^4 <= start_i < end_i <= 5 * 10^4'
    ],
    examples: [
      {
        id: 1,
        input: { intervals: [[1, 2], [2, 3], [3, 4], [1, 3]] },
        displayInput: 'intervals = [[1,2],[2,3],[3,4],[1,3]]',
        expectedOutput: 1,
        displayOutput: '1',
        explanation: '[1,3] can be removed and the rest of the intervals are non-overlapping.'
      },
      {
        id: 2,
        input: { intervals: [[1, 2], [1, 2], [1, 2]] },
        displayInput: 'intervals = [[1,2],[1,2],[1,2]]',
        expectedOutput: 2,
        displayOutput: '2',
        explanation: 'You need to remove two [1, 2] to make the rest of the intervals non-overlapping.'
      },
      {
        id: 3,
        input: { intervals: [[1, 2], [2, 3]] },
        displayInput: 'intervals = [[1,2],[2,3]]',
        expectedOutput: 0,
        displayOutput: '0',
        explanation: 'You do not need to remove any intervals since they are already non-overlapping.'
      }
    ],
    hiddenTestCases: []
  },

  'meeting-rooms': {
    description: `Given an array of meeting time intervals where \`intervals[i] = [start_i, end_i]\`, determine if a person could attend all meetings.`,
    methodName: 'canAttendMeetings',
    starterJava: `class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        // Sort by start times and check for any overlaps
        
    }
}`,
    constraints: [
      '0 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i < end_i <= 10^6'
    ],
    examples: [
      {
        id: 1,
        input: { intervals: [[0, 30], [5, 10], [15, 20]] },
        displayInput: 'intervals = [[0,30],[5,10],[15,20]]',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'The meetings [0, 30] and [5, 10] overlap, so a person cannot attend both.'
      },
      {
        id: 2,
        input: { intervals: [[7, 10], [2, 4]] },
        displayInput: 'intervals = [[7,10],[2,4]]',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'The meetings do not overlap in time, so a person can attend both.'
      }
    ],
    hiddenTestCases: []
  },

  'meeting-rooms-ii': {
    description: `Given an array of meeting time intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return *the minimum number of conference rooms required*.`,
    methodName: 'minMeetingRooms',
    starterJava: `class Solution {
    public int minMeetingRooms(int[][] intervals) {
        // Two-pointer sweep-line over sorted start and end arrays
        
    }
}`,
    constraints: [
      '1 <= intervals.length <= 10^4',
      '0 <= start_i < end_i <= 10^6'
    ],
    examples: [
      {
        id: 1,
        input: { intervals: [[0, 30], [5, 10], [15, 20]] },
        displayInput: 'intervals = [[0,30],[5,10],[15,20]]',
        expectedOutput: 2,
        displayOutput: '2',
        explanation: 'The meeting [0, 30] overlaps with both [5, 10] and [15, 20]. At least 2 rooms are needed simultaneously.'
      },
      {
        id: 2,
        input: { intervals: [[7, 10], [2, 4]] },
        displayInput: 'intervals = [[7,10],[2,4]]',
        expectedOutput: 1,
        displayOutput: '1',
        explanation: 'The meetings [2, 4] and [7, 10] do not overlap, so 1 room is sufficient.'
      }
    ],
    hiddenTestCases: []
  }
};
