import React from 'react';

// Watering Can SVG Component
export const WateringCan: React.FC = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Spout */}
      <path d="M70 40 C75 30 85 25 90 35" stroke="#5a7d9a" strokeWidth="6" fill="none" />
      
      {/* Water drops */}
      <path d="M90 35 L93 45" stroke="#7fb3d5" strokeWidth="2" strokeDasharray="2 4" className="animate-bounce" />
      <path d="M90 38 L97 50" stroke="#7fb3d5" strokeWidth="2" strokeDasharray="2 4" className="animate-bounce" />
      <path d="M90 40 L87 52" stroke="#7fb3d5" strokeWidth="2" strokeDasharray="2 4" className="animate-bounce" />
      
      {/* Can body */}
      <path d="M20 45 L60 45 L55 75 L25 75 Z" fill="#5a7d9a" />
      
      {/* Handle */}
      <path d="M25 45 C25 30 55 30 55 45" stroke="#5a7d9a" strokeWidth="6" fill="none" />
      
      {/* Reflection highlight */}
      <path d="M30 50 L40 50 L38 70 L32 70 Z" fill="#7fb3d5" fillOpacity="0.5" />
    </svg>
  );
};

// Magic Wand SVG Component
export const MagicWand: React.FC = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Wand body */}
      <rect x="30" y="50" width="40" height="8" rx="4" ry="4" fill="#b19cd9" transform="rotate(-45 50 50)" />
      
      {/* Wand tip */}
      <circle cx="71" cy="29" r="6" fill="#feff9c" className="animate-pulse" />
      
      {/* Magic sparkles */}
      <path d="M71 20 L71 15" stroke="#feff9c" strokeWidth="2" />
      <path d="M71 43 L71 38" stroke="#feff9c" strokeWidth="2" />
      <path d="M62 29 L57 29" stroke="#feff9c" strokeWidth="2" />
      <path d="M85 29 L80 29" stroke="#feff9c" strokeWidth="2" />
      <path d="M65 23 L61 19" stroke="#feff9c" strokeWidth="2" />
      <path d="M65 35 L61 39" stroke="#feff9c" strokeWidth="2" />
      <path d="M77 23 L81 19" stroke="#feff9c" strokeWidth="2" />
      <path d="M77 35 L81 39" stroke="#feff9c" strokeWidth="2" />
    </svg>
  );
};
