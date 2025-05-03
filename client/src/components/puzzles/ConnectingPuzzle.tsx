import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { cn } from '../../lib/utils';
import { Puzzle } from '../../lib/types';

interface ConnectingPuzzleProps {
  puzzle: Puzzle;
  onSolve: () => void;
}

interface Connection {
  startNodeId: string;
  endNodeId: string;
}

interface Node {
  id: string;
  text: string;
  group: string;
  position: { x: number; y: number };
}

const ConnectingPuzzle = ({ puzzle, onSolve }: ConnectingPuzzleProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [linePreview, setLinePreview] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [completed, setCompleted] = useState(false);
  
  // Sound effects
  const hitSound = new Howl({
    src: ['/sounds/hit.mp3'],
    volume: 0.3,
  });
  
  const magicSound = new Howl({
    src: ['/sounds/magic.mp3'],
    volume: 0.5,
  });

  // Initialize puzzle nodes based on the puzzle data
  useEffect(() => {
    if (puzzle && puzzle.data && puzzle.data.nodes) {
      const initialNodes = puzzle.data.nodes as { id: string; text: string; group: string }[];
      
      // Arrange nodes in a circle or line depending on the number
      const arrangedNodes = initialNodes.map((node, index) => {
        let x, y;
        const totalNodes = initialNodes.length;
        
        // If we have a small number of nodes, arrange them in a line
        if (totalNodes <= 6) {
          x = (index * (100 / (totalNodes - 1))) || 0;
          y = node.group === 'start' ? 20 : 80;
        } else {
          // For more nodes, arrange in a circle
          const angle = (index / totalNodes) * Math.PI * 2;
          const radius = 40;
          x = 50 + radius * Math.cos(angle);
          y = 50 + radius * Math.sin(angle);
        }
        
        return {
          ...node,
          position: { x, y }
        };
      });
      
      setNodes(arrangedNodes);
    }
  }, [puzzle]);

  // Handle mouse movement for line preview
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeNode || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const startNode = nodes.find(node => node.id === activeNode);
    if (startNode) {
      setLinePreview({
        x1: startNode.position.x,
        y1: startNode.position.y,
        x2: x,
        y2: y
      });
    }
  };

  // Handle node click - to start or complete a connection
  const handleNodeClick = (nodeId: string) => {
    // Play sound effect
    hitSound.play();
    
    if (!activeNode) {
      // Start new connection
      setActiveNode(nodeId);
    } else if (activeNode === nodeId) {
      // Clicked the same node, cancel
      setActiveNode(null);
      setLinePreview(null);
    } else {
      // Complete connection
      const startNode = nodes.find(node => node.id === activeNode);
      const endNode = nodes.find(node => node.id === nodeId);
      
      if (startNode && endNode) {
        // Check if nodes are from different groups (we can only connect start to end)
        if (startNode.group !== endNode.group) {
          // Check if connection already exists
          const connectionExists = connections.some(
            conn => (conn.startNodeId === activeNode && conn.endNodeId === nodeId) ||
                   (conn.startNodeId === nodeId && conn.endNodeId === activeNode)
          );
          
          if (!connectionExists) {
            // Add new connection
            const newConnection = {
              startNodeId: activeNode,
              endNodeId: nodeId
            };
            setConnections([...connections, newConnection]);
            
            // Play magic sound for successful connection
            magicSound.play();
            
            // Check if all required connections are made
            checkPuzzleComplete([...connections, newConnection]);
          }
        }
      }
      
      // Reset active node and line preview
      setActiveNode(null);
      setLinePreview(null);
    }
  };

  // Check if the puzzle is completed
  const checkPuzzleComplete = (currentConnections: Connection[]) => {
    if (puzzle && puzzle.data && puzzle.data.solutions) {
      const solutions = puzzle.data.solutions as { start: string; end: string }[];
      
      // Count how many required connections are made
      const requiredConnectionCount = solutions.length;
      let correctConnectionCount = 0;
      
      solutions.forEach(solution => {
        const connectionExists = currentConnections.some(
          conn => (conn.startNodeId === solution.start && conn.endNodeId === solution.end) ||
                 (conn.startNodeId === solution.end && conn.endNodeId === solution.start)
        );
        
        if (connectionExists) {
          correctConnectionCount++;
        }
      });
      
      // If all required connections are made, the puzzle is complete
      if (correctConnectionCount === requiredConnectionCount) {
        setCompleted(true);
        onSolve();
      }
    }
  };

  // Reset active connection
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current && activeNode) {
      setActiveNode(null);
      setLinePreview(null);
    }
  };

  // Render connections between nodes
  const renderConnections = () => {
    return connections.map((connection, index) => {
      const startNode = nodes.find(node => node.id === connection.startNodeId);
      const endNode = nodes.find(node => node.id === connection.endNodeId);
      
      if (!startNode || !endNode) return null;
      
      return (
        <svg key={index} className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <line
            x1={`${startNode.position.x}%`}
            y1={`${startNode.position.y}%`}
            x2={`${endNode.position.x}%`}
            y2={`${endNode.position.y}%`}
            stroke="#78a565"
            strokeWidth="3"
            strokeDasharray={completed ? "none" : "5,5"}
            className={completed ? "animate-pulse" : ""}
          />
        </svg>
      );
    });
  };

  // Render line preview when creating a new connection
  const renderLinePreview = () => {
    if (!linePreview) return null;
    
    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <line
          x1={`${linePreview.x1}%`}
          y1={`${linePreview.y1}%`}
          x2={`${linePreview.x2}%`}
          y2={`${linePreview.y2}%`}
          stroke="#b19cd9"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </svg>
    );
  };

  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-64 md:h-80 bg-white rounded-lg border border-[#78a565] mb-4"
      onMouseMove={handleMouseMove}
      onClick={handleCanvasClick}
    >
      {/* Render connections between nodes */}
      {renderConnections()}
      
      {/* Render line preview */}
      {linePreview && renderLinePreview()}
      
      {/* Render nodes */}
      {nodes.map(node => (
        <div
          key={node.id}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all",
            "border-2 shadow-md",
            node.group === 'start' ? "bg-[#ffcb77] border-[#e5b66c]" : "bg-[#c5a6ff] border-[#b19cd9]",
            activeNode === node.id && "ring-4 ring-[#b19cd9] ring-opacity-50 scale-110"
          )}
          style={{
            left: `${node.position.x}%`,
            top: `${node.position.y}%`
          }}
          onClick={() => handleNodeClick(node.id)}
        >
          <span className="text-sm font-medium text-center">{node.text}</span>
        </div>
      ))}
      
      {/* Instructions */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-500">
        Click on nodes to create connections between matching pairs
      </div>
    </div>
  );
};

export default ConnectingPuzzle;
