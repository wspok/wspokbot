import React from 'react';

// Background elements and decorations for the garden
export const Background: React.FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c9e8ff" />
          <stop offset="100%" stopColor="#e9efd8" />
        </linearGradient>
      </defs>
      
      {/* Sky background */}
      <rect width="100" height="100" fill="url(#skyGradient)" />
      
      {/* Distant hills */}
      <path d="M0 70 Q 25 55 50 65 Q 75 50 100 70 L 100 100 L 0 100 Z" fill="#c2d8b2" />
      <path d="M0 80 Q 25 70 50 75 Q 75 65 100 80 L 100 100 L 0 100 Z" fill="#d7e8c5" />
      
      {/* Cloud 1 */}
      <g className="animate-[float_60s_linear_infinite]">
        <ellipse cx="20" cy="20" rx="10" ry="5" fill="white" fillOpacity="0.8" />
        <ellipse cx="30" cy="18" rx="8" ry="4" fill="white" fillOpacity="0.8" />
      </g>
      
      {/* Cloud 2 */}
      <g className="animate-[float_45s_linear_infinite]" style={{ animationDelay: '-20s' }}>
        <ellipse cx="70" cy="15" rx="12" ry="6" fill="white" fillOpacity="0.7" />
        <ellipse cx="60" cy="13" rx="9" ry="5" fill="white" fillOpacity="0.7" />
      </g>
    </svg>
  );
};

// Butterfly decoration that can be animated
export const Butterfly: React.FC = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path d="M50 35 L50 65" stroke="#333" strokeWidth="2" />
      
      {/* Wings - top */}
      <path d="M50 45 C 30 25, 20 15, 30 45" fill="#ffb7c5" className="animate-[flutter_1s_ease-in-out_infinite_alternate]">
        <animate attributeName="d" values="M50 45 C 30 25, 20 15, 30 45;M50 45 C 35 25, 25 20, 30 45;M50 45 C 30 25, 20 15, 30 45" dur="0.5s" repeatCount="indefinite" />
      </path>
      
      <path d="M50 45 C 70 25, 80 15, 70 45" fill="#ffb7c5" className="animate-[flutter_1s_ease-in-out_infinite_alternate]">
        <animate attributeName="d" values="M50 45 C 70 25, 80 15, 70 45;M50 45 C 65 25, 75 20, 70 45;M50 45 C 70 25, 80 15, 70 45" dur="0.5s" repeatCount="indefinite" />
      </path>
      
      {/* Wings - bottom */}
      <path d="M50 45 C 30 65, 20 75, 30 45" fill="#c5a6ff" className="animate-[flutter_1s_ease-in-out_infinite_alternate]">
        <animate attributeName="d" values="M50 45 C 30 65, 20 75, 30 45;M50 45 C 35 65, 25 70, 30 45;M50 45 C 30 65, 20 75, 30 45" dur="0.5s" repeatCount="indefinite" />
      </path>
      
      <path d="M50 45 C 70 65, 80 75, 70 45" fill="#c5a6ff" className="animate-[flutter_1s_ease-in-out_infinite_alternate]">
        <animate attributeName="d" values="M50 45 C 70 65, 80 75, 70 45;M50 45 C 65 65, 75 70, 70 45;M50 45 C 70 65, 80 75, 70 45" dur="0.5s" repeatCount="indefinite" />
      </path>
      
      {/* Antenna */}
      <path d="M50 35 L45 25" stroke="#333" strokeWidth="1" />
      <path d="M50 35 L55 25" stroke="#333" strokeWidth="1" />
      <circle cx="45" cy="25" r="1" fill="#333" />
      <circle cx="55" cy="25" r="1" fill="#333" />
    </svg>
  );
};

// Rainbow decoration for magical effects
export const Rainbow: React.FC = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 60 A 40 40 0 0 1 90 60" stroke="#ff7eb9" strokeWidth="5" fill="none" />
      <path d="M20 60 A 30 30 0 0 1 80 60" stroke="#ff9e7a" strokeWidth="5" fill="none" />
      <path d="M30 60 A 20 20 0 0 1 70 60" stroke="#ffcb77" strokeWidth="5" fill="none" />
      <path d="M40 60 A 10 10 0 0 1 60 60" stroke="#7bc86c" strokeWidth="5" fill="none" />
    </svg>
  );
};
