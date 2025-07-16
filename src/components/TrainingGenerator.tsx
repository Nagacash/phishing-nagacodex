import React, { useState, useCallback } from 'react';
import { generateTrainingEmail } from '../services/geminiService';
import Spinner from './Spinner';
import ErrorDisplay from './ErrorDisplay';
import Warning from './Warning';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { motion, AnimatePresence } from 'framer-motion';

const TrainingGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedEmail(null);
    setIsCopied(false);

    try {
      const email = await generateTrainingEmail(prompt);
      setGeneratedEmail(email);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Generation failed: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const handleCopy = useCallback(() => {
    if (generatedEmail) {
      navigator.clipboard.writeText(generatedEmail);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [generatedEmail]);

  return (
    <motion.div
      key="training-generator"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-slate-100">Generate Training Email</h2>
        <p className="text-slate-400 mt-1">Describe the scenario for the simulated phishing email.</p>
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g., "An email pretending to be from a bank to steal credentials" or "An email with a fake invoice attachment"'
          className="w-full h-24 p-3 mt-4 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          disabled={isLoading}
        />
        <motion.button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:bg-slate-600 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? <Spinner /> : 'Generate Email'}
        </motion.button>
      </div>
      
      <div className="min-h-[80px]">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading-gen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center items-center p-6 bg-slate-800 rounded-xl"
            >
              <Spinner />
              <span className="ml-3 text-slate-300">AI is generating...</span>
            </motion.div>
          )}
          {error && (
            <motion.div key="error-gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ErrorDisplay message={error} />
            </motion.div>
          )}
          {generatedEmail && (
            <motion.div
              key="generated-email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-800 p-6 rounded-xl shadow-lg space-y-4"
            >
              <Warning 
                title="SIMULATION ONLY" 
                message="This is an AI-generated email for training purposes. DO NOT use for malicious activities. All links are placeholders."
              />
              <div className="relative">
                <motion.button 
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors"
                  aria-label="Copy to clipboard"
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isCopied ? 'copied' : 'copy'}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5}}
                      transition={{ duration: 0.15}}
                      className="block"
                    >
                      {isCopied ? <CheckIcon /> : <CopyIcon />}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
                <pre className="w-full p-4 bg-slate-900/70 border border-slate-700 rounded-lg text-slate-200 whitespace-pre-wrap text-sm font-mono overflow-x-auto">
                  {generatedEmail}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TrainingGenerator;