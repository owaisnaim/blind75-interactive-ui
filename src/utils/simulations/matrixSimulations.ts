import type { SimFrame } from './types';

export const matrixSimulations: Record<string, SimFrame[]> = {
  'set-matrix-zeroes': [
    {
      step: 1, totalSteps: 4, action: 'Scan Matrix: Flag Row 0 & Col 0',
      explanation: 'Use first row and first column as in-place O(1) space marker flags.',
      javaLine: 4, variables: { rowZero: 'false', rows: 3, cols: 3 },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
        activeCell: [1, 1],
        visitedCells: [],
        label: 'Zero detected at (1, 1)'
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Mark First Row & Col: matrix[1][0]=0, matrix[0][1]=0',
      explanation: 'Projection flags stored in boundaries without allocating extra arrays.',
      javaLine: 7, variables: { 'matrix[1][0]': 0, 'matrix[0][1]': 0 },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[1, 0, 1], [0, 0, 1], [1, 1, 1]],
        activeCell: [0, 1],
        visitedCells: [[1, 0], [0, 1]],
        label: 'Boundary Markers Set'
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Zero Out Inner Matrix Cells',
      explanation: 'For all inner cells (r, c), if matrix[r][0]==0 or matrix[0][c]==0, set matrix[r][c]=0.',
      javaLine: 10, variables: { 'matrix[1][1]': 0 },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
        activeCell: [1, 2],
        visitedCells: [[1, 0], [1, 1], [1, 2], [0, 1], [2, 1]],
        label: 'Row 1 and Column 1 Zeroed'
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Zero First Row / Col if Flagged',
      explanation: 'Final matrix transformed in O(M*N) time and O(1) space!',
      javaLine: 14, variables: { result: 'In-Place Zeroed' },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
        activeCell: [0, 0],
        visitedCells: [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]],
        label: 'Matrix Zeroes Applied',
        solved: true
      }
    }
  ],

  'spiral-matrix': [
    {
      step: 1, totalSteps: 4, action: 'Traverse Right along Top Row',
      explanation: 'top=0, bottom=3, left=0, right=3. Read [1, 2, 3]. Increment top=1.',
      javaLine: 5, variables: { top: 1, left: 0, bottom: 3, right: 3 },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        activeCell: [0, 2],
        visitedCells: [[0, 0], [0, 1], [0, 2]],
        label: 'Top row: [1, 2, 3]'
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Traverse Down along Right Column',
      explanation: 'Read down right column: [6, 9]. Decrement right=2.',
      javaLine: 8, variables: { right: 2 },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        activeCell: [2, 2],
        visitedCells: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
        label: 'Right col: [6, 9]'
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Traverse Left along Bottom Row',
      explanation: 'Read bottom row right to left: [8, 7]. Decrement bottom=2.',
      javaLine: 11, variables: { bottom: 2 },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        activeCell: [2, 0],
        visitedCells: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0]],
        label: 'Bottom row: [8, 7]'
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Traverse Up and Read Center: [4, 5]',
      explanation: 'Spiral traversal complete: [1, 2, 3, 6, 9, 8, 7, 4, 5] in O(M*N) time!',
      javaLine: 14, variables: { result: '[1,2,3,6,9,8,7,4,5]' },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        activeCell: [1, 1],
        visitedCells: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [1, 1]],
        label: 'Spiral Complete: 9 elements',
        solved: true
      }
    }
  ],

  'rotate-image': [
    {
      step: 1, totalSteps: 4, action: 'Step 1: Transpose Matrix across Diagonal',
      explanation: 'Swap matrix[i][j] with matrix[j][i]. Rows become columns.',
      javaLine: 4, variables: { step: 'Transpose' },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
        activeCell: [0, 1],
        visitedCells: [[0, 1], [1, 0], [0, 2], [2, 0], [1, 2], [2, 1]],
        label: 'Diagonal Transpose Applied'
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Step 2: Reverse Row 0',
      explanation: 'Two pointers on row 0: swap matrix[0][0] and matrix[0][2] -> [7, 4, 1].',
      javaLine: 7, variables: { 'row[0]': '[7, 4, 1]' },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[7, 4, 1], [2, 5, 8], [3, 6, 9]],
        activeCell: [0, 0],
        visitedCells: [[0, 0], [0, 2]],
        label: 'Row 0 Reversed'
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Reverse Row 1 & Row 2',
      explanation: 'Row 1 remains [8, 5, 2] after reverse; Row 2 becomes [9, 6, 3].',
      javaLine: 7, variables: { 'row[1]': '[8, 5, 2]', 'row[2]': '[9, 6, 3]' },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
        activeCell: [1, 0],
        visitedCells: [[1, 0], [1, 2], [2, 0], [2, 2]],
        label: 'All Rows Reversed'
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Rotate 90 Degrees Clockwise Complete',
      explanation: 'Matrix rotated in-place in O(N^2) time and O(1) extra space!',
      javaLine: 10, variables: { result: 'Rotated 90°' },
      visualType: 'matrix-grid',
      visualData: {
        grid: [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
        activeCell: [0, 0],
        visitedCells: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
        label: 'Rotated 90° Clockwise',
        solved: true
      }
    }
  ],

  'word-search': [
    {
      step: 1, totalSteps: 4, action: 'Start DFS at cell (0, 0) for "ABCCED"',
      explanation: 'board[0][0] == \'A\'. Match found! Mark visited: board[0][0] = \'#\'.',
      javaLine: 5, variables: { r: 0, c: 0, charMatched: 'A', wordIdx: 0 },
      visualType: 'matrix-grid',
      visualData: {
        grid: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']],
        activeCell: [0, 0],
        visitedCells: [[0, 0]],
        label: 'Matched "A" at (0, 0)'
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Step Right: Match "B" at (0, 1) and "C" at (0, 2)',
      explanation: 'DFS advances along word path. Next target is \'C\'.',
      javaLine: 8, variables: { r: 0, c: 2, charMatched: 'C', wordIdx: 2 },
      visualType: 'matrix-grid',
      visualData: {
        grid: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']],
        activeCell: [0, 2],
        visitedCells: [[0, 0], [0, 1], [0, 2]],
        label: 'Matched "ABC"'
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Step Down: Match "C" at (1, 2) and "E" at (2, 2)',
      explanation: 'Navigate around obstacles. Reach \'E\' at (2, 2).',
      javaLine: 8, variables: { r: 2, c: 2, charMatched: 'E', wordIdx: 4 },
      visualType: 'matrix-grid',
      visualData: {
        grid: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']],
        activeCell: [2, 2],
        visitedCells: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
        label: 'Matched "ABCCE"'
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Step Left: Match Final "D" at (2, 1) -> Found!',
      explanation: 'All letters of "ABCCED" verified in grid! Return true.',
      javaLine: 11, variables: { word: 'ABCCED', result: 'true' },
      visualType: 'matrix-grid',
      visualData: {
        grid: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']],
        activeCell: [2, 1],
        visitedCells: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1]],
        label: 'Word "ABCCED" Matched!',
        solved: true
      }
    }
  ]
};
