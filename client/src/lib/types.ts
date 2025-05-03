// Garden item types
export enum GardenItemType {
  FLOWER = 'flower',
  TREE = 'tree',
  DECORATION = 'decoration'
}

// Position type for garden elements
export interface Position {
  x: number;
  y: number;
}

// Garden item structure
export interface GardenItem {
  id: string;
  type: GardenItemType;
  level: number;
  position: Position;
  rotation: number;
  scale: number;
}

// Reward item structure
export interface RewardItem {
  type: GardenItemType;
  level: number;
  name: string;
}

// Puzzle types
export enum PuzzleType {
  MATCHING = 'matching',
  CONNECTING = 'connecting',
  PATTERN = 'pattern'
}

// Puzzle structure
export interface Puzzle {
  id: string;
  type: PuzzleType;
  title: string;
  description: string;
  difficulty: number;
  data: any; // Will vary based on puzzle type
  reward?: RewardItem;
}

// User data structure
export interface UserData {
  username: string;
  unlockedItems: string[];
  completedPuzzles: string[];
}
