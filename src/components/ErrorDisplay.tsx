import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="bg-red-900/50 border border-red-500/50 text-red-300 p-4 rounded-xl flex items-start space-x-3" role="alert">
      <WarningIcon className="flex-shrink-0 h-5 w-5 mt-0.5" />
      <div>
        <h3 className="font-semibold">An Error Occurred</h3>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;