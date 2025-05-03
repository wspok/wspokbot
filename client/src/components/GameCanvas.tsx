import { useRef, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Howl } from 'howler';
import { useGarden } from '../lib/stores/useGarden';
import GardenElement from './garden/GardenElement';
import { cn } from '../lib/utils';
import { GardenItem, Position } from '../lib/types';

interface GameCanvasProps {
  cursorTool: string | null;
  setCursorTool: (tool: string | null) => void;
}

const GameCanvas = ({ cursorTool, setCursorTool }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const { gardenItems, addGardenItem, removeGardenItem, moveGardenItem } = useGarden();
  
  // Plant and magic sounds
  const plantSound = useRef(new Howl({ src: ['/sounds/plant.mp3'], volume: 0.5 }));
  const waterSound = useRef(new Howl({ src: ['/sounds/water.mp3'], volume: 0.5 }));
  const magicSound = useRef(new Howl({ src: ['/sounds/magic.mp3'], volume: 0.6 }));

  // Update canvas size on window resize
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        setCanvasSize({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // Handle drop of items onto the canvas
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'garden-element',
    drop: (item: { id: string; type: string; level: number }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        
        // Add new item to garden
        const percentX = (x / canvasRect.width) * 100;
        const percentY = (y / canvasRect.height) * 100;
        
        addGardenItem({
          id: `${item.id}-${Date.now()}`,
          type: item.type,
          level: item.level,
          position: { x: percentX, y: percentY },
          rotation: Math.random() * 10 - 5, // slight random rotation
          scale: 1
        });
        
        // Play planting sound
        plantSound.current.play();
        
        // Add magical particles effect
        createMagicalEffect(x, y);
      }
      
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Handle canvas click for tool usage
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!cursorTool) return;
    
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    if (cursorTool === 'water') {
      // Water the nearest plant
      waterSound.current.play();
      createWaterEffect(x, y);
    } else if (cursorTool === 'magic') {
      // Add magical effect
      magicSound.current.play();
      createMagicalEffect(x, y);
    }
    
    // Reset cursor tool after use
    setCursorTool(null);
  };

  // Create water particle effect
  const createWaterEffect = (x: number, y: number) => {
    const particles = document.createElement('div');
    particles.className = 'water-particles';
    particles.style.left = `${x}px`;
    particles.style.top = `${y}px`;
    canvasRef.current?.appendChild(particles);
    
    // Remove particles after animation
    setTimeout(() => {
      particles.remove();
    }, 2000);
  };

  // Create magical particle effect
  const createMagicalEffect = (x: number, y: number) => {
    const particles = document.createElement('div');
    particles.className = 'magic-particles';
    particles.style.left = `${x}px`;
    particles.style.top = `${y}px`;
    canvasRef.current?.appendChild(particles);
    
    // Remove particles after animation
    setTimeout(() => {
      particles.remove();
    }, 2000);
  };

  // Handle moving garden elements
  const handleItemMove = (id: string, newPosition: Position) => {
    moveGardenItem(id, newPosition);
  };

  return (
    <div 
      ref={(node) => {
        drop(node);
        if (node) canvasRef.current = node;
      }}
      className={cn(
        "relative flex-1 bg-[#e9efd8] border-4 border-[#78a565] rounded-lg m-3 overflow-hidden",
        isOver && "border-dashed border-[#b19cd9]"
      )}
      onClick={handleCanvasClick}
    >
      {/* Garden background with subtle pattern */}
      <div className="absolute inset-0 bg-[#e9efd8] bg-repeat">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="gardenPattern" patternUnits="userSpaceOnUse" width="100" height="100">
            <rect width="100" height="100" fill="#e9efd8"/>
            <path d="M0 50 L50 0 L100 50 L50 100 Z" fill="#d5e3c1" opacity="0.2"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#gardenPattern)" />
        </svg>
      </div>
      
      {/* Garden elements */}
      {gardenItems.map((item) => (
        <GardenElement
          key={item.id}
          item={item}
          canvasSize={canvasSize}
          onMove={handleItemMove}
          onRemove={removeGardenItem}
        />
      ))}
      
      {/* Guidelines/grid - visible when dragging */}
      {isOver && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full grid grid-cols-3 grid-rows-3">
            {Array(9).fill(0).map((_, i) => (
              <div key={i} className="border border-[#b19cd9] border-opacity-30"></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
