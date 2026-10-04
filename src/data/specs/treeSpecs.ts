import type { ProblemSpec } from '../problemTestCases';

export const treeSpecs: Record<string, ProblemSpec> = {
  'maximum-depth-of-binary-tree': {
    description: `Given the \`root\` of a binary tree, return *its maximum depth*.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    methodName: 'maxDepth',
    starterJava: `class Solution {
    public int maxDepth(TreeNode root) {
        // Recursive depth computation: 1 + max(left, right)
        
    }
}`,
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-100 <= Node.val <= 100'
    ],
    examples: [
      {
        id: 1,
        input: { root: [3, 9, 20, null, null, 15, 7] },
        displayInput: 'root = [3,9,20,null,null,15,7]',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: 'The longest path goes from 3 -> 20 -> 15 (or 7), which contains 3 nodes.'
      },
      {
        id: 2,
        input: { root: [1, null, 2] },
        displayInput: 'root = [1,null,2]',
        expectedOutput: 2,
        displayOutput: '2',
        explanation: 'The longest path goes from 1 -> 2, which contains 2 nodes.'
      }
    ],
    hiddenTestCases: []
  },

  'same-tree': {
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    methodName: 'isSameTree',
    starterJava: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // Structural and value matching recursively
        
    }
}`,
    constraints: [
      'The number of nodes in both trees is in the range [0, 100].',
      '-10^4 <= Node.val <= 10^4'
    ],
    examples: [
      {
        id: 1,
        input: { p: [1, 2, 3], q: [1, 2, 3] },
        displayInput: 'p = [1,2,3], q = [1,2,3]',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'Both trees are structurally identical and have matching node values.'
      },
      {
        id: 2,
        input: { p: [1, 2], q: [1, null, 2] },
        displayInput: 'p = [1,2], q = [1,null,2]',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'The two trees have different structures: node 2 is a left child in p and a right child in q.'
      },
      {
        id: 3,
        input: { p: [1, 2, 1], q: [1, 1, 2] },
        displayInput: 'p = [1,2,1], q = [1,1,2]',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'The two trees have the same structure but different node values (node values 2 and 1 are swapped).'
      }
    ],
    hiddenTestCases: []
  },

  'invert-binary-tree': {
    description: `Given the \`root\` of a binary tree, invert the tree, and return *its root*.

Inverting a binary tree swaps every left node and right node recursively throughout the tree.`,
    methodName: 'invertTree',
    starterJava: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        // Swap left and right subtrees recursively
        
    }
}`,
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    examples: [
      {
        id: 1,
        input: { root: [4, 2, 7, 1, 3, 6, 9] },
        displayInput: 'root = [4,2,7,1,3,6,9]',
        expectedOutput: [4, 7, 2, 9, 6, 3, 1],
        displayOutput: '[4,7,2,9,6,3,1]',
        explanation: 'Root 4 remains unchanged. Subtrees rooted at 2 and 7 swap places, and their child nodes are similarly inverted.'
      },
      {
        id: 2,
        input: { root: [2, 1, 3] },
        displayInput: 'root = [2,1,3]',
        expectedOutput: [2, 3, 1],
        displayOutput: '[2,3,1]',
        explanation: 'Children 1 and 3 are swapped under root 2, producing [2, 3, 1].'
      },
      {
        id: 3,
        input: { root: [] },
        displayInput: 'root = []',
        expectedOutput: [],
        displayOutput: '[]',
        explanation: 'An empty tree inverted remains an empty tree.'
      }
    ],
    hiddenTestCases: []
  },

  'binary-tree-maximum-path-sum': {
    description: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path. Given the \`root\` of a binary tree, return *the maximum **path sum** of any **non-empty** path*.`,
    methodName: 'maxPathSum',
    starterJava: `class Solution {
    public int maxPathSum(TreeNode root) {
        // Post-order DFS computing maximum path with/without split
        
    }
}`,
    constraints: [
      'The number of nodes in the tree is in the range [1, 3 * 10^4].',
      '-1000 <= Node.val <= 1000'
    ],
    examples: [
      {
        id: 1,
        input: { root: [1, 2, 3] },
        displayInput: 'root = [1,2,3]',
        expectedOutput: 6,
        displayOutput: '6',
        explanation: 'The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.'
      },
      {
        id: 2,
        input: { root: [-10, 9, 20, null, null, 15, 7] },
        displayInput: 'root = [-10,9,20,null,null,15,7]',
        expectedOutput: 42,
        displayOutput: '42',
        explanation: 'The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.'
      }
    ],
    hiddenTestCases: []
  },

  'binary-tree-level-order-traversal': {
    description: `Given the \`root\` of a binary tree, return *the level order traversal of its nodes' values*. (i.e., from left to right, level by level).`,
    methodName: 'levelOrder',
    starterJava: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // BFS queue processing level by level
        
    }
}`,
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000'
    ],
    examples: [
      {
        id: 1,
        input: { root: [3, 9, 20, null, null, 15, 7] },
        displayInput: 'root = [3,9,20,null,null,15,7]',
        expectedOutput: [[3], [9, 20], [15, 7]],
        displayOutput: '[[3],[9,20],[15,7]]',
        explanation: 'Level 0: [3]. Level 1: [9, 20]. Level 2: [15, 7].'
      },
      {
        id: 2,
        input: { root: [1] },
        displayInput: 'root = [1]',
        expectedOutput: [[1]],
        displayOutput: '[[1]]',
        explanation: 'Level 0: [1].'
      },
      {
        id: 3,
        input: { root: [] },
        displayInput: 'root = []',
        expectedOutput: [],
        displayOutput: '[]',
        explanation: 'An empty tree has no levels.'
      }
    ],
    hiddenTestCases: []
  },

  'serialize-and-deserialize-binary-tree': {
    description: `Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree.`,
    methodName: 'serializeAndDeserialize',
    starterJava: `public class Codec {
    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        
    }
}`,
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-1000 <= Node.val <= 1000'
    ],
    examples: [
      {
        id: 1,
        input: { root: [1, 2, 3, null, null, 4, 5] },
        displayInput: 'root = [1,2,3,null,null,4,5]',
        expectedOutput: [1, 2, 3, null, null, 4, 5],
        displayOutput: '[1,2,3,null,null,4,5]',
        explanation: 'The tree is serialized to a string format and successfully deserialized back to the original binary tree structure.'
      },
      {
        id: 2,
        input: { root: [] },
        displayInput: 'root = []',
        expectedOutput: [],
        displayOutput: '[]',
        explanation: 'An empty tree serializes to a designated null marker and deserializes back to null.'
      }
    ],
    hiddenTestCases: []
  },

  'subtree-of-another-tree': {
    description: `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.`,
    methodName: 'isSubtree',
    starterJava: `class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        // Recursive tree comparison across all nodes
        
    }
}`,
    constraints: [
      'The number of nodes in the root tree is in the range [1, 2000].',
      'The number of nodes in the subRoot tree is in the range [1, 1000].',
      '-10^4 <= root.val <= 10^4',
      '-10^4 <= subRoot.val <= 10^4'
    ],
    examples: [
      {
        id: 1,
        input: { root: [3, 4, 5, 1, 2], subRoot: [4, 1, 2] },
        displayInput: 'root = [3,4,5,1,2], subRoot = [4,1,2]',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'The subtree rooted at node 4 in root matches subRoot exactly in structure and values.'
      },
      {
        id: 2,
        input: { root: [3, 4, 5, 1, 2, null, null, null, null, 0], subRoot: [4, 1, 2] },
        displayInput: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'Although node 4 has children 1 and 2, node 2 has an additional child 0 in root, so it is not identical to subRoot.'
      }
    ],
    hiddenTestCases: []
  },

  'construct-binary-tree-from-preorder-and-inorder': {
    description: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return *the binary tree*.`,
    methodName: 'buildTree',
    starterJava: `class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        // Root is preorder[0]; partition inorder into left and right subtrees
        
    }
}`,
    constraints: [
      '1 <= preorder.length <= 3000',
      'inorder.length == preorder.length',
      '-3000 <= preorder[i], inorder[i] <= 3000',
      'preorder and inorder consist of unique values.',
      'Each value of inorder also appears in preorder.'
    ],
    examples: [
      {
        id: 1,
        input: { preorder: [3, 9, 20, 15, 7], inorder: [9, 3, 15, 20, 7] },
        displayInput: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]',
        expectedOutput: [3, 9, 20, null, null, 15, 7],
        displayOutput: '[3,9,20,null,null,15,7]',
        explanation: 'preorder[0] = 3 is the root. In inorder, 3 partitions left subtree [9] and right subtree [15, 20, 7].'
      },
      {
        id: 2,
        input: { preorder: [-1], inorder: [-1] },
        displayInput: 'preorder = [-1], inorder = [-1]',
        expectedOutput: [-1],
        displayOutput: '[-1]',
        explanation: 'A single node tree with value -1.'
      }
    ],
    hiddenTestCases: []
  },

  'validate-binary-search-tree': {
    description: `Given the \`root\` of a binary tree, *determine if it is a valid binary search tree (BST)*.`,
    methodName: 'isValidBST',
    starterJava: `class Solution {
    public boolean isValidBST(TreeNode root) {
        // Range validation (min < node.val < max) recursively
        
    }
}`,
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-2^31 <= Node.val <= 2^31 - 1'
    ],
    examples: [
      {
        id: 1,
        input: { root: [2, 1, 3] },
        displayInput: 'root = [2,1,3]',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'The root node is 2, with left child 1 (< 2) and right child 3 (> 2), satisfying the BST property.'
      },
      {
        id: 2,
        input: { root: [5, 1, 4, null, null, 3, 6] },
        displayInput: 'root = [5,1,4,null,null,3,6]',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'The root node\'s value is 5 but its right child\'s value is 4.'
      }
    ],
    hiddenTestCases: []
  },

  'kth-smallest-element-in-a-bst': {
    description: `Given the \`root\` of a binary search tree, and an integer \`k\`, return *the \`k-th\` smallest value (**1-indexed**) of all the values of the nodes in the tree*.`,
    methodName: 'kthSmallest',
    starterJava: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        // In-order traversal visiting BST nodes in ascending order
        
    }
}`,
    constraints: [
      'The number of nodes in the tree is n.',
      '1 <= k <= n <= 10^4',
      '0 <= Node.val <= 10^4'
    ],
    examples: [
      {
        id: 1,
        input: { root: [3, 1, 4, null, 2], k: 1 },
        displayInput: 'root = [3,1,4,null,2], k = 1',
        expectedOutput: 1,
        displayOutput: '1',
        explanation: 'The in-order traversal of the BST is [1, 2, 3, 4]. The 1st smallest element is 1.'
      },
      {
        id: 2,
        input: { root: [5, 3, 6, 2, 4, null, null, 1], k: 3 },
        displayInput: 'root = [5,3,6,2,4,null,null,1], k = 3',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: 'The in-order traversal of the BST is [1, 2, 3, 4, 5, 6]. The 3rd smallest element is 3.'
      }
    ],
    hiddenTestCases: []
  },

  'lowest-common-ancestor-of-a-bst': {
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.`,
    methodName: 'lowestCommonAncestor',
    starterJava: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Walk down tree; first node where p and q split is the LCA
        
    }
}`,
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      '-10^9 <= Node.val <= 10^9',
      'All Node.val are unique.',
      'p != q',
      'p and q will exist in the BST.'
    ],
    examples: [
      {
        id: 1,
        input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 },
        displayInput: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8',
        expectedOutput: 6,
        displayOutput: '6',
        explanation: 'The LCA of nodes 2 and 8 is 6.'
      },
      {
        id: 2,
        input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 4 },
        displayInput: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4',
        expectedOutput: 2,
        displayOutput: '2',
        explanation: 'The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.'
      }
    ],
    hiddenTestCases: []
  },

  'implement-trie-prefix-tree': {
    description: `A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
- \`Trie()\` Initializes the trie object.
- \`void insert(String word)\` Inserts the string \`word\` into the trie.
- \`boolean search(String word)\` Returns \`true\` if the string \`word\` is in the trie (i.e., was inserted before), and \`false\` otherwise.
- \`boolean startsWith(String prefix)\` Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.`,
    methodName: 'Trie',
    starterJava: `class Trie {
    public Trie() {
        
    }
    
    public void insert(String word) {
        
    }
    
    public boolean search(String word) {
        
    }
    
    public boolean startsWith(String prefix) {
        
    }
}`,
    constraints: [
      '1 <= word.length, prefix.length <= 2000',
      'word and prefix consist only of lowercase English letters.',
      'At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.'
    ],
    examples: [
      {
        id: 1,
        input: {
          operations: ['Trie', 'insert', 'search', 'search', 'startsWith', 'insert', 'search'],
          args: [[], ['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']]
        },
        displayInput: 'operations = ["Trie","insert","search","search","startsWith","insert","search"]',
        expectedOutput: [null, null, true, false, true, null, true],
        displayOutput: '[null,null,true,false,true,null,true]',
        explanation: 'Trie trie = new Trie();\ntrie.insert("apple");\ntrie.search("apple");   // return True\ntrie.search("app");     // return False\ntrie.startsWith("app"); // return True\ntrie.insert("app");\ntrie.search("app");     // return True'
      }
    ],
    hiddenTestCases: []
  },

  'add-and-search-word': {
    description: `Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the \`WordDictionary\` class:
- \`WordDictionary()\` Initializes the object.
- \`void addWord(word)\` Adds \`word\` to the data structure, it can be matched later.
- \`bool search(word)\` Returns \`true\` if there is any string in the data structure that matches \`word\` or \`false\` otherwise. \`word\` may contain dots \`'.'\` where dots can be matched with any letter.`,
    methodName: 'WordDictionary',
    starterJava: `class WordDictionary {
    public WordDictionary() {
        
    }
    
    public void addWord(String word) {
        
    }
    
    public boolean search(String word) {
        
    }
}`,
    constraints: [
      '1 <= word.length <= 25',
      'word in addWord consists of lowercase English letters.',
      'word in search consist of \'.\' or lowercase English letters.',
      'There will be at most 2 dots in word for search queries.',
      'At most 10^4 calls will be made to addWord and search.'
    ],
    examples: [
      {
        id: 1,
        input: {
          operations: ['WordDictionary', 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search'],
          args: [[], ['bad'], ['dad'], ['mad'], ['pad'], ['bad'], ['.ad'], ['b..']]
        },
        displayInput: 'operations = ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]',
        expectedOutput: [null, null, null, null, false, true, true, true],
        displayOutput: '[null,null,null,null,false,true,true,true]',
        explanation: 'WordDictionary wordDictionary = new WordDictionary();\nwordDictionary.addWord("bad");\nwordDictionary.addWord("dad");\nwordDictionary.addWord("mad");\nwordDictionary.search("pad"); // return False\nwordDictionary.search("bad"); // return True\nwordDictionary.search(".ad"); // return True\nwordDictionary.search("b.."); // return True'
      }
    ],
    hiddenTestCases: []
  },

  'word-search-ii': {
    description: `Given an \`m x n\` \`board\` of characters and a list of strings \`words\`, return *all words on the board*.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.`,
    methodName: 'findWords',
    starterJava: `class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        // Trie + Backtracking DFS on 2D board
        
    }
}`,
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 <= m, n <= 12',
      'board[i][j] is a lowercase English letter.',
      '1 <= words.length <= 3 * 10^4',
      '1 <= words[i].length <= 10',
      'words[i] consists of lowercase English letters.',
      'All the strings of words are unique.'
    ],
    examples: [
      {
        id: 1,
        input: {
          board: [
            ['o', 'a', 'a', 'n'],
            ['e', 't', 'a', 'e'],
            ['i', 'h', 'k', 'r'],
            ['i', 'f', 'l', 'v']
          ],
          words: ['oath', 'pea', 'eat', 'rain']
        },
        displayInput: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        expectedOutput: ['eat', 'oath'],
        displayOutput: '["eat","oath"]',
        explanation: 'The words "eat" and "oath" can be constructed by traversing adjacent letters on the board without reusing any cell.'
      },
      {
        id: 2,
        input: {
          board: [
            ['a', 'b'],
            ['c', 'd']
          ],
          words: ['abcb']
        },
        displayInput: 'board = [["a","b"],["c","d"]], words = ["abcb"]',
        expectedOutput: [],
        displayOutput: '[]',
        explanation: 'The word "abcb" requires reusing cell "b", which is not permitted.'
      }
    ],
    hiddenTestCases: []
  }
};
