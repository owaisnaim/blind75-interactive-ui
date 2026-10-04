import type { SimFrame } from './types';

export const GRAPH_SIMULATIONS: Record<string, () => SimFrame[]> = {
  'clone-graph': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize oldToNew Clone Map',
        explanation: 'Create empty Map<Node, Node> to track visited nodes and prevent infinite cycles in undirected graph.',
        javaLine: 2, variables: { oldToNew: '{}' },
        visualType: 'graph-network',
        visualData: {
          label: 'Graph Vertices (Nodes 1, 2, 3, 4)',
          nodes: [
            { id: 1, label: 'Node 1', state: 'unvisited' },
            { id: 2, label: 'Node 2', state: 'unvisited' },
            { id: 3, label: 'Node 3', state: 'unvisited' },
            { id: 4, label: 'Node 4', state: 'unvisited' }
          ],
          adjList: { '1': [2, 4], '2': [1, 3], '3': [2, 4], '4': [1, 3] }
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Clone Node 1 & Traverse Neighbors [2, 4]',
        explanation: 'Instantiate copy of Node 1. Store oldToNew.put(1, copy1). Recurse into neighbors 2 and 4.',
        javaLine: 8, variables: { node: 1, copy: 'Node 1 (Cloned)', 'oldToNew.size': 1 },
        visualType: 'graph-network',
        visualData: {
          label: 'Cloned Node 1 -> Exploring Neighbor 2',
          nodes: [
            { id: 1, label: 'Copy 1', state: 'visited' },
            { id: 2, label: 'Node 2', state: 'active' },
            { id: 3, label: 'Node 3', state: 'unvisited' },
            { id: 4, label: 'Node 4', state: 'unvisited' }
          ],
          adjList: { '1': [2, 4], '2': [1, 3], '3': [2, 4], '4': [1, 3] }
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Clone Node 2 & Recurse into Node 3',
        explanation: 'Copy Node 2, link neighbor 1 (already in map, return cached copy1). Traverse to Node 3 and Node 4.',
        javaLine: 11, variables: { node: 2, copy: 'Node 2 (Cloned)', 'oldToNew.size': 2 },
        visualType: 'graph-network',
        visualData: {
          label: 'Cloned Node 2 -> Traversing Node 3',
          nodes: [
            { id: 1, label: 'Copy 1', state: 'visited' },
            { id: 2, label: 'Copy 2', state: 'visited' },
            { id: 3, label: 'Node 3', state: 'active' },
            { id: 4, label: 'Node 4', state: 'processing' }
          ],
          adjList: { '1': [2, 4], '2': [1, 3], '3': [2, 4], '4': [1, 3] }
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Complete Deep Copy of All Nodes and Return',
        explanation: 'All 4 vertices deep-copied with identical adjacency relationships. Time O(V+E), Space O(V).',
        javaLine: 13, variables: { result: 'Copy of Node 1', clonedCount: 4 },
        visualType: 'graph-network',
        visualData: {
          label: 'Deep Graph Copy Complete (100% Cloned)',
          nodes: [
            { id: 1, label: 'Copy 1', state: 'visited' },
            { id: 2, label: 'Copy 2', state: 'visited' },
            { id: 3, label: 'Copy 3', state: 'visited' },
            { id: 4, label: 'Copy 4', state: 'visited' }
          ],
          adjList: { '1': [2, 4], '2': [1, 3], '3': [2, 4], '4': [1, 3] }
        }
      }
    ];
  },

  'course-schedule': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Build Adjacency List & State Array',
        explanation: 'numCourses = 4, prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]. 0: unvisited, 1: visiting (in stack), 2: visited.',
        javaLine: 4, variables: { numCourses: 4, unvisited: 4 },
        visualType: 'graph-network',
        visualData: {
          label: 'Prerequisite Graph (Courses 0, 1, 2, 3)',
          nodes: [
            { id: 0, label: 'Course 0', state: 'unvisited' },
            { id: 1, label: 'Course 1', state: 'unvisited' },
            { id: 2, label: 'Course 2', state: 'unvisited' },
            { id: 3, label: 'Course 3', state: 'unvisited' }
          ],
          adjList: { '1': [0], '2': [0], '3': [1, 2] }
        }
      },
      {
        step: 2, totalSteps: 4, action: 'DFS from Course 0 (No Prereqs)',
        explanation: 'Course 0 has no outgoing prerequisites. Mark visited[0] = 2 (safe).',
        javaLine: 22, variables: { crs: 0, 'visited[0]': 2 },
        visualType: 'graph-network',
        visualData: {
          label: 'Course 0 is safe (visited = 2)',
          nodes: [
            { id: 0, label: 'Course 0', state: 'visited' },
            { id: 1, label: 'Course 1', state: 'unvisited' },
            { id: 2, label: 'Course 2', state: 'unvisited' },
            { id: 3, label: 'Course 3', state: 'unvisited' }
          ],
          adjList: { '1': [0], '2': [0], '3': [1, 2] }
        }
      },
      {
        step: 3, totalSteps: 4, action: 'DFS Course 1 and Course 2',
        explanation: 'Course 1 -> 0 (safe) -> visited[1]=2. Course 2 -> 0 (safe) -> visited[2]=2. No back-edges detected.',
        javaLine: 22, variables: { crs: 2, 'visited[1]': 2, 'visited[2]': 2 },
        visualType: 'graph-network',
        visualData: {
          label: 'Courses 0, 1, 2 all safe',
          nodes: [
            { id: 0, label: 'Course 0', state: 'visited' },
            { id: 1, label: 'Course 1', state: 'visited' },
            { id: 2, label: 'Course 2', state: 'visited' },
            { id: 3, label: 'Course 3', state: 'unvisited' }
          ],
          adjList: { '1': [0], '2': [0], '3': [1, 2] }
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Check Course 3 and Return true (DAG confirmed)',
        explanation: 'Course 3 depends on 1 and 2 (both safe). No cycle in graph, all courses can be finished! Return true.',
        javaLine: 10, variables: { result: 'true', hasCycle: false },
        visualType: 'graph-network',
        visualData: {
          label: 'All Courses Achievable (Valid DAG)',
          nodes: [
            { id: 0, label: 'Course 0', state: 'visited' },
            { id: 1, label: 'Course 1', state: 'visited' },
            { id: 2, label: 'Course 2', state: 'visited' },
            { id: 3, label: 'Course 3', state: 'visited' }
          ],
          adjList: { '1': [0], '2': [0], '3': [1, 2] }
        }
      }
    ];
  },

  'pacific-atlantic-water-flow': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize Pacific and Atlantic Visited Matrices',
        explanation: 'Top and Left borders touch Pacific. Bottom and Right borders touch Atlantic. Reverse DFS from ocean borders upward.',
        javaLine: 4, variables: { rows: 3, cols: 3 },
        visualType: 'matrix-grid',
        visualData: {
          label: 'Elevation Grid [3x3]',
          grid: [
            [1, 2, 2],
            [3, 2, 3],
            [2, 4, 5]
          ],
          activeCell: [0, 0],
          visitedCells: []
        }
      },
      {
        step: 2, totalSteps: 4, action: 'DFS from Pacific Border (Top & Left)',
        explanation: 'Water can flow inland if height >= prevHeight. Reaches (0,0), (0,1), (0,2), (1,0), (1,2), (2,1), (2,2).',
        javaLine: 7, variables: { ocean: 'Pacific', reachedCount: 7 },
        visualType: 'matrix-grid',
        visualData: {
          label: 'Pacific Reachable Cells (Blue/Green)',
          grid: [
            [1, 2, 2],
            [3, 2, 3],
            [2, 4, 5]
          ],
          activeCell: [0, 2],
          visitedCells: [[0, 0], [0, 1], [0, 2], [1, 0], [2, 1], [2, 2]]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'DFS from Atlantic Border (Bottom & Right)',
        explanation: 'Atlantic DFS flows inland to (2,2), (2,1), (1,2), (0,2), (1,1).',
        javaLine: 8, variables: { ocean: 'Atlantic', reachedCount: 5 },
        visualType: 'matrix-grid',
        visualData: {
          label: 'Atlantic Reachable Cells',
          grid: [
            [1, 2, 2],
            [3, 2, 3],
            [2, 4, 5]
          ],
          activeCell: [2, 2],
          visitedCells: [[2, 2], [2, 1], [1, 2], [0, 2]]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Find Intersection (Both Oceans Reached)',
        explanation: 'Cells reaching both Pacific and Atlantic: [[0,2], [1,2], [2,1], [2,2]]. Time O(M*N), Space O(M*N).',
        javaLine: 20, variables: { resultCount: 4, intersections: '[[0,2],[1,2],[2,1],[2,2]]' },
        visualType: 'matrix-grid',
        visualData: {
          label: 'Both Oceans Reached: (0,2), (1,2), (2,1), (2,2)',
          grid: [
            [1, 2, '★2'],
            [3, 2, '★3'],
            [2, '★4', '★5']
          ],
          activeCell: [2, 2],
          visitedCells: [[0, 2], [1, 2], [2, 1], [2, 2]]
        }
      }
    ];
  },

  'number-of-islands': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Scan Grid for Land (\'1\')',
        explanation: 'Traverse grid row by row. At (0, 0), cell is \'1\'. Found Island #1! Launch DFS to sink it.',
        javaLine: 5, variables: { r: 0, c: 0, count: 0 },
        visualType: 'matrix-grid',
        visualData: {
          label: 'Found Island #1 at (0, 0)',
          grid: [
            ['1', '1', '0', '0'],
            ['1', '1', '0', '0'],
            ['0', '0', '1', '0'],
            ['0', '0', '0', '1']
          ],
          activeCell: [0, 0],
          visitedCells: []
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Sink Island 1 via DFS',
        explanation: 'Recursively mark connected \'1\'s as \'0\': (0,0), (0,1), (1,0), (1,1) become \'0\'. count = 1.',
        javaLine: 18, variables: { sunkCells: 4, count: 1 },
        visualType: 'matrix-grid',
        visualData: {
          label: 'Island 1 Sunk to \'0\'s. count = 1',
          grid: [
            ['0', '0', '0', '0'],
            ['0', '0', '0', '0'],
            ['0', '0', '1', '0'],
            ['0', '0', '0', '1']
          ],
          activeCell: [1, 1],
          visitedCells: [[0, 0], [0, 1], [1, 0], [1, 1]]
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Discover Island #2 at (2, 2)',
        explanation: 'Continue scan: (2, 2) is \'1\'. Sink (2, 2). count++ = 2.',
        javaLine: 7, variables: { r: 2, c: 2, count: 2 },
        visualType: 'matrix-grid',
        visualData: {
          label: 'Found Island #2 at (2, 2). count = 2',
          grid: [
            ['0', '0', '0', '0'],
            ['0', '0', '0', '0'],
            ['0', '0', '0', '0'],
            ['0', '0', '0', '1']
          ],
          activeCell: [2, 2],
          visitedCells: [[2, 2]]
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Discover Island #3 at (3, 3) & Return 3',
        explanation: 'Final island sunk at (3, 3). Total islands = 3. Time O(M*N), Space O(M*N) recursion stack.',
        javaLine: 11, variables: { totalIslands: 3 },
        visualType: 'matrix-grid',
        visualData: {
          label: 'Grid Fully Explored. Total Islands = 3',
          grid: [
            ['0', '0', '0', '0'],
            ['0', '0', '0', '0'],
            ['0', '0', '0', '0'],
            ['0', '0', '0', '0']
          ],
          activeCell: [3, 3],
          visitedCells: [[3, 3]]
        }
      }
    ];
  },

  'longest-consecutive-sequence': () => {
    const nums = [100, 4, 200, 1, 3, 2];
    return [
      {
        step: 1, totalSteps: 4, action: 'Insert All Elements into HashSet for O(1) Lookup',
        explanation: 'nums = [100, 4, 200, 1, 3, 2]. Set = {1, 2, 3, 4, 100, 200}. We only start counting at streak starts (n-1 not in set).',
        javaLine: 4, variables: { 'set.size': 6, longest: 0 },
        visualType: 'array-pointers',
        visualData: { elements: nums, pointers: [{ name: 'scan', index: 0 }], highlightIndices: [] }
      },
      {
        step: 2, totalSteps: 4, action: 'Check n = 100 and n = 200 (Isolated)',
        explanation: '100 - 1 = 99 not in set: streak starts at 100. 101 not in set -> length = 1. Same for 200 -> length = 1.',
        javaLine: 10, variables: { n: 100, length: 1, longest: 1 },
        visualType: 'array-pointers',
        visualData: { elements: nums, pointers: [{ name: 'n', index: 0 }], highlightIndices: [0] }
      },
      {
        step: 3, totalSteps: 4, action: 'Identify Streak Start at n = 1',
        explanation: '1 - 1 = 0 is not in set! Count forward: 2 in set? YES. 3 in set? YES. 4 in set? YES. 5 in set? NO. Length = 4!',
        javaLine: 11, variables: { n: 1, length: 4, streak: '[1, 2, 3, 4]' },
        visualType: 'array-pointers',
        visualData: { elements: nums, pointers: [{ name: 'start', index: 3 }], highlightIndices: [3, 5, 4, 1] }
      },
      {
        step: 4, totalSteps: 4, action: 'Skip Non-starts (2, 3, 4) & Return Max = 4',
        explanation: 'n=2, 3, 4 each have n-1 in set, so skip them! Max consecutive streak is 4 [1, 2, 3, 4]. Time O(N), Space O(N).',
        javaLine: 18, variables: { result: 4, longest: 4 },
        visualType: 'array-pointers',
        visualData: { elements: nums, pointers: [{ name: 'best', index: 3 }], highlightIndices: [3, 5, 4, 1] }
      }
    ];
  },

  'alien-dictionary': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Build Graph from Lexicographical Word Pairs',
        explanation: 'words = ["wrt","wrf","er","ett","rftt"]. Compare adjacent words at first difference: \'t\'->\'f\', \'w\'->\'e\', \'r\'->\'t\', \'e\'->\'r\'.',
        javaLine: 17, variables: { pairs: 4, uniqueChars: 5 },
        visualType: 'graph-network',
        visualData: {
          label: 'Directed Graph: w -> e -> r -> t -> f',
          nodes: [
            { id: 1, label: 'w', state: 'unvisited' },
            { id: 2, label: 'e', state: 'unvisited' },
            { id: 3, label: 'r', state: 'unvisited' },
            { id: 4, label: 't', state: 'unvisited' },
            { id: 5, label: 'f', state: 'unvisited' }
          ],
          adjList: { 'w': ['e'], 'e': ['r'], 'r': ['t'], 't': ['f'] }
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Calculate In-Degrees for Topological Sort',
        explanation: 'indegree[w] = 0, indegree[e] = 1, indegree[r] = 1, indegree[t] = 1, indegree[f] = 1. Queue starts with \'w\'.',
        javaLine: 29, variables: { queue: '[\'w\']' },
        visualType: 'graph-network',
        visualData: {
          label: 'Start BFS with in-degree 0: \'w\'',
          nodes: [
            { id: 1, label: 'w (in=0)', state: 'active' },
            { id: 2, label: 'e (in=1)', state: 'unvisited' },
            { id: 3, label: 'r (in=1)', state: 'unvisited' },
            { id: 4, label: 't (in=1)', state: 'unvisited' },
            { id: 5, label: 'f (in=1)', state: 'unvisited' }
          ],
          adjList: { 'w': ['e'], 'e': ['r'], 'r': ['t'], 't': ['f'] }
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Poll \'w\' -> Decrement \'e\' to 0 -> Enqueue',
        explanation: 'Order so far: "w". Poll \'e\' -> decrement \'r\' to 0. Order: "we". Poll \'r\' -> decrement \'t\' to 0. Order: "wer".',
        javaLine: 38, variables: { sb: 'wer', queue: '[\'t\']' },
        visualType: 'graph-network',
        visualData: {
          label: 'Topological Order so far: "wer"',
          nodes: [
            { id: 1, label: 'w', state: 'visited' },
            { id: 2, label: 'e', state: 'visited' },
            { id: 3, label: 'r', state: 'visited' },
            { id: 4, label: 't (in=0)', state: 'active' },
            { id: 5, label: 'f (in=1)', state: 'unvisited' }
          ],
          adjList: { 'w': ['e'], 'e': ['r'], 'r': ['t'], 't': ['f'] }
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Poll \'t\' and \'f\' & Return Alien Alphabet',
        explanation: 'All 5 characters successfully sorted without cycle: "wertf". Return "wertf". Time O(C), Space O(1).',
        javaLine: 43, variables: { result: 'wertf' },
        visualType: 'graph-network',
        visualData: {
          label: 'Alien Alphabet Order: "wertf"',
          nodes: [
            { id: 1, label: 'w', state: 'visited' },
            { id: 2, label: 'e', state: 'visited' },
            { id: 3, label: 'r', state: 'visited' },
            { id: 4, label: 't', state: 'visited' },
            { id: 5, label: 'f', state: 'visited' }
          ],
          adjList: { 'w': ['e'], 'e': ['r'], 'r': ['t'], 't': ['f'] }
        }
      }
    ];
  },

  'graph-valid-tree': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Check Tree Edge Invariant: edges.length == n - 1',
        explanation: 'n = 5, edges = [[0, 1], [0, 2], [0, 3], [1, 4]]. Total edges = 4 == 5 - 1. Valid tree candidates must have exactly n-1 edges.',
        javaLine: 3, variables: { n: 5, 'edges.length': 4 },
        visualType: 'graph-network',
        visualData: {
          label: 'Disjoint Sets: 0, 1, 2, 3, 4',
          nodes: [
            { id: 0, label: '0', state: 'unvisited' },
            { id: 1, label: '1', state: 'unvisited' },
            { id: 2, label: '2', state: 'unvisited' },
            { id: 3, label: '3', state: 'unvisited' },
            { id: 4, label: '4', state: 'unvisited' }
          ],
          adjList: { '0': [1, 2, 3], '1': [4] }
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Union Edge [0, 1] and [0, 2]',
        explanation: 'find(0) != find(1): union(0, 1). find(0) != find(2): union(0, 2). No cycles detected so far.',
        javaLine: 11, variables: { edge: '[0, 2]', root0: 0, root2: 2 },
        visualType: 'graph-network',
        visualData: {
          label: 'Connected Components: {0, 1, 2}',
          nodes: [
            { id: 0, label: '0 (root)', state: 'active' },
            { id: 1, label: '1', state: 'visited' },
            { id: 2, label: '2', state: 'visited' },
            { id: 3, label: '3', state: 'unvisited' },
            { id: 4, label: '4', state: 'unvisited' }
          ],
          adjList: { '0': [1, 2] }
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Union Edge [0, 3] and [1, 4]',
        explanation: 'find(0) != find(3): union(0, 3). find(1) != find(4): union(1, 4). All 5 vertices merged.',
        javaLine: 11, variables: { edge: '[1, 4]', root1: 0, root4: 4 },
        visualType: 'graph-network',
        visualData: {
          label: 'Single Tree Component Formed',
          nodes: [
            { id: 0, label: '0 (root)', state: 'active' },
            { id: 1, label: '1', state: 'visited' },
            { id: 2, label: '2', state: 'visited' },
            { id: 3, label: '3', state: 'visited' },
            { id: 4, label: '4', state: 'visited' }
          ],
          adjList: { '0': [1, 2, 3], '1': [4] }
        }
      },
      {
        step: 4, totalSteps: 4, action: 'No Cycles & Connected: Return true',
        explanation: 'All edges united disjoint sets without cycle, and graph is fully connected. Valid tree! Return true.',
        javaLine: 14, variables: { result: 'true', isTree: true },
        visualType: 'graph-network',
        visualData: {
          label: 'Valid Tree Verified (Connected, Acyclic)',
          nodes: [
            { id: 0, label: '0', state: 'visited' },
            { id: 1, label: '1', state: 'visited' },
            { id: 2, label: '2', state: 'visited' },
            { id: 3, label: '3', state: 'visited' },
            { id: 4, label: '4', state: 'visited' }
          ],
          adjList: { '0': [1, 2, 3], '1': [4] }
        }
      }
    ];
  },

  'number-of-connected-components': () => {
    return [
      {
        step: 1, totalSteps: 4, action: 'Initialize Disjoint Set (n = 5, components = 5)',
        explanation: 'edges = [[0, 1], [1, 2], [3, 4]]. Initially each node is its own component: components = 5.',
        javaLine: 6, variables: { n: 5, components: 5 },
        visualType: 'graph-network',
        visualData: {
          label: 'Initial State: 5 Disjoint Components',
          nodes: [
            { id: 0, label: '0', state: 'unvisited' },
            { id: 1, label: '1', state: 'unvisited' },
            { id: 2, label: '2', state: 'unvisited' },
            { id: 3, label: '3', state: 'unvisited' },
            { id: 4, label: '4', state: 'unvisited' }
          ],
          adjList: { '0': [1], '1': [2], '3': [4] }
        }
      },
      {
        step: 2, totalSteps: 4, action: 'Union Edge [0, 1]: components = 4',
        explanation: 'find(0)=0 != find(1)=1: Union! parent[0] = 1. components decrements from 5 to 4.',
        javaLine: 11, variables: { edge: '[0, 1]', components: 4 },
        visualType: 'graph-network',
        visualData: {
          label: 'Component {0, 1} Merged',
          nodes: [
            { id: 0, label: '0', state: 'visited' },
            { id: 1, label: '1', state: 'visited' },
            { id: 2, label: '2', state: 'unvisited' },
            { id: 3, label: '3', state: 'unvisited' },
            { id: 4, label: '4', state: 'unvisited' }
          ],
          adjList: { '0': [1] }
        }
      },
      {
        step: 3, totalSteps: 4, action: 'Union Edge [1, 2]: components = 3',
        explanation: 'find(1)=1 != find(2)=2: Union! parent[1] = 2. components decrements to 3 ({0, 1, 2}, {3}, {4}).',
        javaLine: 11, variables: { edge: '[1, 2]', components: 3 },
        visualType: 'graph-network',
        visualData: {
          label: 'Component {0, 1, 2} Merged',
          nodes: [
            { id: 0, label: '0', state: 'visited' },
            { id: 1, label: '1', state: 'visited' },
            { id: 2, label: '2', state: 'visited' },
            { id: 3, label: '3', state: 'unvisited' },
            { id: 4, label: '4', state: 'unvisited' }
          ],
          adjList: { '0': [1], '1': [2] }
        }
      },
      {
        step: 4, totalSteps: 4, action: 'Union Edge [3, 4] & Return components = 2',
        explanation: 'find(3) != find(4): Union! components decrements to 2 ({0, 1, 2} and {3, 4}). Return 2. Time O(V + E * α(V)).',
        javaLine: 15, variables: { result: 2, components: 2 },
        visualType: 'graph-network',
        visualData: {
          label: '2 Connected Components: {0, 1, 2} and {3, 4}',
          nodes: [
            { id: 0, label: '0 (C1)', state: 'visited' },
            { id: 1, label: '1 (C1)', state: 'visited' },
            { id: 2, label: '2 (C1)', state: 'visited' },
            { id: 3, label: '3 (C2)', state: 'active' },
            { id: 4, label: '4 (C2)', state: 'active' }
          ],
          adjList: { '0': [1], '1': [2], '3': [4] }
        }
      }
    ];
  }
};
