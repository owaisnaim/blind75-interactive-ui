import type { ProblemSpec } from '../problemTestCases';

export const graphSpecs: Record<string, ProblemSpec> = {
  'clone-graph': {
    description: `Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.`,
    methodName: 'cloneGraph',
    starterJava: `class Solution {
    public Node cloneGraph(Node node) {
        // Hash map oldToNew tracking cloned nodes via DFS/BFS
        
    }
}`,
    constraints: [
      'The number of nodes in the graph is in the range [0, 100].',
      '1 <= Node.val <= 100',
      'Node.val is unique for each node.',
      'There are no repeated edges and no self-loops in the graph.'
    ],
    examples: [
      {
        id: 1,
        input: { node: [[2, 4], [1, 3], [2, 4], [1, 3]] },
        displayInput: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
        expectedOutput: [[2, 4], [1, 3], [2, 4], [1, 3]],
        displayOutput: '[[2,4],[1,3],[2,4],[1,3]]',
        explanation: 'There are 4 nodes in the graph. Node 1 has neighbors 2 and 4; node 2 has neighbors 1 and 3; node 3 has neighbors 2 and 4; node 4 has neighbors 1 and 3. The clone returns an independent copy with the same topology.'
      },
      {
        id: 2,
        input: { node: [[]] },
        displayInput: 'adjList = [[]]',
        expectedOutput: [[]],
        displayOutput: '[[]]',
        explanation: 'A graph with an isolated node (node 1 with no neighbors) is cloned to return an isolated copy.'
      }
    ],
    hiddenTestCases: []
  },

  'course-schedule': {
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`. Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    methodName: 'canFinish',
    starterJava: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Cycle detection in directed graph using DFS or Kahn's algorithm
        
    }
}`,
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= a_i, b_i < numCourses',
      'All prerequisite pairs are unique.'
    ],
    examples: [
      {
        id: 1,
        input: { numCourses: 2, prerequisites: [[1, 0]] },
        displayInput: 'numCourses = 2, prerequisites = [[1,0]]',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'There are a total of 2 courses. To take course 1 you must finish course 0, which has no prerequisites. So you can finish both courses.'
      },
      {
        id: 2,
        input: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] },
        displayInput: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. Impossible cycle.'
      }
    ],
    hiddenTestCases: []
  },

  'pacific-atlantic-water-flow': {
    description: `There is an \`m x n\` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Water can only flow from a cell to adjacent cells if the adjacent cell's height is **less than or equal to** the current cell's height. Return a 2D list of grid coordinates where rain water can flow to **both** the Pacific and Atlantic oceans.`,
    methodName: 'pacificAtlantic',
    starterJava: `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        // Reverse DFS from oceans inward
        
    }
}`,
    constraints: [
      'm == heights.length',
      'n == heights[r].length',
      '1 <= m, n <= 200',
      '0 <= heights[r][c] <= 10^5'
    ],
    examples: [
      {
        id: 1,
        input: { heights: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]] },
        displayInput: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]',
        expectedOutput: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
        displayOutput: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]',
        explanation: 'The coordinates marked can flow both north/west into the Pacific and south/east into the Atlantic ocean.'
      },
      {
        id: 2,
        input: { heights: [[1]] },
        displayInput: 'heights = [[1]]',
        expectedOutput: [[0, 0]],
        displayOutput: '[[0,0]]',
        explanation: 'The only cell connects directly to both oceans.'
      }
    ],
    hiddenTestCases: []
  },

  'number-of-islands': {
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    methodName: 'numIslands',
    starterJava: `class Solution {
    public int numIslands(char[][] grid) {
        // Flood fill BFS/DFS sinking visited land to '0'
        
    }
}`,
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 300',
      'grid[i][j] is "0" or "1".'
    ],
    examples: [
      {
        id: 1,
        input: { grid: [['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0']] },
        displayInput: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        expectedOutput: 1,
        displayOutput: '1',
        explanation: 'All adjacent land cells connect into 1 single island.'
      },
      {
        id: 2,
        input: { grid: [['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']] },
        displayInput: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: 'The grid contains 3 distinct islands separated by water.'
      }
    ],
    hiddenTestCases: []
  },

  'longest-consecutive-sequence': {
    description: `Given an unsorted array of integers \`nums\`, return *the length of the longest consecutive elements sequence*. You must write an algorithm that runs in \`O(n)\` time.`,
    methodName: 'longestConsecutive',
    starterJava: `class Solution {
    public int longestConsecutive(int[] nums) {
        // Hash set: only expand sequence if (n - 1) not present
        
    }
}`,
    constraints: [
      '0 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    examples: [
      {
        id: 1,
        input: { nums: [100, 4, 200, 1, 3, 2] },
        displayInput: 'nums = [100, 4, 200, 1, 3, 2]',
        expectedOutput: 4,
        displayOutput: '4',
        explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.'
      },
      {
        id: 2,
        input: { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] },
        displayInput: 'nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]',
        expectedOutput: 9,
        displayOutput: '9',
        explanation: 'The longest consecutive elements sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8]. Its length is 9.'
      }
    ],
    hiddenTestCases: []
  },

  'graph-valid-tree': {
    description: `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an integer \`n\` and a list of \`edges\` where \`edges[i] = [a_i, b_i]\` indicates an undirected edge between nodes \`a_i\` and \`b_i\`. Return \`true\` *if the edges of the given graph make up a valid tree, and \`false\` otherwise*.`,
    methodName: 'validTree',
    starterJava: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        // Exactly n - 1 edges and no cycles (Union-Find or BFS)
        
    }
}`,
    constraints: [
      '1 <= n <= 2000',
      '0 <= edges.length <= 5000',
      'edges[i].length == 2',
      '0 <= a_i, b_i < n',
      'No duplicate edges or self-loops.'
    ],
    examples: [
      {
        id: 1,
        input: { n: 5, edges: [[0, 1], [0, 2], [0, 3], [1, 4]] },
        displayInput: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'The graph has 5 nodes and 4 edges with no cycles and connects all nodes, which forms a valid tree.'
      },
      {
        id: 2,
        input: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]] },
        displayInput: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'The edge [1, 3] forms a cycle with [1, 2] and [2, 3], so it cannot be a valid tree.'
      }
    ],
    hiddenTestCases: []
  },

  'number-of-connected-components': {
    description: `You have a graph of \`n\` nodes. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [a_i, b_i]\` indicates an undirected edge between nodes \`a_i\` and \`b_i\`. Return *the number of connected components in the graph*.`,
    methodName: 'countComponents',
    starterJava: `class Solution {
    public int countComponents(int n, int[][] edges) {
        // Disjoint Set Union (DSU) or DFS visit count
        
    }
}`,
    constraints: [
      '1 <= n <= 2000',
      '1 <= edges.length <= 5000',
      'edges[i].length == 2',
      '0 <= a_i, b_i < n',
      'No duplicate edges or self-loops.'
    ],
    examples: [
      {
        id: 1,
        input: { n: 5, edges: [[0, 1], [1, 2], [3, 4]] },
        displayInput: 'n = 5, edges = [[0,1],[1,2],[3,4]]',
        expectedOutput: 2,
        displayOutput: '2',
        explanation: 'Nodes 0, 1, 2 form one component and nodes 3, 4 form a second component, resulting in 2 connected components.'
      },
      {
        id: 2,
        input: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]] },
        displayInput: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]',
        expectedOutput: 1,
        displayOutput: '1',
        explanation: 'All 5 nodes are linked into a single connected component.'
      }
    ],
    hiddenTestCases: []
  }
};
