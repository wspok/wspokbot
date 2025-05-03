import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GardenItem, GardenItemType, Position, RewardItem } from "../types";

interface GardenState {
  gardenItems: GardenItem[];
  unlockedItems: string[];
  
  // Actions
  addGardenItem: (item: GardenItem) => void;
  removeGardenItem: (id: string) => void;
  moveGardenItem: (id: string, position: Position) => void;
  unlockItem: (item: RewardItem) => void;
  saveGarden: () => void;
  loadGarden: () => void;
  resetGarden: () => void;
}

export const useGarden = create<GardenState>()(
  persist(
    (set, get) => ({
      gardenItems: [],
      unlockedItems: [],
      
      addGardenItem: (item) => {
        set((state) => ({
          gardenItems: [...state.gardenItems, item]
        }));
      },
      
      removeGardenItem: (id) => {
        set((state) => ({
          gardenItems: state.gardenItems.filter((item) => item.id !== id)
        }));
      },
      
      moveGardenItem: (id, position) => {
        set((state) => ({
          gardenItems: state.gardenItems.map((item) => 
            item.id === id ? { ...item, position } : item
          )
        }));
      },
      
      unlockItem: (item) => {
        // Add item to unlocked items if not already present
        set((state) => {
          const itemId = `${item.type}-${item.level}`;
          if (!state.unlockedItems.includes(itemId)) {
            return {
              unlockedItems: [...state.unlockedItems, itemId]
            };
          }
          return {};
        });
      },
      
      saveGarden: () => {
        // We're using persist middleware, so this is automatically saved
        console.log("Garden saved", get().gardenItems.length, "items");
      },
      
      loadGarden: () => {
        // Automatically loaded by persist middleware
        console.log("Garden loaded", get().gardenItems.length, "items");
        
        // But we'll add some starter items if the garden is empty
        if (get().gardenItems.length === 0) {
          // Add some default starter items
          const starterItems: GardenItem[] = [
            {
              id: `flower-1-${Date.now()}`,
              type: GardenItemType.FLOWER,
              level: 1,
              position: { x: 30, y: 50 },
              rotation: 2,
              scale: 1
            },
            {
              id: `tree-1-${Date.now() + 1}`,
              type: GardenItemType.TREE,
              level: 1,
              position: { x: 70, y: 30 },
              rotation: -3,
              scale: 1
            },
            {
              id: `deco-1-${Date.now() + 2}`,
              type: GardenItemType.DECORATION,
              level: 1,
              position: { x: 50, y: 70 },
              rotation: 0,
              scale: 1
            }
          ];
          
          set({ gardenItems: starterItems });
          
          // Unlock starter items
          set({
            unlockedItems: ['flower-1', 'tree-1', 'deco-1']
          });
        }
      },
      
      resetGarden: () => {
        set({ gardenItems: [], unlockedItems: [] });
      }
    }),
    {
      name: "magical-garden-storage"
    }
  )
);
