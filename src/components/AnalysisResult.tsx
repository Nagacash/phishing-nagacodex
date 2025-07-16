import React from 'react';
import { AnalysisResultType } from '../types';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { WarningIcon } from './icons/WarningIcon';
import { motion } from 'framer-motion';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

const riskStyles = {
  High: {
    bg: 'bg-red-900/50',
    border: 'border-red-500',
    text: 'text-red-400',
    label: 'High Risk'
  },
  Medium: {
    bg: 'bg-yellow-900/50',
    border: 'border-yellow-500',
    text: 'text-yellow-400',
    label: 'Medium Risk'
  },
  Low: {
    bg: 'bg-green-900/50',
    border: 'border-green-500',
    text: 'text-green-400',
    label: 'Low Risk'
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const styles = riskStyles[result.riskLevel];

  return (
    <div className={`bg-slate-800/50 p-6 rounded-xl border ${styles.border} space-y-6 shadow-lg`}>
      <div>
        <h2 className="text-xl font-semibold text-slate-100">Analysis Complete</h2>
        <div className={`mt-2 inline-flex items-center gap-x-2 px-3 py-1 rounded-full text-sm font-semibold ${styles.bg} ${styles.text}`}>
          <WarningIcon />
          {styles.label}
        </div>
      </div>
      
      <div className="bg-slate-900/50 p-4 rounded-lg">
        <h3 className="font-semibold text-slate-200">Summary</h3>
        <p className="text-slate-300 mt-1">{result.summary}</p>
      </div>
      
      <div>
        <h3 className="font-semibold text-slate-200 mb-3">Suspicious Characteristics</h3>
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {result.characteristics.map((char, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-slate-600">
              <h4 className="font-semibold text-slate-200">{char.feature}</h4>
              <blockquote className="mt-2 pl-3 border-l-2 border-yellow-500 text-slate-400 italic">
                "{char.suspiciousText}"
              </blockquote>
              <div className="mt-3 flex items-start space-x-2 text-slate-300">
                <LightbulbIcon className="flex-shrink-0 mt-1" />
                <p>{char.explanation}</p>
              </div>
            </motion.div>
          ))}
           {result.characteristics.length === 0 && (
             <div className="text-center py-4 text-slate-400">
                <p>No major suspicious characteristics found.</p>
             </div>
           )}
        </motion.div>
      </div>

      <div className="text-xs text-slate-500 pt-4 border-t border-slate-700">
        <strong>Disclaimer:</strong> AI analysis provides suggestions and is not a substitute for human verification. Always exercise caution and verify information independently.
      </div>
    </div>
  );
};

export default AnalysisResult;