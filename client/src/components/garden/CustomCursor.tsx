import { WateringCan, MagicWand } from '../../assets/svg/tools';

interface CustomCursorProps {
  tool: string;
  position: { x: number; y: number };
}

const CustomCursor = ({ tool, position }: CustomCursorProps) => {
  const renderCursorContent = () => {
    switch (tool) {
      case 'water':
        return (
          <div className="w-8 h-8">
            <WateringCan />
          </div>
        );
      case 'magic':
        return (
          <div className="w-8 h-8">
            <MagicWand />
          </div>
        );
      default:
        return null;
    }
  };

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <div 
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      style={cursorStyle}
    >
      {renderCursorContent()}
    </div>
  );
};

export default CustomCursor;
