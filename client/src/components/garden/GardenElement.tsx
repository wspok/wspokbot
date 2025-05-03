import { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Flower, Tree, Decoration } from '../../assets/svg/flowers';
import { GardenItem, GardenItemType, Position } from '../../lib/types';
import { Howl } from 'howler';

interface GardenElementProps {
  item: GardenItem;
  canvasSize: { width: number; height: number };
  onMove: (id: string, position: Position) => void;
  onRemove: (id: string) => void;
}

const GardenElement = ({ item, canvasSize, onMove, onRemove }: GardenElementProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const magicSound = new Howl({
    src: ['/sounds/magic.mp3'],
    volume: 0.3,
  });

  // Set up drag functionality for garden items
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'garden-element-placed',
    item: { id: item.id },
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult<{ x: number; y: number }>();
      if (dropResult && elementRef.current) {
        const { x, y } = dropResult;
        onMove(item.id, { x, y });
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Calculate position based on percentages
  const style = {
    left: `${item.position.x}%`,
    top: `${item.position.y}%`,
    transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale})`,
    opacity: isDragging ? 0.5 : 1,
  };

  // Render appropriate SVG based on item type
  const renderItemSvg = () => {
    switch (item.type) {
      case GardenItemType.FLOWER:
        return <Flower variant={item.level} />;
      case GardenItemType.TREE:
        return <Tree variant={item.level} />;
      case GardenItemType.DECORATION:
        return <Decoration variant={item.level} />;
      default:
        return null;
    }
  };

  // Handle double click to trigger growth or special effects
  const handleDoubleClick = () => {
    // Play magic sound
    magicSound.play();
    
    // Add magical particle effect
    if (elementRef.current) {
      const element = elementRef.current;
      const particles = document.createElement('div');
      particles.className = 'magic-particles';
      particles.style.left = '50%';
      particles.style.top = '50%';
      element.appendChild(particles);
      
      // Remove particles after animation
      setTimeout(() => {
        if (element.contains(particles)) {
          element.removeChild(particles);
        }
      }, 2000);
    }
  };

  // Handle remove button click
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(item.id);
  };

  return (
    <div
      ref={(node) => {
        drag(node);
        if (node) elementRef.current = node;
      }}
      className="absolute cursor-move transition-transform duration-200 select-none"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowControls(false);
      }}
      onClick={() => setShowControls(!showControls)}
      onDoubleClick={handleDoubleClick}
    >
      {/* SVG rendered based on item type */}
      <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
        {renderItemSvg()}
      </div>
      
      {/* Hover indicator */}
      {isHovered && (
        <div className="absolute inset-0 border-2 border-dashed border-[#b19cd9] rounded-full pointer-events-none"></div>
      )}
      
      {/* Controls when element is selected */}
      {showControls && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md flex overflow-hidden">
          <button
            className="p-1 hover:bg-red-100 focus:outline-none"
            onClick={handleRemove}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default GardenElement;
