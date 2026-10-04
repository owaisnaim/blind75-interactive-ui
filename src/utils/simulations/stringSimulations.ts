import type { SimFrame } from './types';

export const stringSimulations: Record<string, SimFrame[]> = {
  'longest-substring-without-repeating-characters': [
    {
      step: 1, totalSteps: 4, action: 'Init: l=0, r=0, seen={}',
      explanation: 'Initialize sliding window and character frequency set.',
      javaLine: 3, variables: { l: 0, r: 0, maxLen: 0 },
      visualType: 'sliding-window',
      visualData: { text: 'abcabcbb', left: 0, right: 0, set: [] }
    },
    {
      step: 2, totalSteps: 4, action: 'Expand Right through "abc"',
      explanation: 'No duplicates: seen={\'a\', \'b\', \'c\'}. Window length = 3.',
      javaLine: 6, variables: { l: 0, r: 2, maxLen: 3 },
      visualType: 'sliding-window',
      visualData: { text: 'abcabcbb', left: 0, right: 2, set: ['a', 'b', 'c'] }
    },
    {
      step: 3, totalSteps: 4, action: 'Duplicate "a" Encountered!',
      explanation: 'Shrink left pointer, removing \'a\'. Now valid again: seen={\'b\', \'c\', \'a\'}.',
      javaLine: 8, variables: { l: 1, r: 3, duplicate: 'a' },
      visualType: 'sliding-window',
      visualData: { text: 'abcabcbb', left: 1, right: 3, set: ['b', 'c', 'a'], duplicate: 'a' }
    },
    {
      step: 4, totalSteps: 4, action: 'Final Answer = 3 ("abc")',
      explanation: 'Longest unique substring length is 3 in O(N) time.',
      javaLine: 11, variables: { maxLen: 3, result: 3 },
      visualType: 'sliding-window',
      visualData: { text: 'abcabcbb', left: 1, right: 3, set: ['b', 'c', 'a'], solved: true }
    }
  ],

  'longest-repeating-character-replacement': [
    {
      step: 1, totalSteps: 4, action: 'Init Window: s = "ABAB", k = 2',
      explanation: 'Sliding window invariant: (windowLen - maxFreq) <= k replacements allowed.',
      javaLine: 3, variables: { l: 0, r: 0, k: 2, maxF: 0 },
      visualType: 'sliding-window',
      visualData: { text: 'ABAB', left: 0, right: 0, set: ['A'] }
    },
    {
      step: 2, totalSteps: 4, action: 'Expand Window to Index 2: "ABA"',
      explanation: 'Window len = 3, freq of A = 2. Replacements needed: 3 - 2 = 1 <= 2. Valid!',
      javaLine: 6, variables: { l: 0, r: 2, windowLen: 3, maxF: 2 },
      visualType: 'sliding-window',
      visualData: { text: 'ABAB', left: 0, right: 2, set: ['A', 'B'] }
    },
    {
      step: 3, totalSteps: 4, action: 'Expand to End: "ABAB"',
      explanation: 'Window len = 4, max freq (A or B) = 2. 4 - 2 = 2 <= 2 replacements. Max window = 4!',
      javaLine: 6, variables: { l: 0, r: 3, windowLen: 4, maxF: 2 },
      visualType: 'sliding-window',
      visualData: { text: 'ABAB', left: 0, right: 3, set: ['A', 'B'] }
    },
    {
      step: 4, totalSteps: 4, action: 'Return Longest Window Length: 4',
      explanation: 'Can replace both Bs with As (or vice versa) to get "AAAA" of length 4!',
      javaLine: 10, variables: { maxLen: 4, result: 4 },
      visualType: 'sliding-window',
      visualData: { text: 'AAAA', left: 0, right: 3, set: ['A'], solved: true }
    }
  ],

  'minimum-window-substring': [
    {
      step: 1, totalSteps: 4, action: 'Target Frequencies: t = "ABC"',
      explanation: 'Count map for t: {A:1, B:1, C:1}. Required unique char count: need = 3.',
      javaLine: 4, variables: { need: 3, have: 0 },
      visualType: 'sliding-window',
      visualData: { text: 'ADOBECODEBANC', left: 0, right: 0, set: [] }
    },
    {
      step: 2, totalSteps: 4, action: 'Expand to "ADOBEC": have == need (3)',
      explanation: 'At index 5, window contains \'A\', \'B\', \'C\'. First valid window found (len 6)!',
      javaLine: 8, variables: { l: 0, r: 5, window: 'ADOBEC', have: 3, need: 3 },
      visualType: 'sliding-window',
      visualData: { text: 'ADOBECODEBANC', left: 0, right: 5, set: ['A', 'B', 'C'] }
    },
    {
      step: 3, totalSteps: 4, action: 'Shrink & Slide: Reach "BANC"',
      explanation: 'Advance right to end, contract left from 9 to 9: substring "BANC" has length 4!',
      javaLine: 12, variables: { l: 9, r: 12, window: 'BANC', have: 3 },
      visualType: 'sliding-window',
      visualData: { text: 'ADOBECODEBANC', left: 9, right: 12, set: ['B', 'A', 'N', 'C'] }
    },
    {
      step: 4, totalSteps: 4, action: 'Return Optimal Window: "BANC"',
      explanation: 'Minimum window substring is "BANC" of length 4 found in O(N) time!',
      javaLine: 15, variables: { result: 'BANC' },
      visualType: 'sliding-window',
      visualData: { text: 'ADOBECODEBANC', left: 9, right: 12, set: ['B', 'A', 'N', 'C'], solved: true }
    }
  ],

  'valid-anagram': [
    {
      step: 1, totalSteps: 4, action: 'Compare Lengths & Init Frequency Array',
      explanation: 's = "anagram" (len 7), t = "nagaram" (len 7). Equal lengths. Allocate int[26] count array.',
      javaLine: 3, variables: { s: 'anagram', t: 'nagaram', 's.length()': 7 },
      visualType: 'frequency-map',
      visualData: {
        label: 'Character Frequencies',
        counts: { a: 0, n: 0, g: 0, r: 0, m: 0 }
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Tally s: count[c - \'a\']++',
      explanation: 'Count chars in "anagram": 3 \'a\'s, 1 \'n\', 1 \'g\', 1 \'r\', 1 \'m\'.',
      javaLine: 5, variables: { 'a': 3, 'n': 1, 'g': 1, 'r': 1, 'm': 1 },
      visualType: 'frequency-map',
      visualData: {
        label: 'Tally for s ("anagram")',
        counts: { a: 3, n: 1, g: 1, r: 1, m: 1 },
        activeChar: 'a'
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Decrement for t: count[c - \'a\']--',
      explanation: 'Subtract occurrences in "nagaram". Every single bucket cancels out to exactly 0.',
      javaLine: 7, variables: { remainingDiff: 0 },
      visualType: 'frequency-map',
      visualData: {
        label: 'Balanced to Zero',
        counts: { a: 0, n: 0, g: 0, r: 0, m: 0 }
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Verified: True Anagrams!',
      explanation: 'All 26 frequency buckets are zero. Return true in O(N) time and O(1) space.',
      javaLine: 10, variables: { result: 'true' },
      visualType: 'frequency-map',
      visualData: {
        label: 'Valid Anagram Confirmed',
        counts: { a: 0, n: 0, g: 0, r: 0, m: 0 },
        solved: true
      }
    }
  ],

  'group-anagrams': [
    {
      step: 1, totalSteps: 4, action: 'Init HashMap<String, List<String>>',
      explanation: 'Sort each word alphabetically to compute canonical signature key.',
      javaLine: 3, variables: { mapSize: 0 },
      visualType: 'frequency-map',
      visualData: {
        label: 'Grouping 6 Words',
        groups: []
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Process "eat", "tea", "ate" -> Key: "aet"',
      explanation: 'Sorting "eat" yields "aet". Map bucket "aet" receives ["eat", "tea", "ate"].',
      javaLine: 7, variables: { key: 'aet', count: 3 },
      visualType: 'frequency-map',
      visualData: {
        label: 'Bucket "aet"',
        groups: [{ key: 'aet', items: ['eat', 'tea', 'ate'] }]
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Process "tan", "nat" -> Key: "ant", "bat" -> "abt"',
      explanation: '"tan" & "nat" group into "ant"; "bat" groups into "abt".',
      javaLine: 7, variables: { totalBuckets: 3 },
      visualType: 'frequency-map',
      visualData: {
        label: '3 Unique Keys Created',
        groups: [
          { key: 'aet', items: ['eat', 'tea', 'ate'] },
          { key: 'ant', items: ['tan', 'nat'] },
          { key: 'abt', items: ['bat'] }
        ]
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Return map.values(): 3 Groups',
      explanation: 'All anagrams grouped in O(N * K log K) time!',
      javaLine: 9, variables: { result: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      visualType: 'frequency-map',
      visualData: {
        label: 'Group Anagrams Complete',
        groups: [
          { key: 'aet', items: ['eat', 'tea', 'ate'] },
          { key: 'ant', items: ['tan', 'nat'] },
          { key: 'abt', items: ['bat'] }
        ],
        solved: true
      }
    }
  ],

  'valid-parentheses': [
    {
      step: 1, totalSteps: 4, action: 'Push "(" to Stack',
      explanation: 'Opening bracket detected. Push matching closing ")" to stack.',
      javaLine: 4, variables: { char: '(', stack: "['(']" },
      visualType: 'stack-pipe',
      visualData: { stream: ['(', '{', '}', ')'], streamIndex: 0, stack: ['('] }
    },
    {
      step: 2, totalSteps: 4, action: 'Push "{" to Stack',
      explanation: 'Opening bracket detected. Stack now has 2 elements: ["(", "{"].',
      javaLine: 4, variables: { char: '{', stack: "['(', '{']" },
      visualType: 'stack-pipe',
      visualData: { stream: ['(', '{', '}', ')'], streamIndex: 1, stack: ['(', '{'] }
    },
    {
      step: 3, totalSteps: 4, action: 'Closing "}" Matches Top!',
      explanation: 'stack.pop() matches "{"! Valid LIFO pair eliminated.',
      javaLine: 8, variables: { char: '}', popped: '{', stack: "['(']" },
      visualType: 'stack-pipe',
      visualData: { stream: ['(', '{', '}', ')'], streamIndex: 2, stack: ['('], matchStatus: 'Matched {}' }
    },
    {
      step: 4, totalSteps: 4, action: 'Closing ")" Matches! Stack Empty!',
      explanation: 'All brackets paired and cancelled. stack.isEmpty() -> Valid!',
      javaLine: 12, variables: { stack: '[]', result: 'true' },
      visualType: 'stack-pipe',
      visualData: { stream: ['(', '{', '}', ')'], streamIndex: 3, stack: [], matchStatus: 'All Paired!', solved: true }
    }
  ],

  'valid-palindrome': [
    {
      step: 1, totalSteps: 4, action: 'Initialize Two Pointers: l=0, r=29',
      explanation: 's = "A man, a plan, a canal: Panama". Skip punctuation and compare alphanumeric in lowercase.',
      javaLine: 3, variables: { l: 0, r: 29 },
      visualType: 'array-pointers',
      visualData: {
        elements: ['a', 'm', 'a', 'n', 'a', 'p', 'l', 'a', 'n', 'a', 'p', 'a', 'n', 'a', 'm', 'a'],
        pointers: [{ name: 'L', index: 0 }, { name: 'R', index: 15 }]
      }
    },
    {
      step: 2, totalSteps: 4, action: 'Compare Ends: \'a\' == \'a\'',
      explanation: 'First and last alphanumeric characters match! Advance: l++, r--.',
      javaLine: 6, variables: { 's[l]': 'a', 's[r]': 'a' },
      visualType: 'array-pointers',
      visualData: {
        elements: ['a', 'm', 'a', 'n', 'a', 'p', 'l', 'a', 'n', 'a', 'p', 'a', 'n', 'a', 'm', 'a'],
        pointers: [{ name: 'L', index: 1 }, { name: 'R', index: 14 }],
        highlightIndices: [0, 15]
      }
    },
    {
      step: 3, totalSteps: 4, action: 'Compare Inner: \'m\' == \'m\', \'p\' == \'p\'',
      explanation: 'Symmetric inward matching maintains palindrome invariant.',
      javaLine: 6, variables: { 's[l]': 'p', 's[r]': 'p' },
      visualType: 'array-pointers',
      visualData: {
        elements: ['a', 'm', 'a', 'n', 'a', 'p', 'l', 'a', 'n', 'a', 'p', 'a', 'n', 'a', 'm', 'a'],
        pointers: [{ name: 'L', index: 5 }, { name: 'R', index: 10 }],
        highlightIndices: [1, 5, 10, 14]
      }
    },
    {
      step: 4, totalSteps: 4, action: 'Pointers Cross: Valid Palindrome!',
      explanation: 'All characters mirrored perfectly. Return true in O(N) time and O(1) space.',
      javaLine: 9, variables: { result: 'true' },
      visualType: 'array-pointers',
      visualData: {
        elements: ['a', 'm', 'a', 'n', 'a', 'p', 'l', 'a', 'n', 'a', 'p', 'a', 'n', 'a', 'm', 'a'],
        pointers: [{ name: '✓', index: 7 }, { name: '✓', index: 8 }],
        solved: true
      }
    }
  ],

  'longest-palindromic-substring': [
    {
      step: 1, totalSteps: 4, action: 'Expand Around Center: s = "babad"',
      explanation: 'Every character and inter-character gap is a potential palindrome center.',
      javaLine: 3, variables: { s: 'babad', maxLen: 1 },
      visualType: 'sliding-window',
      visualData: { text: 'babad', left: 0, right: 0, set: ['b'] }
    },
    {
      step: 2, totalSteps: 4, action: 'Center at Index 1 (\'a\'): Expand',
      explanation: 's[0] == s[2] (\'b\' == \'b\'). Substring "bab" has length 3.',
      javaLine: 6, variables: { center: 1, len: 3, sub: 'bab' },
      visualType: 'sliding-window',
      visualData: { text: 'babad', left: 0, right: 2, set: ['b', 'a'] }
    },
    {
      step: 3, totalSteps: 4, action: 'Center at Index 2 (\'b\'): Substring "aba"',
      explanation: 's[1] == s[3] (\'a\' == \'a\'). Substring "aba" has length 3.',
      javaLine: 6, variables: { center: 2, len: 3, sub: 'aba' },
      visualType: 'sliding-window',
      visualData: { text: 'babad', left: 1, right: 3, set: ['a', 'b'] }
    },
    {
      step: 4, totalSteps: 4, action: 'Return Longest Palindrome: "bab"',
      explanation: 'Found in O(N^2) time and O(1) space with 2N - 1 center expansions!',
      javaLine: 9, variables: { result: 'bab' },
      visualType: 'sliding-window',
      visualData: { text: 'babad', left: 0, right: 2, set: ['b', 'a'], solved: true }
    }
  ],

  'palindromic-substrings': [
    {
      step: 1, totalSteps: 4, action: 'Input s = "aaa"',
      explanation: 'Count all palindromic substrings by expanding around every single and double center.',
      javaLine: 3, variables: { count: 0, len: 3 },
      visualType: 'sliding-window',
      visualData: { text: 'aaa', left: 0, right: 0, set: ['a'] }
    },
    {
      step: 2, totalSteps: 4, action: 'Single-Character Centers: 3 Palindromes',
      explanation: '"a" at 0, "a" at 1, "a" at 2 are all palindromes. count = 3.',
      javaLine: 5, variables: { count: 3 },
      visualType: 'sliding-window',
      visualData: { text: 'aaa', left: 0, right: 0, set: ['a'] }
    },
    {
      step: 3, totalSteps: 4, action: 'Two-Character Centers: 2 Palindromes',
      explanation: '"aa" at (0, 1) and "aa" at (1, 2) are palindromes. count = 5.',
      javaLine: 7, variables: { count: 5 },
      visualType: 'sliding-window',
      visualData: { text: 'aaa', left: 0, right: 1, set: ['a'] }
    },
    {
      step: 4, totalSteps: 4, action: 'Triple Center: "aaa" -> Total = 6',
      explanation: 'Entire string "aaa" is a palindrome. Total count = 3 + 2 + 1 = 6 palindromes!',
      javaLine: 9, variables: { result: 6 },
      visualType: 'sliding-window',
      visualData: { text: 'aaa', left: 0, right: 2, set: ['a'], solved: true }
    }
  ],

  'encode-and-decode-strings': [
    {
      step: 1, totalSteps: 4, action: 'Encode ["neet", "code"] with Length Delimiter',
      explanation: 'Format: length + "#" + word. "neet" -> "4#neet", "code" -> "4#code".',
      javaLine: 3, variables: { 'strs[0]': 'neet', 'strs[1]': 'code' },
      visualType: 'sliding-window',
      visualData: { text: '4#neet4#code', left: 0, right: 5, set: ['n', 'e', 't'] }
    },
    {
      step: 2, totalSteps: 4, action: 'Encoded Stream: "4#neet4#code"',
      explanation: 'Length prefix guarantees stateless unambiguous parsing even if words contain # or symbols.',
      javaLine: 6, variables: { encoded: '4#neet4#code' },
      visualType: 'sliding-window',
      visualData: { text: '4#neet4#code', left: 0, right: 11, set: ['4', '#'] }
    },
    {
      step: 3, totalSteps: 4, action: 'Decode: Read Length 4 -> Slice "neet"',
      explanation: 'Read number before # (4), extract next 4 chars -> "neet". Advance pointer past word.',
      javaLine: 10, variables: { length: 4, word: 'neet' },
      visualType: 'sliding-window',
      visualData: { text: '4#neet4#code', left: 2, right: 5, set: ['n', 'e', 't'] }
    },
    {
      step: 4, totalSteps: 4, action: 'Read Length 4 -> Slice "code": Restored!',
      explanation: 'List restored perfectly: ["neet", "code"] in O(N) time without delimiter collisions!',
      javaLine: 14, variables: { result: '["neet", "code"]' },
      visualType: 'sliding-window',
      visualData: { text: '4#neet4#code', left: 8, right: 11, set: ['c', 'o', 'd', 'e'], solved: true }
    }
  ]
};
