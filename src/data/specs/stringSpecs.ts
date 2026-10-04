import type { ProblemSpec } from '../problemTestCases';

export const stringSpecs: Record<string, ProblemSpec> = {
  'longest-repeating-character-replacement': {
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.

Return *the length of the longest substring containing the same letter you can get after performing the above operations*.`,
    methodName: 'characterReplacement',
    starterJava: `class Solution {
    public int characterReplacement(String s, int k) {
        // Sliding window maintaining frequency table and max frequency
        
    }
}`,
    constraints: [
      '1 <= s.length <= 10^5',
      's consists of only uppercase English letters.',
      '0 <= k <= s.length'
    ],
    examples: [
      {
        id: 1,
        input: { s: 'ABAB', k: 2 },
        displayInput: 's = "ABAB", k = 2',
        expectedOutput: 4,
        displayOutput: '4',
        explanation: 'Replace the two "A"s with two "B"s or vice versa.'
      },
      {
        id: 2,
        input: { s: 'AABABBA', k: 1 },
        displayInput: 's = "AABABBA", k = 1',
        expectedOutput: 4,
        displayOutput: '4',
        explanation: 'Replace the one "A" in the middle with "B" and form "AABBBBA". Substring "BBBB" has length 4.'
      }
    ],
    hiddenTestCases: []
  },

  'minimum-window-substring': {
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return *the **minimum window substring** of* \`s\` *such that every character in* \`t\` *(including duplicates) is included in the window*. If there is no such substring, return the empty string \`""\`.`,
    methodName: 'minWindow',
    starterJava: `class Solution {
    public String minWindow(String s, String t) {
        // Two-pointer sliding window tracking required character counts
        
    }
}`,
    constraints: [
      'm == s.length',
      'n == t.length',
      '1 <= m, n <= 10^5',
      's and t consist of uppercase and lowercase English letters.'
    ],
    examples: [
      {
        id: 1,
        input: { s: 'ADOBECODEBANC', t: 'ABC' },
        displayInput: 's = "ADOBECODEBANC", t = "ABC"',
        expectedOutput: 'BANC',
        displayOutput: '"BANC"',
        explanation: 'The minimum window substring "BANC" includes "A", "B", and "C" from string t.'
      },
      {
        id: 2,
        input: { s: 'a', t: 'a' },
        displayInput: 's = "a", t = "a"',
        expectedOutput: 'a',
        displayOutput: '"a"',
        explanation: 'The entire string s is the minimum window.'
      },
      {
        id: 3,
        input: { s: 'a', t: 'aa' },
        displayInput: 's = "a", t = "aa"',
        expectedOutput: '',
        displayOutput: '""',
        explanation: 'Both "a"s from t must be included in the window. Since the largest window of s only has one "a", return empty string "".'
      }
    ],
    hiddenTestCases: []
  },

  'group-anagrams': {
    description: `Given an array of strings \`strs\`, group the **anagrams** together. You can return the answer in **any order**.`,
    methodName: 'groupAnagrams',
    starterJava: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Character frequency array count representation as HashMap key
        
    }
}`,
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    examples: [
      {
        id: 1,
        input: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] },
        displayInput: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        expectedOutput: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']],
        displayOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: 'There is no string in strs that can be rearranged to form "bat". The strings "nat" and "tan" are anagrams as they can be rearranged to form each other. The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.'
      },
      {
        id: 2,
        input: { strs: [''] },
        displayInput: 'strs = [""]',
        expectedOutput: [['']],
        displayOutput: '[[""]]',
        explanation: 'The array contains an empty string, which forms its own anagram group.'
      },
      {
        id: 3,
        input: { strs: ['a'] },
        displayInput: 'strs = ["a"]',
        expectedOutput: [['a']],
        displayOutput: '[["a"]]',
        explanation: 'A single character string forms its own anagram group.'
      }
    ],
    hiddenTestCases: []
  },

  'valid-palindrome': {
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` *if it is a **palindrome**, or* \`false\` *otherwise*.`,
    methodName: 'isPalindrome',
    starterJava: `class Solution {
    public boolean isPalindrome(String s) {
        // Two pointers inward skipping non-alphanumeric characters
        
    }
}`,
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    examples: [
      {
        id: 1,
        input: { s: 'A man, a plan, a canal: Panama' },
        displayInput: 's = "A man, a plan, a canal: Panama"',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        id: 2,
        input: { s: 'race a car' },
        displayInput: 's = "race a car"',
        expectedOutput: false,
        displayOutput: 'false',
        explanation: '"raceacar" is not a palindrome.'
      },
      {
        id: 3,
        input: { s: ' ' },
        displayInput: 's = " "',
        expectedOutput: true,
        displayOutput: 'true',
        explanation: 's is an empty string "" after removing non-alphanumeric characters, which reads the same backward and forward.'
      }
    ],
    hiddenTestCases: []
  },

  'longest-palindromic-substring': {
    description: `Given a string \`s\`, return *the longest* ***palindromic substring*** *in* \`s\`.

A string is **palindromic** if it reads the same forward and backward.`,
    methodName: 'longestPalindrome',
    starterJava: `class Solution {
    public String longestPalindrome(String s) {
        // Expand around each center (odd and even)
        
    }
}`,
    constraints: [
      '1 <= s.length <= 1000',
      's consist of only digits and English letters.'
    ],
    examples: [
      {
        id: 1,
        input: { s: 'babad' },
        displayInput: 's = "babad"',
        expectedOutput: 'aba',
        displayOutput: '"aba"',
        explanation: '"bab" is also a valid answer.'
      },
      {
        id: 2,
        input: { s: 'cbbd' },
        displayInput: 's = "cbbd"',
        expectedOutput: 'bb',
        displayOutput: '"bb"',
        explanation: 'The longest palindromic substring in "cbbd" is "bb".'
      }
    ],
    hiddenTestCases: []
  },

  'palindromic-substrings': {
    description: `Given a string \`s\`, return *the number of **palindromic substrings** in it*. A string is a **palindrome** when it reads the same backward as forward.`,
    methodName: 'countSubstrings',
    starterJava: `class Solution {
    public int countSubstrings(String s) {
        // Expand around centers counting valid palindrome boundaries
        
    }
}`,
    constraints: [
      '1 <= s.length <= 1000',
      's consists of lowercase English letters.'
    ],
    examples: [
      {
        id: 1,
        input: { s: 'abc' },
        displayInput: 's = "abc"',
        expectedOutput: 3,
        displayOutput: '3',
        explanation: 'Three palindromic strings: "a", "b", "c".'
      },
      {
        id: 2,
        input: { s: 'aaa' },
        displayInput: 's = "aaa"',
        expectedOutput: 6,
        displayOutput: '6',
        explanation: 'Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".'
      }
    ],
    hiddenTestCases: []
  },

  'encode-and-decode-strings': {
    description: `Design an algorithm to encode **a list of strings** to **a single string**. The encoded string is then sent over the network and is decoded back to the original list of strings.

Please implement \`encode\` and \`decode\` methods.`,
    methodName: 'encodeAndDecode',
    starterJava: `public class Codec {
    // Encodes a list of strings to a single string: "length#string"
    public String encode(List<String> strs) {
        
    }

    // Decodes a single string to a list of strings.
    public List<String> decode(String s) {
        
    }
}`,
    constraints: [
      '1 <= strs.length <= 200',
      '0 <= strs[i].length <= 200',
      'strs[i] contains any possible characters out of 256 valid ASCII characters.'
    ],
    examples: [
      {
        id: 1,
        input: { strs: ['lint', 'code', 'love', 'you'] },
        displayInput: 'strs = ["lint","code","love","you"]',
        expectedOutput: ['lint', 'code', 'love', 'you'],
        displayOutput: '["lint","code","love","you"]',
        explanation: 'One possible encoding format prefixes each word with its length and a delimiter, e.g., "4#lint4#code4#love3#you".'
      },
      {
        id: 2,
        input: { strs: ['we', 'say', ':', 'yes'] },
        displayInput: 'strs = ["we","say",":","yes"]',
        expectedOutput: ['we', 'say', ':', 'yes'],
        displayOutput: '["we","say",":","yes"]',
        explanation: 'The delimiter handling ensures characters like ":" are safely preserved without collision.'
      }
    ],
    hiddenTestCases: []
  }
};
