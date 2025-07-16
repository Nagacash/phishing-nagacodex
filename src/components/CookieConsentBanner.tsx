import React from 'react';
import { motion } from 'framer-motion';

interface CookieConsentBannerProps {
  onAccept: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onAccept }) => {
  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      className="fixed bottom-4 right-4 z-50 max-w-sm bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl p-5"
    >
      <h3 className="text-md font-semibold text-slate-100">Cookie & Privacy Policy</h3>
      <p className="text-sm text-slate-400 mt-2">
        This website uses local storage to manage session preferences, like remembering your cookie consent. We do not use tracking cookies.
      </p>
      <button
        onClick={onAccept}
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
      >
        Accept & Close
      </button>
    </motion.div>
  );
};

export default CookieConsentBanner;
