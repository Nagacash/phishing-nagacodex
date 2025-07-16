import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgb(96, 165, 250)' }} />
        <stop offset="100%" style={{ stopColor: 'rgb(45, 212, 191)' }} />
      </linearGradient>
    </defs>
    <path
      d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12c4.16-1.26 8-6.45 8-12V5l-8-3zm-1.05 15.5l-3.5-3.5l1.41-1.41l2.09 2.09l4.59-4.59l1.41 1.41l-6 6z"
      fill="url(#logo-gradient)"
    />
  </svg>
);