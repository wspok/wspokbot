import React from 'react';

// Flower component with different variants based on level
export const Flower: React.FC<{ variant?: number }> = ({ variant = 1 }) => {
  switch (variant) {
    case 1:
      // Daisy - Level 1
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Stem */}
          <path d="M50 100 L50 65" stroke="#78a565" strokeWidth="4" fill="none" />
          
          {/* Petals */}
          <circle cx="50" cy="50" r="15" fill="#f9f5d7" />
          <circle cx="50" cy="35" r="8" fill="#f9f5d7" />
          <circle cx="65" cy="50" r="8" fill="#f9f5d7" />
          <circle cx="50" cy="65" r="8" fill="#f9f5d7" />
          <circle cx="35" cy="50" r="8" fill="#f9f5d7" />
          <circle cx="60" cy="40" r="8" fill="#f9f5d7" />
          <circle cx="60" cy="60" r="8" fill="#f9f5d7" />
          <circle cx="40" cy="60" r="8" fill="#f9f5d7" />
          <circle cx="40" cy="40" r="8" fill="#f9f5d7" />
          
          {/* Center */}
          <circle cx="50" cy="50" r="8" fill="#ffcb77" />
        </svg>
      );
    case 2:
      // Rose - Level 2
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Stem */}
          <path d="M50 100 L50 65" stroke="#78a565" strokeWidth="4" fill="none" />
          <path d="M50 80 L60 75" stroke="#78a565" strokeWidth="2" fill="none" />
          <path d="M60 75 L65 80" stroke="#78a565" strokeWidth="2" fill="none" />
          <path d="M60 75 L65 70" stroke="#78a565" strokeWidth="2" fill="none" />
          
          {/* Leaves */}
          <path d="M50 80 L40 75 Q30 65 40 60 Q45 60 50 70 Z" fill="#78a565" />
          
          {/* Flower */}
          <ellipse cx="45" cy="42" rx="8" ry="12" fill="#ff7eb9" transform="rotate(-20 45 42)" />
          <ellipse cx="55" cy="42" rx="8" ry="12" fill="#ff7eb9" transform="rotate(20 55 42)" />
          <ellipse cx="40" cy="50" rx="8" ry="12" fill="#ff7eb9" transform="rotate(-60 40 50)" />
          <ellipse cx="60" cy="50" rx="8" ry="12" fill="#ff7eb9" transform="rotate(60 60 50)" />
          <ellipse cx="45" cy="58" rx="8" ry="12" fill="#ff7eb9" transform="rotate(-100 45 58)" />
          <ellipse cx="55" cy="58" rx="8" ry="12" fill="#ff7eb9" transform="rotate(100 55 58)" />
          
          {/* Center */}
          <circle cx="50" cy="50" r="8" fill="#d14f86" />
        </svg>
      );
    case 3:
      // Magical Lily - Level 3
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Stem */}
          <path d="M50 100 L50 65" stroke="#78a565" strokeWidth="4" fill="none" />
          
          {/* Leaves */}
          <path d="M50 85 L35 75 Q25 65 35 60 Q45 65 50 75 Z" fill="#78a565" />
          <path d="M50 85 L65 75 Q75 65 65 60 Q55 65 50 75 Z" fill="#78a565" />
          
          {/* Flower */}
          <path d="M50 30 L40 50 L50 65 L60 50 Z" fill="#c5a6ff" />
          <path d="M30 40 L50 50 L40 70 L20 60 Z" fill="#c5a6ff" />
          <path d="M70 40 L50 50 L60 70 L80 60 Z" fill="#c5a6ff" />
          
          {/* Center */}
          <circle cx="50" cy="50" r="8" fill="#9a85c0" />
          
          {/* Magic sparkles */}
          <circle cx="30" cy="30" r="2" fill="#feff9c" className="animate-ping" />
          <circle cx="70" cy="30" r="2" fill="#feff9c" className="animate-ping" />
          <circle cx="30" cy="70" r="2" fill="#feff9c" className="animate-ping" />
          <circle cx="70" cy="70" r="2" fill="#feff9c" className="animate-ping" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="15" fill="#ff7eb9" />
        </svg>
      );
  }
};

// Tree component with different variants based on level
export const Tree: React.FC<{ variant?: number }> = ({ variant = 1 }) => {
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
          <path d="M80 30 C85 25 90 30 80 40" stroke="#a0d995" strokeWidth="1" fill="none" className="animate-[sway_4s_ease-in-out_infinite]" />
          <path d="M20 30 C15 25 10 30 20 40" stroke="#a0d995" strokeWidth="1" fill="none" className="animate-[sway_4s_ease-in-out_infinite]" />
          <path d="M85 40 C90 35 95 40 85 50" stroke="#a0d995" strokeWidth="1" fill="none" className="animate-[sway_4s_ease-in-out_infinite]" />
          <path d="M15 40 C10 35 5 40 15 50" stroke="#a0d995" strokeWidth="1" fill="none" className="animate-[sway_4s_ease-in-out_infinite]" />
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
          
          {/* Magic sparkles */}
          <circle cx="80" cy="15" r="1" fill="#feff9c" className="animate-ping" />
          <circle cx="30" cy="15" r="1" fill="#feff9c" className="animate-ping" />
          <circle cx="50" cy="0" r="1" fill="#feff9c" className="animate-ping" />
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

// Decoration component with different variants based on level
export const Decoration: React.FC<{ variant?: number }> = ({ variant = 1 }) => {
  switch (variant) {
    case 1:
      // Bench - Level 1
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Bench top */}
          <rect x="20" y="40" width="60" height="10" fill="#deb887" rx="2" ry="2" />
          
          {/* Bench legs */}
          <rect x="25" y="50" width="5" height="20" fill="#8a6343" />
          <rect x="70" y="50" width="5" height="20" fill="#8a6343" />
          
          {/* Bench supports */}
          <rect x="20" y="55" width="60" height="3" fill="#8a6343" />
        </svg>
      );
    case 2:
      // Fountain - Level 2
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <ellipse cx="50" cy="80" rx="30" ry="10" fill="#d3d3d3" />
          
          {/* Lower basin */}
          <ellipse cx="50" cy="65" rx="20" ry="7" fill="#5a7d9a" />
          <ellipse cx="50" cy="62" rx="20" ry="7" fill="#7fb3d5" />
          
          {/* Middle basin */}
          <rect x="45" y="40" width="10" height="20" fill="#d3d3d3" />
          <ellipse cx="50" cy="40" rx="10" ry="4" fill="#5a7d9a" />
          <ellipse cx="50" cy="38" rx="10" ry="4" fill="#7fb3d5" />
          
          {/* Top basin */}
          <rect x="47" y="25" width="6" height="12" fill="#d3d3d3" />
          <ellipse cx="50" cy="25" rx="5" ry="2" fill="#5a7d9a" />
          <ellipse cx="50" cy="23" rx="5" ry="2" fill="#7fb3d5" />
          
          {/* Water */}
          <path d="M50 15 C52 18 54 20 50 25" stroke="#7fb3d5" strokeWidth="1" fill="none" className="animate-[bounce_2s_ease-in-out_infinite]" />
          <path d="M50 15 C48 18 46 20 50 25" stroke="#7fb3d5" strokeWidth="1" fill="none" className="animate-[bounce_2s_ease-in-out_infinite]" />
          <path d="M50 40 C55 45 60 50 65 55" stroke="#7fb3d5" strokeWidth="1" fill="none" className="animate-[bounce_1.8s_ease-in-out_infinite]" />
          <path d="M50 40 C45 45 40 50 35 55" stroke="#7fb3d5" strokeWidth="1" fill="none" className="animate-[bounce_1.8s_ease-in-out_infinite]" />
        </svg>
      );
    case 3:
      // Gazebo - Level 3
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <path d="M30 60 L70 60 L65 70 L35 70 Z" fill="#d3d3d3" />
          
          {/* Pillars */}
          <rect x="35" y="35" width="4" height="25" fill="#eee" />
          <rect x="61" y="35" width="4" height="25" fill="#eee" />
          
          {/* Roof */}
          <path d="M25 35 L75 35 L50 15 Z" fill="#c5a6ff" />
          
          {/* Inner structure */}
          <path d="M37 60 L63 60 L63 45 L37 45 Z" fill="#f0f0f0" fillOpacity="0.6" />
          
          {/* Decorative elements */}
          <path d="M50 15 L50 10" stroke="#b19cd9" strokeWidth="2" />
          <circle cx="50" cy="8" r="3" fill="#b19cd9" />
          
          {/* Magic sparkles */}
          <circle cx="50" cy="5" r="1" fill="#feff9c" className="animate-ping" />
          <circle cx="30" cy="35" r="1" fill="#feff9c" className="animate-ping" />
          <circle cx="70" cy="35" r="1" fill="#feff9c" className="animate-ping" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="35" y="50" width="30" height="30" fill="#deb887" />
          <polygon points="35,50 65,50 50,30" fill="#deb887" />
        </svg>
      );
  }
};
