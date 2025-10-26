import { motion } from 'framer-motion';
import { useState } from 'react';
import profileImage from '@/assets/raghul-profile.jpg';

interface HolographicSceneProps {
  onActivate: () => void;
}

const HolographicScene = ({ onActivate }: HolographicSceneProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const handleClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowWelcome(true);
    }, 2000);
    setTimeout(() => {
      setShowWelcome(false);
      setShowCards(true);
    }, 4000);
    setTimeout(() => {
      onActivate();
    }, 6000);
  };

  // Generate random binary numbers
  const generateNumbers = () => {
    const numbers = ['0', '1'];
    return numbers[Math.floor(Math.random() * numbers.length)];
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden grid-background">
      {/* 3D Falling Numbers Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/60 font-mono font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
              fontSize: `${12 + Math.random() * 16}px`,
            }}
            animate={{
              y: ['-10%', '110%'],
              opacity: [0, 1, 0],
              color: [
                'hsl(var(--cyber-blue) / 0.8)',
                'hsl(var(--cyber-red) / 0.9)',
                'hsl(var(--cyber-purple) / 0.8)',
                'hsl(var(--cyber-blue) / 0.8)'
              ],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          >
            {generateNumbers()}
          </motion.div>
        ))}
      </div>

      {/* Holographic container */}
      <motion.div
        className="relative z-10 cursor-pointer"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Hologram glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
        
        {/* Main holographic image */}
        <motion.div
          className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_30px_hsl(var(--cyber-blue))] hologram-flicker"
          animate={{
            boxShadow: [
              '0 0 30px hsl(var(--cyber-blue))',
              '0 0 60px hsl(var(--cyber-blue))',
              '0 0 30px hsl(var(--cyber-blue))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <img
            src={profileImage}
            alt="Raghul R - Security Engineer"
            className="w-full h-full object-cover mix-blend-screen opacity-90"
          />
          
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-secondary/30 mix-blend-overlay" />
          
          {/* Scanning lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-0.5 bg-primary/50"
                style={{ top: `${i * 20}%` }}
                animate={{
                  y: ['0%', '500%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Complete image scan (appears on click) */}
        {isScanning && (
          <motion.div
            className="absolute inset-0 bg-accent/60 mix-blend-screen"
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        )}

        {/* WELCOME text animation */}
        {showWelcome && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-6xl md:text-8xl font-orbitron text-accent cyber-glow-red"
              initial={{ scale: 0, rotateX: -90, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                textShadow: '0 0 20px hsl(var(--cyber-red)), 0 0 40px hsl(var(--cyber-red)), 0 0 60px hsl(var(--cyber-red))',
                transform: 'perspective(1000px) rotateX(0deg)',
              }}
            >
              WELCOME
            </motion.h2>
          </motion.div>
        )}

        {/* Name and role */}
        <motion.div
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 text-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-orbitron text-primary cyber-glow mb-2">
            RAGHUL R
          </h1>
          <p className="text-lg md:text-2xl font-orbitron text-secondary mb-6">
            Security Engineer
          </p>
          <motion.p
            className="text-primary cyber-glow text-sm md:text-base font-orbitron"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            CLICK TO INITIATE SCAN
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/50" />
    </div>
  );
};

export default HolographicScene;
