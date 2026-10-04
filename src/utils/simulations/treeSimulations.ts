import type { SimFrame } from './types';

export const TREE_SIMULATIONS: Record<string, () => SimFrame[]> = {
  'maximum-depth-of-binary-tree': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Examine Root Node (val = 3)',
        explanation: 'root = [3, 9, 20, null, null, 15, 7]. Root is not null, so depth = 1 + max(depth(left), depth(right)).',
        javaLine: 3, variables: { 'root.val': 3, currentDepth: 1 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'maxDepth(root=3)',
          activeNode: 3,
          nodes: [
            { val: 3, state: 'active' },
            { val: 9, state: 'unvisited' },
            { val: 20, state: 'unvisited' },
            { val: null },
            { val: null },
            { val: 15, state: 'unvisited' },
            { val: 7, state: 'unvisited' }
          ]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Compute Left Subtree Depth (Node 9)',
        explanation: 'Node 9 has no children (left=null, right=null). maxDepth(9) = 1 + max(0, 0) = 1.',
        javaLine: 4, variables: { 'leftDepth': 1, 'node': 9 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'maxDepth(node=9) -> 1',
          activeNode: 9,
          nodes: [
            { val: 3 },
            { val: 9, state: 'done' },
            { val: 20 },
            { val: null },
            { val: null },
            { val: 15 },
            { val: 7 }
          ]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Compute Right Subtree Depth (Node 20 -> 15, 7)',
        explanation: 'Node 20 has leaves 15 and 7 (each depth 1). maxDepth(20) = 1 + max(1, 1) = 2.',
        javaLine: 4, variables: { 'rightDepth': 2, 'node': 20 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'maxDepth(node=20) -> 2',
          activeNode: 20,
          nodes: [
            { val: 3 },
            { val: 9, state: 'done' },
            { val: 20, state: 'done' },
            { val: null },
            { val: null },
            { val: 15, state: 'done' },
            { val: 7, state: 'done' }
          ]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Aggregate Result: 1 + max(1, 2) = 3',
        explanation: 'Depth of root = 1 + 2 = 3. Return 3. Time O(N), Space O(height).',
        javaLine: 4, variables: { result: 3 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Complete: Depth = 3',
          activeNode: 3,
          nodes: [
            { val: 3, state: 'done' },
            { val: 9, state: 'done' },
            { val: 20, state: 'done' },
            { val: null },
            { val: null },
            { val: 15, state: 'done' },
            { val: 7, state: 'done' }
          ]
        }
      }
    ];
  },

  'same-tree': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Compare Roots p.val == q.val (1 == 1)',
        explanation: 'p = [1, 2, 3], q = [1, 2, 3]. Both roots are non-null and have identical values (1 == 1). Proceed to subtrees.',
        javaLine: 4, variables: { 'p.val': 1, 'q.val': 1, match: 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'isSameTree(p=1, q=1)',
          activeNode: 1,
          nodes: [{ val: 1, state: 'active' }, { val: 2 }, { val: 3 }]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Verify Left Subtrees (p.left == q.left)',
        explanation: 'Compare left child: p.left.val (2) == q.left.val (2). Both have null children. Left subtrees match!',
        javaLine: 5, variables: { 'p.left': 2, 'q.left': 2, match: 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'isSameTree(p=2, q=2) -> true',
          activeNode: 2,
          nodes: [{ val: 1 }, { val: 2, state: 'done' }, { val: 3 }]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Verify Right Subtrees (p.right == q.right)',
        explanation: 'Compare right child: p.right.val (3) == q.right.val (3). Right subtrees match!',
        javaLine: 5, variables: { 'p.right': 3, 'q.right': 3, match: 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'isSameTree(p=3, q=3) -> true',
          activeNode: 3,
          nodes: [{ val: 1 }, { val: 2, state: 'done' }, { val: 3, state: 'done' }]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Return true (Structurally & Value Identical)',
        explanation: 'Both trees are identical in structure and node values. Return true. Time O(N), Space O(height).',
        javaLine: 5, variables: { result: 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Identical: true',
          activeNode: 1,
          nodes: [{ val: 1, state: 'done' }, { val: 2, state: 'done' }, { val: 3, state: 'done' }]
        }
      }
    ];
  },

  'invert-binary-tree': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Examine Root 4 and Swap Pointers',
        explanation: 'root = [4, 2, 7, 1, 3, 6, 9]. Swap left (2) and right (7). Root left points to 7 subtree, right to 2 subtree.',
        javaLine: 5, variables: { 'root.val': 4, temp: 2 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'invertTree(root=4)',
          activeNode: 4,
          nodes: [{ val: 4, state: 'active' }, { val: 7 }, { val: 2 }, { val: 6 }, { val: 9 }, { val: 1 }, { val: 3 }]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Invert Subtree with Root 7',
        explanation: 'Children of 7 are 6 and 9. Inverting 7 swaps its children to 9 and 6.',
        javaLine: 6, variables: { node: 7, left: 9, right: 6 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'invertTree(node=7)',
          activeNode: 7,
          nodes: [{ val: 4 }, { val: 7, state: 'done' }, { val: 2 }, { val: 9, state: 'done' }, { val: 6, state: 'done' }, { val: 1 }, { val: 3 }]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Invert Subtree with Root 2',
        explanation: 'Children of 2 are 1 and 3. Inverting 2 swaps its children to 3 and 1.',
        javaLine: 7, variables: { node: 2, left: 3, right: 1 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'invertTree(node=2)',
          activeNode: 2,
          nodes: [{ val: 4 }, { val: 7, state: 'done' }, { val: 2, state: 'done' }, { val: 9, state: 'done' }, { val: 6, state: 'done' }, { val: 3, state: 'done' }, { val: 1, state: 'done' }]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Return Inverted Root 4',
        explanation: 'Tree is completely mirror-inverted: [4, 7, 2, 9, 6, 3, 1]. Time O(N), Space O(height).',
        javaLine: 8, variables: { result: '[4, 7, 2, 9, 6, 3, 1]' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Tree Inverted Complete',
          activeNode: 4,
          nodes: [{ val: 4, state: 'done' }, { val: 7, state: 'done' }, { val: 2, state: 'done' }, { val: 9, state: 'done' }, { val: 6, state: 'done' }, { val: 3, state: 'done' }, { val: 1, state: 'done' }]
        }
      }
    ];
  },

  'binary-tree-maximum-path-sum': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize Global Max Path Sum',
        explanation: 'root = [-10, 9, 20, null, null, 15, 7]. Post-order traversal: compute max gain from left and right children.',
        javaLine: 5, variables: { maxPath: -10 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'maxPathSum(root=-10)',
          activeNode: -10,
          nodes: [{ val: -10, state: 'active' }, { val: 9 }, { val: 20 }, { val: null }, { val: null }, { val: 15 }, { val: 7 }]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Evaluate Leaf 9 (gain = 9)',
        explanation: 'gain(9) = 9 + max(0, 0) = 9. Update global maxPath = Math.max(-10, 9) = 9.',
        javaLine: 13, variables: { node: 9, gain: 9, maxPath: 9 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'gain(9) = 9',
          activeNode: 9,
          nodes: [{ val: -10 }, { val: 9, state: 'done' }, { val: 20 }, { val: null }, { val: null }, { val: 15 }, { val: 7 }]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Evaluate Right Subtree at Node 20 (Leaves 15 & 7)',
        explanation: 'gain(15) = 15, gain(7) = 7. Path through 20: 15 + 20 + 7 = 42! Update global maxPath = 42.',
        javaLine: 14, variables: { node: 20, splitSum: 42, maxPath: 42 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Split at 20: 15 + 20 + 7 = 42',
          activeNode: 20,
          nodes: [{ val: -10 }, { val: 9, state: 'done' }, { val: 20, state: 'done' }, { val: null }, { val: null }, { val: 15, state: 'done' }, { val: 7, state: 'done' }]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Evaluate Root -10 and Return Max = 42',
        explanation: 'gain(20) = 20 + 15 = 35. Root split = -10 + 9 + 35 = 34 < 42. Global max path sum remains 42! Return 42.',
        javaLine: 7, variables: { result: 42, maxPath: 42 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Max Path Sum = 42 (15 -> 20 -> 7)',
          activeNode: 20,
          nodes: [{ val: -10 }, { val: 9 }, { val: 20, state: 'done' }, { val: null }, { val: null }, { val: 15, state: 'done' }, { val: 7, state: 'done' }]
        }
      }
    ];
  },

  'binary-tree-level-order-traversal': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize Queue with Root 3 (Level 0)',
        explanation: 'root = [3, 9, 20, null, null, 15, 7]. Queue = [3]. Level 0 has 1 node.',
        javaLine: 6, variables: { 'q.size': 1, level: '[]', res: '[]' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Level 0: Process [3]',
          activeNode: 3,
          nodes: [{ val: 3, state: 'active' }, { val: 9 }, { val: 20 }, { val: null }, { val: null }, { val: 15 }, { val: 7 }]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Poll 3 -> Add Children 9 & 20 to Queue (Level 1)',
        explanation: 'Poll 3: res adds [3]. Enqueue 9 and 20. Queue = [9, 20]. Level 1 has 2 nodes.',
        javaLine: 13, variables: { 'q.size': 2, 'res': '[[3]]' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Enqueue children: 9 and 20',
          activeNode: 3,
          nodes: [{ val: 3, state: 'done' }, { val: 9, state: 'active' }, { val: 20, state: 'active' }, { val: null }, { val: null }, { val: 15 }, { val: 7 }]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Process Level 1: Poll 9 and 20',
        explanation: 'Poll 9 (no children). Poll 20 (enqueue 15 and 7). res adds [9, 20]. Queue = [15, 7].',
        javaLine: 16, variables: { 'res': '[[3], [9, 20]]', 'q.size': 2 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Level 1: [9, 20] complete',
          activeNode: 20,
          nodes: [{ val: 3, state: 'done' }, { val: 9, state: 'done' }, { val: 20, state: 'done' }, { val: null }, { val: null }, { val: 15, state: 'active' }, { val: 7, state: 'active' }]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Process Level 2: [15, 7] and Return Result',
        explanation: 'Poll 15 and 7. Final levels: [[3], [9, 20], [15, 7]]. Time O(N), Space O(N/2).',
        javaLine: 18, variables: { result: '[[3], [9, 20], [15, 7]]' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Traversal Complete: 3 Levels',
          activeNode: 15,
          nodes: [{ val: 3, state: 'done' }, { val: 9, state: 'done' }, { val: 20, state: 'done' }, { val: null }, { val: null }, { val: 15, state: 'done' }, { val: 7, state: 'done' }]
        }
      }
    ];
  },

  'serialize-and-deserialize-binary-tree': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Serialize Tree to Preorder String',
        explanation: 'Tree [1, 2, 3, null, null, 4, 5] -> serialized to "1,2,N,N,3,4,N,N,5,N,N".',
        javaLine: 5, variables: { data: '1,2,N,N,3,4,N,N,5,N,N' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'serialize(root=1)',
          activeNode: 1,
          nodes: [{ val: 1, state: 'done' }, { val: 2, state: 'done' }, { val: 3, state: 'done' }, { val: null }, { val: null }, { val: 4, state: 'done' }, { val: 5, state: 'done' }]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Deserialize: Reconstruct Root 1 and Left Child 2',
        explanation: 'Poll "1" -> create node 1. Poll "2" -> create node 2. Poll "N", "N" -> node 2 children are null.',
        javaLine: 26, variables: { node: 2, left: 'null', right: 'null' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'buildTree() -> node 2',
          activeNode: 2,
          nodes: [{ val: 1, state: 'active' }, { val: 2, state: 'done' }, { val: 3 }]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Deserialize: Reconstruct Right Subtree (3 -> 4, 5)',
        explanation: 'Poll "3" -> create node 3. Poll "4" (leaf), Poll "5" (leaf). Attach to node 3.',
        javaLine: 27, variables: { node: 3, 'left.val': 4, 'right.val': 5 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'buildTree() -> node 3 (children 4, 5)',
          activeNode: 3,
          nodes: [{ val: 1, state: 'active' }, { val: 2, state: 'done' }, { val: 3, state: 'done' }, { val: null }, { val: null }, { val: 4, state: 'done' }, { val: 5, state: 'done' }]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Return Fully Reconstructed Binary Tree',
        explanation: 'Original tree structure restored losslessly from stream. Time O(N), Space O(N).',
        javaLine: 20, variables: { result: 'TreeNode(1)' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Deserialization 100% Complete',
          activeNode: 1,
          nodes: [{ val: 1, state: 'done' }, { val: 2, state: 'done' }, { val: 3, state: 'done' }, { val: null }, { val: null }, { val: 4, state: 'done' }, { val: 5, state: 'done' }]
        }
      }
    ];
  },

  'subtree-of-another-tree': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Compare root [3, 4, 5, 1, 2] with subRoot [4, 1, 2]',
        explanation: 'Check if root 3 is identical to subRoot 4: 3 != 4, so root does not match. Recurse into left and right subtrees.',
        javaLine: 5, variables: { 'root.val': 3, 'subRoot.val': 4, match: 'false' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'isSame(3, 4) -> false',
          activeNode: 3,
          nodes: [{ val: 3, state: 'active' }, { val: 4 }, { val: 5 }, { val: 1 }, { val: 2 }]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Recurse into root.left (Node 4)',
        explanation: 'isSame(root.left (4), subRoot (4)): Root values match! Now check children.',
        javaLine: 11, variables: { 's.val': 4, 't.val': 4, match: 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'isSame(4, 4) -> checking children',
          activeNode: 4,
          nodes: [{ val: 3 }, { val: 4, state: 'active' }, { val: 5 }, { val: 1 }, { val: 2 }]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Verify Children of Node 4 (1 and 2)',
        explanation: 's.left.val (1) == t.left.val (1) and s.right.val (2) == t.right.val (2). Subtree matches completely!',
        javaLine: 12, variables: { 'leftMatch': 'true', 'rightMatch': 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'All children match: identical subtree!',
          activeNode: 4,
          nodes: [{ val: 3 }, { val: 4, state: 'done' }, { val: 5 }, { val: 1, state: 'done' }, { val: 2, state: 'done' }]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Return true (Valid Subtree Found)',
        explanation: 'subRoot [4, 1, 2] is an exact subtree of root. Return true. Time O(M*N), Space O(height).',
        javaLine: 6, variables: { result: 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Subtree Verified: true',
          activeNode: 4,
          nodes: [{ val: 3 }, { val: 4, state: 'done' }, { val: 5 }, { val: 1, state: 'done' }, { val: 2, state: 'done' }]
        }
      }
    ];
  },

  'construct-binary-tree-from-preorder-and-inorder': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Identify Root from Preorder[0] = 3',
        explanation: 'preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]. Preorder first element is always the subtree root: Node 3.',
        javaLine: 11, variables: { 'root.val': 3, inRoot: 1 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'buildTree: Root = 3',
          activeNode: 3,
          nodes: [{ val: 3, state: 'active' }, { val: 9 }, { val: 20 }, { val: null }, { val: null }, { val: 15 }, { val: 7 }]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Split Inorder around Root: Left=[9], Right=[15, 20, 7]',
        explanation: 'In inorder array, index of 3 is 1. Left of 3 is [9] (size 1). Right of 3 is [15, 20, 7] (size 3).',
        javaLine: 13, variables: { numsLeft: 1, inRoot: 1 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Inorder split: [9] | 3 | [15, 20, 7]',
          activeNode: 3,
          nodes: [{ val: 3, state: 'active' }, { val: 9, state: 'active' }, { val: 20 }]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Construct Left Child (9) and Right Subtree (20 -> 15, 7)',
        explanation: 'preorder next element 9 becomes root.left. Preorder next after left is 20, which becomes root.right with children 15 & 7.',
        javaLine: 15, variables: { 'root.left': 9, 'root.right': 20 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Constructed 9 and 20 Subtrees',
          activeNode: 20,
          nodes: [{ val: 3, state: 'done' }, { val: 9, state: 'done' }, { val: 20, state: 'done' }, { val: null }, { val: null }, { val: 15, state: 'done' }, { val: 7, state: 'done' }]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Return Fully Assembled Binary Tree',
        explanation: 'Binary tree successfully reconstructed in O(N) time with O(N) HashMap for inorder indices.',
        javaLine: 5, variables: { result: 'TreeNode(3)' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Tree Construction Complete',
          activeNode: 3,
          nodes: [{ val: 3, state: 'done' }, { val: 9, state: 'done' }, { val: 20, state: 'done' }, { val: null }, { val: null }, { val: 15, state: 'done' }, { val: 7, state: 'done' }]
        }
      }
    ];
  },

  'validate-binary-search-tree': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Check Root Invariant: (-∞ < node.val < +∞)',
        explanation: 'root = [5, 1, 4, null, null, 3, 6]. Check root 5: -∞ < 5 < +∞ is valid.',
        javaLine: 3, variables: { node: 5, min: '-∞', max: '+∞', valid: 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'valid(5, -∞, +∞)',
          activeNode: 5,
          nodes: [{ val: 5, state: 'active' }, { val: 1 }, { val: 4 }, { val: null }, { val: null }, { val: 3 }, { val: 6 }]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Check Left Child: valid(1, -∞, 5)',
        explanation: 'Node 1 must be strictly less than parent 5: -∞ < 1 < 5 is true.',
        javaLine: 8, variables: { node: 1, min: '-∞', max: 5, valid: 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'valid(1, -∞, 5) -> valid',
          activeNode: 1,
          nodes: [{ val: 5 }, { val: 1, state: 'done' }, { val: 4 }]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Check Right Child: valid(4, 5, +∞) -> VIOLATION!',
        explanation: 'Node 4 is right child of 5, so it must be > 5. But node.val (4) <= min (5)! BST invariant violated!',
        javaLine: 7, variables: { node: 4, min: 5, max: '+∞', valid: 'false' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'VIOLATION: 4 is not > 5',
          activeNode: 4,
          nodes: [{ val: 5 }, { val: 1, state: 'done' }, { val: 4, state: 'active' }]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Return false (Invalid BST)',
        explanation: 'Right subtree cannot contain elements less than ancestor. Return false. Time O(N), Space O(height).',
        javaLine: 7, variables: { result: 'false' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Result: false',
          activeNode: 4,
          nodes: [{ val: 5 }, { val: 1, state: 'done' }, { val: 4, state: 'active' }]
        }
      }
    ];
  },

  'kth-smallest-element-in-a-bst': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Inorder Traversal: Drill Down to Leftmost Node',
        explanation: 'root = [3, 1, 4, null, 2], k = 1. Inorder traversal (Left, Root, Right) of BST produces sorted order.',
        javaLine: 9, variables: { curr: 1, k: 1, 'stack.size': 2 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Drill left: 3 -> 1',
          activeNode: 1,
          nodes: [{ val: 3 }, { val: 1, state: 'active' }, { val: 4 }, { val: null }, { val: 2 }]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Pop Smallest Node: curr = 1, Decrement k to 0',
        explanation: 'Pop 1 from stack. k decrements: 1 - 1 = 0. Since k == 0, we found the 1st smallest element!',
        javaLine: 13, variables: { 'popped': 1, k: 0, targetReached: 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Pop smallest: val = 1 (k=0)',
          activeNode: 1,
          nodes: [{ val: 3 }, { val: 1, state: 'done' }, { val: 4 }, { val: null }, { val: 2 }]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Return curr.val = 1 Immediately',
        explanation: 'No need to traverse the rest of the tree. The 1st smallest element is 1.',
        javaLine: 14, variables: { result: 1 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Found kth smallest = 1',
          activeNode: 1,
          nodes: [{ val: 3 }, { val: 1, state: 'done' }, { val: 4 }]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Completed in O(H + k) Time',
        explanation: 'Optimal early exit without visiting unneeded nodes. Time O(H + k), Space O(H).',
        javaLine: 14, variables: { result: 1, timeComplexity: 'O(H + k)' },
        visualType: 'tree-node',
        visualData: {
          currentCall: '1st smallest is 1',
          activeNode: 1,
          nodes: [{ val: 3 }, { val: 1, state: 'done' }, { val: 4 }]
        }
      }
    ];
  },

  'lowest-common-ancestor-of-a-bst': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Start at Root 6 (p = 2, q = 8)',
        explanation: 'root = [6, 2, 8, 0, 4, 7, 9]. BST Property: left < root < right.',
        javaLine: 3, variables: { curr: 6, 'p.val': 2, 'q.val': 8 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'LCA(curr=6, p=2, q=8)',
          activeNode: 6,
          nodes: [{ val: 6, state: 'active' }, { val: 2 }, { val: 8 }, { val: 0 }, { val: 4 }, { val: 7 }, { val: 9 }]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Check Split Condition: p < curr and q > curr',
        explanation: 'p.val (2) < 6 and q.val (8) > 6. One node lies in left subtree, the other in right subtree!',
        javaLine: 9, variables: { '2 < 6': 'true', '8 > 6': 'true', isSplit: 'true' },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Split Point Identified at Node 6',
          activeNode: 6,
          nodes: [{ val: 6, state: 'active' }, { val: 2, state: 'done' }, { val: 8, state: 'done' }]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Split Means Node 6 IS the Lowest Common Ancestor',
        explanation: 'Since paths diverge at node 6, 6 is the lowest common node that ancestors both 2 and 8.',
        javaLine: 9, variables: { LCA: 6 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'LCA = Node 6',
          activeNode: 6,
          nodes: [{ val: 6, state: 'done' }, { val: 2, state: 'done' }, { val: 8, state: 'done' }]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Return Node 6',
        explanation: 'Solved in O(height) time without exploring entire tree. Space O(1).',
        javaLine: 9, variables: { result: 6 },
        visualType: 'tree-node',
        visualData: {
          currentCall: 'Return LCA 6',
          activeNode: 6,
          nodes: [{ val: 6, state: 'done' }, { val: 2, state: 'done' }, { val: 8, state: 'done' }]
        }
      }
    ];
  },

  'implement-trie-prefix-tree': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'insert("apple"): Create Prefix Character Nodes',
        explanation: 'Starting at root, create transitions for \'a\' -> \'p\' -> \'p\' -> \'l\' -> \'e\'. Set isEnd = true on \'e\'.',
        javaLine: 18, variables: { word: 'apple', isEnd: 'true' },
        visualType: 'trie-tree',
        visualData: {
          label: 'Trie with inserted "apple"',
          path: [
            { char: 'a', isEnd: false },
            { char: 'p', isEnd: false },
            { char: 'p', isEnd: false },
            { char: 'l', isEnd: false },
            { char: 'e', isEnd: true }
          ]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'search("apple"): Traverse Characters & Check isEnd',
        explanation: 'Follow \'a\'->\'p\'->\'p\'->\'l\'->\'e\'. Node \'e\' has isEnd == true. Return true.',
        javaLine: 28, variables: { word: 'apple', found: 'true', isEnd: 'true' },
        visualType: 'trie-tree',
        visualData: {
          label: 'search("apple") -> true (isEnd is true)',
          path: [
            { char: 'a', isEnd: false, active: true },
            { char: 'p', isEnd: false, active: true },
            { char: 'p', isEnd: false, active: true },
            { char: 'l', isEnd: false, active: true },
            { char: 'e', isEnd: true, active: true }
          ]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'search("app"): Prefix exists, but isEnd == false -> Return false',
        explanation: 'Follow \'a\'->\'p\'->\'p\'. Node \'p\' has isEnd == false (only "apple" was inserted). Return false.',
        javaLine: 28, variables: { word: 'app', found: 'true', isEnd: 'false', result: 'false' },
        visualType: 'trie-tree',
        visualData: {
          label: 'search("app") -> false (isEnd is false)',
          path: [
            { char: 'a', isEnd: false },
            { char: 'p', isEnd: false },
            { char: 'p', isEnd: false, active: true },
            { char: 'l', isEnd: false },
            { char: 'e', isEnd: true }
          ]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'startsWith("app"): Prefix Path Exists -> Return true',
        explanation: 'startsWith only checks if nodes \'a\'->\'p\'->\'p\' exist regardless of isEnd. Return true. Time O(L), Space O(26*L).',
        javaLine: 36, variables: { prefix: 'app', result: 'true' },
        visualType: 'trie-tree',
        visualData: {
          label: 'startsWith("app") -> true',
          path: [
            { char: 'a', isEnd: false, active: true },
            { char: 'p', isEnd: false, active: true },
            { char: 'p', isEnd: false, active: true },
            { char: 'l', isEnd: false },
            { char: 'e', isEnd: true }
          ]
        }
      }
    ];
  },

  'add-and-search-word': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'addWord("bad"), addWord("dad"), addWord("mad")',
        explanation: 'Add words into Trie prefix structure. All 3 words share length 3 ending with "ad".',
        javaLine: 16, variables: { added: '["bad", "dad", "mad"]' },
        visualType: 'trie-tree',
        visualData: {
          label: 'Trie containing "bad", "dad", "mad"',
          path: [
            { char: 'b', isEnd: false },
            { char: 'a', isEnd: false },
            { char: 'd', isEnd: true }
          ]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'search("pad"): Check \'p\' at Root',
        explanation: 'Root has children \'b\', \'d\', \'m\'. Root does not have child \'p\'. Return false.',
        javaLine: 34, variables: { query: 'pad', match: 'false' },
        visualType: 'trie-tree',
        visualData: {
          label: 'search("pad") -> false (\'p\' not in Trie)',
          path: [
            { char: 'b', isEnd: false },
            { char: 'd', isEnd: false },
            { char: 'm', isEnd: false }
          ]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'search(".ad"): Wildcard \'.\' Branches across all Children',
        explanation: 'Character \'.\' matches any letter! Try branches \'b\', \'d\', and \'m\'.',
        javaLine: 30, variables: { query: '.ad', wildcard: '.', branches: '["b", "d", "m"]' },
        visualType: 'trie-tree',
        visualData: {
          label: 'search(".ad") -> Wildcard explores \'b\', \'d\', \'m\'',
          path: [
            { char: '.', isEnd: false, active: true },
            { char: 'a', isEnd: false, active: true },
            { char: 'd', isEnd: true, active: true }
          ]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Branch \'b\' Matches "bad" -> Return true',
        explanation: 'Following branch \'b\' with suffix "ad" reaches valid word with isEnd = true. Return true.',
        javaLine: 37, variables: { result: 'true', matchedWord: 'bad' },
        visualType: 'trie-tree',
        visualData: {
          label: 'Wildcard Match Succeeded: "bad"',
          path: [
            { char: 'b', isEnd: false, active: true },
            { char: 'a', isEnd: false, active: true },
            { char: 'd', isEnd: true, active: true }
          ]
        }
      }
    ];
  },

  'word-search-ii': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Build Trie from Word List ["oath", "pea", "eat", "rain"]',
        explanation: 'Insert all target words into a Prefix Trie. Store full word string at leaf nodes for O(1) collection.',
        javaLine: 16, variables: { wordsCount: 4 },
        visualType: 'trie-tree',
        visualData: {
          label: 'Trie Prefix Forest: oath, pea, eat, rain',
          path: [
            { char: 'o', isEnd: false },
            { char: 'a', isEnd: false },
            { char: 't', isEnd: false },
            { char: 'h', isEnd: true }
          ]
        }
      },
      {
        step: 2, totalSteps: 4, action: 'DFS from Cell (0, 0) (\'o\'): Matches Trie Prefix',
        explanation: 'Board cell (0, 0) has \'o\', which matches child of Trie root. Recurse into adjacent cells.',
        javaLine: 30, variables: { r: 0, c: 0, char: 'o' },
        visualType: 'matrix-grid',
        visualData: {
          label: 'DFS on Board matching "oath"',
          grid: [
            ['o', 'a', 'a', 'n'],
            ['e', 't', 'a', 'e'],
            ['i', 'h', 'k', 'r'],
            ['i', 'f', 'l', 'v']
          ],
          activeCell: [0, 0],
          visitedCells: []
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Trace Path: (0,0) \'o\' -> (0,1) \'a\' -> (1,1) \'t\' -> (2,1) \'h\'',
        explanation: 'Path reaches node with word = "oath"! Add "oath" to result. Set next.word = null to deduplicate.',
        javaLine: 34, variables: { foundWord: 'oath', 'res.size': 1 },
        visualType: 'matrix-grid',
        visualData: {
          label: 'Word "oath" Discovered!',
          grid: [
            ['#', '#', 'a', 'n'],
            ['e', '#', 'a', 'e'],
            ['i', '#', 'k', 'r'],
            ['i', 'f', 'l', 'v']
          ],
          activeCell: [2, 1],
          visitedCells: [[0, 0], [0, 1], [1, 1], [2, 1]]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Discover "eat" and Return All Found Words',
        explanation: 'Second path finds "eat". Found words: ["oath", "eat"]. Pruning matched Trie nodes speeds search.',
        javaLine: 24, variables: { result: '["oath", "eat"]' },
        visualType: 'matrix-grid',
        visualData: {
          label: 'Found Words: ["oath", "eat"]',
          grid: [
            ['o', 'a', 'a', 'n'],
            ['e', 't', 'a', 'e'],
            ['i', 'h', 'k', 'r'],
            ['i', 'f', 'l', 'v']
          ],
          activeCell: [1, 0],
          visitedCells: [[1, 0], [0, 1], [1, 1]]
        }
      }
    ];
  }
};
