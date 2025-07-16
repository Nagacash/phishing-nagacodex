import React from 'react';

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5 text-yellow-400' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM9 11a1 1 0 11-2 0 1 1 0 012 0zM4.343 5.757a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 16a1 1 0 11-2 0 1 1 0 012 0z" />
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 011-1h0a1 1 0 011 1v.5a3.5 3.5 0 01-3 3.464V12a1 1 0 11-2 0v-2.036A5.5 5.5 0 0110 3.5V3a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);