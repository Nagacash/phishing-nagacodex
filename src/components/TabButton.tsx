import React from 'react';
import { motion } from 'framer-motion';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick, icon }) => {
  const activeClasses = 'text-blue-400';
  const inactiveClasses = 'text-slate-400 hover:text-slate-200';

  return (
    <motion.button
      onClick={onClick}
      className={`relative flex items-center space-x-2 px-4 py-3 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-t-lg ${isActive ? activeClasses : inactiveClasses}`}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span>{label}</span>
      {isActive && (
        <motion.div
          className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-blue-500"
          layoutId="active-tab-underline"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

export default TabButton;