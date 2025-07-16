import React from 'react';

export const ToolboxIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 4h6a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
    <path d="M3 10v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-8" />
    <path d="M7 15h10" />
    <path d="M10 12v6" />
    <path d="M14 12v6" />
  </svg>
);
