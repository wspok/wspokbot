import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Howl } from "howler";
import GameCanvas from "./components/GameCanvas";
import Inventory from "./components/Inventory";
import PuzzleModal from "./components/PuzzleModal";
import TutorialModal from "./components/TutorialModal";
import CustomCursor from "./components/garden/CustomCursor";
import { useAudio } from "./lib/stores/useAudio";
import { useGame } from "./lib/stores/useGame";
import { useGarden } from "./lib/stores/useGarden";
import { usePuzzles } from "./lib/stores/usePuzzles";
import { Button } from "./components/ui/button";
import "@fontsource/inter";

// Detect touch device for DnD backend selection
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

function App() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorTool, setCursorTool] = useState<string | null>(null);
  const [dndBackend] = useState(() => isTouchDevice() ? TouchBackend : HTML5Backend);
  
  const { phase, start } = useGame();
  const { loadGarden, saveGarden } = useGarden();
  const { currentPuzzle } = usePuzzles();
  const { setBackgroundMusic } = useAudio();

  // Mouse movement handler for custom cursor
  const handleMouseMove = (e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  // Initialize game
  useEffect(() => {
    // Load background music
    const backgroundMusic = new Howl({
      src: ['/sounds/background.mp3'],
      loop: true,
      volume: 0.3,
    });
    
    setBackgroundMusic(backgroundMusic);
    
    // Try to load saved garden from localStorage
    loadGarden();
    
    // Show tutorial on first visit
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
    
    // Start tracking mouse movement for custom cursor
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start game
    start();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  const handleSaveGarden = () => {
    saveGarden();
    // Show success feedback
    const successSound = new Howl({
      src: ['/sounds/success.mp3'],
      volume: 0.5,
    });
    successSound.play();
  };

  const handleOpenPuzzle = () => {
    setShowPuzzle(true);
  };

  return (
    <DndProvider backend={dndBackend}>
      <div className="h-screen w-screen overflow-hidden bg-[#f8f5f2] relative">
        {/* Garden area */}
        <div className="flex flex-col h-full">
          <header className="bg-[#78a565] text-white p-4 shadow-md z-10">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl font-bold">Magical Garden</h1>
              <div className="flex gap-2">
                <Button 
                  onClick={handleOpenPuzzle}
                  className="bg-[#d7937f] hover:bg-[#c5826e] text-white"
                >
                  Solve Puzzles
                </Button>
                <Button 
                  onClick={handleSaveGarden}
                  className="bg-[#5a7d9a] hover:bg-[#4c6a84] text-white"
                >
                  Save Garden
                </Button>
              </div>
            </div>
          </header>
          
          <div className="flex flex-col md:flex-row h-full overflow-hidden">
            <Inventory setCursorTool={setCursorTool} />
            <GameCanvas cursorTool={cursorTool} setCursorTool={setCursorTool} />
          </div>
        </div>
        
        {/* Modals */}
        {showTutorial && (
          <TutorialModal onClose={handleCloseTutorial} />
        )}
        
        {showPuzzle && (
          <PuzzleModal 
            puzzle={currentPuzzle} 
            onClose={() => setShowPuzzle(false)} 
          />
        )}
        
        {/* Custom cursor */}
        {cursorTool && !isTouchDevice() && (
          <CustomCursor 
            tool={cursorTool} 
            position={cursorPosition} 
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
