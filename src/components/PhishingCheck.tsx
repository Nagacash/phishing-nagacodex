import React, { useState, useCallback } from 'react';
import { analyzeEmail } from '../services/geminiService';
import { AnalysisResultType } from '../types';
import Spinner from './Spinner';
import ErrorDisplay from './ErrorDisplay';
import AnalysisResult from './AnalysisResult';
import { motion, AnimatePresence } from 'framer-motion';

const PhishingCheck: React.FC = () => {
  const [emailContent, setEmailContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResultType | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!emailContent.trim()) {
      setError('Email content cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeEmail(emailContent);
      setResult(analysisResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Analysis failed: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [emailContent]);

  return (
    <motion.div
      key="phishing-check"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-slate-100">Analyze Suspicious Email</h2>
        <p className="text-slate-400 mt-1">Paste the full email content below.</p>
        
        <textarea
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          placeholder="Paste full email source here, including headers and body..."
          className="w-full h-60 p-3 mt-4 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          disabled={isLoading}
        />
        <p className="text-xs text-slate-500 mt-2">
          For your security, please remove any personal or sensitive information before analyzing.
        </p>
        <motion.button
          onClick={handleAnalyze}
          disabled={isLoading || !emailContent.trim()}
          className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:bg-slate-600 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? <Spinner /> : 'Analyze Email'}
        </motion.button>
      </div>
      
      <div className="min-h-[80px]">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center items-center p-6 bg-slate-800 rounded-xl"
            >
              <Spinner />
              <span className="ml-3 text-slate-300">AI is analyzing...</span>
            </motion.div>
          )}
          {error && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ErrorDisplay message={error} />
            </motion.div>
          )}
          {result && (
             <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AnalysisResult result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PhishingCheck;