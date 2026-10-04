import type { ProblemSpec } from '../problemTestCases';

export const matrixSpecs: Record<string, ProblemSpec> = {
  'set-matrix-zeroes': {
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s. You must do it **in place**.`,
    methodName: 'setZeroes',
    starterJava: `class Solution {
    public void setZeroes(int[][] matrix) {
        // Use first row and column as markers for O(1) space
        
    }
}`,
    constraints: [
      'm == matrix.length',
      'n == matrix[0].length',
      '1 <= m, n <= 200',
      '-2^31 <= matrix[i][j] <= 2^31 - 1'
    ],
    examples: [
      {
        id: 1,
        input: { matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] },
        displayInput: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]',
        expectedOutput: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
        displayOutput: '[[1,0,1],[0,0,0],[1,0,1]]',
        explanation: 'Because matrix[1][1] is 0, the entire 2nd row and 2nd column are set to 0.'
      },
      {
        id: 2,
        input: { matrix: [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]] },
        displayInput: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]',
        expectedOutput: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]],
        displayOutput: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]',
        explanation: 'Because matrix[0][0] and matrix[0][3] are 0, row 0 and columns 0 and 3 are set to 0.'
      }
    ],
    hiddenTestCases: []
  },

  'spiral-matrix': {
    description: `Given an \`m x n\` \`matrix\`, return *all elements of the* \`matrix\` *in spiral order*.`,
    methodName: 'spiralOrder',
    starterJava: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        // Boundary simulation with top, bottom, left, right bounds
        
    }
}`,
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 10',
      '-100 <= matrix[i][j] <= 100'
    ],
    examples: [
      {
        id: 1,
        input: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
        displayInput: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        expectedOutput: [1, 2, 3, 6, 9, 8, 7, 4, 5],
        displayOutput: '[1,2,3,6,9,8,7,4,5]',
        explanation: 'Traversing the matrix clockwise in spiral order: [1, 2, 3] across the top, down [6, 9], left [8, 7], up [4], then inward to [5].'
      },
      {
        id: 2,
        input: { matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]] },
        displayInput: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        expectedOutput: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
        displayOutput: '[1,2,3,4,8,12,11,10,9,5,6,7]',
        explanation: 'Traversing clockwise: top row [1, 2, 3, 4], right column down [8, 12], bottom row left [11, 10, 9], left column up [5], and inner layer [6, 7].'
      }
    ],
    hiddenTestCases: []
  },

  'rotate-image': {
    description: `You are given an \`n x n\` 2D \`matrix\` representing an image, rotate the image by **90 degrees clockwise** in-place.`,
    methodName: 'rotate',
    starterJava: `class Solution {
    public void rotate(int[][] matrix) {
        // Transpose the matrix, then reflect (reverse each row)
        
    }
}`,
    constraints: [
      'n == matrix.length == matrix[i].length',
      '1 <= n <= 20',
      '-1000 <= matrix[i][j] <= 1000'
    ],
    examples: [
      {
        id: 1,
        input: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
        displayInput: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        expectedOutput: [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
        displayOutput: '[[7,4,1],[8,5,2],[9,6,3]]',
        explanation: 'Rotating the 3x3 matrix 90 degrees clockwise puts the first row [1, 2, 3] as the last column, the second row [4, 5, 6] as the second column, and the third row [7, 8, 9] as the first column.'
      },
      {
        id: 2,
        input: { matrix: [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]] },
        displayInput: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]',
        expectedOutput: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]],
        displayOutput: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]',
        explanation: 'Rotating the 4x4 matrix 90 degrees clockwise in-place produces the resulting matrix.'
      }
    ],
    hiddenTestCases: []
  },

  'word-search': {
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` *if* \`word\` *exists in the grid*.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    methodName: 'exist',
    starterJava: `class Solution {
    public boolean exist(char[][] board, String word) {
        // Backtracking DFS searching 4-directionally
        
    }
}`,
    constraints: [
      'm == board.length',
      'n = board[i].length',
      '1 <= m, n <= 6',
      '1 <= word.length <= 15',
      'board and word consists of only lowercase and uppercase English letters.'
    ],
    examples: [
      {
        id: 1,
        input: {
          board: [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E']
          ],
          word: 'ABCCED'
        },
        displayInput: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'The path of cells [0,0] -> [0,1] -> [0,2] -> [1,2] -> [2,2] -> [2,1] contains the letters "ABCCED".'
      },
      {
        id: 2,
        input: {
          board: [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E']
          ],
          word: 'SEE'
        },
        displayInput: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 'The path of cells [1,3] -> [2,3] -> [2,2] contains the letters "SEE".'
      },
      {
        id: 3,
        input: {
          board: [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E']
          ],
          word: 'ABCB'
        },
        displayInput: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: 'Searching for "ABCB" requires reusing cell [0,1] which is not allowed.'
      }
    ],
    hiddenTestCases: []
  }
};
