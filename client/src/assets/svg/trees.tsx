import React from 'react';

// Tree component with different variants based on level
export const TreeSVG: React.FC<{ variant?: number }> = ({ variant = 1 }) => {
  switch (variant) {
    case 1:
      // Maple - Level 1
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk */}
          <rect x="45" y="60" width="10" height="40" fill="#8a6343" />
          
          {/* Foliage */}
          <path d="M50 20 L30 60 L70 60 Z" fill="#7bc86c" />
          <path d="M50 15 L25 50 L75 50 Z" fill="#7bc86c" />
          <path d="M50 10 L20 40 L80 40 Z" fill="#7bc86c" />
        </svg>
      );
    case 2:
      // Willow - Level 2
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk */}
          <path d="M50 100 L50 40 C45 35 40 30 35 40 C30 30 35 20 50 20 C65 20 70 30 65 40 C60 30 55 35 50 40" fill="#8a6343" />
          
          {/* Branches */}
          <path d="M50 40 C60 35 70 40 80 30" stroke="#8a6343" strokeWidth="2" fill="none" />
          <path d="M50 40 C40 35 30 40 20 30" stroke="#8a6343" strokeWidth="2" fill="none" />
          <path d="M50 50 C60 45 70 50 85 40" stroke="#8a6343" strokeWidth="2" fill="none" />
          <path d="M50 50 C40 45 30 50 15 40" stroke="#8a6343" strokeWidth="2" fill="none" />
          
          {/* Leaves */}
          <path d="M80 30 C85 25 90 30 80 40" stroke="#a0d995" strokeWidth="1" fill="none" />
          <path d="M20 30 C15 25 10 30 20 40" stroke="#a0d995" strokeWidth="1" fill="none" />
          <path d="M85 40 C90 35 95 40 85 50" stroke="#a0d995" strokeWidth="1" fill="none" />
          <path d="M15 40 C10 35 5 40 15 50" stroke="#a0d995" strokeWidth="1" fill="none" />
          
          {/* More drooping branches */}
          <path d="M80 30 C82 40 84 50 75 60" stroke="#a0d995" strokeWidth="1" fill="none" />
          <path d="M20 30 C18 40 16 50 25 60" stroke="#a0d995" strokeWidth="1" fill="none" />
          <path d="M70 35 C72 45 74 55 65 65" stroke="#a0d995" strokeWidth="1" fill="none" />
          <path d="M30 35 C28 45 26 55 35 65" stroke="#a0d995" strokeWidth="1" fill="none" />
        </svg>
      );
    case 3:
      // Cherry - Level 3
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk */}
          <path d="M50 100 L50 60 C45 50 55 40 60 30" fill="#8a6343" />
          
          {/* Branches */}
          <path d="M60 30 C65 25 75 30 80 25" stroke="#8a6343" strokeWidth="3" fill="none" />
          <path d="M60 30 C55 20 45 15 30 25" stroke="#8a6343" strokeWidth="3" fill="none" />
          <path d="M60 30 C70 15 60 10 50 5" stroke="#8a6343" strokeWidth="2" fill="none" />
          
          {/* Blossoms */}
          <circle cx="80" cy="25" r="10" fill="#ffb7c5" />
          <circle cx="30" cy="25" r="10" fill="#ffb7c5" />
          <circle cx="50" cy="5" r="10" fill="#ffb7c5" />
          <circle cx="65" cy="15" r="8" fill="#ffb7c5" />
          <circle cx="45" cy="15" r="8" fill="#ffb7c5" />
          <circle cx="70" cy="30" r="8" fill="#ffb7c5" />
          <circle cx="40" cy="30" r="8" fill="#ffb7c5" />
          
          {/* Centers */}
          <circle cx="80" cy="25" r="3" fill="#ff7eb9" />
          <circle cx="30" cy="25" r="3" fill="#ff7eb9" />
          <circle cx="50" cy="5" r="3" fill="#ff7eb9" />
          <circle cx="65" cy="15" r="2" fill="#ff7eb9" />
          <circle cx="45" cy="15" r="2" fill="#ff7eb9" />
          <circle cx="70" cy="30" r="2" fill="#ff7eb9" />
          <circle cx="40" cy="30" r="2" fill="#ff7eb9" />
          
          {/* Falling petals */}
          <path d="M60 40 Q65 45 60 50" fill="#ffb7c5" />
          <path d="M40 35 Q45 40 40 45" fill="#ffb7c5" />
          <path d="M70 45 Q75 50 70 55" fill="#ffb7c5" />
          <path d="M50 30 Q55 35 50 40" fill="#ffb7c5" />
        </svg>
      );
    case 4:
      // Magical Tree - Level 4
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk */}
          <path d="M50 100 C45 80 40 70 45 60 C40 55 45 40 50 30" fill="#8a6343" />
          <path d="M50 100 C55 80 60 70 55 60 C60 55 55 40 50 30" fill="#8a6343" />
          
          {/* Leaves */}
          <circle cx="50" cy="25" r="20" fill="#b19cd9" />
          <circle cx="35" cy="35" r="12" fill="#c5a6ff" />
          <circle cx="65" cy="35" r="12" fill="#c5a6ff" />
          <circle cx="50" cy="45" r="10" fill="#9a85c0" />
          
          {/* Glowing fruits */}
          <circle cx="40" cy="20" r="3" fill="#feff9c" />
          <circle cx="60" cy="20" r="3" fill="#feff9c" />
          <circle cx="30" cy="30" r="3" fill="#feff9c" />
          <circle cx="70" cy="30" r="3" fill="#feff9c" />
          <circle cx="45" cy="40" r="3" fill="#feff9c" />
          <circle cx="55" cy="40" r="3" fill="#feff9c" />
          
          {/* Magic sparkles */}
          <circle cx="40" cy="20" r="1" fill="#ffffff" className="animate-ping" />
          <circle cx="60" cy="20" r="1" fill="#ffffff" className="animate-ping" />
          <circle cx="50" cy="10" r="1" fill="#ffffff" className="animate-ping" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="45" y="60" width="10" height="40" fill="#8a6343" />
          <circle cx="50" cy="40" r="20" fill="#7bc86c" />
        </svg>
      );
  }
};

// Special event trees with seasons
export const SeasonalTree: React.FC<{ season?: 'spring' | 'summer' | 'autumn' | 'winter' }> = ({ season = 'spring' }) => {
  switch (season) {
    case 'spring':
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk */}
          <rect x="45" y="60" width="10" height="40" fill="#8a6343" />
          
          {/* Spring Foliage */}
          <circle cx="50" cy="35" r="25" fill="#c5e8b7" />
          
          {/* Blossoms */}
          <circle cx="40" cy="25" r="5" fill="#ffb7c5" />
          <circle cx="60" cy="25" r="5" fill="#ffb7c5" />
          <circle cx="35" cy="40" r="5" fill="#ffb7c5" />
          <circle cx="65" cy="40" r="5" fill="#ffb7c5" />
          <circle cx="50" cy="20" r="5" fill="#ffb7c5" />
        </svg>
      );
    case 'summer':
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk */}
          <rect x="45" y="60" width="10" height="40" fill="#8a6343" />
          
          {/* Summer Foliage */}
          <circle cx="50" cy="35" r="25" fill="#7bc86c" />
          
          {/* Fruits */}
          <circle cx="40" cy="25" r="3" fill="#ff9e7a" />
          <circle cx="60" cy="25" r="3" fill="#ff9e7a" />
          <circle cx="35" cy="40" r="3" fill="#ff9e7a" />
          <circle cx="65" cy="40" r="3" fill="#ff9e7a" />
          <circle cx="50" cy="20" r="3" fill="#ff9e7a" />
        </svg>
      );
    case 'autumn':
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk */}
          <rect x="45" y="60" width="10" height="40" fill="#8a6343" />
          
          {/* Autumn Foliage */}
          <circle cx="50" cy="35" r="25" fill="#ffcb77" />
          
          {/* Red and orange patches */}
          <circle cx="40" cy="25" r="8" fill="#ff9e7a" />
          <circle cx="60" cy="30" r="10" fill="#ff7eb9" />
          <circle cx="45" cy="45" r="7" fill="#ff9e7a" />
        </svg>
      );
    case 'winter':
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk */}
          <rect x="45" y="60" width="10" height="40" fill="#8a6343" />
          
          {/* Bare branches */}
          <path d="M50 60 L30 30" stroke="#8a6343" strokeWidth="2" fill="none" />
          <path d="M50 60 L70 30" stroke="#8a6343" strokeWidth="2" fill="none" />
          <path d="M30 30 L20 20" stroke="#8a6343" strokeWidth="1" fill="none" />
          <path d="M30 30 L40 15" stroke="#8a6343" strokeWidth="1" fill="none" />
          <path d="M70 30 L60 15" stroke="#8a6343" strokeWidth="1" fill="none" />
          <path d="M70 30 L80 20" stroke="#8a6343" strokeWidth="1" fill="none" />
          
          {/* Snow */}
          <circle cx="20" cy="20" r="2" fill="white" />
          <circle cx="40" cy="15" r="2" fill="white" />
          <circle cx="60" cy="15" r="2" fill="white" />
          <circle cx="80" cy="20" r="2" fill="white" />
          <circle cx="50" cy="25" r="2" fill="white" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="45" y="60" width="10" height="40" fill="#8a6343" />
          <circle cx="50" cy="40" r="20" fill="#7bc86c" />
        </svg>
      );
  }
};

// Mini-trees for decorative elements
export const MiniTree: React.FC<{ variant?: number }> = ({ variant = 1 }) => {
  switch (variant) {
    case 1:
      return (
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="35" width="6" height="15" fill="#8a6343" />
          <path d="M25 10 L15 35 L35 35 Z" fill="#7bc86c" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="35" width="6" height="15" fill="#8a6343" />
          <circle cx="25" cy="20" r="15" fill="#7bc86c" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="35" width="6" height="15" fill="#8a6343" />
          <path d="M25 10 L15 25 L35 25 Z" fill="#7bc86c" />
          <path d="M25 20 L10 40 L40 40 Z" fill="#7bc86c" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="35" width="6" height="15" fill="#8a6343" />
          <path d="M25 10 L15 35 L35 35 Z" fill="#7bc86c" />
        </svg>
      );
  }
};
