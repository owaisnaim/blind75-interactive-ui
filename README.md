# Blind 75 Interactive UI

An interactive web application and coding sandbox engineered for mastering the **Blind 75 / LeetCode 75** algorithms. Designed to transform rote algorithm memorization into deep, intuitive pattern recognition through real-time visualization, live code execution, mnemonic triggers, and structured analysis.

---

## Key Features

### 1. Coding Arena
- **Real-Time Code Execution**: Run Java solutions directly inside the browser with execution timing and memory statistics.
- **Full LeetCode Canonical Specs**: All 75 problems feature canonical problem statements, mathematical constraints, and step-by-step example walkthroughs with dedicated input, output, and explanation cards.
- **Custom Test Cases & Multi-Case Runner**: Execute individual example test cases, test all cases simultaneously, or compose custom inputs on the fly.
- **Draggable Console Drawer**: Resizable test result and console drawer with default 50% screen expansion, fluid drag handle, and boundary constraints.
- **High-Contrast Themes**: Seamless toggle between sleek AMOLED Black (`#000000`) and Clean Minimalist Light mode.

### 2. Interactive Step Visualizer (Visualizer Studio)
- **2-Column Split Workbench**: Synchronized large-format visual stage alongside code tracing.
- **Interactive Scrubber Controls**: Play, pause, step forward, step backward, or configure custom animation playback speeds.
- **Live Variable Watch & Line Tracer**: Watch variables update dynamically at each step alongside line-by-line Java code highlighting.

### 3. Algorithm & Notes Studio
- **Intuition & Flow Breakdown**: Detailed explanations of algorithmic patterns, 4-step execution roadmaps, and common interview traps.
- **Reference Optimal Solutions**: Production-grade Java reference implementations with one-click copy and editor loading.
- **Personal Notes Workspace**: Persistent Markdown notes editor with quick templates (*Summary*, *Key Trick*, *Edge Cases*) and auto-save to `localStorage`.

### 4. Algorithmic Archetypes & Mental Hooks
- **10 Domain Categories**: Arrays, Binary, Dynamic Programming, Graphs, Heaps, Intervals, Linked Lists, Matrices, Strings, and Trees.
- **15-Second Mnemonic Hooks**: Quick mental triggers paired with every problem to instantly anchor pattern recognition during real technical interviews.
- **Smart Filtering**: Filter by category, difficulty level (*Easy*, *Medium*, *Hard*), status (*Solved*, *Review*, *Unsolved*), or search by title and keywords.

### 5. Practice & Interview Tools
- **Flow Trainer (Pattern Recognition Quiz)**: Fast-paced multiple-choice challenges to test instant archetype identification before touching code.
- **15-Second Interview Decision Tree**: Interactive decision flowchart guiding you through which algorithmic pattern to apply given specific problem constraints.
- **Timed Mock Mode (Interview Focus)**: Timed challenge intervals (15 / 20 / 25 min) with 4-stage interview progression checkpoints to simulate high-pressure interview pacing.
- **Code Debugger**: Diagnostic debugging exercises to identify logic flaws and off-by-one errors.
- **Audio & Celebrations**: Synthesized procedural sound effects and particle confetti upon mastering problems.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI framework with high-performance hooks and concurrent rendering |
| **TypeScript** | Strict static typing across all problem specifications, simulators, and components |
| **Vite 8** | Next-generation build tool and fast HMR development server |
| **Tailwind CSS v4** | Modern CSS utility framework powering responsive AMOLED dark/light layouts |
| **Lucide Icons** | SVG iconography |
| **Canvas Confetti** | Celebratory particle effects |
| **Web Audio API** | Zero-asset, in-browser synthesized procedural audio feedback |

---

## Project Structure

```text
blind75-interactive-ui/
├── public/                 # Static assets and icons
├── src/
│   ├── assets/             # Images and SVG assets
│   ├── components/         # Core React UI components
│   │   ├── CodingArena.tsx            # Code editor, test runner & console drawer
│   │   ├── ProblemModal.tsx           # Full-screen Code, Visualizer & Strategy modal
│   │   ├── ProblemVisualizer.tsx      # Visual workbench with line tracer & variable watch
│   │   ├── VisualizerStudio.tsx       # Algorithm visualizer studio with 75-problem selector
│   │   ├── VisualizerModal.tsx        # Standalone step-by-step visualizer modal
│   │   ├── Header.tsx                 # Navigation, stats & theme toggle
│   │   ├── ProblemCard.tsx            # Problem listing card with difficulty badges
│   │   ├── TopicCard.tsx              # Topic category cards
│   │   ├── PatternQuiz.tsx            # Flow Trainer pattern quiz
│   │   ├── DecisionTreeModal.tsx      # 15-second interview decision tree
│   │   ├── TimedMockModal.tsx         # Timed interview mock session
│   │   └── CodeDebugger.tsx           # Diagnostic code debugging arena
│   ├── data/               # Blind 75 specifications & test cases
│   │   ├── problems.ts                # Master problem catalogue (75 problems)
│   │   ├── javaSolutions.ts           # Reference optimal Java solutions
│   │   ├── problemTestCases.ts        # Problem specs, test runner & Array specs
│   │   └── specs/                     # Domain-specific problem specs & explanations
│   │       ├── binarySpecs.ts
│   │       ├── dpSpecs.ts
│   │       ├── graphSpecs.ts
│   │       ├── heapSpecs.ts
│   │       ├── intervalSpecs.ts
│   │       ├── linkedListSpecs.ts
│   │       ├── matrixSpecs.ts
│   │       ├── stringSpecs.ts
│   │       └── treeSpecs.ts
│   ├── utils/              # Application utilities
│   │   ├── codeRunner.ts              # In-browser test executor & evaluator
│   │   ├── simulatorEngine.ts         # Step-by-step visualizer state generator
│   │   ├── storage.ts                 # LocalStorage persistence manager
│   │   └── audio.ts                   # Web Audio API synthesizer
│   ├── App.tsx             # Root application component & routing state
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global stylesheet & Tailwind CSS configurations
├── index.html              # HTML entry point
├── package.json            # Dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/owaisnaim/blind75-interactive-ui.git
   cd blind75-interactive-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to start exploring.

### Available Scripts

- `npm run dev` - Launches the Vite dev server with Hot Module Replacement (HMR).
- `npm run build` - Type-checks with TypeScript and compiles production-ready bundles into `dist/`.
- `npm run preview` - Locally previews the production build.
- `npm run lint` - Runs fast Oxlint analysis over project files.

---

## Problem Catalog

The application covers all 75 Blind 75 questions with complete specifications, interactive visualizers, canonical LeetCode problem descriptions, math constraints, and reference solutions:

<details>
<summary><b>1. Arrays (10 Problems)</b></summary>

- #1 Two Sum
- #2 Best Time to Buy and Sell Stock
- #3 Contains Duplicate
- #4 Product of Array Except Self
- #5 Maximum Subarray
- #6 Maximum Product Subarray
- #7 Find Minimum in Rotated Sorted Array
- #8 Search in Rotated Sorted Array
- #9 3Sum
- #10 Container With Most Water
</details>

<details>
<summary><b>2. Binary & Bit Manipulation (5 Problems)</b></summary>

- #11 Sum of Two Integers
- #12 Number of 1 Bits
- #13 Counting Bits
- #14 Missing Number
- #15 Reverse Bits
</details>

<details>
<summary><b>3. Dynamic Programming (11 Problems)</b></summary>

- #16 Climbing Stairs
- #17 Coin Change
- #18 Longest Increasing Subsequence
- #19 Longest Common Subsequence
- #20 Word Break
- #21 Combination Sum
- #22 House Robber
- #23 House Robber II
- #24 Decode Ways
- #25 Unique Paths
- #26 Jump Game
</details>

<details>
<summary><b>4. Graphs (8 Problems)</b></summary>

- #27 Clone Graph
- #28 Course Schedule
- #29 Pacific Atlantic Water Flow
- #30 Number of Islands
- #31 Longest Consecutive Sequence
- #32 Alien Dictionary
- #33 Graph Valid Tree
- #34 Number of Connected Components in an Undirected Graph
</details>

<details>
<summary><b>5. Intervals (5 Problems)</b></summary>

- #35 Insert Interval
- #36 Merge Intervals
- #37 Non-overlapping Intervals
- #38 Meeting Rooms
- #39 Meeting Rooms II
</details>

<details>
<summary><b>6. Linked Lists (6 Problems)</b></summary>

- #40 Reverse Linked List
- #41 Linked List Cycle
- #42 Merge Two Sorted Lists
- #43 Merge k Sorted Lists
- #44 Remove Nth Node From End of List
- #45 Reorder List
</details>

<details>
<summary><b>7. Matrices (4 Problems)</b></summary>

- #46 Set Matrix Zeroes
- #47 Spiral Matrix
- #48 Rotate Image
- #49 Word Search
</details>

<details>
<summary><b>8. Strings (10 Problems)</b></summary>

- #50 Longest Substring Without Repeating Characters
- #51 Longest Repeating Character Replacement
- #52 Minimum Window Substring
- #53 Valid Anagram
- #54 Group Anagrams
- #55 Valid Parentheses
- #56 Valid Palindrome
- #57 Longest Palindromic Substring
- #58 Palindromic Substrings
- #59 Encode and Decode Strings
</details>

<details>
<summary><b>9. Trees (14 Problems)</b></summary>

- #60 Maximum Depth of Binary Tree
- #61 Same Tree
- #62 Invert Binary Tree
- #63 Binary Tree Maximum Path Sum
- #64 Binary Tree Level Order Traversal
- #65 Serialize and Deserialize Binary Tree
- #66 Subtree of Another Tree
- #67 Construct Binary Tree from Preorder and Inorder Traversal
- #68 Validate Binary Search Tree
- #69 Kth Smallest Element in a BST
- #70 Lowest Common Ancestor of a Binary Search Tree
- #71 Implement Trie (Prefix Tree)
- #72 Design Add and Search Words Data Structure
- #73 Word Search II
</details>

<details>
<summary><b>10. Heaps (2 Problems)</b></summary>

- #74 Top K Frequent Elements
- #75 Find Median from Data Stream
</details>

---

## License

This project is licensed under the [MIT License](LICENSE).
