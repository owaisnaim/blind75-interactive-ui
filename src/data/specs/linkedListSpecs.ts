import type { ProblemSpec } from '../problemTestCases';

export const linkedListSpecs: Record<string, ProblemSpec> = {
  'reverse-linked-list': {
    description: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.`,
    methodName: 'reverseList',
    starterJava: `class Solution {
    public ListNode reverseList(ListNode head) {
        // Iteratively reverse next pointers using prev, curr, and next pointers
        
    }
}`,
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    examples: [
      {
        id: 1,
        input: { head: [1, 2, 3, 4, 5] },
        displayInput: 'head = [1,2,3,4,5]',
        expectedOutput: [5, 4, 3, 2, 1],
        displayOutput: '[5,4,3,2,1]',
        explanation: 'Reversing the direction of all next pointers yields [5, 4, 3, 2, 1].'
      },
      {
        id: 2,
        input: { head: [1, 2] },
        displayInput: 'head = [1,2]',
        expectedOutput: [2, 1],
        displayOutput: '[2,1]',
        explanation: 'Reversing [1, 2] yields [2, 1].'
      },
      {
        id: 3,
        input: { head: [] },
        displayInput: 'head = []',
        expectedOutput: [],
        displayOutput: '[]',
        explanation: 'An empty list reversed remains empty.'
      }
    ],
    hiddenTestCases: []
  },

  'linked-list-cycle': {
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer. Internally, \`pos\` is used to denote the index of the node that tail's \`next\` pointer is connected to. Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.`,
    methodName: 'hasCycle',
    starterJava: `public class Solution {
    public boolean hasCycle(ListNode head) {
        // Floyd's Tortoise and Hare algorithm
        
    }
}`,
    constraints: [
      'The number of the nodes in the list is in the range [0, 10^4].',
      '-10^5 <= Node.val <= 10^5',
      'pos is -1 or a valid index in the linked-list.'
    ],
    examples: [
      {
        id: 1,
        input: { head: [3, 2, 0, -4], pos: 1 },
        displayInput: 'head = [3,2,0,-4], pos = 1',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).'
      },
      {
        id: 2,
        input: { head: [1, 2], pos: 0 },
        displayInput: 'head = [1,2], pos = 0',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'There is a cycle in the linked list, where the tail connects to the 0th node.'
      },
      {
        id: 3,
        input: { head: [1], pos: -1 },
        displayInput: 'head = [1], pos = -1',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'There is no cycle in the linked list.'
      }
    ],
    hiddenTestCases: []
  },

  'merge-two-sorted-lists': {
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`. Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists. Return *the head of the merged linked list*.`,
    methodName: 'mergeTwoLists',
    starterJava: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Splice nodes together using a dummy head
        
    }
}`,
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.'
    ],
    examples: [
      {
        id: 1,
        input: { list1: [1, 2, 4], list2: [1, 3, 4] },
        displayInput: 'list1 = [1,2,4], list2 = [1,3,4]',
        expectedOutput: [1, 1, 2, 3, 4, 4],
        displayOutput: '[1,1,2,3,4,4]',
        explanation: 'Merging sorted lists [1, 2, 4] and [1, 3, 4] gives [1, 1, 2, 3, 4, 4].'
      },
      {
        id: 2,
        input: { list1: [], list2: [] },
        displayInput: 'list1 = [], list2 = []',
        expectedOutput: [],
        displayOutput: '[]',
        explanation: 'Merging two empty lists results in an empty list.'
      },
      {
        id: 3,
        input: { list1: [], list2: [0] },
        displayInput: 'list1 = [], list2 = [0]',
        expectedOutput: [0],
        displayOutput: '[0]',
        explanation: 'Merging an empty list with [0] results in [0].'
      }
    ],
    hiddenTestCases: []
  },

  'merge-k-sorted-lists': {
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.`,
    methodName: 'mergeKLists',
    starterJava: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // Min-heap PriorityQueue of list heads: O(N log k)
        
    }
}`,
    constraints: [
      'k == lists.length',
      '0 <= k <= 10^4',
      '0 <= lists[i].length <= 500',
      '-10^4 <= lists[i][j] <= 10^4',
      'lists[i] is sorted in ascending order.'
    ],
    examples: [
      {
        id: 1,
        input: { lists: [[1, 4, 5], [1, 3, 4], [2, 6]] },
        displayInput: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        expectedOutput: [1, 1, 2, 3, 4, 4, 5, 6],
        displayOutput: '[1,1,2,3,4,4,5,6]',
        explanation: 'The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6'
      },
      {
        id: 2,
        input: { lists: [] },
        displayInput: 'lists = []',
        expectedOutput: [],
        displayOutput: '[]',
        explanation: 'With no lists provided, the merged list is empty.'
      },
      {
        id: 3,
        input: { lists: [[]] },
        displayInput: 'lists = [[]]',
        expectedOutput: [],
        displayOutput: '[]',
        explanation: 'With an array containing only an empty list, the result is an empty list.'
      }
    ],
    hiddenTestCases: []
  },

  'remove-nth-node-from-end-of-list': {
    description: `Given the \`head\` of a linked list, remove the \`n-th\` node from the end of the list and return its head.`,
    methodName: 'removeNthFromEnd',
    starterJava: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Two-pointer fast & slow with dummy head
        
    }
}`,
    constraints: [
      'The number of nodes in the list is sz.',
      '1 <= sz <= 30',
      '0 <= Node.val <= 100',
      '1 <= n <= sz'
    ],
    examples: [
      {
        id: 1,
        input: { head: [1, 2, 3, 4, 5], n: 2 },
        displayInput: 'head = [1,2,3,4,5], n = 2',
        expectedOutput: [1, 2, 3, 5],
        displayOutput: '[1,2,3,5]',
        explanation: 'The 2nd node from the end is node 4. Removing it gives [1, 2, 3, 5].'
      },
      {
        id: 2,
        input: { head: [1], n: 1 },
        displayInput: 'head = [1], n = 1',
        expectedOutput: [],
        displayOutput: '[]',
        explanation: 'The 1st node from the end is the head itself. Removing it leaves an empty list.'
      },
      {
        id: 3,
        input: { head: [1, 2], n: 1 },
        displayInput: 'head = [1,2], n = 1',
        expectedOutput: [1],
        displayOutput: '[1]',
        explanation: 'The 1st node from the end is node 2. Removing it gives [1].'
      }
    ],
    hiddenTestCases: []
  },

  'reorder-list': {
    description: `You are given the head of a singly linked-list. The list can be represented as: \`L0 -> L1 -> ... -> Ln - 1 -> Ln\`. Reorder the list to be on the following form: \`L0 -> Ln -> L1 -> Ln - 1 -> L2 -> Ln - 2 -> ...\`. You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
    methodName: 'reorderList',
    starterJava: `class Solution {
    public void reorderList(ListNode head) {
        // 1. Find midpoint, 2. Reverse second half, 3. Merge halves
        
    }
}`,
    constraints: [
      'The number of nodes in the list is in the range [1, 5 * 10^4].',
      '1 <= Node.val <= 1000'
    ],
    examples: [
      {
        id: 1,
        input: { head: [1, 2, 3, 4] },
        displayInput: 'head = [1,2,3,4]',
        expectedOutput: [1, 4, 2, 3],
        displayOutput: '[1,4,2,3]',
        explanation: 'Interleaving the first half [1, 2] and reversed second half [4, 3] produces [1, 4, 2, 3].'
      },
      {
        id: 2,
        input: { head: [1, 2, 3, 4, 5] },
        displayInput: 'head = [1,2,3,4,5]',
        expectedOutput: [1, 5, 2, 4, 3],
        displayOutput: '[1,5,2,4,3]',
        explanation: 'Interleaving the first half [1, 2, 3] and reversed second half [5, 4] produces [1, 5, 2, 4, 3].'
      }
    ],
    hiddenTestCases: []
  }
};
