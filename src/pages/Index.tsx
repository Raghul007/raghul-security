import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PortfolioProvider, usePortfolio } from '@/contexts/PortfolioContext';
import HolographicScene from '@/components/portfolio/HolographicScene';
import CardGrid from '@/components/portfolio/CardGrid';
import AboutMe from '@/components/portfolio/AboutMe';
import Resume from '@/components/portfolio/Resume';
import CoverLetter from '@/components/portfolio/CoverLetter';
import ContactMe from '@/components/portfolio/ContactMe';
import Projects from '@/components/portfolio/Projects';
import Achievements from '@/components/portfolio/Achievements';
import Learnings from '@/components/portfolio/Learnings';

const PortfolioContent = () => {
  const { currentView, setCurrentView } = usePortfolio();

  const handleActivate = () => {
    setCurrentView('cards');
  };

  const handleCardClick = (card: string) => {
    setCurrentView(card);
  };

  const handleClose = () => {
    setCurrentView('cards');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <HolographicScene key="landing" onActivate={handleActivate} />
        )}
        {currentView === 'cards' && (
          <CardGrid key="cards" onCardClick={handleCardClick} onBack={handleBackToLanding} />
        )}
        {currentView === 'about' && <AboutMe key="about" onClose={handleClose} />}
        {currentView === 'resume' && <Resume key="resume" onClose={handleClose} />}
        {currentView === 'cover-letter' && (
          <CoverLetter key="cover-letter" onClose={handleClose} />
        )}
        {currentView === 'contact' && <ContactMe key="contact" onClose={handleClose} />}
        {currentView === 'projects' && <Projects key="projects" onClose={handleClose} />}
        {currentView === 'achievements' && (
          <Achievements key="achievements" onClose={handleClose} />
        )}
        {currentView === 'learnings' && <Learnings key="learnings" onClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
};

const Index = () => {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
};

export default Index;
