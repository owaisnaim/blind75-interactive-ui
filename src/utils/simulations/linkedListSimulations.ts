import type { SimFrame } from './types';

export const linkedListSimulations: Record<string, SimFrame[]> = {
  'reverse-linked-list': [
    {
      step: 1, totalSteps: 5, action: 'Init: prev=null, curr=Node(1)',
      explanation: 'Save next node before severing the link.',
      javaLine: 3, variables: { prev: 'null', curr: 1 },
      visualType: 'linked-list',
      visualData: { nodes: [1, 2, 3, 4, 5], prev: null, curr: 0, next: 1, reversedCount: 0 }
    },
    {
      step: 2, totalSteps: 5, action: 'Reverse Node(1) -> null',
      explanation: 'curr.next = prev; prev = curr; curr = next.',
      javaLine: 6, variables: { prev: 1, curr: 2 },
      visualType: 'linked-list',
      visualData: { nodes: [1, 2, 3, 4, 5], prev: 0, curr: 1, next: 2, reversedCount: 1 }
    },
    {
      step: 3, totalSteps: 5, action: 'Reverse Node(2) -> Node(1)',
      explanation: 'Chain is now: null <- 1 <- 2. Pointers advance.',
      javaLine: 7, variables: { prev: 2, curr: 3 },
      visualType: 'linked-list',
      visualData: { nodes: [1, 2, 3, 4, 5], prev: 1, curr: 2, next: 3, reversedCount: 2 }
    },
    {
      step: 4, totalSteps: 5, action: 'Reverse Remaining Nodes',
      explanation: 'Chain is now: null <- 1 <- 2 <- 3 <- 4 <- 5.',
      javaLine: 7, variables: { prev: 5, curr: 'null' },
      visualType: 'linked-list',
      visualData: { nodes: [1, 2, 3, 4, 5], prev: 4, curr: null, next: null, reversedCount: 5 }
    },
    {
      step: 5, totalSteps: 5, action: 'Return prev = Node(5)',
      explanation: 'All links reversed in O(N) single pass and O(1) space!',
      javaLine: 10, variables: { newHead: 5, result: '[5, 4, 3, 2, 1]' },
      visualType: 'linked-list',
      visualData: { nodes: [1, 2, 3, 4, 5], prev: 4, curr: null, next: null, reversedCount: 5, solved: true }
    }
  ],

  'linked-list-cycle': [
    {
      step: 1, totalSteps: 4, action: 'Init Slow and Fast at Head (3)',
      explanation: 'Floyd\'s Cycle-Finding Algorithm. Slow moves 1 step, Fast moves 2 steps.',
      javaLine: 3, variables: { slow: 3, fast: 3 },
      visualType: 'linked-list',
      visualData: { nodes: [3, 2, 0, -4], slow: 0, fast: 0, cycleIndex: 1 }
    },
    {
      step: 2, totalSteps: 4, action: 'First Leap: slow=Node(2), fast=Node(0)',
      explanation: 'Fast outpaces slow. Cycle loops Node(-4) back to Node(2).',
      javaLine: 6, variables: { slow: 2, fast: 0 },
      visualType: 'linked-list',
      visualData: { nodes: [3, 2, 0, -4], slow: 1, fast: 2, cycleIndex: 1 }
    },
    {
      step: 3, totalSteps: 4, action: 'Second Leap: slow=Node(0), fast=Node(2)',
      explanation: 'Fast looped around the cycle and is now right behind slow!',
      javaLine: 6, variables: { slow: 0, fast: 1 },
      visualType: 'linked-list',
      visualData: { nodes: [3, 2, 0, -4], slow: 2, fast: 1, cycleIndex: 1 }
    },
    {
      step: 4, totalSteps: 4, action: 'Collision! slow == fast at Node(-4)',
      explanation: 'Collision detected! A cycle definitively exists in O(N) time and O(1) space.',
      javaLine: 7, variables: { collisionNode: -4, result: 'true' },
      visualType: 'linked-list',
      visualData: { nodes: [3, 2, 0, -4], slow: 3, fast: 3, cycleIndex: 1, solved: true }
    }
  ],

  'merge-two-sorted-lists': [
    {
      step: 1, totalSteps: 4, action: 'Initialize Dummy and Tail Pointers',
      explanation: 'ListNode dummy = new ListNode(0); tail = dummy. Compare list1 (1) and list2 (1).',
      javaLine: 3, variables: { 'list1.val': 1, 'list2.val': 1 },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'List 1', nodes: [1, 2, 4], curr: 0 },
          { label: 'List 2', nodes: [1, 3, 4], curr: 0 },
          { label: 'Merged', nodes: [0], curr: 0 }
        ]
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Append 1, Advance list1 to 2',
      explanation: 'list1.val <= list2.val -> tail.next = list1; list1 = list1.next. Compare 2 and 1.',
      javaLine: 7, variables: { 'list1.val': 2, 'list2.val': 1 },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'List 1', nodes: [1, 2, 4], curr: 1 },
          { label: 'List 2', nodes: [1, 3, 4], curr: 0 },
          { label: 'Merged', nodes: [1], curr: 0 }
        ]
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Interleave [1, 2, 3] from Lists',
      explanation: 'Greedily append the smaller node at each step in O(N + M) time.',
      javaLine: 10, variables: { mergedCount: 4 },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'List 1', nodes: [1, 2, 4], curr: 2 },
          { label: 'List 2', nodes: [1, 3, 4], curr: 2 },
          { label: 'Merged', nodes: [1, 1, 2, 3], curr: 3 }
        ]
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Attach Remaining Nodes: [1, 1, 2, 3, 4, 4]',
      explanation: 'Attach tail.next = list1 != null ? list1 : list2. Return dummy.next!',
      javaLine: 14, variables: { result: '[1, 1, 2, 3, 4, 4]' },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'Merged', nodes: [1, 1, 2, 3, 4, 4], curr: 5 }
        ],
        solved: true
      }
    }
  ],

  'merge-k-sorted-lists': [
    {
      step: 1, totalSteps: 4, action: 'Initialize Min-Heap PriorityQueue',
      explanation: 'Insert heads of all k lists into PriorityQueue<ListNode> comparing node.val.',
      javaLine: 4, variables: { k: 3, heapSize: 3 },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'List 1', nodes: [1, 4, 5], curr: 0 },
          { label: 'List 2', nodes: [1, 3, 4], curr: 0 },
          { label: 'List 3', nodes: [2, 6], curr: 0 }
        ]
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Poll Min Node (1) -> Push Next (4)',
      explanation: 'PriorityQueue extracts lowest value 1 in O(log k). Append to merged tail and push its next node.',
      javaLine: 8, variables: { minVal: 1, heapSize: 3 },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'Active Min', nodes: [1], curr: 0 },
          { label: 'Merged Tail', nodes: [1, 1], curr: 1 }
        ]
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Extract [2, 3, 4] Sequentially',
      explanation: 'Min-heap maintains smallest elements among the k active list fronts.',
      javaLine: 10, variables: { progress: '6/8 nodes' },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'Merged Tail', nodes: [1, 1, 2, 3, 4, 4], curr: 5 }
        ]
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Merged k Lists in O(N log k) Time',
      explanation: 'All lists exhausted. Return dummy.next: [1, 1, 2, 3, 4, 4, 5, 6]!',
      javaLine: 13, variables: { result: '[1,1,2,3,4,4,5,6]' },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'Final Merged', nodes: [1, 1, 2, 3, 4, 4, 5, 6], curr: 7 }
        ],
        solved: true
      }
    }
  ],

  'remove-nth-node-from-end-of-list': [
    {
      step: 1, totalSteps: 4, action: 'Init Dummy & Advance Fast by n=2',
      explanation: 'dummy points to head [1, 2, 3, 4, 5]. Advance fast pointer n+1 times.',
      javaLine: 4, variables: { n: 2, fastIndex: 2, slowIndex: -1 },
      visualType: 'linked-list',
      visualData: { nodes: [1, 2, 3, 4, 5], slow: 0, fast: 2 }
    },
    {
      step: 2, totalSteps: 4, action: 'Slide Both Slow and Fast Together',
      explanation: 'Move slow and fast until fast reaches null. Gap between them is exactly n+1.',
      javaLine: 7, variables: { fastIndex: 5, slowIndex: 2 },
      visualType: 'linked-list',
      visualData: { nodes: [1, 2, 3, 4, 5], slow: 2, fast: 4 }
    },
    {
      step: 3, totalSteps: 4, action: 'Bypass Target: slow.next = slow.next.next',
      explanation: 'slow points to Node(3). Target Node(4) is deleted by unlinking: 3 -> 5.',
      javaLine: 9, variables: { removedNode: 4 },
      visualType: 'linked-list',
      visualData: { nodes: [1, 2, 3, 5], curr: 2, prev: 1 }
    },
    {
      step: 4, totalSteps: 4, action: 'Return dummy.next = [1, 2, 3, 5]',
      explanation: 'N-th node from end removed in a single O(N) linear pass with O(1) space!',
      javaLine: 11, variables: { result: '[1, 2, 3, 5]' },
      visualType: 'linked-list',
      visualData: { nodes: [1, 2, 3, 5], curr: 0, solved: true }
    }
  ],

  'reorder-list': [
    {
      step: 1, totalSteps: 4, action: 'Find Middle Node using Fast & Slow',
      explanation: 'Slow at Node(2), fast reaches end. Split list into [1, 2] and [3, 4].',
      javaLine: 5, variables: { mid: 2 },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'First Half', nodes: [1, 2], curr: 1 },
          { label: 'Second Half', nodes: [3, 4], curr: 0 }
        ]
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Reverse Second Half: [3, 4] -> [4, 3]',
      explanation: 'Standard in-place linked list reversal on second half.',
      javaLine: 8, variables: { reversedSecondHalf: '[4, 3]' },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'First Half', nodes: [1, 2], curr: 0 },
          { label: 'Reversed 2nd', nodes: [4, 3], curr: 0 }
        ]
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Interleave Nodes Alternating',
      explanation: 'Merge 1 -> 4 -> 2 -> 3. Link first.next = second; second.next = tmp1.',
      javaLine: 11, variables: { interleaved: '1 -> 4 -> 2 -> 3' },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'Reordering', nodes: [1, 4, 2, 3], curr: 2 }
        ]
      }
    },
    {
      step: 4, totalSteps: 4, action: 'In-Place Reorder Complete',
      explanation: 'List successfully transformed to L0 -> Ln -> L1 -> Ln-1 in O(N) time and O(1) space!',
      javaLine: 14, variables: { result: '[1, 4, 2, 3]' },
      visualType: 'linked-list',
      visualData: {
        lists: [
          { label: 'Final Reordered', nodes: [1, 4, 2, 3], curr: 3 }
        ],
        solved: true
      }
    }
  ]
};
