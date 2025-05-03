import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Puzzle, PuzzleType, GardenItemType } from "../types";

interface PuzzlesState {
  puzzles: Puzzle[];
  completedPuzzles: string[];
  currentPuzzleIndex: number;
  solvedCount: number;
  
  // Actions
  completePuzzle: (id: string) => void;
  getNextPuzzle: () => void;
  resetPuzzles: () => void;
  
  // Computed
  currentPuzzle: Puzzle | null;
}

// Sample puzzles with increasing difficulty
const initialPuzzles: Puzzle[] = [
  // Puzzle 1: Simple matching
  {
    id: "puzzle-1",
    type: PuzzleType.MATCHING,
    title: "Magical Plant Pairs",
    description: "Match each plant with its magical property to unlock new flowers for your garden.",
    difficulty: 1,
    data: {
      pairs: [
        { symbol: "🌻", match: "☀️" },
        { symbol: "🌿", match: "💨" },
        { symbol: "🌹", match: "❤️" },
        { symbol: "🍄", match: "🌙" }
      ]
    },
    reward: {
      type: GardenItemType.FLOWER,
      level: 2,
      name: "Rose"
    }
  },
  
  // Puzzle 2: Pattern recognition
  {
    id: "puzzle-2",
    type: PuzzleType.PATTERN,
    title: "Growth Pattern",
    description: "Recreate the natural growth pattern to unlock a new tree species.",
    difficulty: 2,
    data: {
      gridSize: 4,
      pattern: [0, 5, 6, 9, 10, 15]
    },
    reward: {
      type: GardenItemType.TREE,
      level: 2,
      name: "Willow"
    }
  },
  
  // Puzzle 3: Connecting pairs
  {
    id: "puzzle-3",
    type: PuzzleType.CONNECTING,
    title: "Connect Elements",
    description: "Connect each garden element to its required element to create harmony.",
    difficulty: 2,
    data: {
      nodes: [
        { id: "water", text: "Water", group: "start" },
        { id: "light", text: "Light", group: "start" },
        { id: "soil", text: "Soil", group: "start" },
        { id: "flower", text: "Flower", group: "end" },
        { id: "tree", text: "Tree", group: "end" },
        { id: "herb", text: "Herb", group: "end" }
      ],
      solutions: [
        { start: "water", end: "tree" },
        { start: "light", end: "flower" },
        { start: "soil", end: "herb" }
      ]
    },
    reward: {
      type: GardenItemType.DECORATION,
      level: 2,
      name: "Fountain"
    }
  },
  
  // Puzzle 4: More complex matching
  {
    id: "puzzle-4",
    type: PuzzleType.MATCHING,
    title: "Blooming Seasons",
    description: "Match each flower with its blooming season to unlock a magical lily.",
    difficulty: 3,
    data: {
      pairs: [
        { symbol: "🌼", match: "🌱" },
        { symbol: "🌺", match: "☀️" },
        { symbol: "🍁", match: "🍂" },
        { symbol: "❄️", match: "🌵" },
        { symbol: "🌷", match: "🌧️" },
        { symbol: "🌸", match: "🌈" }
      ]
    },
    reward: {
      type: GardenItemType.FLOWER,
      level: 3,
      name: "Lily"
    }
  },
  
  // Puzzle 5: Complex pattern
  {
    id: "puzzle-5",
    type: PuzzleType.PATTERN,
    title: "Mystical Formation",
    description: "Create the mystical pattern that will unlock the Cherry tree.",
    difficulty: 3,
    data: {
      gridSize: 5,
      pattern: [0, 4, 6, 8, 12, 16, 18, 20, 24]
    },
    reward: {
      type: GardenItemType.TREE,
      level: 3,
      name: "Cherry"
    }
  },
  
  // Puzzle 6: Complex connecting
  {
    id: "puzzle-6",
    type: PuzzleType.CONNECTING,
    title: "Garden Harmony",
    description: "Create the perfect harmony by connecting complementary elements to unlock the gazebo.",
    difficulty: 4,
    data: {
      nodes: [
        { id: "sun", text: "Sun", group: "start" },
        { id: "moon", text: "Moon", group: "start" },
        { id: "rain", text: "Rain", group: "start" },
        { id: "wind", text: "Wind", group: "start" },
        { id: "flower", text: "Flower", group: "end" },
        { id: "fruit", text: "Fruit", group: "end" },
        { id: "leaf", text: "Leaf", group: "end" },
        { id: "root", text: "Root", group: "end" }
      ],
      solutions: [
        { start: "sun", end: "fruit" },
        { start: "moon", end: "flower" },
        { start: "rain", end: "root" },
        { start: "wind", end: "leaf" }
      ]
    },
    reward: {
      type: GardenItemType.DECORATION,
      level: 3,
      name: "Gazebo"
    }
  }
];

export const usePuzzles = create<PuzzlesState>()(
  persist(
    (set, get) => ({
      puzzles: initialPuzzles,
      completedPuzzles: [],
      currentPuzzleIndex: 0,
      solvedCount: 0,
      
      completePuzzle: (id) => {
        set((state) => {
          // Check if puzzle is already completed
          if (state.completedPuzzles.includes(id)) {
            return {};
          }
          
          return {
            completedPuzzles: [...state.completedPuzzles, id],
            solvedCount: state.solvedCount + 1
          };
        });
      },
      
      getNextPuzzle: () => {
        const { puzzles, completedPuzzles, currentPuzzleIndex } = get();
        
        // Find the next unsolved puzzle
        let newIndex = currentPuzzleIndex;
        let foundUnsolved = false;
        
        for (let i = 0; i < puzzles.length; i++) {
          const nextIndex = (currentPuzzleIndex + i) % puzzles.length;
          const puzzleId = puzzles[nextIndex].id;
          
          if (!completedPuzzles.includes(puzzleId)) {
            newIndex = nextIndex;
            foundUnsolved = true;
            break;
          }
        }
        
        // Only update if we found an unsolved puzzle
        if (foundUnsolved) {
          set({ currentPuzzleIndex: newIndex });
        }
      },
      
      resetPuzzles: () => {
        set({
          completedPuzzles: [],
          currentPuzzleIndex: 0,
          solvedCount: 0
        });
      },
      
      get currentPuzzle() {
        const { puzzles, completedPuzzles, currentPuzzleIndex } = get();
        
        // If all puzzles are completed, return null
        if (completedPuzzles.length >= puzzles.length) {
          return null;
        }
        
        return puzzles[currentPuzzleIndex];
      }
    }),
    {
      name: "magical-garden-puzzles"
    }
  )
);
