import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { usePuzzles } from '../lib/stores/usePuzzles';
import { useGarden } from '../lib/stores/useGarden';
import { PuzzleType, Puzzle } from '../lib/types';
import MatchingPuzzle from './puzzles/MatchingPuzzle';
import ConnectingPuzzle from './puzzles/ConnectingPuzzle';
import PatternPuzzle from './puzzles/PatternPuzzle';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface PuzzleModalProps {
  puzzle: Puzzle | null;
  onClose: () => void;
}

const PuzzleModal = ({ puzzle, onClose }: PuzzleModalProps) => {
  const [solved, setSolved] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const { completePuzzle, getNextPuzzle } = usePuzzles();
  const { unlockItem } = useGarden();
  
  const successSound = new Howl({
    src: ['/sounds/success.mp3'],
    volume: 0.7
  });
  
  const magicSound = new Howl({
    src: ['/sounds/magic.mp3'],
    volume: 0.5
  });

  useEffect(() => {
    // Reset state when puzzle changes
    setSolved(false);
    setShowReward(false);
  }, [puzzle]);

  const handlePuzzleSolved = () => {
    setSolved(true);
    successSound.play();
    
    // Show reward after a delay
    setTimeout(() => {
      setShowReward(true);
      magicSound.play();
    }, 1500);
    
    // Mark puzzle as completed
    if (puzzle) {
      completePuzzle(puzzle.id);
    }
  };

  const handleClaimReward = () => {
    // Unlock reward item
    if (puzzle?.reward) {
      unlockItem(puzzle.reward);
    }
    
    // Get next puzzle and close modal
    getNextPuzzle();
    onClose();
  };

  // If no puzzle is available
  if (!puzzle) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-fadeIn">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-[#4a6c39] mb-4">All Puzzles Completed!</h2>
            <p className="text-gray-600 mb-6">
              You've solved all the available puzzles. Your garden is fully unlocked!
            </p>
            <Button
              onClick={onClose}
              className="bg-[#78a565] hover:bg-[#5d8047] text-white"
            >
              Return to Garden
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        {!solved ? (
          <>
            <h2 className="text-xl font-semibold text-[#4a6c39] mb-2">{puzzle.title}</h2>
            <p className="text-gray-600 mb-6">{puzzle.description}</p>
            
            <div className="bg-[#f0f4e6] p-4 rounded-xl border border-[#78a565]">
              {puzzle.type === PuzzleType.MATCHING && (
                <MatchingPuzzle puzzle={puzzle} onSolve={handlePuzzleSolved} />
              )}
              {puzzle.type === PuzzleType.CONNECTING && (
                <ConnectingPuzzle puzzle={puzzle} onSolve={handlePuzzleSolved} />
              )}
              {puzzle.type === PuzzleType.PATTERN && (
                <PatternPuzzle puzzle={puzzle} onSolve={handlePuzzleSolved} />
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            {!showReward ? (
              <>
                <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-full h-full text-[#78a565]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#4a6c39] mb-4">Puzzle Solved!</h2>
                <p className="text-gray-600 mb-6">
                  You've successfully completed the puzzle!
                </p>
                <div className="animate-pulse">
                  <p className="text-[#b19cd9] font-medium">Revealing reward...</p>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6 mx-auto w-32 h-32 flex items-center justify-center animate-bounce">
                  {puzzle.reward && (
                    <div className="w-full h-full">
                      {/* Display reward item */}
                      {puzzle.reward.type === 'flower' && (
                        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="50" cy="50" r="30" fill="#ff7eb9" />
                          <circle cx="50" cy="50" r="15" fill="#feff9c" />
                        </svg>
                      )}
                      {puzzle.reward.type === 'tree' && (
                        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50,10 L70,50 L80,40 L60,80 L40,80 L20,40 L30,50 Z" fill="#7bc86c" />
                          <rect x="45" y="80" width="10" height="15" fill="#8a6343" />
                        </svg>
                      )}
                      {puzzle.reward.type === 'decoration' && (
                        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <rect x="30" y="50" width="40" height="30" fill="#c5a6ff" />
                          <polygon points="30,50 50,30 70,50" fill="#c5a6ff" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-[#4a6c39] mb-4">New Item Unlocked!</h2>
                <p className="text-gray-600 mb-6">
                  You've unlocked: <span className="font-semibold">{puzzle.reward?.name}</span>
                </p>
                <Button
                  onClick={handleClaimReward}
                  className="bg-[#b19cd9] hover:bg-[#9a85c0] text-white"
                >
                  Add to Your Garden
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzleModal;
