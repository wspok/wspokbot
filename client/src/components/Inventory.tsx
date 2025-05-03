import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useGarden } from '../lib/stores/useGarden';
import { usePuzzles } from '../lib/stores/usePuzzles';
import { cn } from '../lib/utils';
import { Flower, Tree, Decoration } from '../assets/svg/flowers';
import { WateringCan, MagicWand } from '../assets/svg/tools';
import { GardenItemType } from '../lib/types';

interface InventoryProps {
  setCursorTool: (tool: string | null) => void;
}

interface InventoryItemProps {
  id: string;
  type: string;
  name: string;
  level: number;
  locked?: boolean;
  onClick?: () => void;
}

// Individual inventory item component with drag functionality
const InventoryItem = ({ id, type, name, level, locked = false, onClick }: InventoryItemProps) => {
  // Set up drag functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'garden-element',
    item: { id, type, level },
    canDrag: !locked,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Render appropriate SVG based on type
  const renderIcon = () => {
    switch (type) {
      case GardenItemType.FLOWER:
        return <Flower variant={level} />;
      case GardenItemType.TREE:
        return <Tree variant={level} />;
      case GardenItemType.DECORATION:
        return <Decoration variant={level} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={drag}
      className={cn(
        "relative flex flex-col items-center justify-center p-2 border-2 rounded-lg transition-all",
        "hover:border-[#b19cd9] hover:bg-[#f5f8ed] cursor-grab",
        locked ? "grayscale opacity-50 cursor-not-allowed" : "border-[#78a565] bg-white",
        isDragging && "opacity-30"
      )}
      onClick={onClick}
    >
      <div className="w-16 h-16 flex items-center justify-center">
        {renderIcon()}
      </div>
      <p className="text-xs font-medium mt-1 text-center">{name}</p>
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-[#787878] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

// Tool item component
const ToolItem = ({ name, icon, onClick }: { name: string; icon: React.ReactNode; onClick: () => void }) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-2 border-2 border-[#78a565] rounded-lg bg-white hover:border-[#b19cd9] hover:bg-[#f5f8ed] cursor-pointer"
      onClick={onClick}
    >
      <div className="w-16 h-16 flex items-center justify-center">
        {icon}
      </div>
      <p className="text-xs font-medium mt-1 text-center">{name}</p>
    </div>
  );
};

// Main inventory component
const Inventory = ({ setCursorTool }: InventoryProps) => {
  const [activeTab, setActiveTab] = useState<'plants' | 'tools'>('plants');
  const { unlockedItems } = useGarden();
  const { completedPuzzles, solvedCount } = usePuzzles();

  // List of all possible inventory items
  const allItems = [
    { id: 'flower-1', type: GardenItemType.FLOWER, name: 'Daisy', level: 1, requiredPuzzles: 0 },
    { id: 'flower-2', type: GardenItemType.FLOWER, name: 'Rose', level: 2, requiredPuzzles: 1 },
    { id: 'flower-3', type: GardenItemType.FLOWER, name: 'Lily', level: 3, requiredPuzzles: 3 },
    { id: 'tree-1', type: GardenItemType.TREE, name: 'Maple', level: 1, requiredPuzzles: 0 },
    { id: 'tree-2', type: GardenItemType.TREE, name: 'Willow', level: 2, requiredPuzzles: 2 },
    { id: 'tree-3', type: GardenItemType.TREE, name: 'Cherry', level: 3, requiredPuzzles: 4 },
    { id: 'deco-1', type: GardenItemType.DECORATION, name: 'Bench', level: 1, requiredPuzzles: 0 },
    { id: 'deco-2', type: GardenItemType.DECORATION, name: 'Fountain', level: 2, requiredPuzzles: 2 },
    { id: 'deco-3', type: GardenItemType.DECORATION, name: 'Gazebo', level: 3, requiredPuzzles: 5 },
  ];

  // Filter items based on unlocked status
  const displayItems = allItems.map(item => ({
    ...item,
    locked: solvedCount < item.requiredPuzzles
  }));

  // Handle tool selection
  const handleToolSelect = (tool: string) => {
    setCursorTool(tool);
  };

  return (
    <div className="w-full md:w-64 h-auto md:h-full bg-[#f0f4e6] p-4 flex flex-col border-r border-[#78a565]">
      <h2 className="text-xl font-semibold text-[#4a6c39] mb-4">Inventory</h2>
      
      {/* Tab navigation */}
      <div className="flex mb-4 border-b border-[#78a565]">
        <button
          className={cn(
            "py-2 px-4 text-sm font-medium",
            activeTab === 'plants' ? "text-[#78a565] border-b-2 border-[#78a565]" : "text-gray-500"
          )}
          onClick={() => setActiveTab('plants')}
        >
          Plants & Decor
        </button>
        <button
          className={cn(
            "py-2 px-4 text-sm font-medium",
            activeTab === 'tools' ? "text-[#78a565] border-b-2 border-[#78a565]" : "text-gray-500"
          )}
          onClick={() => setActiveTab('tools')}
        >
          Tools
        </button>
      </div>
      
      {/* Inventory grid */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'plants' ? (
          <div className="grid grid-cols-2 gap-3">
            {displayItems.map((item) => (
              <InventoryItem
                key={item.id}
                id={item.id}
                type={item.type}
                name={item.name}
                level={item.level}
                locked={item.locked}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <ToolItem
              name="Water Plants"
              icon={<WateringCan />}
              onClick={() => handleToolSelect('water')}
            />
            <ToolItem
              name="Magic Wand"
              icon={<MagicWand />}
              onClick={() => handleToolSelect('magic')}
            />
          </div>
        )}
      </div>
      
      {/* Puzzle progress */}
      <div className="mt-4 bg-white rounded-lg p-3 border border-[#78a565]">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-[#4a6c39]">Puzzle Progress</h3>
          <span className="text-sm">{solvedCount}/10</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-[#b19cd9] h-2.5 rounded-full"
            style={{ width: `${(solvedCount / 10) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
