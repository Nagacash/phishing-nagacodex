import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

interface WarningProps {
  title: string;
  message: string;
}

const Warning: React.FC<WarningProps> = ({ title, message }) => {
  return (
    <div className="bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-300 p-4 rounded-r-lg" role="alert">
      <div className="flex">
        <div className="py-1">
          <WarningIcon />
        </div>
        <div className="ml-3">
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Warning;