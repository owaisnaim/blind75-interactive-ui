export interface SimFrame {
  step: number;
  totalSteps: number;
  action: string;
  explanation: string;
  javaLine: number;
  variables: Record<string, any>;
  visualType:
    | 'array-pointers'
    | 'sliding-window'
    | 'dp-grid'
    | 'linked-list'
    | 'interval-sweep'
    | 'tree-node'
    | 'stack-pipe'
    | 'heap-balance'
    | 'matrix-grid'
    | 'bit-binary'
    | 'frequency-map'
    | 'graph-network'
    | 'trie-tree';
  visualData: any;
}
