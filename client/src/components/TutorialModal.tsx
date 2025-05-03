import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface TutorialModalProps {
  onClose: () => void;
}

const TutorialModal = ({ onClose }: TutorialModalProps) => {
  const [step, setStep] = useState(0);
  
  const tutorialSteps = [
    {
      title: "Welcome to Your Magical Garden!",
      content: "In this enchanting world, you can create your own magical garden by solving puzzles and unlocking new garden elements.",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e9efd8'/><circle cx='50' cy='40' r='20' fill='%23ffcb77'/><rect x='40' y='70' width='20' height='20' fill='%23b19cd9'/><path d='M30,70 C20,50 80,50 70,70' fill='%2378a565' stroke='%235d8047' strokeWidth='2'/></svg>"
    },
    {
      title: "Inventory & Garden Elements",
      content: "Drag plants, trees, and decorations from your inventory onto the garden canvas. Unlock more items by solving puzzles!",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='30' height='100' fill='%23f0f4e6'/><rect x='30' y='0' width='70' height='100' fill='%23e9efd8'/><rect x='5' y='20' width='20' height='20' fill='%23ff7eb9'/><rect x='5' y='50' width='20' height='20' fill='%237bc86c'/><path d='M60,70 L80,70 M70,60 L70,80' stroke='%23b19cd9' strokeWidth='4'/></svg>"
    },
    {
      title: "Garden Tools",
      content: "Use the watering can to nurture your plants and the magic wand to add special effects to your garden!",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M20,80 C20,50 50,50 60,30' fill='none' stroke='%235a7d9a' strokeWidth='4'/><circle cx='60' cy='30' r='10' fill='%235a7d9a'/><path d='M70,70 L90,50' stroke='%23b19cd9' strokeWidth='4'/><path d='M90,50 L95,45 L85,45 Z' fill='%23b19cd9'/></svg>"
    },
    {
      title: "Solve Puzzles",
      content: "Complete magical puzzles to unlock new garden elements. Each puzzle solved brings new items to your collection!",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f0f4e6' rx='10' ry='10'/><rect x='20' y='20' width='25' height='25' fill='%23ffcb77'/><rect x='55' y='20' width='25' height='25' fill='%23ff7eb9'/><rect x='20' y='55' width='25' height='25' fill='%23c5a6ff'/><rect x='55' y='55' width='25' height='25' fill='%237bc86c'/></svg>"
    },
    {
      title: "Save Your Progress",
      content: "Don't forget to save your garden design! Your progress is stored locally so you can continue building your magical garden later.",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='70' height='80' x='15' y='10' fill='%23ffffff' rx='5' ry='5' stroke='%23aaaaaa' strokeWidth='2'/><rect width='50' height='10' x='25' y='20' fill='%235a7d9a'/><rect width='50' height='10' x='25' y='40' fill='%235a7d9a'/><rect width='50' height='10' x='25' y='60' fill='%235a7d9a'/><path d='M75,50 L85,60 L65,80' fill='none' stroke='%2378a565' strokeWidth='4'/></svg>"
    }
  ];
  
  const currentStep = tutorialSteps[step];
  
  const handleNextStep = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-[#4a6c39]">{currentStep.title}</h2>
        </div>
        
        <div 
          className="w-full h-48 mb-6 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${currentStep.image}")` }}
        ></div>
        
        <p className="text-gray-600 mb-8 text-center">{currentStep.content}</p>
        
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevStep}
            variant="outline"
            className="border-[#78a565] text-[#78a565]"
            disabled={step === 0}
          >
            Previous
          </Button>
          
          <div className="flex space-x-1">
            {tutorialSteps.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${index === step ? 'bg-[#78a565]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          <Button
            onClick={handleNextStep}
            className="bg-[#78a565] hover:bg-[#5d8047] text-white"
          >
            {step === tutorialSteps.length - 1 ? 'Start Gardening' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
