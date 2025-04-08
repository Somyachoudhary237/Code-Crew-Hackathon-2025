import React from 'react';

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="45" fill="#7dd3fc" opacity="0.8" />
      
      {/* Inner peaceful corner shape */}
      <path
        d="M75 35 L50 75 L25 35 L50 25 Z"
        fill="#0284c7"
        stroke="#0ea5e9"
        strokeWidth="2"
      />
      
      {/* Waves representing calm */}
      <path
        d="M30 55 Q40 45, 50 55 Q60 65, 70 55"
        stroke="white"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M30 65 Q40 55, 50 65 Q60 75, 70 65"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}