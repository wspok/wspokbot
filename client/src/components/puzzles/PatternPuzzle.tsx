import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { cn } from '../../lib/utils';
import { Puzzle } from '../../lib/types';

interface PatternPuzzleProps {
  puzzle: Puzzle;
  onSolve: () => void;
}

interface PatternCell {
  id: number;
  active: boolean;
  correct: boolean;
  highlight: boolean;
}

const PatternPuzzle = ({ puzzle, onSolve }: PatternPuzzleProps) => {
  const [grid, setGrid] = useState<PatternCell[][]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [solution, setSolution] = useState<number[]>([]);
  const [showingSolution, setShowingSolution] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  // Sound effects
  const cellSound = new Howl({
    src: ['/sounds/hit.mp3'],
    volume: 0.3,
  });
  
  const errorSound = new Howl({
    src: ['/sounds/water.mp3'],
    volume: 0.4,
  });
  
  const successSound = new Howl({
    src: ['/sounds/success.mp3'],
    volume: 0.5,
  });

  // Initialize the puzzle grid
  useEffect(() => {
    if (puzzle && puzzle.data) {
      const { gridSize, pattern } = puzzle.data;
      
      // Create empty grid
      const size = gridSize || 4;
      const newGrid: PatternCell[][] = [];
      
      for (let y = 0; y < size; y++) {
        const row: PatternCell[] = [];
        for (let x = 0; x < size; x++) {
          const id = y * size + x;
          row.push({
            id,
            active: false,
            correct: false,
            highlight: false,
          });
        }
        newGrid.push(row);
      }
      
      setGrid(newGrid);
      
      // Set solution pattern
      if (pattern && Array.isArray(pattern)) {
        setSolution(pattern);
      }
    }
  }, [puzzle]);

  // Handle cell click
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (showingSolution) return;
    
    // Play sound
    cellSound.play();
    
    const cellId = rowIndex * grid[0].length + colIndex;
    
    // Update grid
    const newGrid = [...grid];
    const cell = newGrid[rowIndex][colIndex];
    
    // Toggle cell state
    cell.active = !cell.active;
    
    // Check if cell is in the solution
    cell.correct = solution.includes(cellId);
    
    setGrid(newGrid);
    
    // Update user pattern
    if (cell.active) {
      setUserPattern([...userPattern, cellId]);
    } else {
      setUserPattern(userPattern.filter(id => id !== cellId));
    }
  };

  // Check pattern when user submits
  const checkPattern = () => {
    setAttempts(attempts + 1);
    
    // Sort both arrays to compare
    const sortedUserPattern = [...userPattern].sort((a, b) => a - b);
    const sortedSolution = [...solution].sort((a, b) => a - b);
    
    // Check if patterns match
    if (
      sortedUserPattern.length === sortedSolution.length &&
      sortedUserPattern.every((val, index) => val === sortedSolution[index])
    ) {
      // Success!
      successSound.play();
      
      // Highlight successful pattern
      const newGrid = grid.map(row =>
        row.map(cell => ({
          ...cell,
          highlight: cell.active && cell.correct
        }))
      );
      
      setGrid(newGrid);
      setShowingSolution(true);
      
      // Trigger onSolve after a delay
      setTimeout(() => {
        onSolve();
      }, 1500);
    } else {
      // Wrong pattern
      errorSound.play();
      
      // Show correct pattern briefly
      setShowingSolution(true);
      
      // Create temporary grid showing solution
      const solutionGrid = grid.map(row =>
        row.map(cell => ({
          ...cell,
          active: solution.includes(cell.id),
          highlight: solution.includes(cell.id)
        }))
      );
      
      setGrid(solutionGrid);
      
      // Reset after showing solution
      setTimeout(() => {
        // Reset grid
        const resetGrid = grid.map(row =>
          row.map(cell => ({
            ...cell,
            active: false,
            correct: false,
            highlight: false
          }))
        );
        
        setGrid(resetGrid);
        setUserPattern([]);
        setShowingSolution(false);
      }, 2000);
    }
  };

  // Get hint - illuminate one correct cell
  const getHint = () => {
    // Find a correct cell that isn't already active
    const availableHints = solution.filter(id => !userPattern.includes(id));
    
    if (availableHints.length > 0) {
      // Pick a random hint
      const hintId = availableHints[Math.floor(Math.random() * availableHints.length)];
      
      // Calculate row and column
      const rowIndex = Math.floor(hintId / grid[0].length);
      const colIndex = hintId % grid[0].length;
      
      // Activate the cell
      const newGrid = [...grid];
      newGrid[rowIndex][colIndex].active = true;
      newGrid[rowIndex][colIndex].correct = true;
      newGrid[rowIndex][colIndex].highlight = true;
      
      setGrid(newGrid);
      
      // Add to user pattern
      setUserPattern([...userPattern, hintId]);
      
      // Remove highlight after a moment
      setTimeout(() => {
        const updatedGrid = [...newGrid];
        updatedGrid[rowIndex][colIndex].highlight = false;
        setGrid(updatedGrid);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-4">Attempts: {attempts}</div>
      
      <div className="bg-white p-4 rounded-lg border border-[#78a565] mb-4">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 4}, 1fr)` }}>
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "w-12 h-12 md:w-14 md:h-14 rounded-lg cursor-pointer flex items-center justify-center transition-all",
                  "border-2 hover:border-[#b19cd9]",
                  cell.active && cell.correct && cell.highlight
                    ? "bg-[#7bc86c] border-[#5ead4e]"
                    : cell.active
                      ? "bg-[#b19cd9] border-[#9a85c0]"
                      : "bg-[#f0f4e6] border-[#d7e1c7]"
                )}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-[#78a565] hover:bg-[#5d8047] text-white rounded-lg text-sm font-medium"
          onClick={checkPattern}
          disabled={showingSolution}
        >
          Check Pattern
        </button>
        
        <button
          className="px-4 py-2 bg-[#5a7d9a] hover:bg-[#4c6a84] text-white rounded-lg text-sm font-medium"
          onClick={getHint}
          disabled={showingSolution}
        >
          Get Hint
        </button>
      </div>
    </div>
  );
};

export default PatternPuzzle;
