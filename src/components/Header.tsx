import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-3 sm:gap-4 mb-3">
        <LogoIcon className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0" />
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 text-left">
          Phishing Email Analysis & Awareness Tool
        </h1>
      </div>
      <p className="mt-1 text-slate-400 max-w-2xl mx-auto">
        Utilize AI to analyze suspicious emails, understand phishing tactics, and generate safe, simulated training exercises.
        <span className="block text-slate-500 text-sm mt-1">Powered by Naga Codex</span>
      </p>
    </header>
  );
};

export default Header;
