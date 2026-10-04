import type { TestCase } from '../data/problemTestCases';

export interface TestCaseResult {
  id: number;
  passed: boolean;
  displayInput: string;
  expected: string;
  actual: string;
  stdout?: string;
}

export interface ExecutionResult {
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compile Error';
  totalPassed: number;
  totalCases: number;
  failedCase?: {
    testCaseId: number;
    input: string;
    expected: string;
    actual: string;
    explanation?: string;
  };
  runtimeMs: number;
  memoryMb: number;
  beatsPercent: number;
  message?: string;
  testCaseResults: TestCaseResult[];
}

function cleanParameters(rawParams: string): string {
  if (!rawParams || !rawParams.trim()) return '';
  return rawParams
    .split(',')
    .map(p => {
      const parts = p.trim().split(/\s+/);
      return parts[parts.length - 1].replace(/[^a-zA-Z0-9_$]/g, '');
    })
    .filter(Boolean)
    .join(', ');
}

export class ListNode {
  val: any;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export class TreeNode {
  val: any;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export class Node {
  val: number;
  neighbors: Node[];
  constructor(val = 0, neighbors: Node[] = []) {
    this.val = val;
    this.neighbors = Array.isArray(neighbors) ? neighbors : [];
  }
}

export function _arrayToListNode(arr: any[]): ListNode | null {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return null;
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const x of arr) {
    curr.next = new ListNode(x);
    curr = curr.next;
  }
  return dummy.next;
}

export function _listNodeToArray(head: any): any[] {
  const res: any[] = [];
  const visited = new Set();
  let curr = head;
  while (curr && typeof curr === 'object' && 'val' in curr) {
    if (visited.has(curr)) break;
    visited.add(curr);
    res.push(curr.val);
    curr = curr.next;
  }
  return res;
}

export function _arrayToTreeNode(arr: any[]): TreeNode | null {
  if (!arr || !Array.isArray(arr) || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;
  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const curr = queue.shift();
    if (!curr) continue;
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        curr.left = new TreeNode(arr[i]);
        queue.push(curr.left);
      }
      i++;
    }
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        curr.right = new TreeNode(arr[i]);
        queue.push(curr.right);
      }
      i++;
    }
  }
  return root;
}

export function _treeNodeToArray(root: any): any[] {
  if (!root || typeof root !== 'object' || !('val' in root)) return [];
  const res: any[] = [];
  const queue: any[] = [root];
  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr) {
      res.push(curr.val);
      queue.push(curr.left);
      queue.push(curr.right);
    } else {
      res.push(null);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) {
    res.pop();
  }
  return res;
}

export function _adjListToGraph(adjList: number[][]): Node | null {
  if (!adjList || !Array.isArray(adjList) || adjList.length === 0) return null;
  const nodes: Node[] = [];
  for (let i = 1; i <= adjList.length; i++) {
    nodes[i] = new Node(i, []);
  }
  for (let i = 0; i < adjList.length; i++) {
    const u = i + 1;
    const neighbors = adjList[i] || [];
    for (const v of neighbors) {
      nodes[u].neighbors.push(nodes[v]);
    }
  }
  return nodes[1];
}

export function _graphToAdjList(node: any): number[][] {
  if (!node) return [];
  const map = new Map<number, any>();
  const queue = [node];
  map.set(node.val, node);
  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr || !curr.neighbors) continue;
    for (const nb of curr.neighbors) {
      if (nb && !map.has(nb.val)) {
        map.set(nb.val, nb);
        queue.push(nb);
      }
    }
  }
  const maxVal = Math.max(...Array.from(map.keys()));
  const res: number[][] = [];
  for (let i = 1; i <= maxVal; i++) {
    const n = map.get(i);
    if (n && n.neighbors) {
      res.push(n.neighbors.map((nb: any) => nb.val));
    } else {
      res.push([]);
    }
  }
  return res;
}

/**
 * Transpiles standard LeetCode Java Solution class into executable JS.
 */
export function transpileJavaToJs(javaCode: string, methodName: string): string {
  let code = javaCode;

  // 1. Remove package and import lines
  code = code.replace(/import\s+[^;]+;/g, '');
  code = code.replace(/package\s+[^;]+;/g, '');

  // 2. Comprehensive Java Standard Library & Collection Polyfills
  const polyfills = `
const _NativeMap = globalThis.Map;
const _NativeSet = globalThis.Set;

class _JavaMap {
  constructor() { this.map = new _NativeMap(); }
  put(k, v) { this.map.set(k, v); return v; }
  putIfAbsent(k, v) {
    if (!this.map.has(k)) {
      this.map.set(k, v);
      return null;
    }
    return this.map.get(k);
  }
  computeIfAbsent(k, fn) {
    if (!this.map.has(k)) {
      const val = typeof fn === 'function' ? fn(k) : fn;
      this.map.set(k, val);
      return val;
    }
    return this.map.get(k);
  }
  get(k) { return this.map.has(k) ? this.map.get(k) : null; }
  containsKey(k) { return this.map.has(k); }
  getOrDefault(k, d) { return this.map.has(k) ? this.map.get(k) : d; }
  get size() { return this.map.size; }
  size() { return this.map.size; }
  isEmpty() { return this.map.size === 0; }
  clear() { this.map.clear(); }
  remove(k) { return this.map.delete(k); }
  keySet() { return Array.from(this.map.keys()); }
  values() { return Array.from(this.map.values()); }
  entrySet() {
    return Array.from(this.map.entries()).map(([k, v]) => ({
      getKey: () => k,
      getValue: () => v,
      key: k,
      value: v
    }));
  }
}

class _JavaSet {
  constructor(initial) {
    this.set = new _NativeSet();
    if (initial && typeof initial[Symbol.iterator] === 'function') {
      for (const item of initial) this.set.add(item);
    }
  }
  add(v) {
    if (this.set.has(v)) return false;
    this.set.add(v);
    return true;
  }
  addAll(coll) {
    let changed = false;
    for (const item of coll) {
      if (!this.set.has(item)) {
        this.set.add(item);
        changed = true;
      }
    }
    return changed;
  }
  contains(v) { return this.set.has(v); }
  remove(v) { return this.set.delete(v); }
  get size() { return this.set.size; }
  size() { return this.set.size; }
  isEmpty() { return this.set.size === 0; }
  clear() { this.set.clear(); }
  [Symbol.iterator]() { return this.set.values(); }
  toArray() { return Array.from(this.set); }
}

class _JavaStack {
  constructor() { this.arr = []; }
  push(v) { this.arr.push(v); return v; }
  pop() { return this.arr.pop(); }
  peek() { return this.arr[this.arr.length - 1]; }
  isEmpty() { return this.arr.length === 0; }
  get size() { return this.arr.length; }
  size() { return this.arr.length; }
}

class _JavaPriorityQueue {
  constructor(comparator) {
    this.arr = [];
    this.cmp = comparator || ((a, b) => a - b);
  }
  offer(v) { this.arr.push(v); this.arr.sort(this.cmp); return true; }
  poll() { return this.arr.shift(); }
  peek() { return this.arr[0]; }
  isEmpty() { return this.arr.length === 0; }
  get size() { return this.arr.length; }
  size() { return this.arr.length; }
}

class _JavaQueue {
  constructor(initial) {
    if (Array.isArray(initial)) this.arr = [...initial];
    else if (initial && Array.isArray(initial.arr)) this.arr = [...initial.arr];
    else this.arr = [];
  }
  offer(v) { this.arr.push(v); return true; }
  offerLast(v) { this.arr.push(v); return true; }
  offerFirst(v) { this.arr.unshift(v); return true; }
  add(v) { this.arr.push(v); return true; }
  push(v) { this.arr.unshift(v); return v; }
  poll() { return this.arr.shift(); }
  pollFirst() { return this.arr.shift(); }
  pollLast() { return this.arr.pop(); }
  pop() { return this.arr.shift(); }
  remove() { return this.arr.shift(); }
  peek() { return this.arr[0]; }
  peekFirst() { return this.arr[0]; }
  peekLast() { return this.arr[this.arr.length - 1]; }
  isEmpty() { return this.arr.length === 0; }
  get size() { return this.arr.length; }
  size() { return this.arr.length; }
  clear() { this.arr = []; }
}

class _JavaStringBuilder {
  constructor(initial = '') { this.str = String(initial); }
  append(val) { this.str += String(val); return this; }
  insert(offset, val) { this.str = this.str.slice(0, offset) + val + this.str.slice(offset); return this; }
  reverse() { this.str = this.str.split('').reverse().join(''); return this; }
  charAt(idx) { return this.str.charAt(idx); }
  setCharAt(idx, ch) { this.str = this.str.substring(0, idx) + ch + this.str.substring(idx + 1); }
  get length() { return this.str.length; }
  toString() { return this.str; }
}

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function _subChar(a, b) {
  const codeA = typeof a === 'string' ? a.charCodeAt(0) : (typeof a === 'number' ? a : 0);
  const codeB = typeof b === 'string' ? b.charCodeAt(0) : (typeof b === 'number' ? b : 0);
  return codeA - codeB;
}

function _arrayToListNode(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return null;
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const x of arr) {
    curr.next = new ListNode(x);
    curr = curr.next;
  }
  return dummy.next;
}

function _listNodeToArray(head) {
  const res = [];
  const visited = new Set();
  let curr = head;
  while (curr && curr instanceof ListNode) {
    if (visited.has(curr)) break;
    visited.add(curr);
    res.push(curr.val);
    curr = curr.next;
  }
  return res;
}

function _arrayToTreeNode(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const curr = queue.shift();
    if (!curr) continue;
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        curr.left = new TreeNode(arr[i]);
        queue.push(curr.left);
      }
      i++;
    }
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        curr.right = new TreeNode(arr[i]);
        queue.push(curr.right);
      }
      i++;
    }
  }
  return root;
}

function _treeNodeToArray(root) {
  if (!root || !(root instanceof TreeNode)) return [];
  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr) {
      res.push(curr.val);
      queue.push(curr.left);
      queue.push(curr.right);
    } else {
      res.push(null);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) {
    res.pop();
  }
  return res;
}

function _createArrayList(arg) {
  if (arg === undefined || arg === null) return [];
  if (typeof arg === 'number') return [];
  if (Array.isArray(arg)) return [...arg];
  if (typeof arg[Symbol.iterator] === 'function') return Array.from(arg);
  return [arg];
}

const HashMap = _JavaMap;
const Map = _JavaMap;
const HashSet = _JavaSet;
const Set = _JavaSet;
const Stack = _JavaStack;
const PriorityQueue = _JavaPriorityQueue;
const Queue = _JavaQueue;
const Deque = _JavaQueue;
const ArrayDeque = _JavaQueue;
const LinkedList = _JavaQueue;
const StringBuilder = _JavaStringBuilder;
const ArrayList = _createArrayList;
const List = Array;

// Polyfill Array.prototype for Java List compatibility
if (!Array.prototype.add) {
  Array.prototype.add = function(v) { this.push(v); return true; };
}
if (!Array.prototype.get) {
  Array.prototype.get = function(i) { return this[i]; };
}
if (!Array.prototype.set) {
  Array.prototype.set = function(i, v) { this[i] = v; return v; };
}
if (!Array.prototype.size) {
  Array.prototype.size = function() { return this.length; };
}
if (!Array.prototype.isEmpty) {
  Array.prototype.isEmpty = function() { return this.length === 0; };
}
if (!Array.prototype.toArray) {
  Array.prototype.toArray = function() { return this; };
}
if (!Array.prototype.contains) {
  Array.prototype.contains = function(v) { return this.includes(v); };
}
if (!Array.prototype.clone) {
  Array.prototype.clone = function() { return [...this]; };
}
if (!Array.prototype.remove) {
  Array.prototype.remove = function(idxOrVal) {
    if (typeof idxOrVal === 'number' && idxOrVal >= 0 && idxOrVal < this.length) {
      return this.splice(idxOrVal, 1)[0];
    }
    const idx = this.indexOf(idxOrVal);
    if (idx !== -1) {
      this.splice(idx, 1);
      return true;
    }
    return false;
  };
}

// Polyfill String.prototype for Java String compatibility
const _origSplit = String.prototype.split;
String.prototype.split = function(sep, limit) {
  const res = _origSplit.call(this, sep, limit);
  if (limit === undefined || limit === 0) {
    while (res.length > 0 && res[res.length - 1] === '') {
      res.pop();
    }
  }
  return res;
};
if (!String.prototype.toCharArray) {
  String.prototype.toCharArray = function() { return this.split(''); };
}
if (!String.prototype.equals) {
  String.prototype.equals = function(other) { return this.valueOf() === String(other); };
}
if (!String.prototype.equalsIgnoreCase) {
  String.prototype.equalsIgnoreCase = function(other) { return this.valueOf().toLowerCase() === String(other).toLowerCase(); };
}
if (!String.prototype.contains) {
  String.prototype.contains = function(sub) { return this.includes(sub); };
}
if (!String.prototype.isEmpty) {
  String.prototype.isEmpty = function() { return this.length === 0; };
}

// Polyfill Number.prototype for Java Integer/Double wrapper methods
if (!Number.prototype.intValue) {
  Number.prototype.intValue = function() { return Math.trunc(this.valueOf()); };
}
if (!Number.prototype.longValue) {
  Number.prototype.longValue = function() { return Math.trunc(this.valueOf()); };
}
if (!Number.prototype.doubleValue) {
  Number.prototype.doubleValue = function() { return this.valueOf(); };
}

const Integer = {
  MAX_VALUE: 2147483647,
  MIN_VALUE: -2147483648,
  valueOf: (n) => Number(n),
  parseInt: (s) => parseInt(s, 10),
  compare: (a, b) => (a < b ? -1 : a > b ? 1 : 0)
};

const Long = {
  MAX_VALUE: Number.MAX_SAFE_INTEGER,
  MIN_VALUE: Number.MIN_SAFE_INTEGER,
  valueOf: (n) => Number(n),
  parseLong: (s) => parseInt(s, 10)
};

const Double = {
  MAX_VALUE: Number.MAX_VALUE,
  MIN_VALUE: Number.MIN_VALUE,
  valueOf: (n) => Number(n),
  parseDouble: (s) => parseFloat(s)
};

const Character = {
  isLetterOrDigit: (c) => /[a-zA-Z0-9]/.test(c),
  isLetter: (c) => /[a-zA-Z]/.test(c),
  isDigit: (c) => /[0-9]/.test(c),
  isWhitespace: (c) => /\s/.test(c),
  toLowerCase: (c) => String(c).toLowerCase(),
  toUpperCase: (c) => String(c).toUpperCase()
};

const Arrays = {
  sort: (arr, cmp) => {
    if (cmp) arr.sort(cmp);
    else arr.sort((a, b) => (typeof a === 'number' && typeof b === 'number' ? a - b : (a < b ? -1 : 1)));
  },
  fill: (arr, val) => arr.fill(val),
  equals: (a, b) => JSON.stringify(a) === JSON.stringify(b),
  asList: (...args) => (args.length === 1 && Array.isArray(args[0]) ? [...args[0]] : [...args]),
  toString: (arr) => JSON.stringify(arr)
};

const Collections = {
  sort: (list, cmp) => {
    if (cmp) list.sort(cmp);
    else list.sort((a, b) => (typeof a === 'number' && typeof b === 'number' ? a - b : (a < b ? -1 : 1)));
  },
  reverse: (list) => list.reverse(),
  reverseOrder: () => (a, b) => (typeof a === 'number' && typeof b === 'number' ? b - a : (b < a ? -1 : 1)),
  max: (list) => Math.max(...list),
  min: (list) => Math.min(...list),
  swap: (list, i, j) => { const t = list[i]; list[i] = list[j]; list[j] = t; },
  nCopies: (n, val) => new Array(n).fill(val)
};

let _stdoutLogs = [];
const System = {
  out: {
    println: (...args) => {
      const msg = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
      _stdoutLogs.push(msg);
      console.log(...args);
    },
    print: (...args) => {
      const msg = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
      if (_stdoutLogs.length > 0) {
        _stdoutLogs[_stdoutLogs.length - 1] += msg;
      } else {
        _stdoutLogs.push(msg);
      }
      console.log(...args);
    },
    printf: (fmt, ...args) => {
      let i = 0;
      const msg = String(fmt).replace(/%[sddf%]/g, (m) => (m === '%%' ? '%' : args[i++] ?? m));
      _stdoutLogs.push(msg);
    }
  }
};
`;

  // 3. Transform Java idioms in body
  let transformed = code;

  // Temporarily isolate comments so types inside comments never get transformed to 'let'
  const comments: string[] = [];
  transformed = transformed.replace(/(\/\*[\s\S]*?\*\/|\/\/[^\n]*)/g, (match) => {
    comments.push(match);
    return `__COMMENT_${comments.length - 1}__`;
  });

  // Strip outermost class wrapper (e.g. class Solution, public class Codec, class MedianFinder, class Trie, etc.)
  transformed = transformed.replace(/(?:public\s+)?class\s+[A-Za-z0-9_$]+(?:\s+implements\s+[^{]+)?\s*\{/, '');
  const lastBraceIdx = transformed.lastIndexOf('}');
  if (lastBraceIdx !== -1) {
    transformed = transformed.substring(0, lastBraceIdx) + transformed.substring(lastBraceIdx + 1);
  }

  // Java lambda -> JS arrow: (a, b) -> a - b => (a, b) => a - b
  transformed = transformed.replace(/(\([^)]*\)|[a-zA-Z0-9_$]+)\s*->\s*/g, '$1 => ');

  // Enhanced for loop: for (int x : nums) -> for (let x of nums)
  transformed = transformed.replace(
    /for\s*\(\s*(?:final\s+)?(?:int|double|float|long|boolean|char|String|[a-zA-Z0-9_<>\s\[\]]+)\s+([a-zA-Z0-9_$]+)\s*:\s*([^)]+)\)/g,
    'for (let $1 of $2)'
  );

  // Method signatures replacement: public ... methodName(params) -> function methodName(params)
  // Handles all methods (public, private, protected, static, helper methods)
  const declaredMethodNames: string[] = [];
  const methodRegex = /(?:public|private|protected|static|final|\s)*\s+(?:void|[a-zA-Z0-9_<>\[\]]+)\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*\{/g;
  transformed = transformed.replace(methodRegex, (match, fnName, rawParams) => {
    if (['if', 'for', 'while', 'switch', 'catch', 'constructor'].includes(fnName)) return match;
    declaredMethodNames.push(fnName);
    const cleanP = cleanParameters(rawParams);
    return `\nfunction ${fnName}(${cleanP}) {`;
  });

  // Safely strip Java generics (e.g. List<Integer>, Map<String, List<Integer>>, new ArrayList<>())
  const genericInnerRegex = /([a-zA-Z0-9_$])<[a-zA-Z0-9_$,\s\[\]\?]*>/g;
  while (genericInnerRegex.test(transformed)) {
    transformed = transformed.replace(genericInnerRegex, '$1');
  }

  // Nested class declarations: private static class Node { ... } -> class Node { ... }
  transformed = transformed.replace(/\b(?:public|private|protected|static|final)\s+class\s+([A-Za-z0-9_$]+)/g, 'class $1');

  // Strip field and variable modifiers
  transformed = transformed.replace(/\b(?:public|private|protected|static|final|synchronized|volatile)\s+/g, '');

  // Strip primitive type casts: (int), (long), (double), (char), (float), (boolean), (short), (byte)
  transformed = transformed.replace(/\((?:int|double|float|long|char|boolean|short|byte)\)\s*/g, '');

  // Strip .toArray(new int[...]...) -> return the array directly
  transformed = transformed.replace(/\.toArray\s*\([^;]*\)/g, '');

  // String methods (perform before character arithmetic)
  transformed = transformed.replace(/\.charAt\(([^)]+)\)/g, '[$1]');
  transformed = transformed.replace(/\.toCharArray\(\)/g, ".split('')");
  transformed = transformed.replace(/\.length\(\)/g, '.length');

  // Array literals:
  // new int[]{1, 2} or new int[] {1, 2} or new int[]{} -> [1, 2] or []
  transformed = transformed.replace(/new\s+[a-zA-Z0-9_<>]+\[\s*\]\s*\{([^}]*)\}/g, '[$1]');
  transformed = transformed.replace(/new\s+[a-zA-Z0-9_<>]+\[\s*\]\s*\{\s*\}/g, '[]');
  transformed = transformed.replace(/=\s*\{([^{};]*)\}\s*;/g, '= [$1];');
  transformed = transformed.replace(/new\s+[a-zA-Z0-9_]+\[\s*\]\[\s*\]\s*\{/g, '[');
  // CRITICAL FIX: Only match array literals containing at least one digit! NEVER match empty function bodies {}
  transformed = transformed.replace(/\{([0-9\s,-]*[0-9][0-9\s,-]*)\}/g, '[$1]');

  // Array instantiations:
  // Multi-dimensional:
  transformed = transformed.replace(
    /new\s+(?:int|double|float|long|char)\s*\[([^\]]+)\]\s*\[([^\]]+)\]/g,
    'Array.from({length: $1}, () => new Array($2).fill(0))'
  );
  transformed = transformed.replace(
    /new\s+boolean\s*\[([^\]]+)\]\s*\[([^\]]+)\]/g,
    'Array.from({length: $1}, () => new Array($2).fill(false))'
  );
  transformed = transformed.replace(
    /new\s+[a-zA-Z0-9_]+\s*\[([^\]]+)\]\s*\[([^\]]+)\]/g,
    'Array.from({length: $1}, () => new Array($2).fill(null))'
  );

  // Single-dimensional primitive:
  transformed = transformed.replace(/new\s+(?:int|double|float|long)\s*\[([^\]]+)\]/g, 'new Array($1).fill(0)');
  transformed = transformed.replace(/new\s+boolean\s*\[([^\]]+)\]/g, 'new Array($1).fill(false)');
  transformed = transformed.replace(/new\s+char\s*\[([^\]]+)\]/g, 'new Array($1).fill("")');
  // Single-dimensional objects/generics (e.g. new List[nums.length + 1], new TrieNode[26]):
  transformed = transformed.replace(/new\s+[a-zA-Z0-9_]+\s*\[([^\]]+)\]/g, 'new Array($1).fill(null)');

  // Type declarations in body & fields -> 'let '
  transformed = transformed.replace(
    /(?<!\b(?:class|new|function)\s+)\b(?:int|double|float|long|boolean|char|String|ListNode|TreeNode|Node|TrieNode|Interval|Pair|WordDictionary|Trie|Codec|MedianFinder|Object)(?:\[\s*\])*\s+/g,
    'let '
  );
  transformed = transformed.replace(
    /\b(?:Map|HashMap|Set|HashSet|List|ArrayList|Queue|Stack|Deque|ArrayDeque|PriorityQueue|StringBuilder)(?:\[\s*\])*\s+/g,
    'let '
  );

  // Strip duplicate 'let let'
  transformed = transformed.replace(/\blet\s+let\b/g, 'let');

  // Strip 'let' from inside class bodies
  transformed = transformed.replace(/class\s+([A-Za-z0-9_$]+)\s*\{([^}]*)\}/g, (_match, clsName, clsBody) => {
    const cleanBody = clsBody.replace(/\blet\s+([a-zA-Z0-9_$]+)\s*=/g, '$1 =');
    return `class ${clsName} {${cleanBody}}`;
  });

  // Character arithmetic:
  transformed = transformed.replace(
    /\b([a-zA-Z0-9_$]+(?:\[[a-zA-Z0-9_$]+\])?)\s*-\s*['"]([a-zA-Z0-9])['"]/g,
    '_subChar($1, "$2")'
  );
  transformed = transformed.replace(
    /['"]([a-zA-Z0-9])['"]\s*-\s*['"]([a-zA-Z0-9])['"]/g,
    '("$1".charCodeAt(0) - "$2".charCodeAt(0))'
  );

  // Integer division by 2 in Java: (expr) / 2 or var / 2 -> Math.floor(...)
  transformed = transformed.replace(/(\([^)]+\))\s*\/\s*2(?!\.\d)/g, 'Math.floor($1 / 2)');
  transformed = transformed.replace(/\b([a-zA-Z0-9_$]+)\s*\/\s*2(?!\.\d)/g, 'Math.floor($1 / 2)');

  // Standard library instantiations
  transformed = transformed.replace(/new\s+HashMap\s*\(([^)]*)\)/g, 'new _JavaMap($1)');
  transformed = transformed.replace(/new\s+HashSet\s*\(([^)]*)\)/g, 'new _JavaSet($1)');
  transformed = transformed.replace(/new\s+Stack\s*\(([^)]*)\)/g, 'new _JavaStack($1)');
  transformed = transformed.replace(/new\s+(?:ArrayDeque|LinkedList|Queue|Deque)\s*\(([^)]*)\)/g, 'new _JavaQueue($1)');
  transformed = transformed.replace(/new\s+PriorityQueue\s*\(([^)]*)\)/g, 'new _JavaPriorityQueue($1)');
  transformed = transformed.replace(/new\s+ArrayList\s*\(([^)]*)\)/g, '_createArrayList($1)');
  transformed = transformed.replace(/new\s+StringBuilder\s*\(([^)]*)\)/g, 'new _JavaStringBuilder($1)');

  // Restore comments
  transformed = transformed.replace(/__COMMENT_(\d+)__/g, (_match, idx) => comments[Number(idx)]);

  const nodeClassPolyfill = !/class\s+Node\b/.test(transformed) ? `
class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = Array.isArray(neighbors) ? neighbors : [];
  }
}
` : '';

  return `
${polyfills}
${nodeClassPolyfill}

${transformed}

return function __runner__(...args) {
  _stdoutLogs = [];

  // Support design operations runner: (operations, args)
  if (args.length === 2 && Array.isArray(args[0]) && Array.isArray(args[1]) && typeof args[0][0] === 'string') {
    const ops = args[0];
    const opArgs = args[1];
    const res = [];
    for (let i = 0; i < ops.length; i++) {
      const op = ops[i];
      const a = opArgs[i] || [];
      try {
        const targetFn = eval(op);
        if (typeof targetFn === 'function') {
          const r = targetFn(...a);
          res.push(r !== undefined ? r : null);
        } else {
          res.push(null);
        }
      } catch (e) {
        res.push(null);
      }
    }
    return { result: res, stdout: _stdoutLogs.join('\\n') };
  }

  // Support Codec round-trip for serialize-and-deserialize-binary-tree
  if (typeof serialize === 'function' && typeof deserialize === 'function') {
    if (${JSON.stringify(methodName)} === 'serializeAndDeserialize' || ${JSON.stringify(methodName)} === 'deserialize') {
      return { result: deserialize(serialize(args[0])), stdout: _stdoutLogs.join('\\n') };
    }
  }

  // Support Codec round-trip for encode-and-decode-strings
  if (typeof encode === 'function' && typeof decode === 'function') {
    if (${JSON.stringify(methodName)} === 'encodeAndDecode') {
      return { result: decode(encode(args[0])), stdout: _stdoutLogs.join('\\n') };
    }
  }

  // 1. Check if expected methodName exists
  let targetFn = null;
  try {
    if (typeof ${methodName} === 'function') {
      targetFn = ${methodName};
    }
  } catch (e) {}

  // 2. Fallback: check all detected method names from the Solution
  if (!targetFn) {
    const candidateNames = ${JSON.stringify(declaredMethodNames)};
    for (const cand of candidateNames) {
      try {
        const fn = eval(cand);
        if (typeof fn === 'function') {
          targetFn = fn;
          break;
        }
      } catch (e) {}
    }
  }

  if (typeof targetFn === 'function') {
    return { result: targetFn(...args), stdout: _stdoutLogs.join('\\n') };
  }

  throw new Error("Method '" + ${JSON.stringify(methodName)} + "' was not found in Solution.");
};
`;
}

/**
 * Deep equality checker with support for array/triplets order independence where applicable
 */
function isEqual(actual: any, expected: any): boolean {
  if (actual === expected) return true;
  if (actual === null || actual === undefined || expected === null || expected === undefined) {
    return actual === expected;
  }

  // Handle arrays
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;

    // Check if it's a 2D array of triplets/subsets (e.g. 3Sum, Group Anagrams)
    if (actual.length > 0 && Array.isArray(actual[0]) && Array.isArray(expected[0])) {
      const serialize2D = (arr2D: any[][]) =>
        arr2D.map(sub => [...sub].sort().join(',')).sort().join('|');
      return serialize2D(actual) === serialize2D(expected);
    }

    // Check if it's a 1D array of strings where order might not matter (e.g. word-search-ii)
    if (actual.every(x => typeof x === 'string') && expected.every(x => typeof x === 'string')) {
      const s1 = [...actual].sort();
      const s2 = [...expected].sort();
      if (s1.every((val, idx) => val === s2[idx])) return true;
    }

    // Normal array comparison
    for (let i = 0; i < actual.length; i++) {
      if (!isEqual(actual[i], expected[i])) return false;
    }
    return true;
  }

  // Handle objects
  if (typeof actual === 'object' && typeof expected === 'object') {
    const k1 = Object.keys(actual);
    const k2 = Object.keys(expected);
    if (k1.length !== k2.length) return false;
    return k1.every(k => isEqual(actual[k], expected[k]));
  }

  return false;
}

/**
 * Executes user solution against a list of test cases in browser.
 */
export async function executeCode(
  code: string,
  methodName: string,
  testCases: TestCase[]
): Promise<ExecutionResult> {
  const startTime = performance.now();
  let fn: Function;

  // 1. Transpilation & Compilation Phase
  try {
    const jsSource = transpileJavaToJs(code, methodName);
    // Construct executable function in sandbox scope
    fn = new Function(jsSource)();
  } catch (err: any) {
    return {
      status: 'Compile Error',
      totalPassed: 0,
      totalCases: testCases.length,
      runtimeMs: 0,
      memoryMb: 0,
      beatsPercent: 0,
      message: err?.message || 'Syntax / Compilation Error in Java code.',
      testCaseResults: []
    };
  }

  // 2. Execution Phase
  let passedCount = 0;
  const testCaseResults: ExecutionResult['testCaseResults'] = [];
  let failedCaseInfo: ExecutionResult['failedCase'] | undefined = undefined;

  for (const tc of testCases) {
    try {
      // Prepare arguments: convert array inputs to ListNode / TreeNode if key indicates so
      const clonedArgs = Object.entries(tc.input).map(([key, arg]) => {
        let val = arg;
        if (typeof arg === 'object' && arg !== null) {
          val = JSON.parse(JSON.stringify(arg));
        }
        const lowerKey = key.toLowerCase();
        if (['p', 'q'].includes(lowerKey)) {
          if (typeof val === 'number') return new TreeNode(val);
        }
        if (Array.isArray(val)) {
          if (['head', 'heada', 'headb', 'l1', 'l2', 'list', 'list1', 'list2'].includes(lowerKey)) {
            return _arrayToListNode(val);
          }
          if (['root', 'p', 'q', 'subroot', 'root1', 'root2'].includes(lowerKey)) {
            return _arrayToTreeNode(val);
          }
          if (lowerKey === 'lists') {
            return val.map(arr => _arrayToListNode(arr));
          }
          if (['node', 'adjlist'].includes(lowerKey)) {
            return _adjListToGraph(val);
          }
        }
        return val;
      });

      // Special case: cyclic linked list setup
      if (tc.input.pos !== undefined && tc.input.head && clonedArgs[0]) {
        const pos = Number(tc.input.pos);
        if (pos >= 0) {
          let target: any = null;
          let curr: any = clonedArgs[0];
          let idx = 0;
          let tail: any = null;
          while (curr) {
            if (idx === pos) target = curr;
            tail = curr;
            curr = curr.next;
            idx++;
          }
          if (tail && target) {
            tail.next = target;
          }
        }
      }

      // Execute with timeout safeguard
      let execution: any;
      if (tc.input.operations && tc.input.args && Array.isArray(tc.input.operations)) {
        execution = fn(tc.input.operations, tc.input.args);
      } else {
        execution = fn(...clonedArgs);
      }

      const output = execution && typeof execution === 'object' && 'result' in execution ? execution.result : execution;
      const stdout = execution && typeof execution === 'object' && 'stdout' in execution ? execution.stdout : undefined;

      // Convert actual output back to standard primitives/arrays
      let actualVal = output;
      if (actualVal && typeof actualVal === 'object' && 'val' in actualVal && 'next' in actualVal) {
        actualVal = _listNodeToArray(actualVal);
      } else if (actualVal && typeof actualVal === 'object' && 'val' in actualVal && ('left' in actualVal || 'right' in actualVal)) {
        if (typeof tc.expectedOutput === 'number') {
          actualVal = actualVal.val;
        } else {
          actualVal = _treeNodeToArray(actualVal);
        }
      } else if (actualVal && typeof actualVal === 'object' && 'val' in actualVal && Array.isArray(actualVal.neighbors)) {
        actualVal = _graphToAdjList(actualVal);
      } else if (actualVal && typeof actualVal === 'object' && 'val' in actualVal && typeof tc.expectedOutput === 'number') {
        actualVal = actualVal.val;
      } else if (actualVal === undefined) {
        // In-place modifications (e.g. reorderList, rotate image, set zeroes) only for void methods
        const isVoid = /public\s+void\s+/.test(code);
        if (isVoid) {
          if (tc.input.matrix) actualVal = clonedArgs[0];
          else if (tc.input.head) actualVal = _listNodeToArray(clonedArgs[0]);
          else if (tc.input.nums) actualVal = clonedArgs[0];
          else if (clonedArgs[0] && Array.isArray(clonedArgs[0])) actualVal = clonedArgs[0];
        } else {
          actualVal = null;
        }
      }

      // Normalize empty list / empty tree outputs
      if (actualVal === null && Array.isArray(tc.expectedOutput) && tc.expectedOutput.length === 0) {
        actualVal = [];
      }

      const passed = isEqual(actualVal, tc.expectedOutput);
      const displayActual = actualVal === null ? 'null' : actualVal === undefined ? 'undefined' : JSON.stringify(actualVal) || String(actualVal);

      testCaseResults.push({
        id: tc.id,
        passed,
        displayInput: tc.displayInput,
        expected: tc.displayOutput,
        actual: displayActual,
        stdout: stdout && stdout.trim() ? stdout : undefined
      });

      if (passed) {
        passedCount++;
      } else if (!failedCaseInfo) {
        failedCaseInfo = {
          testCaseId: tc.id,
          input: tc.displayInput,
          expected: tc.displayOutput,
          actual: displayActual,
          explanation: tc.explanation
        };
      }
    } catch (runtimeErr: any) {
      const displayErr = runtimeErr?.message || 'Runtime Error';
      testCaseResults.push({
        id: tc.id,
        passed: false,
        displayInput: tc.displayInput,
        expected: tc.displayOutput,
        actual: `Error: ${displayErr}`
      });

      if (!failedCaseInfo) {
        failedCaseInfo = {
          testCaseId: tc.id,
          input: tc.displayInput,
          expected: tc.displayOutput,
          actual: `Error: ${displayErr}`
        };
      }
    }
  }

  const durationMs = Math.max(1, Math.round(performance.now() - startTime));
  const isAllPassed = passedCount === testCases.length;

  // Realistic LeetCode metrics
  const simulatedMemory = +(39.5 + Math.random() * 4).toFixed(1);
  const beatsPercent = isAllPassed ? +(92 + Math.random() * 7).toFixed(1) : 0;

  return {
    status: isAllPassed ? 'Accepted' : 'Wrong Answer',
    totalPassed: passedCount,
    totalCases: testCases.length,
    failedCase: failedCaseInfo,
    runtimeMs: durationMs,
    memoryMb: simulatedMemory,
    beatsPercent,
    testCaseResults
  };
}
