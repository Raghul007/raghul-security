import { motion } from 'framer-motion';
import { User, FileText, FolderOpen, Award, BookOpen, Briefcase, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CardGridProps {
  onCardClick: (card: string) => void;
  onBack: () => void;
}

const cards = [
  { id: 'about', title: 'About Me', icon: User, position: 'left' },
  { id: 'resume', title: 'Resume', icon: FileText, position: 'left' },
  { id: 'cover-letter', title: 'Cover Letter', icon: FolderOpen, position: 'left' },
  { id: 'projects', title: 'Projects', icon: Briefcase, position: 'right' },
  { id: 'achievements', title: 'Achievements', icon: Award, position: 'right' },
  { id: 'learnings', title: 'Learnings', icon: BookOpen, position: 'right' },
];

const CardGrid = ({ onCardClick, onBack }: CardGridProps) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-8 grid-background">
      {/* Back button */}
      <Button
        onClick={onBack}
        className="fixed top-8 left-8 z-50 bg-accent hover:bg-accent/80 text-white font-orbitron"
        size="lg"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        BACK
      </Button>

      {/* Contact Me button */}
      <Button
        onClick={() => onCardClick('contact')}
        className="fixed top-8 right-8 z-50 bg-accent hover:bg-accent/80 text-white font-orbitron neon-red-glow"
        size="lg"
      >
        <Mail className="w-5 h-5 mr-2" />
        CAN WE IN TOUCH
      </Button>
      {/* Red scanning beam effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute w-full h-1 bg-accent shadow-[0_0_20px_hsl(var(--cyber-red))]"
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl">
        <motion.h1
          className="text-4xl md:text-6xl font-orbitron text-center mb-16 cyber-glow"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          PORTFOLIO ACCESS
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left column */}
          <div className="space-y-6">
            {cards
              .filter(card => card.position === 'left')
              .map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: 'easeOut',
                  }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  onClick={() => onCardClick(card.id)}
                  className="relative p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/30 cursor-pointer card-glow transition-all duration-300 hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <card.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-orbitron text-primary">
                      {card.title}
                    </h3>
                  </div>
                  
                  {/* Hover effect border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-secondary/0"
                    whileHover={{ borderColor: 'hsl(var(--secondary))' }}
                  />
                </motion.div>
              ))}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {cards
              .filter(card => card.position === 'right')
              .map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: 'easeOut',
                  }}
                  whileHover={{ scale: 1.05, x: -10 }}
                  onClick={() => onCardClick(card.id)}
                  className="relative p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/30 cursor-pointer card-glow transition-all duration-300 hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <card.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-orbitron text-primary">
                      {card.title}
                    </h3>
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-secondary/0"
                    whileHover={{ borderColor: 'hsl(var(--secondary))' }}
                  />
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
