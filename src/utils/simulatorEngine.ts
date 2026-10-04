import type { Problem } from '../data/problems';
import { JAVA_SOLUTIONS } from '../data/javaSolutions';
import type { SimFrame } from './simulations/types';
import { arraySimulations } from './simulations/arraySimulations';
import { binarySimulations } from './simulations/binarySimulations';
import { linkedListSimulations } from './simulations/linkedListSimulations';
import { matrixSimulations } from './simulations/matrixSimulations';
import { stringSimulations } from './simulations/stringSimulations';
import { INTERVAL_SIMULATIONS } from './simulations/intervalSimulations';
import { DP_SIMULATIONS } from './simulations/dpSimulations';
import { GRAPH_SIMULATIONS } from './simulations/graphSimulations';
import { HEAP_SIMULATIONS } from './simulations/heapSimulations';
import { TREE_SIMULATIONS } from './simulations/treeSimulations';

export type { SimFrame };

// Aggregate all 75 specialized high-fidelity simulations
const ALL_SIMULATIONS: Record<string, SimFrame[] | (() => SimFrame[])> = {
  ...arraySimulations,
  ...binarySimulations,
  ...linkedListSimulations,
  ...matrixSimulations,
  ...stringSimulations,
  ...INTERVAL_SIMULATIONS,
  ...DP_SIMULATIONS,
  ...GRAPH_SIMULATIONS,
  ...HEAP_SIMULATIONS,
  ...TREE_SIMULATIONS,
};

/**
 * Validates and adjusts javaLine to ensure it points to an executable, non-empty,
 * non-brace line within the actual Java solution boundaries.
 */
export function getSafeJavaLine(problemId: string, step: number, totalSteps: number, hintLine?: number): number {
  const code = JAVA_SOLUTIONS[problemId];
  if (!code) return hintLine || 1;

  const rawLines = code.split('\n');
  const maxLine = rawLines.length;

  // Find 1-based indices of meaningful executable lines (skip comments, blank lines, bare braces)
  const executableLines: number[] = [];
  rawLines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (
      trimmed.length > 0 &&
      !trimmed.startsWith('//') &&
      !trimmed.startsWith('/*') &&
      !trimmed.startsWith('*') &&
      trimmed !== '{' &&
      trimmed !== '}' &&
      trimmed !== '};'
    ) {
      executableLines.push(idx + 1);
    }
  });

  if (executableLines.length === 0) {
    return Math.min(Math.max(1, hintLine || 1), maxLine);
  }

  // If hintLine is provided and directly on an executable line, use it!
  if (hintLine !== undefined && hintLine >= 1 && hintLine <= maxLine) {
    if (executableLines.includes(hintLine)) {
      return hintLine;
    }
    // Find closest executable line
    const closest = executableLines.reduce((prev, curr) =>
      Math.abs(curr - hintLine) < Math.abs(prev - hintLine) ? curr : prev
    );
    return closest;
  }

  // Otherwise, distribute the step across executable lines
  const ratio = Math.max(0, Math.min(1, (step - 1) / Math.max(1, totalSteps - 1)));
  const execIndex = Math.min(
    executableLines.length - 1,
    Math.floor(ratio * executableLines.length)
  );
  return executableLines[execIndex];
}

/**
 * Generates an authentic, high-fidelity visual simulation for any Blind 75 problem.
 */
export function generateSimulationForProblem(problem: Problem): SimFrame[] {
  const generator = ALL_SIMULATIONS[problem.id];
  let frames: SimFrame[];

  if (generator) {
    frames = typeof generator === 'function' ? generator() : generator;
  } else {
    // Graceful fallback for any custom problem
    frames = generateFallbackSimulation(problem);
  }

  // Safety Pass: Ensure all frames have 100% valid javaLine within the exact bounds of JAVA_SOLUTIONS
  return frames.map((frame, index) => {
    const safeLine = getSafeJavaLine(
      problem.id,
      frame.step || index + 1,
      frame.totalSteps || frames.length,
      frame.javaLine
    );
    return {
      ...frame,
      step: index + 1,
      totalSteps: frames.length,
      javaLine: safeLine,
    };
  });
}

function generateFallbackSimulation(p: Problem): SimFrame[] {
  const flow = p.flow && p.flow.length >= 4 ? p.flow : [
    'Initialize pointers and data structures',
    'Evaluate invariant and explore transitions',
    'Update state and optimize local bounds',
    'Return verified optimal solution'
  ];

  const sampleArr = [2, 7, 11, 15];
  return [
    {
      step: 1, totalSteps: 4, action: flow[0],
      explanation: 'Initialize data structures and scan bounds.',
      javaLine: 3, variables: { i: 0, length: sampleArr.length },
      visualType: 'array-pointers',
      visualData: { elements: sampleArr, pointers: [{ name: 'i', index: 0 }], highlightIndices: [0] }
    },
    {
      step: 2, totalSteps: 4, action: flow[1],
      explanation: p.hook || 'Scan and evaluate state transition.',
      javaLine: 5, variables: { i: 1, curr: sampleArr[1] },
      visualType: 'array-pointers',
      visualData: { elements: sampleArr, pointers: [{ name: 'i', index: 1 }], highlightIndices: [1] }
    },
    {
      step: 3, totalSteps: 4, action: flow[2],
      explanation: 'Condition met. Advance state.',
      javaLine: 7, variables: { i: 2, optimal: sampleArr[2] },
      visualType: 'array-pointers',
      visualData: { elements: sampleArr, pointers: [{ name: 'i', index: 2 }], highlightIndices: [2] }
    },
    {
      step: 4, totalSteps: 4, action: flow[3],
      explanation: `Solved in ${p.complexity.time} time and ${p.complexity.space} space!`,
      javaLine: 9, variables: { time: p.complexity.time, space: p.complexity.space },
      visualType: 'array-pointers',
      visualData: { elements: sampleArr, pointers: [{ name: '★', index: 3 }], highlightIndices: [3] }
    }
  ];
}
