export interface Problem {
  id: string;
  number: number;
  title: string;
  category: 'Arrays' | 'Binary' | 'Dynamic Programming' | 'Graph' | 'Interval' | 'Linked List' | 'Matrix' | 'String' | 'Tree' | 'Heap';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  leetcodeUrl: string;
  youtubeUrl: string;
  youtubeId: string;
  pattern: string;
  hook: string;
  flow: string[];
  pitfall: string;
  complexity: {
    time: string;
    space: string;
  };
  starterCode?: string;
  xp: number;
}

export const CATEGORIES_CONFIG = {
  'Arrays': {
    realm: 'Arrays & Two Pointers',
    color: 'bg-blue-600',
    borderColor: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    icon: 'Layers',
    description: 'Master sliding windows, two pointers, prefix sums, and binary inflection points.'
  },
  'Binary': {
    realm: 'Bit Manipulation',
    color: 'bg-amber-600',
    borderColor: 'border-yellow-500/30',
    badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    icon: 'Cpu',
    description: 'Harness bitwise XOR, masks, and shifts to calculate at hardware speeds.'
  },
  'Dynamic Programming': {
    realm: 'Dynamic Programming',
    color: 'bg-purple-600',
    borderColor: 'border-purple-500/30',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    icon: 'Sparkles',
    description: 'Break complex problems into cached subproblems and recursive decision trees.'
  },
  'Graph': {
    realm: 'Graphs & Traversal',
    color: 'bg-emerald-600',
    borderColor: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: 'Network',
    description: 'Navigate topological sorts, cycle detection, connected components, and flood fills.'
  },
  'Interval': {
    realm: 'Intervals & Scheduling',
    color: 'bg-orange-600',
    borderColor: 'border-rose-500/30',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    icon: 'Clock',
    description: 'Sort time intervals, detect overlaps, and sweep across chronological events.'
  },
  'Linked List': {
    realm: 'Linked Lists',
    color: 'bg-indigo-600',
    borderColor: 'border-indigo-500/30',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    icon: 'GitCommit',
    description: 'Perform pointer manipulation: reversals, fast/slow cycle detection, and dummy nodes.'
  },
  'Matrix': {
    realm: 'Matrix & 2D Arrays',
    color: 'bg-teal-600',
    borderColor: 'border-teal-500/30',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    icon: 'Grid',
    description: 'Rotate coordinate planes, spiral boundary navigation, and in-place marker tricks.'
  },
  'String': {
    realm: 'Strings & Substrings',
    color: 'bg-fuchsia-600',
    borderColor: 'border-fuchsia-500/30',
    badgeBg: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
    icon: 'Terminal',
    description: 'Sliding window string bounds, frequency arrays, and expand-around-center palindromes.'
  },
  'Tree': {
    realm: 'Binary Trees & BSTs',
    color: 'bg-green-600',
    borderColor: 'border-green-500/30',
    badgeBg: 'bg-green-500/10 text-green-400 border-green-500/20',
    icon: 'GitBranch',
    description: 'Binary trees, BST invariants, trie prefix lookups, and recursive serialization.'
  },
  'Heap': {
    realm: 'Heaps & Priority Queues',
    color: 'bg-rose-600',
    borderColor: 'border-red-500/30',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    icon: 'ShieldAlert',
    description: 'Dual-heap balance, frontier maintenance, and streaming median calculations.'
  }
} as const;

export const PROBLEMS_DATA: Problem[] = [
  // --- ARRAYS (10) ---
  {
    id: 'two-sum',
    number: 1,
    title: 'Two Sum',
    category: 'Arrays',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    youtubeUrl: 'https://youtu.be/KLlXCFG5TnA',
    youtubeId: 'KLlXCFG5TnA',
    pattern: 'Hash Map Difference',
    hook: 'Lookup complement (target - n) in hash map; if present, return pair indices in O(1).',
    flow: [
      'Initialize an empty hashmap: num -> index.',
      'Iterate through array with index i and value n.',
      'Check if complement (target - n) exists in map. If yes, return [map[diff], i].',
      'Otherwise, store n in map and continue.'
    ],
    pitfall: 'Using the same element twice. Store into map AFTER checking complement!',
    complexity: { time: 'O(N)', space: 'O(N)' },
    starterCode: `def twoSum(nums: list[int], target: int) -> list[int]:
    prevMap = {} # val -> index
    for i, n in enumerate(nums):
        diff = target - n
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[n] = i
    return []`,
    xp: 50
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    number: 2,
    title: 'Best Time to Buy and Sell Stock',
    category: 'Arrays',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    youtubeUrl: 'https://youtu.be/1pkOgXD63yU',
    youtubeId: '1pkOgXD63yU',
    pattern: 'Two Pointers / Sliding Window',
    hook: 'Buy at the deepest historical valley; sell whenever you hit a fresh peak.',
    flow: [
      'Keep left pointer at buy day (0), right pointer scanning sell day (1).',
      'If prices[right] > prices[left], calculate profit and update max_profit.',
      'If prices[right] < prices[left], we found a new cheaper buy day! Slide left = right.',
      'Increment right until end of array.'
    ],
    pitfall: 'Selling before buying. Ensure left < right always.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def maxProfit(prices: list[int]) -> int:
    l, r = 0, 1 # l=buy, r=sell
    maxP = 0
    while r < len(prices):
        if prices[l] < prices[r]:
            profit = prices[r] - prices[l]
            maxP = max(maxP, profit)
        else:
            l = r
        r += 1
    return maxP`,
    xp: 50
  },
  {
    id: 'contains-duplicate',
    number: 3,
    title: 'Contains Duplicate',
    category: 'Arrays',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    youtubeUrl: 'https://youtu.be/3OamzN90kPg',
    youtubeId: '3OamzN90kPg',
    pattern: 'Hash Set Lookup',
    hook: 'Maintain a hash set of visited elements; return true immediately upon finding an existing value.',
    flow: [
      'Create an empty HashSet.',
      'Iterate through every number in nums.',
      'If number already exists in set, immediately return True.',
      'Add number to set. If loop finishes without dupes, return False.'
    ],
    pitfall: 'Sorting takes O(N log N). A HashSet achieves O(N) linear speed!',
    complexity: { time: 'O(N)', space: 'O(N)' },
    starterCode: `def containsDuplicate(nums: list[int]) -> bool:
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False`,
    xp: 50
  },
  {
    id: 'product-of-array-except-self',
    number: 4,
    title: 'Product of Array Except Self',
    category: 'Arrays',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    youtubeUrl: 'https://youtu.be/bNvIQI2wAjk',
    youtubeId: 'bNvIQI2wAjk',
    pattern: 'Prefix & Postfix Accumulator',
    hook: 'Multiply all elements to your left, then multiply all elements to your right. Zero division forbidden!',
    flow: [
      'Create output array res initialized to 1s.',
      'Forward pass: track prefix product, setting res[i] = prefix, then prefix *= nums[i].',
      'Backward pass: track postfix product, res[i] *= postfix, then postfix *= nums[i].',
      'Return res without using division operator.'
    ],
    pitfall: 'Using division fails completely when array contains 0.',
    complexity: { time: 'O(N)', space: 'O(1) extra' },
    starterCode: `def productExceptSelf(nums: list[int]) -> list[int]:
    res = [1] * len(nums)
    prefix = 1
    for i in range(len(nums)):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(len(nums) - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
    return res`,
    xp: 100
  },
  {
    id: 'maximum-subarray',
    number: 5,
    title: 'Maximum Subarray (Kadane’s Algorithm)',
    category: 'Arrays',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
    youtubeUrl: 'https://youtu.be/5WZl3MMT0Eg',
    youtubeId: '5WZl3MMT0Eg',
    pattern: 'Kadane’s Greedy Reset',
    hook: 'If your baggage (current sum) becomes negative, toss it into the garbage and start clean.',
    flow: [
      'Initialize maxSub = nums[0], curSum = 0.',
      'Iterate through every num n in nums.',
      'If curSum < 0, reset curSum = 0 (negative prefixes only drag down future totals).',
      'curSum += n; update maxSub = max(maxSub, curSum).'
    ],
    pitfall: 'Initializing maxSub to 0 fails if all numbers are negative! Initialize to nums[0].',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def maxSubArray(nums: list[int]) -> int:
    maxSub = nums[0]
    curSum = 0
    for n in nums:
        if curSum < 0:
            curSum = 0
        curSum += n
        maxSub = max(maxSub, curSum)
    return maxSub`,
    xp: 100
  },
  {
    id: 'maximum-product-subarray',
    number: 6,
    title: 'Maximum Product Subarray',
    category: 'Arrays',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/',
    youtubeUrl: 'https://youtu.be/lXVy6YWFcRM',
    youtubeId: 'lXVy6YWFcRM',
    pattern: 'Dual Extrema Tracking',
    hook: 'Two negatives make a giant positive! Keep both current min and current max alive at all times.',
    flow: [
      'Track curMax = 1, curMin = 1, and res = max(nums).',
      'For each num: if num == 0, reset curMax = curMin = 1.',
      'Calculate temp = curMax * n; then curMax = max(temp, n * curMin, n).',
      'curMin = min(temp, n * curMin, n); res = max(res, curMax).'
    ],
    pitfall: 'Forgetting that curMax gets overwritten before curMin is computed! Use a temporary variable.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def maxProduct(nums: list[int]) -> int:
    res = max(nums)
    curMin, curMax = 1, 1
    for n in nums:
        if n == 0:
            curMin, curMax = 1, 1
            continue
        tmp = curMax * n
        curMax = max(n * curMax, n * curMin, n)
        curMin = min(tmp, n * curMin, n)
        res = max(res, curMax)
    return res`,
    xp: 100
  },
  {
    id: 'find-minimum-in-rotated-sorted-array',
    number: 7,
    title: 'Find Minimum in Rotated Sorted Array',
    category: 'Arrays',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    youtubeUrl: 'https://youtu.be/nIVW4P8b1VA',
    youtubeId: 'nIVW4P8b1VA',
    pattern: 'Modified Binary Search',
    hook: 'The inflection cliff is where the drop happens. If mid >= left, search the right half!',
    flow: [
      'Binary search with left l and right r.',
      'If nums[l] < nums[r], subarray is already sorted, min is nums[l].',
      'Calculate mid. If nums[mid] >= nums[l], the pivot must be to the right: l = mid + 1.',
      'Otherwise, the pivot is to the left or at mid: r = mid.'
    ],
    pitfall: 'Comparing mid with left vs comparing with right. Maintain res = min(res, nums[mid]).',
    complexity: { time: 'O(log N)', space: 'O(1)' },
    starterCode: `def findMin(nums: list[int]) -> int:
    res = nums[0]
    l, r = 0, len(nums) - 1
    while l <= r:
        if nums[l] < nums[r]:
            res = min(res, nums[l])
            break
        m = (l + r) // 2
        res = min(res, nums[m])
        if nums[m] >= nums[l]:
            l = m + 1
        else:
            r = m - 1
    return res`,
    xp: 100
  },
  {
    id: 'search-in-rotated-sorted-array',
    number: 8,
    title: 'Search in Rotated Sorted Array',
    category: 'Arrays',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    youtubeUrl: 'https://youtu.be/U8XENwh8Oy8',
    youtubeId: 'U8XENwh8Oy8',
    pattern: 'Binary Search (Half-Sorted Check)',
    hook: 'One half is ALWAYS strictly ordered. Determine which half is normal, then check if target is inside.',
    flow: [
      'Standard binary search loop l <= r, calculate mid.',
      'If nums[mid] == target, return mid.',
      'Check if left half is sorted (nums[l] <= nums[mid]): if target is between nums[l] and nums[mid], search left (r = mid - 1); else search right.',
      'If right half is sorted: if target is between nums[mid] and nums[r], search right (l = mid + 1); else search left.'
    ],
    pitfall: 'Check <= on boundaries carefully (nums[l] <= target < nums[mid]).',
    complexity: { time: 'O(log N)', space: 'O(1)' },
    starterCode: `def search(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target:
            return m
        # Left sorted portion
        if nums[l] <= nums[m]:
            if target > nums[m] or target < nums[l]:
                l = m + 1
            else:
                r = m - 1
        # Right sorted portion
        else:
            if target < nums[m] or target > nums[r]:
                r = m - 1
            else:
                l = m + 1
    return -1`,
    xp: 100
  },
  {
    id: '3sum',
    number: 9,
    title: '3Sum',
    category: 'Arrays',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    youtubeUrl: 'https://youtu.be/jzZsG8n2R9A',
    youtubeId: 'jzZsG8n2R9A',
    pattern: 'Sort + Two Pointers',
    hook: 'Sort first! Fix one pivot a, then use two pointers left & right to solve Two Sum II for -a.',
    flow: [
      'Sort nums in ascending order.',
      'Loop i through nums. If nums[i] > 0, stop (cannot sum to 0 with positives). Skip duplicates (nums[i] == nums[i-1]).',
      'Set l = i + 1, r = len(nums) - 1.',
      'If sum == 0: record triplet, increment l skipping duplicates. If sum < 0: l++. If sum > 0: r--.'
    ],
    pitfall: 'Duplicate triplets! You must advance pointers while nums[l] == nums[l-1] after a hit.',
    complexity: { time: 'O(N^2)', space: 'O(1) or O(N) for sort' },
    starterCode: `def threeSum(nums: list[int]) -> list[list[int]]:
    res = []
    nums.sort()
    for i, a in enumerate(nums):
        if a > 0:
            break
        if i > 0 and a == nums[i - 1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            threeSum = a + nums[l] + nums[r]
            if threeSum > 0:
                r -= 1
            elif threeSum < 0:
                l += 1
            else:
                res.append([a, nums[l], nums[r]])
                l += 1
                r -= 1
                while nums[l] == nums[l - 1] and l < r:
                    l += 1
    return res`,
    xp: 100
  },
  {
    id: 'container-with-most-water',
    number: 10,
    title: 'Container With Most Water',
    category: 'Arrays',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
    youtubeUrl: 'https://youtu.be/UuiTKBwPgAo',
    youtubeId: 'UuiTKBwPgAo',
    pattern: 'Greedy Two Pointers',
    hook: 'Water height is throttled by the shorter wall. Moving the taller wall never helps—move the runt!',
    flow: [
      'Place left at 0, right at len(height) - 1.',
      'Calculate area = min(height[l], height[r]) * (r - l); update max_area.',
      'If height[l] < height[r], increment l.',
      'Else decrement r. Continue until l and r meet.'
    ],
    pitfall: 'Thinking width matters more than height. Shifting the shorter bar is the only chance to find a taller bottleneck.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def maxArea(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    res = 0
    while l < r:
        area = min(height[l], height[r]) * (r - l)
        res = max(res, area)
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return res`,
    xp: 100
  },

  // --- BINARY / BITS (5) ---
  {
    id: 'sum-of-two-integers',
    number: 11,
    title: 'Sum of Two Integers',
    category: 'Binary',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/',
    youtubeUrl: 'https://youtu.be/gVUrDV4tZfY',
    youtubeId: 'gVUrDV4tZfY',
    pattern: 'Bitwise Half-Adder',
    hook: 'XOR adds without carry; AND shifted left by 1 generates the carry. Repeat until carry is dead!',
    flow: [
      'Loop while carry b != 0.',
      'Calculate carry = (a & b) << 1.',
      'Calculate sum without carry = a ^ b.',
      'Update a = sum, b = carry (with 32-bit mask for Python overflow).'
    ],
    pitfall: 'Python integers have infinite bit precision; use 0xffffffff mask to emulate 32-bit signed integers.',
    complexity: { time: 'O(1)', space: 'O(1)' },
    starterCode: `def getSum(a: int, b: int) -> int:
    mask = 0xffffffff
    while (b & mask) > 0:
        carry = (a & b) << 1
        a = (a ^ b)
        b = carry
    return (a & mask) if b > 0 else a`,
    xp: 100
  },
  {
    id: 'number-of-1-bits',
    number: 12,
    title: 'Number of 1 Bits (Hamming Weight)',
    category: 'Binary',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/',
    youtubeUrl: 'https://youtu.be/5Km3utixwZs',
    youtubeId: '5Km3utixwZs',
    pattern: 'Brian Kernighan’s Bit-Drop',
    hook: 'n & (n - 1) clears the lowest set bit in O(1) time without looping all 32 bits.',
    flow: [
      'Initialize count = 0.',
      'While n != 0: perform n = n & (n - 1).',
      'Increment count on each step.',
      'Return count (runs in O(number of set bits), not 32 iterations).'
    ],
    pitfall: 'Checking n % 2 is slower because it always takes 32 cycles. Kernighan’s is direct.',
    complexity: { time: 'O(1) [<= 32]', space: 'O(1)' },
    starterCode: `def hammingWeight(n: int) -> int:
    res = 0
    while n:
        n &= n - 1
        res += 1
    return res`,
    xp: 50
  },
  {
    id: 'counting-bits',
    number: 13,
    title: 'Counting Bits',
    category: 'Binary',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/counting-bits/',
    youtubeUrl: 'https://youtu.be/RyBM56RIWrM',
    youtubeId: 'RyBM56RIWrM',
    pattern: 'Bit DP (Offset / Shift)',
    hook: 'A number has the same set bits as (num >> 1) plus its last bit (num & 1).',
    flow: [
      'Initialize dp array of size n + 1 with 0s.',
      'Loop i from 1 to n.',
      'dp[i] = dp[i >> 1] + (i & 1).',
      'Return dp array.'
    ],
    pitfall: 'Recalculating bits from scratch for each number leads to O(N log N). DP does it in O(N).',
    complexity: { time: 'O(N)', space: 'O(N)' },
    starterCode: `def countBits(n: int) -> list[int]:
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,
    xp: 50
  },
  {
    id: 'missing-number',
    number: 14,
    title: 'Missing Number',
    category: 'Binary',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/missing-number/',
    youtubeUrl: 'https://youtu.be/WnPLSRLSANE',
    youtubeId: 'WnPLSRLSANE',
    pattern: 'XOR Cancellation / Gauss Sum',
    hook: 'XOR any number with itself and it vanishes (x ^ x = 0). The lone survivor is the missing one!',
    flow: [
      'Initialize res = len(nums).',
      'For each index i and value n: res ^= i ^ n.',
      'All matched numbers cancel out to 0.',
      'Return res.'
    ],
    pitfall: 'Gauss sum n*(n+1)//2 works too, but can overflow in other languages like C++/Java with large N.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def missingNumber(nums: list[int]) -> int:
    res = len(nums)
    for i in range(len(nums)):
        res += (i - nums[i])
    return res`,
    xp: 50
  },
  {
    id: 'reverse-bits',
    number: 15,
    title: 'Reverse Bits',
    category: 'Binary',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/',
    youtubeUrl: 'https://youtu.be/UcoN6UjAI64',
    youtubeId: 'UcoN6UjAI64',
    pattern: 'Bit Extraction & Shift',
    hook: 'Extract the rightmost bit of n, push it into the leftmost slot of your result, repeat 32 times.',
    flow: [
      'Initialize res = 0.',
      'Loop 32 times (i from 0 to 31).',
      'bit = (n >> i) & 1.',
      'res = res | (bit << (31 - i)).',
      'Return res.'
    ],
    pitfall: 'Looping only until n is 0. You must process all 32 bits including leading zeroes!',
    complexity: { time: 'O(1)', space: 'O(1)' },
    starterCode: `def reverseBits(n: int) -> int:
    res = 0
    for i in range(32):
        bit = (n >> i) & 1
        res |= (bit << (31 - i))
    return res`,
    xp: 50
  },

  // --- DYNAMIC PROGRAMMING (11) ---
  {
    id: 'climbing-stairs',
    number: 16,
    title: 'Climbing Stairs',
    category: 'Dynamic Programming',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    youtubeUrl: 'https://youtu.be/Y0lT9Fck7qI',
    youtubeId: 'Y0lT9Fck7qI',
    pattern: 'Fibonacci State Compression',
    hook: 'To step on stair N, you had to jump from N-1 or N-2. Ways(N) = Ways(N-1) + Ways(N-2).',
    flow: [
      'Initialize one = 1, two = 1 (representing steps from the top).',
      'Loop n - 1 times.',
      'temp = one; one = one + two; two = temp.',
      'Return one.'
    ],
    pitfall: 'Unmemoized recursion is O(2^N). Storing just 2 variables is O(N) time and O(1) space.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def climbStairs(n: int) -> int:
    one, two = 1, 1
    for _ in range(n - 1):
        temp = one
        one = one + two
        two = temp
    return one`,
    xp: 50
  },
  {
    id: 'coin-change',
    number: 17,
    title: 'Coin Change',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/coin-change/',
    youtubeUrl: 'https://youtu.be/H9bfqozjoqs',
    youtubeId: 'H9bfqozjoqs',
    pattern: 'Bottom-Up DP (Unbounded Knapsack)',
    hook: 'Calculate min coins for every pocket amount from 1 up to Target. dp[amount] = 1 + dp[amount - coin].',
    flow: [
      'Create dp array of size amount + 1 filled with amount + 1 (infinity sentinel). Set dp[0] = 0.',
      'Loop a from 1 to amount.',
      'For each coin c in coins: if a - c >= 0, dp[a] = min(dp[a], 1 + dp[a - c]).',
      'Return dp[amount] if != amount + 1 else -1.'
    ],
    pitfall: 'Greedy choice fails! (e.g. coins [1, 3, 4, 5], amount 7: greedy takes 5+1+1=3 coins, but 4+3=2 coins).',
    complexity: { time: 'O(amount * len(coins))', space: 'O(amount)' },
    starterCode: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != amount + 1 else -1`,
    xp: 100
  },
  {
    id: 'longest-increasing-subsequence',
    number: 18,
    title: 'Longest Increasing Subsequence',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    youtubeUrl: 'https://youtu.be/cjWnW0hdF1Y',
    youtubeId: 'cjWnW0hdF1Y',
    pattern: 'DP / Patience Sorting Binary Search',
    hook: 'Every number asks all smaller numbers before it: "What was your best streak? Add 1 to it!"',
    flow: [
      'Initialize LIS array of 1s of length len(nums).',
      'Iterate i backwards from len(nums) - 1 down to 0.',
      'Iterate j from i + 1 to len(nums). If nums[i] < nums[j], LIS[i] = max(LIS[i], 1 + LIS[j]).',
      'Return max(LIS).'
    ],
    pitfall: 'Subsequence is not substring! Elements do not need to be contiguous.',
    complexity: { time: 'O(N^2) or O(N log N) with bisect', space: 'O(N)' },
    starterCode: `def lengthOfLIS(nums: list[int]) -> int:
    LIS = [1] * len(nums)
    for i in range(len(nums) - 1, -1, -1):
        for j in range(i + 1, len(nums)):
            if nums[i] < nums[j]:
                LIS[i] = max(LIS[i], 1 + LIS[j])
    return max(LIS)`,
    xp: 100
  },
  {
    id: 'longest-common-subsequence',
    number: 19,
    title: 'Longest Common Subsequence',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
    youtubeUrl: 'https://youtu.be/Ua0GhsJSlWM',
    youtubeId: 'Ua0GhsJSlWM',
    pattern: '2D Grid DP',
    hook: 'If characters match, move diagonally (+1). If they differ, choose the max of skipping left or skipping up.',
    flow: [
      'Create 2D grid dp of (len(text1) + 1) x (len(text2) + 1) filled with 0s.',
      'Iterate bottom-up from end to start.',
      'If text1[i] == text2[j], dp[i][j] = 1 + dp[i+1][j+1].',
      'Else dp[i][j] = max(dp[i+1][j], dp[i][j+1]). Return dp[0][0].'
    ],
    pitfall: 'Forget padding the grid with an extra row & col for clean base cases (0s).',
    complexity: { time: 'O(M * N)', space: 'O(M * N)' },
    starterCode: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    dp = [[0 for _ in range(len(text2) + 1)] for _ in range(len(text1) + 1)]
    for i in range(len(text1) - 1, -1, -1):
        for j in range(len(text2) - 1, -1, -1):
            if text1[i] == text2[j]:
                dp[i][j] = 1 + dp[i + 1][j + 1]
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
    return dp[0][0]`,
    xp: 100
  },
  {
    id: 'word-break',
    number: 20,
    title: 'Word Break',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/word-break/',
    youtubeUrl: 'https://youtu.be/Sx9NNgInc3A',
    youtubeId: 'Sx9NNgInc3A',
    pattern: '1D Suffix / Prefix DP',
    hook: 'dp[i] is True if word starting at i matches a dictionary entry AND dp[i + len(w)] is True.',
    flow: [
      'dp array size len(s) + 1 initialized to False. Base case dp[len(s)] = True.',
      'Iterate i from len(s) - 1 down to 0.',
      'For each w in wordDict: if i + len(w) <= len(s) and s[i : i+len(w)] == w: dp[i] = dp[i + len(w)].',
      'If dp[i] is True, break inner loop early. Return dp[0].'
    ],
    pitfall: 'Greedy prefix matching gets trapped by overlapping vocabulary.',
    complexity: { time: 'O(N * M * K)', space: 'O(N)' },
    starterCode: `def wordBreak(s: str, wordDict: list[str]) -> bool:
    dp = [False] * (len(s) + 1)
    dp[len(s)] = True
    for i in range(len(s) - 1, -1, -1):
        for w in wordDict:
            if (i + len(w)) <= len(s) and s[i : i + len(w)] == w:
                dp[i] = dp[i + len(w)]
            if dp[i]:
                break
    return dp[0]`,
    xp: 100
  },
  {
    id: 'combination-sum',
    number: 21,
    title: 'Combination Sum',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum/',
    youtubeUrl: 'https://youtu.be/GBKI9VSKdGg',
    youtubeId: 'GBKI9VSKdGg',
    pattern: 'Backtracking Decision Tree',
    hook: 'At each node, binary choice: branch 1 takes the current candidate again; branch 2 skips it forever.',
    flow: [
      'Define dfs(i, cur, total).',
      'Base case: if total == target, add cur.copy() to res and return.',
      'Base case: if total > target or i >= len(candidates), return.',
      'Branch 1: cur.append(candidates[i]), dfs(i, cur, total + candidates[i]), cur.pop().',
      'Branch 2: dfs(i + 1, cur, total).'
    ],
    pitfall: 'Allowing duplicates: branch 2 must strictly advance i + 1 to prevent permutations of the same set.',
    complexity: { time: 'O(2^(target/min_val))', space: 'O(target/min_val)' },
    starterCode: `def combinationSum(candidates: list[int], target: int) -> list[list[int]]:
    res = []
    def dfs(i, cur, total):
        if total == target:
            res.append(cur.copy())
            return
        if i >= len(candidates) or total > target:
            return
        cur.append(candidates[i])
        dfs(i, cur, total + candidates[i])
        cur.pop()
        dfs(i + 1, cur, total)
    dfs(0, [], 0)
    return res`,
    xp: 100
  },
  {
    id: 'house-robber',
    number: 22,
    title: 'House Robber',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/house-robber/',
    youtubeUrl: 'https://youtu.be/73r3KWiEvyk',
    youtubeId: '73r3KWiEvyk',
    pattern: 'Rob or Skip (Two Pointers DP)',
    hook: 'At every house, choose: rob this house + two houses back, or skip this house and keep yesterday’s stash.',
    flow: [
      'Initialize rob1 = 0, rob2 = 0.',
      'For each num n in nums: temp = max(n + rob1, rob2).',
      'Shift: rob1 = rob2; rob2 = temp.',
      'Return rob2.'
    ],
    pitfall: 'Do not allocate an array: 2 variables are sufficient for O(1) space!',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def rob(nums: list[int]) -> int:
    rob1, rob2 = 0, 0
    for n in nums:
        temp = max(n + rob1, rob2)
        rob1 = rob2
        rob2 = temp
    return rob2`,
    xp: 100
  },
  {
    id: 'house-robber-ii',
    number: 23,
    title: 'House Robber II',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/',
    youtubeUrl: 'https://youtu.be/rWAJCfYYOvM',
    youtubeId: 'rWAJCfYYOvM',
    pattern: 'Circular DP Reduction',
    hook: 'Houses are in a circle! House 1 and House N are neighbors: run standard House Robber on [0..N-2] vs [1..N-1].',
    flow: [
      'Edge case: if len(nums) == 1, return nums[0].',
      'Create helper function helper(houses) that runs standard House Robber.',
      'Run helper(nums[1:]) and helper(nums[:-1]).',
      'Return max(nums[0], helper(nums[1:]), helper(nums[:-1])).'
    ],
    pitfall: 'Forgetting array of length 1 (nums[:-1] is empty). Handle len(nums) == 1 upfront.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def rob(nums: list[int]) -> int:
    def helper(arr):
        r1, r2 = 0, 0
        for n in arr:
            r1, r2 = r2, max(n + r1, r2)
        return r2
    return max(nums[0], helper(nums[1:]), helper(nums[:-1]))`,
    xp: 100
  },
  {
    id: 'decode-ways',
    number: 24,
    title: 'Decode Ways',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/decode-ways/',
    youtubeUrl: 'https://youtu.be/6aEyTjOwlJU',
    youtubeId: '6aEyTjOwlJU',
    pattern: 'Prefix State Machine',
    hook: 'Single digit decodes if != "0". Pair decodes if 10 <= two_digits <= 26.',
    flow: [
      'Initialize dp memo dictionary: dp = {len(s): 1}.',
      'Iterate backwards from len(s) - 1 to 0.',
      'If s[i] == "0", dp[i] = 0 (cannot decode zero alone).',
      'Else dp[i] = dp[i + 1]. If i + 1 < len(s) and 10 <= int(s[i:i+2]) <= 26: dp[i] += dp[i + 2].',
      'Return dp[0].'
    ],
    pitfall: 'Leading zeroes ("06") cannot decode to "F". Must check s[i] != "0".',
    complexity: { time: 'O(N)', space: 'O(1) with 2 vars, or O(N)' },
    starterCode: `def numDecodings(s: str) -> int:
    dp = {len(s): 1}
    for i in range(len(s) - 1, -1, -1):
        if s[i] == "0":
            dp[i] = 0
        else:
            dp[i] = dp[i + 1]
        if i + 1 < len(s) and (s[i] == "1" or (s[i] == "2" and s[i + 1] in "0123456")):
            dp[i] += dp[i + 2]
    return dp[0]`,
    xp: 100
  },
  {
    id: 'unique-paths',
    number: 25,
    title: 'Unique Paths',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/unique-paths/',
    youtubeUrl: 'https://youtu.be/IlEsdxuD4lY',
    youtubeId: 'IlEsdxuD4lY',
    pattern: 'Grid Combinatorics / DP',
    hook: 'Every cell’s paths = (paths from cell to the right) + (paths from cell below).',
    flow: [
      'Bottom row is all 1s (can only walk straight right).',
      'Iterate upwards through rows, row by row.',
      'For each column j: newRow[j] = newRow[j + 1] + oldRow[j].',
      'Return row[0] (or use math formula (m+n-2)! / ((m-1)!*(n-1)!)).'
    ],
    pitfall: '2D grid allocation takes O(M*N) memory. You only need a 1D row array of size N!',
    complexity: { time: 'O(M * N)', space: 'O(N)' },
    starterCode: `def uniquePaths(m: int, n: int) -> int:
    row = [1] * n
    for _ in range(m - 1):
        newRow = [1] * n
        for j in range(n - 2, -1, -1):
            newRow[j] = newRow[j + 1] + row[j]
        row = newRow
    return row[0]`,
    xp: 100
  },
  {
    id: 'jump-game',
    number: 26,
    title: 'Jump Game',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/jump-game/',
    youtubeUrl: 'https://youtu.be/Yan0cv2cLy8',
    youtubeId: 'Yan0cv2cLy8',
    pattern: 'Greedy Backtracking Goal',
    hook: 'Shift the finish line backward! If an earlier step can jump to the current goal, that step becomes the new goal.',
    flow: [
      'Set goal = len(nums) - 1.',
      'Loop i from len(nums) - 2 down to 0.',
      'If i + nums[i] >= goal, update goal = i.',
      'Return True if goal == 0 else False.'
    ],
    pitfall: 'DP works in O(N^2), but Greedy runs in blazing O(N) single pass!',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def canJump(nums: list[int]) -> bool:
    goal = len(nums) - 1
    for i in range(len(nums) - 2, -1, -1):
        if i + nums[i] >= goal:
            goal = i
    return goal == 0`,
    xp: 100
  },

  // --- GRAPH (8) ---
  {
    id: 'clone-graph',
    number: 27,
    title: 'Clone Graph',
    category: 'Graph',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',
    youtubeUrl: 'https://youtu.be/mQeF6bN8hMk',
    youtubeId: 'mQeF6bN8hMk',
    pattern: 'DFS with Hash Map Clone Map',
    hook: 'Map oldNode -> copyNode in a dictionary. Whenever you revisit a node, return its clone from the map.',
    flow: [
      'Map old_to_new = {}.',
      'dfs(node): if node in old_to_new, return old_to_new[node].',
      'copy = Node(node.val); old_to_new[node] = copy.',
      'For neighbor in node.neighbors: copy.neighbors.append(dfs(neighbor)).',
      'Return copy.'
    ],
    pitfall: 'Circular graph references cause infinite recursion without the visited hashmap check first!',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    starterCode: `def cloneGraph(node: 'Node') -> 'Node':
    oldToNew = {}
    def dfs(node):
        if not node: return None
        if node in oldToNew: return oldToNew[node]
        copy = Node(node.val)
        oldToNew[node] = copy
        for nei in node.neighbors:
            copy.neighbors.append(dfs(nei))
        return copy
    return dfs(node)`,
    xp: 100
  },
  {
    id: 'course-schedule',
    number: 28,
    title: 'Course Schedule',
    category: 'Graph',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
    youtubeUrl: 'https://youtu.be/EgI5nU9etnU',
    youtubeId: 'EgI5nU9etnU',
    pattern: 'Topological Sort / Cycle Detection',
    hook: 'A cycle in the prerequisite graph means a deadlock (Course A needs B, B needs A). Detect cycle via DFS 3-states!',
    flow: [
      'Build adjacency list: crs -> list of prereqs.',
      'Track visiting set (current DFS path).',
      'dfs(crs): if crs in visiting, cycle detected! Return False.',
      'If prereq list is empty, return True. Add crs to visiting, recurse on prereqs, remove from visiting, set prereqs to empty (memoize), return True.'
    ],
    pitfall: 'Disconnected graph components: you must loop DFS over all courses from 0 to numCourses - 1.',
    complexity: { time: 'O(V + E)', space: 'O(V + E)' },
    starterCode: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    preMap = {i: [] for i in range(numCourses)}
    for crs, pre in prerequisites:
        preMap[crs].append(pre)
    visiting = set()
    def dfs(crs):
        if crs in visiting: return False
        if preMap[crs] == []: return True
        visiting.add(crs)
        for pre in preMap[crs]:
            if not dfs(pre): return False
        visiting.remove(crs)
        preMap[crs] = []
        return True
    for c in range(numCourses):
        if not dfs(c): return False
    return True`,
    xp: 100
  },
  {
    id: 'pacific-atlantic-water-flow',
    number: 29,
    title: 'Pacific Atlantic Water Flow',
    category: 'Graph',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    youtubeUrl: 'https://youtu.be/s-VkcjHqkGI',
    youtubeId: 's-VkcjHqkGI',
    pattern: 'Reverse Flood Fill (Inward DFS)',
    hook: 'Water flows downhill to the sea; reverse it! Walk uphill from ocean borders inward and find the intersection.',
    flow: [
      'Initialize sets pac = set(), atl = set().',
      'Run DFS from top & left borders into pac; from bottom & right borders into atl.',
      'dfs(r, c, visit, prevHeight): valid if inside bounds, not in visit, and height[r][c] >= prevHeight.',
      'Return list of [r, c] present in BOTH pac and atl (pac & atl).'
    ],
    pitfall: 'Running DFS from every internal cell out to oceans causes TLE. Reverse DFS from ocean edges takes O(M*N)!',
    complexity: { time: 'O(M * N)', space: 'O(M * N)' },
    starterCode: `def pacificAtlantic(heights: list[list[int]]) -> list[list[int]]:
    ROWS, COLS = len(heights), len(heights[0])
    pac, atl = set(), set()
    def dfs(r, c, visit, prevHeight):
        if (r, c) in visit or r < 0 or c < 0 or r == ROWS or c == COLS or heights[r][c] < prevHeight:
            return
        visit.add((r, c))
        for dr, dc in [(1,0), (-1,0), (0,1), (0,-1)]:
            dfs(r + dr, c + dc, visit, heights[r][c])
    for c in range(COLS):
        dfs(0, c, pac, heights[0][c])
        dfs(ROWS - 1, c, atl, heights[ROWS - 1][c])
    for r in range(ROWS):
        dfs(r, 0, pac, heights[r][0])
        dfs(r, COLS - 1, atl, heights[r][COLS - 1])
    return list(pac & atl)`,
    xp: 100
  },
  {
    id: 'number-of-islands',
    number: 30,
    title: 'Number of Islands',
    category: 'Graph',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    youtubeUrl: 'https://youtu.be/pV2kpPD66nE',
    youtubeId: 'pV2kpPD66nE',
    pattern: 'Grid DFS / BFS (Sink the Island)',
    hook: 'When you spot land ("1"), increment island count, then sink the entire connected landmass to "0" (or mark visited).',
    flow: [
      'Loop through every cell (r, c) in grid.',
      'If grid[r][c] == "1": islands += 1, launch BFS/DFS queue.',
      'Explore 4 directional neighbors, sinking visited land cells.',
      'Return islands.'
    ],
    pitfall: 'Marking visited only when dequeuing from BFS causes duplicate queue explosions! Mark visited immediately upon enqueuing.',
    complexity: { time: 'O(M * N)', space: 'O(M * N)' },
    starterCode: `def numIslands(grid: list[list[str]]) -> int:
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    islands = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0' # sink it
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                islands += 1
    return islands`,
    xp: 100
  },
  {
    id: 'longest-consecutive-sequence',
    number: 31,
    title: 'Longest Consecutive Sequence',
    category: 'Graph',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    youtubeUrl: 'https://youtu.be/P6RZZMu_maU',
    youtubeId: 'P6RZZMu_maU',
    pattern: 'Hash Set Streak Initiation',
    hook: 'Only start counting a streak if (n - 1) is NOT in the set! That guarantees you only count from the streak head.',
    flow: [
      'Dump all numbers into a HashSet.',
      'Iterate through each num n in set.',
      'If (n - 1) not in numSet: this is the start of a streak! Check n + 1, n + 2, ... while in set.',
      'Update longest = max(longest, length). Return longest.'
    ],
    pitfall: 'Counting streaks from every number degenerates to O(N^2). The (n - 1) check enforces strict O(N).',
    complexity: { time: 'O(N)', space: 'O(N)' },
    starterCode: `def longestConsecutive(nums: list[int]) -> int:
    numSet = set(nums)
    longest = 0
    for n in numSet:
        if (n - 1) not in numSet:
            length = 1
            while (n + length) in numSet:
                length += 1
            longest = max(longest, length)
    return longest`,
    xp: 100
  },
  {
    id: 'alien-dictionary',
    number: 32,
    title: 'Alien Dictionary',
    category: 'Graph',
    difficulty: 'Hard',
    leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/',
    youtubeUrl: 'https://youtu.be/6kTZYvNNyps',
    youtubeId: '6kTZYvNNyps',
    pattern: 'Topological Sort (Kahn’s / DFS Post-order)',
    hook: 'Compare adjacent words: the first differing letter gives a directed edge char1 -> char2. Then top-sort!',
    flow: [
      'Build adjacency list of all unique letters.',
      'Compare words[i] and words[i+1]: find first index where letters differ, add edge w1[j] -> w2[j].',
      'Check prefix validity (if w2 is prefix of w1 and len(w1) > len(w2), invalid order!).',
      'Run post-order DFS topological sort with cycle detection. Return reversed post-order string.'
    ],
    pitfall: 'Prefix invalidity edge case: ["abc", "ab"] is impossible in a dictionary!',
    complexity: { time: 'O(total characters)', space: 'O(unique letters)' },
    starterCode: `def alienOrder(words: list[str]) -> str:
    adj = {c: set() for w in words for c in w}
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        minLen = min(len(w1), len(w2))
        if len(w1) > len(w2) and w1[:minLen] == w2[:minLen]:
            return ""
        for j in range(minLen):
            if w1[j] != w2[j]:
                adj[w1[j]].add(w2[j])
                break
    visit = {} # False=visiting, True=visited
    res = []
    def dfs(c):
        if c in visit: return visit[c]
        visit[c] = False
        for nei in adj[c]:
            if not dfs(nei): return False
        visit[c] = True
        res.append(c)
        return True
    for c in adj:
        if not dfs(c): return ""
    res.reverse()
    return "".join(res)`,
    xp: 150
  },
  {
    id: 'graph-valid-tree',
    number: 33,
    title: 'Graph Valid Tree',
    category: 'Graph',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/',
    youtubeUrl: 'https://youtu.be/bXsUuownnoQ',
    youtubeId: 'bXsUuownnoQ',
    pattern: 'Union-Find / Cycle & Component Count',
    hook: 'A graph of N nodes is a valid tree IF AND ONLY IF it has exactly N - 1 edges and NO cycles!',
    flow: [
      'Immediate check: if len(edges) != n - 1, return False.',
      'Initialize Union-Find parent array: [0..n-1].',
      'For each edge (u, v): if find(u) == find(v), a cycle exists, return False.',
      'Union the components. If no cycle, return True.'
    ],
    pitfall: 'Forgetting disconnected components: checking edge count == n - 1 ensures connectivity once acyclic.',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    starterCode: `def validTree(n: int, edges: list[list[int]]) -> bool:
    if len(edges) != n - 1: return False
    par = [i for i in range(n)]
    def find(i):
        if par[i] == i: return i
        par[i] = find(par[i])
        return par[i]
    for n1, n2 in edges:
        p1, p2 = find(n1), find(n2)
        if p1 == p2: return False
        par[p1] = p2
    return True`,
    xp: 100
  },
  {
    id: 'number-of-connected-components',
    number: 34,
    title: 'Number of Connected Components in an Undirected Graph',
    category: 'Graph',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/',
    youtubeUrl: 'https://youtu.be/8f1XPm4WOUc',
    youtubeId: '8f1XPm4WOUc',
    pattern: 'Disjoint Set Union (Union-Find)',
    hook: 'Start with N independent islands. Every time an edge bridges two separate islands, count decreases by 1.',
    flow: [
      'Initialize count = n, parent = [0..n-1], rank = [1]*n.',
      'For each edge (u, v): find roots rootU and rootV.',
      'If rootU != rootV: link them by rank, decrement count -= 1.',
      'Return count.'
    ],
    pitfall: 'Path compression is critical to maintain near O(1) union-find operations.',
    complexity: { time: 'O(V + E * alpha(V))', space: 'O(V)' },
    starterCode: `def countComponents(n: int, edges: list[list[int]]) -> int:
    par = [i for i in range(n)]
    rank = [1] * n
    def find(n1):
        res = n1
        while res != par[res]:
            par[res] = par[par[res]]
            res = par[res]
        return res
    def union(n1, n2):
        p1, p2 = find(n1), find(n2)
        if p1 == p2: return 0
        if rank[p2] > rank[p1]: par[p1] = p2; rank[p2] += rank[p1]
        else: par[p2] = p1; rank[p1] += rank[p2]
        return 1
    res = n
    for n1, n2 in edges:
        res -= union(n1, n2)
    return res`,
    xp: 100
  },

  // --- INTERVAL (5) ---
  {
    id: 'insert-interval',
    number: 35,
    title: 'Insert Interval',
    category: 'Interval',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/insert-interval/',
    youtubeUrl: 'https://youtu.be/A8NUOmlwOlM',
    youtubeId: 'A8NUOmlwOlM',
    pattern: 'Linear Three-Phase Sweep',
    hook: 'Phase 1: Add intervals ending before new. Phase 2: Absorb overlapping intervals into new. Phase 3: Add the rest.',
    flow: [
      'Iterate through intervals with index i.',
      'If newInterval[1] < intervals[i][0]: insert newInterval and return res + intervals[i:].',
      'If newInterval[0] > intervals[i][1]: add intervals[i] to res.',
      'Else: overlap! newInterval = [min(new[0], curr[0]), max(new[1], curr[1])].',
      'Append newInterval at end if not already inserted.'
    ],
    pitfall: 'Remember that intervals are already sorted by start time: take advantage of this for O(N) single pass.',
    complexity: { time: 'O(N)', space: 'O(N)' },
    starterCode: `def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    res = []
    for i in range(len(intervals)):
        if newInterval[1] < intervals[i][0]:
            res.append(newInterval)
            return res + intervals[i:]
        elif newInterval[0] > intervals[i][1]:
            res.append(intervals[i])
        else:
            newInterval = [min(newInterval[0], intervals[i][0]), max(newInterval[1], intervals[i][1])]
    res.append(newInterval)
    return res`,
    xp: 100
  },
  {
    id: 'merge-intervals',
    number: 36,
    title: 'Merge Intervals',
    category: 'Interval',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
    youtubeUrl: 'https://youtu.be/44H3cEC2fFM',
    youtubeId: '44H3cEC2fFM',
    pattern: 'Sort & Merge Extension',
    hook: 'Sort by start time! If current start <= previous end, stretch the previous end: max(prev.end, curr.end).',
    flow: [
      'Sort intervals by start time (key=lambda x: x[0]).',
      'Initialize output = [intervals[0]].',
      'Iterate through remaining intervals [start, end].',
      'If start <= output[-1][1]: output[-1][1] = max(output[-1][1], end).',
      'Else: append [start, end] to output.'
    ],
    pitfall: 'Assuming intervals are pre-sorted. You MUST sort them first!',
    complexity: { time: 'O(N log N)', space: 'O(N)' },
    starterCode: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda i: i[0])
    output = [intervals[0]]
    for start, end in intervals[1:]:
        lastEnd = output[-1][1]
        if start <= lastEnd:
            output[-1][1] = max(lastEnd, end)
        else:
            output.append([start, end])
    return output`,
    xp: 100
  },
  {
    id: 'non-overlapping-intervals',
    number: 37,
    title: 'Non-overlapping Intervals',
    category: 'Interval',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
    youtubeUrl: 'https://youtu.be/nONCGxWoUfM',
    youtubeId: 'nONCGxWoUfM',
    pattern: 'Greedy End-Time Priority',
    hook: 'When two intervals collide, eliminate the one that extends further right to give future intervals breathing room!',
    flow: [
      'Sort intervals by start time.',
      'Track res = 0, prevEnd = intervals[0][1].',
      'For start, end in intervals[1:]: if start >= prevEnd: prevEnd = end (no overlap).',
      'Else: overlap! res += 1, prevEnd = min(end, prevEnd) (greedily keep the interval with smaller end).'
    ],
    pitfall: 'Do not remove the shorter interval; keep the one finishing earlier.',
    complexity: { time: 'O(N log N)', space: 'O(1) extra' },
    starterCode: `def eraseOverlapIntervals(intervals: list[list[int]]) -> int:
    intervals.sort()
    res = 0
    prevEnd = intervals[0][1]
    for start, end in intervals[1:]:
        if start >= prevEnd:
            prevEnd = end
        else:
            res += 1
            prevEnd = min(end, prevEnd)
    return res`,
    xp: 100
  },
  {
    id: 'meeting-rooms',
    number: 38,
    title: 'Meeting Rooms',
    category: 'Interval',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/',
    youtubeUrl: 'https://youtu.be/PaJxqZVPhbg',
    youtubeId: 'PaJxqZVPhbg',
    pattern: 'Sort & Adjacent Conflict Check',
    hook: 'Can one person attend all meetings? Sort by start time; if meeting i starts before i-1 ends, impossible!',
    flow: [
      'Sort intervals by start time.',
      'Loop i from 1 to len(intervals) - 1.',
      'If intervals[i].start < intervals[i - 1].end, return False.',
      'If loop completes with zero clashes, return True.'
    ],
    pitfall: 'Strict inequality: a meeting starting exactly when the previous ends (start == end) is allowed!',
    complexity: { time: 'O(N log N)', space: 'O(1)' },
    starterCode: `def canAttendMeetings(intervals: list[list[int]]) -> bool:
    intervals.sort(key=lambda i: i[0])
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True`,
    xp: 50
  },
  {
    id: 'meeting-rooms-ii',
    number: 39,
    title: 'Meeting Rooms II',
    category: 'Interval',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/',
    youtubeUrl: 'https://youtu.be/FdzJmTCVyJU',
    youtubeId: 'FdzJmTCVyJU',
    pattern: 'Chronological Timeline Sweep',
    hook: 'Separate start and end times into two sorted arrays. When a meeting starts, +1 room; when one ends, -1 room!',
    flow: [
      'Extract start times and end times into separate arrays and sort both.',
      'Use two pointers s, e. Track count = 0, max_count = 0.',
      'While s < len(starts): if start[s] < end[e]: count += 1, s += 1.',
      'Else: count -= 1, e += 1. max_count = max(max_count, count).'
    ],
    pitfall: 'When start[s] == end[e], the previous meeting finishes BEFORE the new one begins, so free the room first!',
    complexity: { time: 'O(N log N)', space: 'O(N)' },
    starterCode: `def minMeetingRooms(intervals: list[list[int]]) -> int:
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])
    res, count = 0, 0
    s, e = 0, 0
    while s < len(intervals):
        if starts[s] < ends[e]:
            count += 1
            s += 1
        else:
            count -= 1
            e += 1
        res = max(res, count)
    return res`,
    xp: 100
  },

  // --- LINKED LIST (6) ---
  {
    id: 'reverse-linked-list',
    number: 40,
    title: 'Reverse Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    youtubeUrl: 'https://youtu.be/G0_I-ZF0S38',
    youtubeId: 'G0_I-ZF0S38',
    pattern: '3-Pointer Dance (Prev, Curr, Next)',
    hook: 'Save next node, turn current arrow backward to prev, advance prev to curr, curr to saved next.',
    flow: [
      'Initialize prev = None, curr = head.',
      'While curr is not None:',
      'nxt = curr.next; curr.next = prev; prev = curr; curr = nxt.',
      'Return prev (the new head).'
    ],
    pitfall: 'Losing reference to curr.next before severing the link! Always save nxt first.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def reverseList(head: ListNode) -> ListNode:
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
    xp: 50
  },
  {
    id: 'linked-list-cycle',
    number: 41,
    title: 'Linked List Cycle',
    category: 'Linked List',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    youtubeUrl: 'https://youtu.be/gBTe7lFR3vc',
    youtubeId: 'gBTe7lFR3vc',
    pattern: 'Floyd’s Tortoise & Hare',
    hook: 'Two runners on a circular track must eventually collide! Slow moves 1 step, Fast moves 2 steps.',
    flow: [
      'Initialize slow = head, fast = head.',
      'While fast and fast.next are valid:',
      'slow = slow.next; fast = fast.next.next.',
      'If slow == fast: return True (cycle detected).',
      'If fast reaches None: return False.'
    ],
    pitfall: 'Checking fast.next without checking fast itself triggers NullPointerException / AttributeError.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def hasCycle(head: ListNode) -> bool:
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    xp: 50
  },
  {
    id: 'merge-two-sorted-lists',
    number: 42,
    title: 'Merge Two Sorted Lists',
    category: 'Linked List',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    youtubeUrl: 'https://youtu.be/XIdigk956u0',
    youtubeId: 'XIdigk956u0',
    pattern: 'Dummy Head Zipper',
    hook: 'Create a fictitious dummy node to avoid null head checks; stitch smaller node onto tail like a zipper.',
    flow: [
      'Create dummy = ListNode(); tail = dummy.',
      'While list1 and list2:',
      'If list1.val < list2.val: tail.next = list1; list1 = list1.next.',
      'Else: tail.next = list2; list2 = list2.next. tail = tail.next.',
      'Attach remainder: tail.next = list1 or list2. Return dummy.next.'
    ],
    pitfall: 'Forgetting to advance tail on every step.',
    complexity: { time: 'O(N + M)', space: 'O(1)' },
    starterCode: `def mergeTwoLists(list1: ListNode, list2: ListNode) -> ListNode:
    dummy = ListNode()
    tail = dummy
    while list1 and list2:
        if list1.val < list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    tail.next = list1 or list2
    return dummy.next`,
    xp: 50
  },
  {
    id: 'merge-k-sorted-lists',
    number: 43,
    title: 'Merge k Sorted Lists',
    category: 'Linked List',
    difficulty: 'Hard',
    leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    youtubeUrl: 'https://youtu.be/q5a5OiGbT6Q',
    youtubeId: 'q5a5OiGbT6Q',
    pattern: 'Divide & Conquer Pairwise Merge',
    hook: 'Merging 1-by-1 is slow (O(k*N)). Merge lists in pairs like a tournament bracket in O(N log k)!',
    flow: [
      'If not lists or len(lists) == 0, return None.',
      'While len(lists) > 1: iterate in steps of 2.',
      'Merge lists[i] and lists[i + 1] using standard mergeTwoLists.',
      'Replace lists with mergedLists array until only 1 head remains.'
    ],
    pitfall: 'Sequential merging takes O(k * N); tournament divide-and-conquer drops it to O(N log k).',
    complexity: { time: 'O(N log k)', space: 'O(1) extra' },
    starterCode: `def mergeKLists(lists: list[ListNode]) -> ListNode:
    if not lists or len(lists) == 0: return None
    while len(lists) > 1:
        mergedLists = []
        for i in range(0, len(lists), 2):
            l1 = lists[i]
            l2 = lists[i + 1] if (i + 1) < len(lists) else None
            mergedLists.append(self.mergeTwoLists(l1, l2))
        lists = mergedLists
    return lists[0]`,
    xp: 150
  },
  {
    id: 'remove-nth-node-from-end-of-list',
    number: 44,
    title: 'Remove Nth Node From End of List',
    category: 'Linked List',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    youtubeUrl: 'https://youtu.be/XVuQxVej6y8',
    youtubeId: 'XVuQxVej6y8',
    pattern: 'N-Step Offset Pointers',
    hook: 'Send the Right scout N steps ahead. When Right hits the end, Left is poised right before the node to decapitate!',
    flow: [
      'Create dummy node pointing to head; set left = dummy, right = head.',
      'Advance right n times.',
      'Advance both left and right together until right is None.',
      'Delete target: left.next = left.next.next. Return dummy.next.'
    ],
    pitfall: 'Deleting the very first node (head). The dummy node handles this seamlessly without special ifs.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def removeNthFromEnd(head: ListNode, n: int) -> ListNode:
    dummy = ListNode(0, head)
    left = dummy
    right = head
    while n > 0 and right:
        right = right.next
        n -= 1
    while right:
        left = left.next
        right = right.next
    left.next = left.next.next
    return dummy.next`,
    xp: 100
  },
  {
    id: 'reorder-list',
    number: 45,
    title: 'Reorder List',
    category: 'Linked List',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/reorder-list/',
    youtubeUrl: 'https://youtu.be/S5bfdUTrKLM',
    youtubeId: 'S5bfdUTrKLM',
    pattern: 'Find Middle + Reverse Second Half + Interweave',
    hook: 'Cut the snake in half, turn the tail backwards, and zip their ribs together one by one!',
    flow: [
      'Step 1: Find middle using slow and fast pointers. Split list into two halves.',
      'Step 2: Reverse second half (prev, curr, nxt).',
      'Step 3: Merge first half and reversed second half alternately.',
      'Modify list in-place.'
    ],
    pitfall: 'Failing to sever the middle link (slow.next = None) causes an infinite cycle.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def reorderList(head: ListNode) -> None:
    # 1. find middle
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    # 2. reverse second half
    second = slow.next
    prev = slow.next = None
    while second:
        tmp = second.next
        second.next = prev
        prev = second
        second = tmp
    # 3. merge two halves
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2`,
    xp: 100
  },

  // --- MATRIX (4) ---
  {
    id: 'set-matrix-zeroes',
    number: 46,
    title: 'Set Matrix Zeroes',
    category: 'Matrix',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/',
    youtubeUrl: 'https://youtu.be/T41rL0L3Pnw',
    youtubeId: 'T41rL0L3Pnw',
    pattern: 'In-Place First Row/Col Marker',
    hook: 'Use the top row and left column as your scratchpad! A single boolean tracks if the top-left cell zeroes row 0.',
    flow: [
      'Track rowZero = False (flags if row 0 itself needs to be zeroed).',
      'Pass 1: for each cell (r, c), if matrix[r][c] == 0: matrix[0][c] = 0; if r > 0 matrix[r][0] = 0 else rowZero = True.',
      'Pass 2: zero out interior cells (1..ROWS-1, 1..COLS-1) if matrix[0][c] == 0 or matrix[r][0] == 0.',
      'Pass 3: zero out first col if matrix[0][0] == 0; zero out first row if rowZero is True.'
    ],
    pitfall: 'Zeroing cells during the first scan overwrites existing data and turns the entire board to 0.',
    complexity: { time: 'O(M * N)', space: 'O(1)' },
    starterCode: `def setZeroes(matrix: list[list[int]]) -> None:
    ROWS, COLS = len(matrix), len(matrix[0])
    rowZero = False
    for r in range(ROWS):
        for c in range(COLS):
            if matrix[r][c] == 0:
                matrix[0][c] = 0
                if r > 0: matrix[r][0] = 0
                else: rowZero = True
    for r in range(1, ROWS):
        for c in range(1, COLS):
            if matrix[0][c] == 0 or matrix[r][0] == 0:
                matrix[r][c] = 0
    if matrix[0][0] == 0:
        for r in range(ROWS): matrix[r][0] = 0
    if rowZero:
        for c in range(COLS): matrix[0][c] = 0`,
    xp: 100
  },
  {
    id: 'spiral-matrix',
    number: 47,
    title: 'Spiral Matrix',
    category: 'Matrix',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/',
    youtubeUrl: 'https://youtu.be/BJnMZNwUk1M',
    youtubeId: 'BJnMZNwUk1M',
    pattern: '4-Boundary Contraction',
    hook: 'Walk Right (shrink top), walk Down (shrink right), walk Left (shrink bottom), walk Up (shrink left).',
    flow: [
      'Initialize left = 0, right = COLS, top = 0, bottom = ROWS.',
      'Loop while left < right and top < bottom:',
      '1. Traverse top row (left to right-1), top += 1.',
      '2. Traverse right col (top to bottom-1), right -= 1.',
      '3. If bounds crossed (left >= right or top >= bottom), break.',
      '4. Traverse bottom row (right-1 down to left), bottom -= 1. Traverse left col (bottom-1 down to top), left += 1.'
    ],
    pitfall: 'Forgetting the bounds check before the backward passes causes duplicate visits in 1xN or Nx1 matrices.',
    complexity: { time: 'O(M * N)', space: 'O(1) extra' },
    starterCode: `def spiralOrder(matrix: list[list[int]]) -> list[int]:
    res = []
    left, right = 0, len(matrix[0])
    top, bottom = 0, len(matrix)
    while left < right and top < bottom:
        for i in range(left, right): res.append(matrix[top][i])
        top += 1
        for i in range(top, bottom): res.append(matrix[i][right - 1])
        right -= 1
        if not (left < right and top < bottom): break
        for i in range(right - 1, left - 1, -1): res.append(matrix[bottom - 1][i])
        bottom -= 1
        for i in range(bottom - 1, top - 1, -1): res.append(matrix[i][left])
        left += 1
    return res`,
    xp: 100
  },
  {
    id: 'rotate-image',
    number: 48,
    title: 'Rotate Image (90° Clockwise)',
    category: 'Matrix',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/rotate-image/',
    youtubeUrl: 'https://youtu.be/fMSJSS7eO1w',
    youtubeId: 'fMSJSS7eO1w',
    pattern: 'Transpose + Reverse Rows',
    hook: 'Flip diagonally across the main axis (transpose), then mirror horizontally (reverse each row). 90° complete!',
    flow: [
      'Step 1 (Transpose): for i in 0..N, for j in i+1..N: swap matrix[i][j] with matrix[j][i].',
      'Step 2 (Reverse): for each row in matrix: reverse row in-place (two pointers left and right).',
      'Done in O(1) extra space.'
    ],
    pitfall: 'Rotating with an extra grid is forbidden by the problem statement ("modify in-place").',
    complexity: { time: 'O(N^2)', space: 'O(1)' },
    starterCode: `def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)
    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Reverse rows
    for i in range(n):
        matrix[i].reverse()`,
    xp: 100
  },
  {
    id: 'word-search',
    number: 49,
    title: 'Word Search',
    category: 'Matrix',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/word-search/',
    youtubeUrl: 'https://youtu.be/pfiQ_PS1g8E',
    youtubeId: 'pfiQ_PS1g8E',
    pattern: 'Backtracking Grid DFS',
    hook: 'Step on the letter, mark your footprint ("#"), scout 4 neighbors for word[i+1], then erase your footprint on the way out.',
    flow: [
      'Iterate through every starting cell (r, c) on board.',
      'dfs(r, c, i): if i == len(word), return True.',
      'If out of bounds or board[r][c] != word[i], return False.',
      'temp = board[r][c]; board[r][c] = "#" (mark visited).',
      'Recurse on 4 neighbors. board[r][c] = temp (backtrack!). Return True if any neighbor hit.'
    ],
    pitfall: 'Forgetting to unmark board[r][c] = temp upon return ruins subsequent exploration paths.',
    complexity: { time: 'O(M * N * 3^L)', space: 'O(L)' },
    starterCode: `def exist(board: list[list[str]], word: str) -> bool:
    ROWS, COLS = len(board), len(board[0])
    def dfs(r, c, i):
        if i == len(word): return True
        if r < 0 or c < 0 or r >= ROWS or c >= COLS or board[r][c] != word[i]:
            return False
        temp = board[r][c]
        board[r][c] = "#"
        res = (dfs(r+1, c, i+1) or dfs(r-1, c, i+1) or dfs(r, c+1, i+1) or dfs(r, c-1, i+1))
        board[r][c] = temp
        return res
    for r in range(ROWS):
        for c in range(COLS):
            if dfs(r, c, 0): return True
    return False`,
    xp: 100
  },

  // --- STRING (10) ---
  {
    id: 'longest-substring-without-repeating-characters',
    number: 50,
    title: 'Longest Substring Without Repeating Characters',
    category: 'String',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    youtubeUrl: 'https://youtu.be/wiGpQwVHdE0',
    youtubeId: 'wiGpQwVHdE0',
    pattern: 'Sliding Window (Dynamic Shrink)',
    hook: 'Keep a set of current window characters. When you see a repeat, slide left forward evicting characters until duplicate is expelled!',
    flow: [
      'charSet = set(), left = 0, res = 0.',
      'For right in range(len(s)):',
      'While s[right] in charSet: charSet.remove(s[left]); left += 1.',
      'charSet.add(s[right]); res = max(res, right - left + 1). Return res.'
    ],
    pitfall: 'Do not clear the entire set! Only shrink left until the conflicting char is evicted.',
    complexity: { time: 'O(N)', space: 'O(min(N, alphabet))' },
    starterCode: `def lengthOfLongestSubstring(s: str) -> int:
    charSet = set()
    l = 0
    res = 0
    for r in range(len(s)):
        while s[r] in charSet:
            charSet.remove(s[l])
            l += 1
        charSet.add(s[r])
        res = max(res, r - l + 1)
    return res`,
    xp: 100
  },
  {
    id: 'longest-repeating-character-replacement',
    number: 51,
    title: 'Longest Repeating Character Replacement',
    category: 'String',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    youtubeUrl: 'https://youtu.be/gqXU1UyA8pk',
    youtubeId: 'gqXU1UyA8pk',
    pattern: 'Sliding Window Max Frequency Invariant',
    hook: 'A window is valid if: (window_length - max_char_frequency) <= k. If it exceeds k, shrink left!',
    flow: [
      'count = {}, maxf = 0, left = 0, res = 0.',
      'For right in range(len(s)): count[s[right]] += 1; maxf = max(maxf, count[s[right]]).',
      'While (right - left + 1) - maxf > k: count[s[left]] -= 1; left += 1.',
      'res = max(res, right - left + 1). Return res.'
    ],
    pitfall: 'Thinking you need to decrement maxf when shrinking left. You don’t! A smaller maxf will never produce a new record window.',
    complexity: { time: 'O(N)', space: 'O(26)' },
    starterCode: `def characterReplacement(s: str, k: int) -> int:
    count = {}
    res = 0
    l = 0
    maxf = 0
    for r in range(len(s)):
        count[s[r]] = 1 + count.get(s[r], 0)
        maxf = max(maxf, count[s[r]])
        while (r - l + 1) - maxf > k:
            count[s[l]] -= 1
            l += 1
        res = max(res, r - l + 1)
    return res`,
    xp: 100
  },
  {
    id: 'minimum-window-substring',
    number: 52,
    title: 'Minimum Window Substring',
    category: 'String',
    difficulty: 'Hard',
    leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
    youtubeUrl: 'https://youtu.be/jSto0O4AJbM',
    youtubeId: 'jSto0O4AJbM',
    pattern: 'Two-Condition Sliding Window (Have vs Need)',
    hook: 'Expand right until "have == need". Then shrink left to shave off dead weight until condition breaks. Record minimum!',
    flow: [
      'Count chars of t in countT. Track have = 0, need = len(countT).',
      'Expand r: add s[r] to window. If window[s[r]] == countT[s[r]], have += 1.',
      'While have == need: check if window is smallest yet. Remove s[l] from window; if window[s[l]] < countT[s[l]], have -= 1; l += 1.',
      'Return sliced substring.'
    ],
    pitfall: 'Comparing dictionaries on every step is O(26). Using have and need counters makes the validation O(1)!',
    complexity: { time: 'O(N)', space: 'O(N + M)' },
    starterCode: `def minWindow(s: str, t: str) -> str:
    if t == "": return ""
    countT, window = {}, {}
    for c in t: countT[c] = 1 + countT.get(c, 0)
    have, need = 0, len(countT)
    res, resLen = [-1, -1], float("infinity")
    l = 0
    for r in range(len(s)):
        c = s[r]
        window[c] = 1 + window.get(c, 0)
        if c in countT and window[c] == countT[c]:
            have += 1
        while have == need:
            if (r - l + 1) < resLen:
                res = [l, r]
                resLen = (r - l + 1)
            window[s[l]] -= 1
            if s[l] in countT and window[s[l]] < countT[s[l]]:
                have -= 1
            l += 1
    l, r = res
    return s[l : r + 1] if resLen != float("infinity") else ""`,
    xp: 150
  },
  {
    id: 'valid-anagram',
    number: 53,
    title: 'Valid Anagram',
    category: 'String',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    youtubeUrl: 'https://youtu.be/9UtInBqnCgA',
    youtubeId: '9UtInBqnCgA',
    pattern: 'Frequency Count Hash Table',
    hook: 'Count frequency of each letter. String 1 adds to the count, String 2 subtracts. All balances must be 0!',
    flow: [
      'If len(s) != len(t), return False.',
      'Count characters in s and t with hashmap or 26-element array.',
      'Check if all character counts match.',
      'Return True.'
    ],
    pitfall: 'Sorting works in O(N log N), but hash table runs in pure linear O(N).',
    complexity: { time: 'O(N)', space: 'O(1) [<= 26 chars]' },
    starterCode: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t): return False
    countS, countT = {}, {}
    for i in range(len(s)):
        countS[s[i]] = 1 + countS.get(s[i], 0)
        countT[t[i]] = 1 + countT.get(t[i], 0)
    return countS == countT`,
    xp: 50
  },
  {
    id: 'group-anagrams',
    number: 54,
    title: 'Group Anagrams',
    category: 'String',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    youtubeUrl: 'https://youtu.be/vzdNOK2oB2E',
    youtubeId: 'vzdNOK2oB2E',
    pattern: '26-Tuple Hash Key Bucketing',
    hook: 'Anagrams share identical character counts. Use a 26-int tuple [1, 0, 2...] as the hash key in a dictionary!',
    flow: [
      'Initialize res = defaultdict(list).',
      'For each word s in strs: create count = [0] * 26.',
      'For char c in s: count[ord(c) - ord("a")] += 1.',
      'Append s to res[tuple(count)]. Return res.values().'
    ],
    pitfall: 'Lists cannot be dictionary keys in Python; you must cast count to a tuple(count).',
    complexity: { time: 'O(M * N)', space: 'O(M * N)' },
    starterCode: `def groupAnagrams(strs: list[str]) -> list[list[str]]:
    from collections import defaultdict
    res = defaultdict(list)
    for s in strs:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1
        res[tuple(count)].append(s)
    return list(res.values())`,
    xp: 100
  },
  {
    id: 'valid-parentheses',
    number: 55,
    title: 'Valid Parentheses',
    category: 'String',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    youtubeUrl: 'https://youtu.be/WTzjTskDFMg',
    youtubeId: 'WTzjTskDFMg',
    pattern: 'LIFO Stack Matching',
    hook: 'Push opening brackets onto stack. For closing brackets, pop the top—if it doesn’t match your counterpart, reject!',
    flow: [
      'Map closeToOpen = {")": "(", "]": "[", "}": "{"}.',
      'Stack = [].',
      'For char c in s: if c in closeToOpen: if stack and stack[-1] == closeToOpen[c]: stack.pop() else: return False.',
      'Else: stack.append(c). Return True if stack is empty else False.'
    ],
    pitfall: 'Forgetting to check if stack is empty before popping, or checking if stack is empty at the very end.',
    complexity: { time: 'O(N)', space: 'O(N)' },
    starterCode: `def isValid(s: str) -> bool:
    stack = []
    closeToOpen = {")": "(", "]": "[", "}": "{"}
    for c in s:
        if c in closeToOpen:
            if stack and stack[-1] == closeToOpen[c]:
                stack.pop()
            else:
                return False
        else:
            stack.append(c)
    return True if not stack else False`,
    xp: 50
  },
  {
    id: 'valid-palindrome',
    number: 56,
    title: 'Valid Palindrome',
    category: 'String',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    youtubeUrl: 'https://youtu.be/jJXJ16kPFWg',
    youtubeId: 'jJXJ16kPFWg',
    pattern: 'Inward Two Pointers',
    hook: 'Place pointers at both ends. Skip symbols and punctuation. Match characters case-insensitively until pointers meet.',
    flow: [
      'l = 0, r = len(s) - 1.',
      'While l < r: skip non-alphanumeric at l; skip non-alphanumeric at r.',
      'If s[l].lower() != s[r].lower(), return False.',
      'l += 1; r -= 1. Return True.'
    ],
    pitfall: 'Filtering with regex allocates O(N) extra string memory. Two pointers with `isalnum()` achieves true O(1) space.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    starterCode: `def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): l += 1
        while r > l and not s[r].isalnum(): r -= 1
        if s[l].lower() != s[r].lower(): return False
        l, r = l + 1, r - 1
    return True`,
    xp: 50
  },
  {
    id: 'longest-palindromic-substring',
    number: 57,
    title: 'Longest Palindromic Substring',
    category: 'String',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/',
    youtubeUrl: 'https://youtu.be/XYQecbcd6_c',
    youtubeId: 'XYQecbcd6_c',
    pattern: 'Expand Around Centers',
    hook: 'Every character (and every space between characters) is a mirror center! Expand outward while left and right match.',
    flow: [
      'For i in range(len(s)):',
      'Odd expansion: expand(i, i). While s[l] == s[r] and bounds valid, update longest, l -= 1, r += 1.',
      'Even expansion: expand(i, i + 1). Repeat expansion.',
      'Return longest string found.'
    ],
    pitfall: 'Forgetting even-length palindromes ("baab") where center is between two characters.',
    complexity: { time: 'O(N^2)', space: 'O(1)' },
    starterCode: `def longestPalindrome(s: str) -> str:
    res = ""
    resLen = 0
    for i in range(len(s)):
        # odd length
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > resLen:
                res = s[l : r + 1]
                resLen = r - l + 1
            l -= 1; r += 1
        # even length
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > resLen:
                res = s[l : r + 1]
                resLen = r - l + 1
            l -= 1; r += 1
    return res`,
    xp: 100
  },
  {
    id: 'palindromic-substrings',
    number: 58,
    title: 'Palindromic Substrings',
    category: 'String',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/',
    youtubeUrl: 'https://youtu.be/4RACzI5-du8',
    youtubeId: '4RACzI5-du8',
    pattern: 'Center Expansion Counting',
    hook: 'Same as Longest Palindromic Substring, but every time a mirror match expands successfully, increment count += 1!',
    flow: [
      'res = 0.',
      'For i in range(len(s)):',
      'Odd count: expand(i, i), incrementing res for every valid expansion.',
      'Even count: expand(i, i + 1), incrementing res for every valid expansion.',
      'Return res.'
    ],
    pitfall: 'Do not run a naive O(N^3) substring checker: expanding around 2N-1 centers is O(N^2).',
    complexity: { time: 'O(N^2)', space: 'O(1)' },
    starterCode: `def countSubstrings(s: str) -> int:
    res = 0
    for i in range(len(s)):
        # odd
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            res += 1; l -= 1; r += 1
        # even
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            res += 1; l -= 1; r += 1
    return res`,
    xp: 100
  },
  {
    id: 'encode-and-decode-strings',
    number: 59,
    title: 'Encode and Decode Strings',
    category: 'String',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/',
    youtubeUrl: 'https://youtu.be/B1k_sxOSgv8',
    youtubeId: 'B1k_sxOSgv8',
    pattern: 'Length-Prefixed Chunk Framing',
    hook: 'Prefix each string with its length and a delimiter: "4#neet4#code". Even if the string contains "#", length tells you where to slice!',
    flow: [
      'Encode: for s in strs, append str(len(s)) + "#" + s.',
      'Decode: loop index i. Find next "#" at index j.',
      'length = int(s[i:j]). String is at s[j+1 : j+1+length].',
      'Append string, advance i = j + 1 + length.'
    ],
    pitfall: 'Using simple delimiters (like comma or slash) breaks if a word itself contains that delimiter.',
    complexity: { time: 'O(N)', space: 'O(1) extra' },
    starterCode: `def encode(strs: list[str]) -> str:
    res = ""
    for s in strs:
        res += str(len(s)) + "#" + s
    return res

def decode(s: str) -> list[str]:
    res, i = [], 0
    while i < len(s):
        j = i
        while s[j] != "#":
            j += 1
        length = int(s[i:j])
        res.append(s[j + 1 : j + 1 + length])
        i = j + 1 + length
    return res`,
    xp: 100
  },

  // --- TREE (14) ---
  {
    id: 'maximum-depth-of-binary-tree',
    number: 60,
    title: 'Maximum Depth of Binary Tree',
    category: 'Tree',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    youtubeUrl: 'https://youtu.be/hTM3phVI6YQ',
    youtubeId: 'hTM3phVI6YQ',
    pattern: 'Recursive Post-Order DFS / BFS Levels',
    hook: 'A tree’s height is 1 + the taller of its two children subtrees: 1 + max(dfs(left), dfs(right)).',
    flow: [
      'Base case: if root is None, return 0.',
      'Recursively calculate left_depth = maxDepth(root.left).',
      'Recursively calculate right_depth = maxDepth(root.right).',
      'Return 1 + max(left_depth, right_depth).'
    ],
    pitfall: 'Recursion depth can hit call stack limits on skewed trees (O(N)); BFS queue is an iterative alternative.',
    complexity: { time: 'O(N)', space: 'O(H)' },
    starterCode: `def maxDepth(root: TreeNode) -> int:
    if not root: return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
    xp: 50
  },
  {
    id: 'same-tree',
    number: 61,
    title: 'Same Tree',
    category: 'Tree',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/same-tree/',
    youtubeUrl: 'https://youtu.be/vRbbcKXCxOw',
    youtubeId: 'vRbbcKXCxOw',
    pattern: 'Simultaneous Dual DFS',
    hook: 'Both null? Match! One null or values differ? Mismatch! Otherwise check left==left and right==right.',
    flow: [
      'If not p and not q, return True.',
      'If not p or not q or p.val != q.val, return False.',
      'Return isSameTree(p.left, q.left) and isSameTree(p.right, q.right).'
    ],
    pitfall: 'Comparing p.val == q.val before ensuring neither node is null.',
    complexity: { time: 'O(N)', space: 'O(H)' },
    starterCode: `def isSameTree(p: TreeNode, q: TreeNode) -> bool:
    if not p and not q: return True
    if not p or not q or p.val != q.val: return False
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
    xp: 50
  },
  {
    id: 'invert-binary-tree',
    number: 62,
    title: 'Invert Binary Tree',
    category: 'Tree',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    youtubeUrl: 'https://youtu.be/OnSn2XEQ4MY',
    youtubeId: 'OnSn2XEQ4MY',
    pattern: 'Mirror Swap DFS',
    hook: 'Swap your left and right children, then tell your children to swap their own!',
    flow: [
      'If root is None, return None.',
      'root.left, root.right = root.right, root.left.',
      'invertTree(root.left); invertTree(root.right).',
      'Return root.'
    ],
    pitfall: 'Swapping root.left, then calling invert on root.left, then swapping again. Do the swap once per node.',
    complexity: { time: 'O(N)', space: 'O(H)' },
    starterCode: `def invertTree(root: TreeNode) -> TreeNode:
    if not root: return None
    root.left, root.right = root.right, root.left
    invertTree(root.left)
    invertTree(root.right)
    return root`,
    xp: 50
  },
  {
    id: 'binary-tree-maximum-path-sum',
    number: 63,
    title: 'Binary Tree Maximum Path Sum',
    category: 'Tree',
    difficulty: 'Hard',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    youtubeUrl: 'https://youtu.be/Hr5cWUld4vU',
    youtubeId: 'Hr5cWUld4vU',
    pattern: 'Split vs Pass-Through DFS',
    hook: 'A node can SPLIT (root + left + right) for the global record, but can only pass ONE branch up to its parent!',
    flow: [
      'Track global res = root.val.',
      'dfs(node): if not node, return 0.',
      'leftMax = max(dfs(node.left), 0); rightMax = max(dfs(node.right), 0).',
      'Update global res = max(res, node.val + leftMax + rightMax) (path with split).',
      'Return node.val + max(leftMax, rightMax) (path without split up to parent).'
    ],
    pitfall: 'Negative subtree values! Always wrap child returns in max(..., 0) so you never pick negative paths.',
    complexity: { time: 'O(N)', space: 'O(H)' },
    starterCode: `def maxPathSum(root: TreeNode) -> int:
    res = [root.val]
    def dfs(node):
        if not node: return 0
        leftMax = max(dfs(node.left), 0)
        rightMax = max(dfs(node.right), 0)
        # compute max path with split
        res[0] = max(res[0], node.val + leftMax + rightMax)
        return node.val + max(leftMax, rightMax)
    dfs(root)
    return res[0]`,
    xp: 150
  },
  {
    id: 'binary-tree-level-order-traversal',
    number: 64,
    title: 'Binary Tree Level Order Traversal',
    category: 'Tree',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    youtubeUrl: 'https://youtu.be/6ZnyEApgFYg',
    youtubeId: '6ZnyEApgFYg',
    pattern: 'BFS Queue Snapshot',
    hook: 'Before expanding nodes, snapshot queue length `len(q)`: that exact number of nodes belongs to the current level!',
    flow: [
      'If not root, return []. Initialize q = deque([root]), res = [].',
      'While q: level = [].',
      'Loop for _ in range(len(q)): node = q.popleft(); level.append(node.val); enqueue node.left and node.right if present.',
      'res.append(level). Return res.'
    ],
    pitfall: 'Checking queue size inside the loop as nodes get appended. Freeze `len(q)` at the start of each level!',
    complexity: { time: 'O(N)', space: 'O(N)' },
    starterCode: `def levelOrder(root: TreeNode) -> list[list[int]]:
    from collections import deque
    res = []
    q = deque([root] if root else [])
    while q:
        val = []
        for _ in range(len(q)):
            node = q.popleft()
            val.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(val)
    return res`,
    xp: 100
  },
  {
    id: 'serialize-and-deserialize-binary-tree',
    number: 65,
    title: 'Serialize and Deserialize Binary Tree',
    category: 'Tree',
    difficulty: 'Hard',
    leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
    youtubeUrl: 'https://youtu.be/u4JAi2JJhI8',
    youtubeId: 'u4JAi2JJhI8',
    pattern: 'Pre-Order DFS with Null Sentinels',
    hook: 'Serialize with preorder traversal recording "N" for nulls. Deserialize reads tokens one by one rebuilding the exact same tree!',
    flow: [
      'Serialize: dfs(node). If None, append "N". Else append str(node.val), recurse left, recurse right. Join with commas.',
      'Deserialize: split string by commas into iterator / list of values.',
      'dfs(): val = next(vals). If val == "N": return None.',
      'node = TreeNode(int(val)); node.left = dfs(); node.right = dfs(); return node.'
    ],
    pitfall: 'Preorder alone cannot reconstruct a tree without null markers. The null markers remove all ambiguity!',
    complexity: { time: 'O(N)', space: 'O(N)' },
    starterCode: `class Codec:
    def serialize(self, root):
        res = []
        def dfs(node):
            if not node:
                res.append("N")
                return
            res.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(res)

    def deserialize(self, data):
        vals = iter(data.split(","))
        def dfs():
            val = next(vals)
            if val == "N": return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()`,
    xp: 150
  },
  {
    id: 'subtree-of-another-tree',
    number: 66,
    title: 'Subtree of Another Tree',
    category: 'Tree',
    difficulty: 'Easy',
    leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/',
    youtubeUrl: 'https://youtu.be/E36O5SWp-LE',
    youtubeId: 'E36O5SWp-LE',
    pattern: 'Same Tree Sub-Traversal',
    hook: 'Check if root matches subRoot via isSameTree. If not, ask root.left and root.right if either holds it!',
    flow: [
      'If not subRoot: return True (empty tree is always a subtree).',
      'If not root: return False.',
      'If isSameTree(root, subRoot): return True.',
      'Return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot).'
    ],
    pitfall: 'A subtree must match ALL children down to the leaves, not just intermediate values.',
    complexity: { time: 'O(S * T)', space: 'O(H)' },
    starterCode: `def isSubtree(root: TreeNode, subRoot: TreeNode) -> bool:
    if not subRoot: return True
    if not root: return False
    if self.sameTree(root, subRoot): return True
    return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)

def sameTree(self, s, t):
    if not s and not t: return True
    if s and t and s.val == t.val:
        return self.sameTree(s.left, t.left) and self.sameTree(s.right, t.right)
    return False`,
    xp: 50
  },
  {
    id: 'construct-binary-tree-from-preorder-and-inorder',
    number: 67,
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    category: 'Tree',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    youtubeUrl: 'https://youtu.be/ihj4IQGZ2zc',
    youtubeId: 'ihj4IQGZ2zc',
    pattern: 'Root Index Inorder Partition',
    hook: 'Preorder[0] is the king (root). Find king in Inorder: everything to his left is his left empire, right is his right empire!',
    flow: [
      'If not preorder or not inorder: return None.',
      'root = TreeNode(preorder[0]).',
      'mid = inorder.index(preorder[0]).',
      'root.left = buildTree(preorder[1 : mid+1], inorder[:mid]).',
      'root.right = buildTree(preorder[mid+1:], inorder[mid+1:]). Return root.'
    ],
    pitfall: 'Array slicing takes O(N) at each recursion. Pass pointer indices or an index hashmap for O(N) optimal speed.',
    complexity: { time: 'O(N)', space: 'O(N)' },
    starterCode: `def buildTree(preorder: list[int], inorder: list[int]) -> TreeNode:
    if not preorder or not inorder: return None
    root = TreeNode(preorder[0])
    mid = inorder.index(preorder[0])
    root.left = self.buildTree(preorder[1 : mid + 1], inorder[:mid])
    root.right = self.buildTree(preorder[mid + 1 :], inorder[mid + 1 :])
    return root`,
    xp: 100
  },
  {
    id: 'validate-binary-search-tree',
    number: 68,
    title: 'Validate Binary Search Tree',
    category: 'Tree',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
    youtubeUrl: 'https://youtu.be/s6ATEkipzow',
    youtubeId: 's6ATEkipzow',
    pattern: 'Bounded Interval DFS (Low, High)',
    hook: 'Every node must satisfy: low < node.val < high. Going left sets high = node.val; going right sets low = node.val.',
    flow: [
      'valid(node, leftBound, rightBound):',
      'If not node: return True.',
      'If not (leftBound < node.val < rightBound): return False.',
      'Return valid(node.left, leftBound, node.val) and valid(node.right, node.val, rightBound).',
      'Initialize with valid(root, -inf, inf).'
    ],
    pitfall: 'Only comparing with immediate parent (e.g. node.left < node). A left child’s right child must still be smaller than the grandparent!',
    complexity: { time: 'O(N)', space: 'O(H)' },
    starterCode: `def isValidBST(root: TreeNode) -> bool:
    def valid(node, left, right):
        if not node: return True
        if not (left < node.val < right): return False
        return valid(node.left, left, node.val) and valid(node.right, node.val, right)
    return valid(root, float("-inf"), float("inf"))`,
    xp: 100
  },
  {
    id: 'kth-smallest-element-in-a-bst',
    number: 69,
    title: 'Kth Smallest Element in a BST',
    category: 'Tree',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
    youtubeUrl: 'https://youtu.be/5LUXSvjmGCw',
    youtubeId: '5LUXSvjmGCw',
    pattern: 'In-Order Traversal Stack Stop',
    hook: 'An in-order traversal of a BST visits nodes in strictly sorted order. Pop from stack k times and you have your answer!',
    flow: [
      'stack = [], curr = root, n = 0.',
      'While curr or stack:',
      'While curr: stack.append(curr); curr = curr.left (drill to smallest).',
      'curr = stack.pop(); n += 1.',
      'If n == k: return curr.val.',
      'curr = curr.right.'
    ],
    pitfall: 'Visiting the whole tree into a list wastes time; terminate traversal immediately at step k.',
    complexity: { time: 'O(H + k)', space: 'O(H)' },
    starterCode: `def kthSmallest(root: TreeNode, k: int) -> int:
    stack = []
    curr = root
    n = 0
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        n += 1
        if n == k: return curr.val
        curr = curr.right`,
    xp: 100
  },
  {
    id: 'lowest-common-ancestor-of-a-bst',
    number: 70,
    title: 'Lowest Common Ancestor of a BST',
    category: 'Tree',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    youtubeUrl: 'https://youtu.be/gs2LMfuOR9k',
    youtubeId: 'gs2LMfuOR9k',
    pattern: 'BST Split Point Descent',
    hook: 'If both p and q are greater than curr, go right. If both are smaller, go left. The moment they split, curr is their LCA!',
    flow: [
      'curr = root.',
      'While curr:',
      'If p.val > curr.val and q.val > curr.val: curr = curr.right.',
      'Elif p.val < curr.val and q.val < curr.val: curr = curr.left.',
      'Else (split point or curr equals p or q): return curr.'
    ],
    pitfall: 'Doing general binary tree LCA search when BST sorted property allows effortless O(H) descent.',
    complexity: { time: 'O(H) [log N avg]', space: 'O(1)' },
    starterCode: `def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    curr = root
    while curr:
        if p.val > curr.val and q.val > curr.val:
            curr = curr.right
        elif p.val < curr.val and q.val < curr.val:
            curr = curr.left
        else:
            return curr`,
    xp: 100
  },
  {
    id: 'implement-trie-prefix-tree',
    number: 71,
    title: 'Implement Trie (Prefix Tree)',
    category: 'Tree',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    youtubeUrl: 'https://youtu.be/oobqoCJlHA0',
    youtubeId: 'oobqoCJlHA0',
    pattern: 'Multi-Way Branching TrieNode',
    hook: 'Each node has a children map char->TrieNode and an endOfWord boolean flag. Root has no char of its own!',
    flow: [
      'TrieNode: children = {}, endOfWord = False.',
      'insert(word): walk/create nodes for each char; mark last node endOfWord = True.',
      'search(word): walk nodes; return True only if last node is found AND endOfWord is True.',
      'startsWith(prefix): walk nodes; return True if all prefix nodes exist (regardless of endOfWord).'
    ],
    pitfall: 'Confusing search (requires endOfWord) with startsWith (only requires path existence).',
    complexity: { time: 'O(L) per operation', space: 'O(total characters)' },
    starterCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.endOfWord = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word: str) -> None:
        curr = self.root
        for c in word:
            if c not in curr.children: curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.endOfWord = True
    def search(self, word: str) -> bool:
        curr = self.root
        for c in word:
            if c not in curr.children: return False
            curr = curr.children[c]
        return curr.endOfWord
    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for c in prefix:
            if c not in curr.children: return False
            curr = curr.children[c]
        return True`,
    xp: 100
  },
  {
    id: 'add-and-search-word',
    number: 72,
    title: 'Design Add and Search Words Data Structure',
    category: 'Tree',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/add-and-search-word-data-structure-design/',
    youtubeUrl: 'https://youtu.be/BTf05gs_8iU',
    youtubeId: 'BTf05gs_8iU',
    pattern: 'Trie + Wildcard DFS',
    hook: 'Normal letter? Move down that single branch. Wildcard "."? Branch out to ALL children and return True if any succeeds!',
    flow: [
      'addWord(word): standard Trie insertion.',
      'search(word): dfs(j, root).',
      'If char == ".": for child in curr.children.values(): if dfs(j + 1, child): return True.',
      'Else: if char not in curr.children: return False; curr = curr.children[char].',
      'At word end, return curr.endOfWord.'
    ],
    pitfall: 'Wildcard recursion explosion: return True immediately when ANY child returns True.',
    complexity: { time: 'O(M) best, O(26^N) worst on dots', space: 'O(total words)' },
    starterCode: `class WordDictionary:
    def __init__(self):
        self.root = TrieNode()
    def addWord(self, word: str) -> None:
        curr = self.root
        for c in word:
            if c not in curr.children: curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.endOfWord = True
    def search(self, word: str) -> bool:
        def dfs(j, root):
            curr = root
            for i in range(j, len(word)):
                c = word[i]
                if c == ".":
                    for child in curr.children.values():
                        if dfs(i + 1, child): return True
                    return False
                else:
                    if c not in curr.children: return False
                    curr = curr.children[c]
            return curr.endOfWord
        return dfs(0, self.root)`,
    xp: 100
  },
  {
    id: 'word-search-ii',
    number: 73,
    title: 'Word Search II',
    category: 'Tree',
    difficulty: 'Hard',
    leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/',
    youtubeUrl: 'https://youtu.be/asbcE9mZz_U',
    youtubeId: 'asbcE9mZz_U',
    pattern: 'Trie + Backtracking Matrix Hybrid',
    hook: 'Do NOT search grid for each word! Instead, pack ALL words into a single Trie, then DFS the grid following Trie paths.',
    flow: [
      'Build Trie from words list. Store complete word at leaf nodes (`node.word = word`).',
      'dfs(r, c, node): if board[r][c] not in node.children, prune immediately.',
      'Step into child node. If child has a word, append to results and set `child.word = None` to avoid duplicates.',
      'Mark board[r][c] = "#", recurse on 4 neighbors, restore board[r][c].'
    ],
    pitfall: 'Searching 10,000 words independently causes TLE. The Trie lets you search all 10,000 words simultaneously in a single pass!',
    complexity: { time: 'O(M * N * 4^L)', space: 'O(total word characters)' },
    starterCode: `def findWords(board: list[list[str]], words: list[str]) -> list[str]:
    root = TrieNode()
    for w in words: root.addWord(w)
    ROWS, COLS = len(board), len(board[0])
    res, visit = set(), set()
    def dfs(r, c, node, word):
        if r < 0 or c < 0 or r == ROWS or c == COLS or (r, c) in visit or board[r][c] not in node.children:
            return
        visit.add((r, c))
        node = node.children[board[r][c]]
        word += board[r][c]
        if node.isWord: res.add(word)
        dfs(r + 1, c, node, word); dfs(r - 1, c, node, word)
        dfs(r, c + 1, node, word); dfs(r, c - 1, node, word)
        visit.remove((r, c))
    for r in range(ROWS):
        for c in range(COLS):
            dfs(r, c, root, "")
    return list(res)`,
    xp: 150
  },

  // --- HEAP (2 additional) ---
  {
    id: 'top-k-frequent-elements',
    number: 74,
    title: 'Top K Frequent Elements',
    category: 'Heap',
    difficulty: 'Medium',
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    youtubeUrl: 'https://youtu.be/YPTqKIgVk-k',
    youtubeId: 'YPTqKIgVk-k',
    pattern: 'Bucket Sort Frequency Array / Min-Heap',
    hook: 'Bucket index = frequency count! Put numbers into bucket[count], then read buckets from right to left until you have k.',
    flow: [
      'Count frequencies with count = Counter(nums).',
      'Create buckets array of size len(nums) + 1: freq -> list of nums.',
      'Populate buckets: for n, c in count.items(): buckets[c].append(n).',
      'Traverse buckets from back (highest frequency) down to 0, collecting nums until len(res) == k.'
    ],
    pitfall: 'Sorting by frequency is O(N log N). Bucket sort achieves true O(N) linear time!',
    complexity: { time: 'O(N)', space: 'O(N)' },
    starterCode: `def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = {}
    freq = [[] for i in range(len(nums) + 1)]
    for n in nums: count[n] = 1 + count.get(n, 0)
    for n, c in count.items(): freq[c].append(n)
    res = []
    for i in range(len(freq) - 1, 0, -1):
        for n in freq[i]:
            res.append(n)
            if len(res) == k: return res`,
    xp: 100
  },
  {
    id: 'find-median-from-data-stream',
    number: 75,
    title: 'Find Median from Data Stream',
    category: 'Heap',
    difficulty: 'Hard',
    leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',
    youtubeUrl: 'https://youtu.be/itmhHWaHupI',
    youtubeId: 'itmhHWaHupI',
    pattern: 'Dual-Heap Balance (Max-Heap & Min-Heap)',
    hook: 'Two heaps kissing in the middle: Max-Heap holds the smaller half; Min-Heap holds the larger half. Keep sizes balanced!',
    flow: [
      'Initialize small (max-heap, store negative numbers) and large (min-heap).',
      'addNum(num): push to small. If max(small) > min(large), move top from small to large.',
      'Balance sizes: if len(small) > len(large) + 1, pop small into large; if len(large) > len(small) + 1, pop large into small.',
      'findMedian(): if sizes unequal, return top of larger heap. If equal, return average of both tops.'
    ],
    pitfall: 'Python heapq is a min-heap by default. Multiply numbers by -1 to simulate a max-heap!',
    complexity: { time: 'addNum: O(log N), findMedian: O(1)', space: 'O(N)' },
    starterCode: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = [] # maxHeap (negatives)
        self.large = [] # minHeap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -1 * num)
        if self.small and self.large and (-1 * self.small[0]) > self.large[0]:
            val = -1 * heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.small) > len(self.large) + 1:
            val = -1 * heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small) + 1:
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -1 * val)

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -1 * self.small[0]
        if len(self.large) > len(self.small):
            return self.large[0]
        return (-1 * self.small[0] + self.large[0]) / 2.0`,
    xp: 150
  }
];

export const CORE_PATTERNS = [
  {
    name: 'Dual Scouts (Two Pointers)',
    description: 'Converging or trailing pointers to find sums, partitions, and water bounds.',
    trigger: 'Sorted array, finding pairs/triplets, reversing elements, or tracking boundaries.',
    example: '3Sum, Container With Most Water, Valid Palindrome'
  },
  {
    name: 'Sliding Window',
    description: 'Dynamic expandable/contractible window maintaining a window invariant.',
    trigger: 'Subarrays or substrings with conditions (longest, shortest, at most k).',
    example: 'Longest Substring Without Repeating Characters, Minimum Window Substring'
  },
  {
    name: 'Kadane & Accumulators',
    description: 'Greedy state reset: discard negative baggage, accumulate prefix/postfix.',
    trigger: 'Max subarray sum, products except self, single-pass running metrics.',
    example: 'Maximum Subarray, Product of Array Except Self'
  },
  {
    name: 'Binary Search Inflection',
    description: 'Halving search space even on rotated, shifted, or monotonic predicates.',
    trigger: 'Sorted or rotated arrays, finding minimums or targets in O(log N).',
    example: 'Search in Rotated Sorted Array, Find Min in Rotated Array'
  },
  {
    name: 'The Chrono Sweep (Intervals)',
    description: 'Sort by start or end time, track active overlaps or chronological boundaries.',
    trigger: 'Meeting rooms, overlapping intervals, calendar reservations.',
    example: 'Merge Intervals, Meeting Rooms II, Non-overlapping Intervals'
  },
  {
    name: 'Pointer Surgery (Linked Lists)',
    description: 'Dummy heads, 3-pointer reversals, fast/slow cycle discovery.',
    trigger: 'In-place linked list rearrangement, cycles, merging sorted chains.',
    example: 'Reverse Linked List, Reorder List, Linked List Cycle'
  },
  {
    name: 'Labyrinth Explorers (BFS/DFS)',
    description: 'Graph & grid traversals, flood fills, 3-color cycle checks, topological sorting.',
    trigger: 'Dependencies, islands, connected components, shortest paths.',
    example: 'Course Schedule, Number of Islands, Alien Dictionary'
  },
  {
    name: 'The Time Architect (DP)',
    description: 'Memoizing subproblems, building bottom-up tables, making rob-or-skip choices.',
    trigger: 'Optimization (min coins, max profit, unique paths, can form string).',
    example: 'Coin Change, Longest Increasing Subsequence, Word Break'
  },
  {
    name: 'Priority Citadel (Heaps)',
    description: 'Maintaining a rolling frontier or balanced medians using Min/Max heaps.',
    trigger: 'Top K elements, streaming median, merging K sorted streams.',
    example: 'Top K Frequent Elements, Find Median from Data Stream'
  }
];
