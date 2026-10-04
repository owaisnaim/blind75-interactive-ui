export const JAVA_SOLUTIONS: Record<string, string> = {
  // --- ARRAYS (10) ---
  'two-sum': `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> prevMap = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (prevMap.containsKey(diff)) {
                return new int[]{prevMap.get(diff), i};
            }
            prevMap.put(nums[i], i);
        }
        return new int[]{};
    }
}`,

  'best-time-to-buy-and-sell-stock': `class Solution {
    public int maxProfit(int[] prices) {
        int l = 0, r = 1;
        int maxP = 0;
        while (r < prices.length) {
            if (prices[l] < prices[r]) {
                int profit = prices[r] - prices[l];
                maxP = Math.max(maxP, profit);
            } else {
                l = r; // New lower buying point found
            }
            r++;
        }
        return maxP;
    }
}`,

  'contains-duplicate': `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) {
                return true; // Already exists
            }
        }
        return false;
    }
}`,

  'product-of-array-except-self': `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        
        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
}`,

  'maximum-subarray': `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSub = nums[0];
        int curSum = 0;
        
        for (int n : nums) {
            if (curSum < 0) {
                curSum = 0; // Drop negative baggage
            }
            curSum += n;
            maxSub = Math.max(maxSub, curSum);
        }
        return maxSub;
    }
}`,

  'maximum-product-subarray': `class Solution {
    public int maxProduct(int[] nums) {
        int res = nums[0];
        int curMin = 1, curMax = 1;
        
        for (int n : nums) {
            if (n == 0) {
                curMin = 1;
                curMax = 1;
                res = Math.max(res, 0);
                continue;
            }
            int tmp = curMax * n;
            curMax = Math.max(n, Math.max(n * curMax, n * curMin));
            curMin = Math.min(n, Math.min(tmp, n * curMin));
            res = Math.max(res, curMax);
        }
        return res;
    }
}`,

  'find-minimum-in-rotated-sorted-array': `class Solution {
    public int findMin(int[] nums) {
        int l = 0, r = nums.length - 1;
        int res = nums[0];
        
        while (l <= r) {
            if (nums[l] < nums[r]) {
                res = Math.min(res, nums[l]);
                break;
            }
            int m = l + (r - l) / 2;
            res = Math.min(res, nums[m]);
            if (nums[m] >= nums[l]) {
                l = m + 1; // Pivot is in right half
            } else {
                r = m - 1;
            }
        }
        return res;
    }
}`,

  'search-in-rotated-sorted-array': `class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) return m;
            
            // Left portion is sorted
            if (nums[l] <= nums[m]) {
                if (target > nums[m] || target < nums[l]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            } 
            // Right portion is sorted
            else {
                if (target < nums[m] || target > nums[r]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            }
        }
        return -1;
    }
}`,

  '3sum': `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) break; // Impossible to sum to 0 with positives
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates
            
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum > 0) {
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) {
                        l++; // Skip duplicates
                    }
                }
            }
        }
        return res;
    }
}`,

  'container-with-most-water': `class Solution {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1;
        int res = 0;
        
        while (l < r) {
            int area = Math.min(height[l], height[r]) * (r - l);
            res = Math.max(res, area);
            
            if (height[l] < height[r]) {
                l++; // Bottlenecked by left, shift runt
            } else {
                r--;
            }
        }
        return res;
    }
}`,

  // --- BINARY / BITS (5) ---
  'sum-of-two-integers': `class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}`,

  'number-of-1-bits': `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1); // Brian Kernighan bit drop
            count++;
        }
        return count;
    }
}`,

  'counting-bits': `class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}`,

  'missing-number': `class Solution {
    public int missingNumber(int[] nums) {
        int res = nums.length;
        for (int i = 0; i < nums.length; i++) {
            res ^= i ^ nums[i]; // Matching numbers cancel out (x ^ x = 0)
        }
        return res;
    }
}`,

  'reverse-bits': `public class Solution {
    public int reverseBits(int n) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int bit = (n >> i) & 1;
            res |= (bit << (31 - i));
        }
        return res;
    }
}`,

  // --- DYNAMIC PROGRAMMING (11) ---
  'climbing-stairs': `class Solution {
    public int climbStairs(int n) {
        int one = 1, two = 1;
        for (int i = 0; i < n - 1; i++) {
            int temp = one;
            one = one + two;
            two = temp;
        }
        return one;
    }
}`,

  'coin-change': `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (a - c >= 0) {
                    dp[a] = Math.min(dp[a], 1 + dp[a - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,

  'longest-increasing-subsequence': `class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] lis = new int[nums.length];
        Arrays.fill(lis, 1);
        int max = 1;
        
        for (int i = nums.length - 1; i >= 0; i--) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] < nums[j]) {
                    lis[i] = Math.max(lis[i], 1 + lis[j]);
                }
            }
            max = Math.max(max, lis[i]);
        }
        return max;
    }
}`,

  'longest-common-subsequence': `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (text1.charAt(i) == text2.charAt(j)) {
                    dp[i][j] = 1 + dp[i + 1][j + 1];
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }
        return dp[0][0];
    }
}`,

  'word-break': `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        boolean[] dp = new boolean[s.length() + 1];
        dp[s.length()] = true;
        
        for (int i = s.length() - 1; i >= 0; i--) {
            for (String w : wordDict) {
                if (i + w.length() <= s.length() && s.startsWith(w, i)) {
                    dp[i] = dp[i + w.length()];
                }
                if (dp[i]) break;
            }
        }
        return dp[0];
    }
}`,

  'combination-sum': `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(0, candidates, target, 0, new ArrayList<>(), res);
        return res;
    }
    
    private void dfs(int i, int[] candidates, int target, int total, List<Integer> cur, List<List<Integer>> res) {
        if (total == target) {
            res.add(new ArrayList<>(cur));
            return;
        }
        if (i >= candidates.length || total > target) return;
        
        // Branch 1: Include current candidate (can be reused)
        cur.add(candidates[i]);
        dfs(i, candidates, target, total + candidates[i], cur, res);
        cur.remove(cur.size() - 1);
        
        // Branch 2: Skip candidate
        dfs(i + 1, candidates, target, total, cur, res);
    }
}`,

  'house-robber': `class Solution {
    public int rob(int[] nums) {
        int rob1 = 0, rob2 = 0;
        for (int n : nums) {
            int temp = Math.max(n + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
}`,

  'house-robber-ii': `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(nums[0], Math.max(helper(nums, 1, nums.length - 1), helper(nums, 0, nums.length - 2)));
    }
    
    private int helper(int[] nums, int start, int end) {
        int rob1 = 0, rob2 = 0;
        for (int i = start; i <= end; i++) {
            int temp = Math.max(nums[i] + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
}`,

  'decode-ways': `class Solution {
    public int numDecodings(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        dp[n] = 1;
        
        for (int i = n - 1; i >= 0; i--) {
            if (s.charAt(i) == '0') {
                dp[i] = 0;
            } else {
                dp[i] = dp[i + 1];
                if (i + 1 < n && (s.charAt(i) == '1' || (s.charAt(i) == '2' && s.charAt(i + 1) <= '6'))) {
                    dp[i] += dp[i + 2];
                }
            }
        }
        return dp[0];
    }
}`,

  'unique-paths': `class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n];
        Arrays.fill(row, 1);
        
        for (int i = 0; i < m - 1; i++) {
            int[] newRow = new int[n];
            Arrays.fill(newRow, 1);
            for (int j = n - 2; j >= 0; j--) {
                newRow[j] = newRow[j + 1] + row[j];
            }
            row = newRow;
        }
        return row[0];
    }
}`,

  'jump-game': `class Solution {
    public boolean canJump(int[] nums) {
        int goal = nums.length - 1;
        for (int i = nums.length - 2; i >= 0; i--) {
            if (i + nums[i] >= goal) {
                goal = i;
            }
        }
        return goal == 0;
    }
}`,

  // --- GRAPH (8) ---
  'clone-graph': `class Solution {
    private Map<Node, Node> oldToNew = new HashMap<>();
    
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (oldToNew.containsKey(node)) return oldToNew.get(node);
        
        Node copy = new Node(node.val);
        oldToNew.put(node, copy);
        for (Node nei : node.neighbors) {
            copy.neighbors.add(cloneGraph(nei));
        }
        return copy;
    }
}`,

  'course-schedule': `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] pre : prerequisites) adj.get(pre[0]).add(pre[1]);
        
        int[] visited = new int[numCourses]; // 0: unvisited, 1: visiting, 2: visited
        for (int i = 0; i < numCourses; i++) {
            if (!dfs(i, adj, visited)) return false;
        }
        return true;
    }
    
    private boolean dfs(int crs, List<List<Integer>> adj, int[] visited) {
        if (visited[crs] == 1) return false; // Cycle!
        if (visited[crs] == 2) return true;
        
        visited[crs] = 1;
        for (int pre : adj.get(crs)) {
            if (!dfs(pre, adj, visited)) return false;
        }
        visited[crs] = 2;
        return true;
    }
}`,

  'pacific-atlantic-water-flow': `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        int rows = heights.length, cols = heights[0].length;
        boolean[][] pac = new boolean[rows][cols];
        boolean[][] atl = new boolean[rows][cols];
        
        for (int c = 0; c < cols; c++) {
            dfs(0, c, heights[0][c], pac, heights);
            dfs(rows - 1, c, heights[rows - 1][c], atl, heights);
        }
        for (int r = 0; r < rows; r++) {
            dfs(r, 0, heights[r][0], pac, heights);
            dfs(r, cols - 1, heights[r][cols - 1], atl, heights);
        }
        
        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (pac[r][c] && atl[r][c]) {
                    res.add(Arrays.asList(r, c));
                }
            }
        }
        return res;
    }
    
    private void dfs(int r, int c, int prevHeight, boolean[][] visit, int[][] heights) {
        if (r < 0 || c < 0 || r >= heights.length || c >= heights[0].length || visit[r][c] || heights[r][c] < prevHeight) {
            return;
        }
        visit[r][c] = true;
        dfs(r + 1, c, heights[r][c], visit, heights);
        dfs(r - 1, c, heights[r][c], visit, heights);
        dfs(r, c + 1, heights[r][c], visit, heights);
        dfs(r, c - 1, heights[r][c], visit, heights);
    }
}`,

  'number-of-islands': `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    dfs(r, c, grid);
                    count++;
                }
            }
        }
        return count;
    }
    
    private void dfs(int r, int c, char[][] grid) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0'; // Sink island
        dfs(r + 1, c, grid);
        dfs(r - 1, c, grid);
        dfs(r, c + 1, grid);
        dfs(r, c - 1, grid);
    }
}`,

  'longest-consecutive-sequence': `class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);
        
        int longest = 0;
        for (int n : set) {
            // Only start counting if n is the beginning of a streak!
            if (!set.contains(n - 1)) {
                int length = 1;
                while (set.contains(n + length)) {
                    length++;
                }
                longest = Math.max(longest, length);
            }
        }
        return longest;
    }
}`,

  'alien-dictionary': `class Solution {
    public String alienOrder(String[] words) {
        Map<Character, Set<Character>> adj = new HashMap<>();
        Map<Character, Integer> indegree = new HashMap<>();
        for (String w : words) {
            for (char c : w.toCharArray()) {
                adj.putIfAbsent(c, new HashSet<>());
                indegree.putIfAbsent(c, 0);
            }
        }
        
        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            int minLen = Math.min(w1.length(), w2.length());
            if (w1.length() > w2.length() && w1.startsWith(w2)) return ""; // Invalid prefix order!
            
            for (int j = 0; j < minLen; j++) {
                char c1 = w1.charAt(j), c2 = w2.charAt(j);
                if (c1 != c2) {
                    if (adj.get(c1).add(c2)) {
                        indegree.put(c2, indegree.get(c2) + 1);
                    }
                    break;
                }
            }
        }
        
        Queue<Character> q = new ArrayDeque<>();
        for (char c : indegree.keySet()) {
            if (indegree.get(c) == 0) q.offer(c);
        }
        
        StringBuilder sb = new StringBuilder();
        while (!q.isEmpty()) {
            char curr = q.poll();
            sb.append(curr);
            for (char nei : adj.get(curr)) {
                indegree.put(nei, indegree.get(nei) - 1);
                if (indegree.get(nei) == 0) q.offer(nei);
            }
        }
        return sb.length() == indegree.size() ? sb.toString() : "";
    }
}`,

  'graph-valid-tree': `class Solution {
    public boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) return false;
        
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        
        for (int[] edge : edges) {
            int root1 = find(parent, edge[0]);
            int root2 = find(parent, edge[1]);
            if (root1 == root2) return false; // Cycle detected
            parent[root1] = root2;
        }
        return true;
    }
    
    private int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]); // Path compression
    }
}`,

  'number-of-connected-components': `class Solution {
    public int countComponents(int n, int[][] edges) {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        
        int components = n;
        for (int[] edge : edges) {
            int r1 = find(parent, edge[0]);
            int r2 = find(parent, edge[1]);
            if (r1 != r2) {
                parent[r1] = r2;
                components--;
            }
        }
        return components;
    }
    
    private int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }
}`,

  // --- INTERVALS (5) ---
  'insert-interval': `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        int i = 0, n = intervals.length;
        
        // 1. Add intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.add(intervals[i++]);
        }
        // 2. Merge overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval);
        // 3. Add remainder
        while (i < n) {
            res.add(intervals[i++]);
        }
        return res.toArray(new int[res.size()][]);
    }
}`,

  'merge-intervals': `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> res = new ArrayList<>();
        res.add(intervals[0]);
        
        for (int i = 1; i < intervals.length; i++) {
            int[] prev = res.get(res.size() - 1);
            if (intervals[i][0] <= prev[1]) {
                prev[1] = Math.max(prev[1], intervals[i][1]); // Extend overlap
            } else {
                res.add(intervals[i]);
            }
        }
        return res.toArray(new int[res.size()][]);
    }
}`,

  'non-overlapping-intervals': `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1])); // Sort by end time!
        int count = 0;
        int prevEnd = intervals[0][1];
        
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < prevEnd) {
                count++; // Overlap: greedily eliminate the one ending later
            } else {
                prevEnd = intervals[i][1];
            }
        }
        return count;
    }
}`,

  'meeting-rooms': `class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) {
                return false; // Clash!
            }
        }
        return true;
    }
}`,

  'meeting-rooms-ii': `class Solution {
    public int minMeetingRooms(int[][] intervals) {
        int n = intervals.length;
        int[] starts = new int[n];
        int[] ends = new int[n];
        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        Arrays.sort(starts);
        Arrays.sort(ends);
        
        int s = 0, e = 0;
        int rooms = 0, maxRooms = 0;
        while (s < n) {
            if (starts[s] < ends[e]) {
                rooms++;
                s++;
            } else {
                rooms--;
                e++;
            }
            maxRooms = Math.max(maxRooms, rooms);
        }
        return maxRooms;
    }
}`,

  // --- LINKED LIST (6) ---
  'reverse-linked-list': `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,

  'linked-list-cycle': `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true; // Collision!
        }
        return false;
    }
}`,

  'merge-two-sorted-lists': `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        
        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,

  'merge-k-sorted-lists': `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));
        
        for (ListNode node : lists) {
            if (node != null) pq.offer(node);
        }
        
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (!pq.isEmpty()) {
            ListNode min = pq.poll();
            tail.next = min;
            tail = tail.next;
            if (min.next != null) {
                pq.offer(min.next);
            }
        }
        return dummy.next;
    }
}`,

  'remove-nth-node-from-end-of-list': `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode left = dummy, right = head;
        
        while (n > 0 && right != null) {
            right = right.next;
            n--;
        }
        while (right != null) {
            left = left.next;
            right = right.next;
        }
        left.next = left.next.next; // Decapitate target
        return dummy.next;
    }
}`,

  'reorder-list': `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        
        // 1. Find middle
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // 2. Reverse second half
        ListNode second = slow.next;
        slow.next = null; // Sever link!
        ListNode prev = null;
        while (second != null) {
            ListNode tmp = second.next;
            second.next = prev;
            prev = second;
            second = tmp;
        }
        
        // 3. Merge two halves
        ListNode first = head;
        second = prev;
        while (second != null) {
            ListNode tmp1 = first.next, tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
}`,

  // --- MATRIX (4) ---
  'set-matrix-zeroes': `class Solution {
    public void setZeroes(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        boolean rowZero = false;
        
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (matrix[r][c] == 0) {
                    matrix[0][c] = 0;
                    if (r > 0) matrix[r][0] = 0;
                    else rowZero = true;
                }
            }
        }
        for (int r = 1; r < rows; r++) {
            for (int c = 1; c < cols; c++) {
                if (matrix[0][c] == 0 || matrix[r][0] == 0) {
                    matrix[r][c] = 0;
                }
            }
        }
        if (matrix[0][0] == 0) {
            for (int r = 0; r < rows; r++) matrix[r][0] = 0;
        }
        if (rowZero) {
            for (int c = 0; c < cols; c++) matrix[0][c] = 0;
        }
    }
}`,

  'spiral-matrix': `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        int left = 0, right = matrix[0].length;
        int top = 0, bottom = matrix.length;
        
        while (left < right && top < bottom) {
            for (int i = left; i < right; i++) res.add(matrix[top][i]);
            top++;
            for (int i = top; i < bottom; i++) res.add(matrix[i][right - 1]);
            right--;
            if (!(left < right && top < bottom)) break;
            for (int i = right - 1; i >= left; i--) res.add(matrix[bottom - 1][i]);
            bottom--;
            for (int i = bottom - 1; i >= top; i--) res.add(matrix[i][left]);
            left++;
        }
        return res;
    }
}`,

  'rotate-image': `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = tmp;
            }
        }
        // Reverse rows
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = tmp;
            }
        }
    }
}`,

  'word-search': `class Solution {
    public boolean exist(char[][] board, String word) {
        int rows = board.length, cols = board[0].length;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (dfs(r, c, 0, board, word)) return true;
            }
        }
        return false;
    }
    
    private boolean dfs(int r, int c, int i, char[][] board, String word) {
        if (i == word.length()) return true;
        if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] != word.charAt(i)) {
            return false;
        }
        char temp = board[r][c];
        board[r][c] = '#'; // Mark visited
        boolean res = dfs(r + 1, c, i + 1, board, word) ||
                      dfs(r - 1, c, i + 1, board, word) ||
                      dfs(r, c + 1, i + 1, board, word) ||
                      dfs(r, c - 1, i + 1, board, word);
        board[r][c] = temp; // Backtrack
        return res;
    }
}`,

  // --- STRING (10) ---
  'longest-substring-without-repeating-characters': `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> charSet = new HashSet<>();
        int l = 0, res = 0;
        
        for (int r = 0; r < s.length(); r++) {
            while (charSet.contains(s.charAt(r))) {
                charSet.remove(s.charAt(l));
                l++;
            }
            charSet.add(s.charAt(r));
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}`,

  'longest-repeating-character-replacement': `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int res = 0, l = 0, maxf = 0;
        
        for (int r = 0; r < s.length(); r++) {
            count[s.charAt(r) - 'A']++;
            maxf = Math.max(maxf, count[s.charAt(r) - 'A']);
            
            while ((r - l + 1) - maxf > k) {
                count[s.charAt(l) - 'A']--;
                l++;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}`,

  'minimum-window-substring': `class Solution {
    public String minWindow(String s, String t) {
        if (t.isEmpty()) return "";
        Map<Character, Integer> countT = new HashMap<>();
        for (char c : t.toCharArray()) countT.put(c, countT.getOrDefault(c, 0) + 1);
        
        Map<Character, Integer> window = new HashMap<>();
        int have = 0, need = countT.size();
        int[] res = {-1, -1};
        int resLen = Integer.MAX_VALUE;
        int l = 0;
        
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            window.put(c, window.getOrDefault(c, 0) + 1);
            if (countT.containsKey(c) && window.get(c).intValue() == countT.get(c).intValue()) {
                have++;
            }
            while (have == need) {
                if (r - l + 1 < resLen) {
                    res[0] = l;
                    res[1] = r;
                    resLen = r - l + 1;
                }
                char leftChar = s.charAt(l);
                window.put(leftChar, window.get(leftChar) - 1);
                if (countT.containsKey(leftChar) && window.get(leftChar) < countT.get(leftChar)) {
                    have--;
                }
                l++;
            }
        }
        return resLen == Integer.MAX_VALUE ? "" : s.substring(res[0], res[1] + 1);
    }
}`,

  'valid-anagram': `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
}`,

  'group-anagrams': `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            int[] count = new int[26];
            for (char c : s.toCharArray()) count[c - 'a']++;
            String key = Arrays.toString(count);
            map.putIfAbsent(key, new ArrayList<>());
            map.get(key).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,

  'valid-parentheses': `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,

  'valid-palindrome': `class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (r > l && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}`,

  'longest-palindromic-substring': `class Solution {
    public String longestPalindrome(String s) {
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(s, i, i);     // Odd
            int len2 = expand(s, i, i + 1); // Even
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    
    private int expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            l--;
            r++;
        }
        return r - l - 1;
    }
}`,

  'palindromic-substrings': `class Solution {
    public int countSubstrings(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            count += expand(s, i, i);     // Odd centers
            count += expand(s, i, i + 1); // Even centers
        }
        return count;
    }
    
    private int expand(String s, int l, int r) {
        int res = 0;
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            res++;
            l--;
            r++;
        }
        return res;
    }
}`,

  'encode-and-decode-strings': `public class Codec {
    // Encodes: "4#lint4#code"
    public String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();
        for (String s : strs) {
            sb.append(s.length()).append('#').append(s);
        }
        return sb.toString();
    }

    public List<String> decode(String s) {
        List<String> res = new ArrayList<>();
        int i = 0;
        while (i < s.length()) {
            int hashIdx = s.indexOf('#', i);
            int len = Integer.parseInt(s.substring(i, hashIdx));
            res.add(s.substring(hashIdx + 1, hashIdx + 1 + len));
            i = hashIdx + 1 + len;
        }
        return res;
    }
}`,

  // --- TREES (14) ---
  'maximum-depth-of-binary-tree': `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,

  'same-tree': `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null || p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,

  'invert-binary-tree': `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode tmp = root.left;
        root.left = root.right;
        root.right = tmp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`,

  'binary-tree-maximum-path-sum': `class Solution {
    private int maxSum = Integer.MIN_VALUE;
    
    public int maxPathSum(TreeNode root) {
        dfs(root);
        return maxSum;
    }
    
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int leftMax = Math.max(dfs(node.left), 0);
        int rightMax = Math.max(dfs(node.right), 0);
        // Max path WITH split
        maxSum = Math.max(maxSum, node.val + leftMax + rightMax);
        // Return path WITHOUT split up to parent
        return node.val + Math.max(leftMax, rightMax);
    }
}`,

  'binary-tree-level-order-traversal': `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        
        while (!q.isEmpty()) {
            int levelSize = q.size(); // Freeze level size snapshot!
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(level);
        }
        return res;
    }
}`,

  'serialize-and-deserialize-binary-tree': `public class Codec {
    // Encodes a tree to a single string: "1,2,N,N,3,4,N,N,5,N,N"
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        buildString(root, sb);
        return sb.toString();
    }
    
    private void buildString(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append("N,");
            return;
        }
        sb.append(node.val).append(",");
        buildString(node.left, sb);
        buildString(node.right, sb);
    }

    public TreeNode deserialize(String data) {
        Queue<String> nodes = new ArrayDeque<>(Arrays.asList(data.split(",")));
        return buildTree(nodes);
    }
    
    private TreeNode buildTree(Queue<String> nodes) {
        String val = nodes.poll();
        if (val.equals("N")) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = buildTree(nodes);
        node.right = buildTree(nodes);
        return node;
    }
}`,

  'subtree-of-another-tree': `class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (subRoot == null) return true;
        if (root == null) return false;
        if (isSame(root, subRoot)) return true;
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
    
    private boolean isSame(TreeNode s, TreeNode t) {
        if (s == null && t == null) return true;
        if (s == null || t == null || s.val != t.val) return false;
        return isSame(s.left, t.left) && isSame(s.right, t.right);
    }
}`,

  'construct-binary-tree-from-preorder-and-inorder': `class Solution {
    private Map<Integer, Integer> inMap = new HashMap<>();
    
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) inMap.put(inorder[i], i);
        return helper(preorder, 0, preorder.length - 1, 0, inorder.length - 1);
    }
    
    private TreeNode helper(int[] pre, int preStart, int preEnd, int inStart, int inEnd) {
        if (preStart > preEnd || inStart > inEnd) return null;
        TreeNode root = new TreeNode(pre[preStart]);
        int inRoot = inMap.get(root.val);
        int numsLeft = inRoot - inStart;
        
        root.left = helper(pre, preStart + 1, preStart + numsLeft, inStart, inRoot - 1);
        root.right = helper(pre, preStart + numsLeft + 1, preEnd, inRoot + 1, inEnd);
        return root;
    }
}`,

  'validate-binary-search-tree': `class Solution {
    public boolean isValidBST(TreeNode root) {
        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    private boolean valid(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return valid(node.left, min, node.val) && valid(node.right, node.val, max);
    }
}`,

  'kth-smallest-element-in-a-bst': `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;
        
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left; // Drill to smallest
            }
            curr = stack.pop();
            k--;
            if (k == 0) return curr.val;
            curr = curr.right;
        }
        return -1;
    }
}`,

  'lowest-common-ancestor-of-a-bst': `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode curr = root;
        while (curr != null) {
            if (p.val > curr.val && q.val > curr.val) {
                curr = curr.right;
            } else if (p.val < curr.val && q.val < curr.val) {
                curr = curr.left;
            } else {
                return curr; // Split point or match
            }
        }
        return null;
    }
}`,

  'implement-trie-prefix-tree': `class Trie {
    private static class Node {
        Node[] children = new Node[26];
        boolean isEnd = false;
    }
    
    private final Node root;
    public Trie() {
        root = new Node();
    }
    
    public void insert(String word) {
        Node curr = root;
        for (char c : word.toCharArray()) {
            if (curr.children[c - 'a'] == null) {
                curr.children[c - 'a'] = new Node();
            }
            curr = curr.children[c - 'a'];
        }
        curr.isEnd = true;
    }
    
    public boolean search(String word) {
        Node curr = root;
        for (char c : word.toCharArray()) {
            if (curr.children[c - 'a'] == null) return false;
            curr = curr.children[c - 'a'];
        }
        return curr.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        Node curr = root;
        for (char c : prefix.toCharArray()) {
            if (curr.children[c - 'a'] == null) return false;
            curr = curr.children[c - 'a'];
        }
        return true;
    }
}`,

  'add-and-search-word': `class WordDictionary {
    private static class Node {
        Node[] children = new Node[26];
        boolean isEnd = false;
    }
    private final Node root;
    public WordDictionary() {
        root = new Node();
    }
    
    public void addWord(String word) {
        Node curr = root;
        for (char c : word.toCharArray()) {
            if (curr.children[c - 'a'] == null) curr.children[c - 'a'] = new Node();
            curr = curr.children[c - 'a'];
        }
        curr.isEnd = true;
    }
    
    public boolean search(String word) {
        return dfs(word, 0, root);
    }
    
    private boolean dfs(String word, int j, Node node) {
        Node curr = node;
        for (int i = j; i < word.length(); i++) {
            char c = word.charAt(i);
            if (c == '.') {
                for (Node child : curr.children) {
                    if (child != null && dfs(word, i + 1, child)) return true;
                }
                return false;
            } else {
                if (curr.children[c - 'a'] == null) return false;
                curr = curr.children[c - 'a'];
            }
        }
        return curr.isEnd;
    }
}`,

  'word-search-ii': `class Solution {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null;
    }
    
    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode curr = root;
            for (char c : w.toCharArray()) {
                if (curr.children[c - 'a'] == null) curr.children[c - 'a'] = new TrieNode();
                curr = curr.children[c - 'a'];
            }
            curr.word = w;
        }
        
        List<String> res = new ArrayList<>();
        for (int r = 0; r < board.length; r++) {
            for (int c = 0; c < board[0].length; c++) {
                dfs(r, c, root, board, res);
            }
        }
        return res;
    }
    
    private void dfs(int r, int c, TrieNode node, char[][] board, List<String> res) {
        if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] == '#') return;
        char ch = board[r][c];
        TrieNode next = node.children[ch - 'a'];
        if (next == null) return;
        
        if (next.word != null) {
            res.add(next.word);
            next.word = null; // Deduplicate!
        }
        
        board[r][c] = '#';
        dfs(r + 1, c, next, board, res);
        dfs(r - 1, c, next, board, res);
        dfs(r, c + 1, next, board, res);
        dfs(r, c - 1, next, board, res);
        board[r][c] = ch;
    }
}`,

  // --- HEAP (2) ---
  'top-k-frequent-elements': `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);
        
        // Bucket sort: index = frequency
        List<Integer>[] bucket = new List[nums.length + 1];
        for (int key : count.keySet()) {
            int freq = count.get(key);
            if (bucket[freq] == null) bucket[freq] = new ArrayList<>();
            bucket[freq].add(key);
        }
        
        int[] res = new int[k];
        int idx = 0;
        for (int i = bucket.length - 1; i >= 0 && idx < k; i--) {
            if (bucket[i] != null) {
                for (int num : bucket[i]) {
                    res[idx++] = num;
                    if (idx == k) break;
                }
            }
        }
        return res;
    }
}`,

  'find-median-from-data-stream': `class MedianFinder {
    private final PriorityQueue<Integer> small; // Max-heap (lower half)
    private final PriorityQueue<Integer> large; // Min-heap (upper half)

    public MedianFinder() {
        small = new PriorityQueue<>(Collections.reverseOrder());
        large = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        small.offer(num);
        // Ensure every element in small is <= every element in large
        if (!small.isEmpty() && !large.isEmpty() && small.peek() > large.peek()) {
            large.offer(small.poll());
        }
        // Balance sizes within diff <= 1
        if (small.size() > large.size() + 1) {
            large.offer(small.poll());
        } else if (large.size() > small.size() + 1) {
            small.offer(large.poll());
        }
    }
    
    public double findMedian() {
        if (small.size() > large.size()) return small.peek();
        if (large.size() > small.size()) return large.peek();
        return (small.peek() + large.peek()) / 2.0;
    }
}`
};
