import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { cn } from '../../lib/utils';
import { Puzzle } from '../../lib/types';

interface MatchingPuzzleProps {
  puzzle: Puzzle;
  onSolve: () => void;
}

// Generic puzzle card that flips on click
const PuzzleCard = ({ 
  id, 
  content, 
  isFlipped, 
  isMatched, 
  onClick 
}: { 
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(
        "w-24 h-24 md:w-28 md:h-28 perspective-1000 cursor-pointer",
        isMatched && "opacity-70 pointer-events-none"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Card Back */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden bg-[#b19cd9] rounded-lg flex items-center justify-center",
            "border-2 border-[#9a85c0] shadow-md"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        
        {/* Card Front */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden bg-white rounded-lg flex items-center justify-center rotate-y-180",
            "border-2 border-[#78a565] shadow-md"
          )}
        >
          <div className="text-4xl">{content}</div>
        </div>
      </div>
    </div>
  );
};

const MatchingPuzzle = ({ puzzle, onSolve }: MatchingPuzzleProps) => {
  // Puzzle cards with pairs to match
  const [cards, setCards] = useState<{
    id: number;
    content: string;
    isFlipped: boolean;
    isMatched: boolean;
  }[]>([]);
  
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moveCount, setMoveCount] = useState(0);
  const [solved, setSolved] = useState(false);
  
  // Sound effects
  const flipSound = new Howl({
    src: ['/sounds/hit.mp3'],
    volume: 0.3,
  });
  
  const matchSound = new Howl({
    src: ['/sounds/magic.mp3'],
    volume: 0.4,
  });

  // Initialize cards based on puzzle data
  useEffect(() => {
    if (puzzle && puzzle.data && puzzle.data.pairs) {
      const pairs = puzzle.data.pairs as { symbol: string; match: string }[];
      
      // Create pairs of cards and shuffle them
      const cardPairs = pairs.flatMap(pair => [
        { content: pair.symbol, match: pair.match },
        { content: pair.match, match: pair.symbol }
      ]);
      
      // Shuffle cards
      const shuffledCards = [...cardPairs]
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({
          id: index,
          content: card.content,
          match: card.match,
          isFlipped: false,
          isMatched: false,
        }));
      
      setCards(shuffledCards);
    }
  }, [puzzle]);

  // Handle card click
  const handleCardClick = (cardId: number) => {
    // Don't allow more than 2 cards flipped at once or clicking already flipped cards
    if (
      flippedCards.length >= 2 || 
      cards[cardId].isFlipped || 
      cards[cardId].isMatched
    ) {
      return;
    }
    
    // Play flip sound
    flipSound.play();
    
    // Flip the card
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));
    
    // Keep track of flipped cards
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards[firstCardId];
      const secondCard = cards[secondCardId];
      
      // Increment move counter
      setMoveCount(moveCount + 1);
      
      // Check if cards match
      if (firstCard.content === secondCard.match || secondCard.content === firstCard.match) {
        // Match found
        setTimeout(() => {
          matchSound.play();
          
          setCards(cards.map(card => 
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true }
              : card
          ));
          
          // Check if all matches are found
          const allMatched = cards.every(card => 
            (card.id === firstCardId || card.id === secondCardId)
              ? true
              : card.isMatched
          );
          
          if (allMatched) {
            setSolved(true);
            onSolve();
          }
          
          // Reset flipped cards
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isFlipped: false }
              : card
          ));
          
          // Reset flipped cards
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-4">Moves: {moveCount}</div>
      
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mx-auto">
        {cards.map(card => (
          <PuzzleCard
            key={card.id}
            id={card.id}
            content={card.content}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchingPuzzle;
