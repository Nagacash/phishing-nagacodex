import React, { useState, useCallback, useEffect } from 'react';
import { ActiveTab } from '../types';
import { TABS } from '../constants';
import Header from './components/Header';
import TabButton from './components/TabButton';
import PhishingCheck from './components/PhishingCheck';
import TrainingGenerator from './components/TrainingGenerator';
import AwarenessHub from './components/AwarenessHub';
import Services from './components/Services';
import { ShieldIcon } from './components/icons/ShieldIcon';
import { MagicIcon } from './components/icons/MagicIcon';
import { BookOpenIcon } from './components/icons/BookOpenIcon';
import { BriefcaseIcon } from './components/icons/BriefcaseIcon';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import CookieConsentBanner from './components/CookieConsentBanner';
import { AnimatePresence } from 'framer-motion';


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(TABS.ANALYZE);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case TABS.ANALYZE:
        return <PhishingCheck />;
      case TABS.GENERATE:
        return <TrainingGenerator />;
      case TABS.AWARENESS:
        return <AwarenessHub />;
      case TABS.SERVICES:
        return <Services />;
      default:
        return null;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <Header />
        
        <div className="mt-8 mb-6">
          <div className="flex flex-wrap space-x-2 border-b border-slate-700">
            <TabButton 
              label="Analyze Email" 
              isActive={activeTab === TABS.ANALYZE} 
              onClick={() => setActiveTab(TABS.ANALYZE)}
              icon={<ShieldIcon />}
            />
            <TabButton 
              label="Generate Training Email" 
              isActive={activeTab === TABS.GENERATE} 
              onClick={() => setActiveTab(TABS.GENERATE)}
              icon={<MagicIcon />}
            />
            <TabButton 
              label="Awareness Hub" 
              isActive={activeTab === TABS.AWARENESS} 
              onClick={() => setActiveTab(TABS.AWARENESS)}
              icon={<BookOpenIcon />}
            />
            <TabButton 
              label="Our Services" 
              isActive={activeTab === TABS.SERVICES} 
              onClick={() => setActiveTab(TABS.SERVICES)}
              icon={<BriefcaseIcon />}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
        
        <footer className="text-center mt-12 pt-6 pb-6 border-t border-slate-800 text-slate-500 text-sm">
          <div className="flex flex-col items-center gap-4">
            <img src="/images/logo.png" alt="Logo" className="h-12 w-auto mb-4" />
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
               <p>Contact: Naga Codex - Hamburg</p>
               <a href="mailto:chosenfewrecords@hotmail.de" className="hover:text-slate-300 transition-colors">chosenfewrecords@hotmail.de</a>
               <a href="https://www.linkedin.com/in/maurice-holda/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors" aria-label="LinkedIn Profile">
                  <LinkedInIcon />
               </a>
            </div>
            <p>&copy; 2024 Phishing Analysis Tool. For educational and research purposes only.</p>
          </div>
        </footer>
      </main>
      <AnimatePresence>
        {showBanner && <CookieConsentBanner onAccept={handleAcceptCookies} />}
      </AnimatePresence>
    </div>
  );
};

export default App;