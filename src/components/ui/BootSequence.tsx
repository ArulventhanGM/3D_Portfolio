'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/state/store';

export default function BootSequence() {
  const { bootProgress, updateBootProgress, finishBoot } = useAppStore();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Show logo for 1 second
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
    }, 1000);

    return () => {
      clearTimeout(logoTimer);
    };
  }, []);

  useEffect(() => {
    if (showLogo) return;

    let progressInterval: NodeJS.Timeout;
    let finished = false;

    // Boot progress simulation
    const tick = () => {
      updateBootProgress((prev) => {
        if (finished) return prev;
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          finished = true;
          clearInterval(progressInterval);
          setTimeout(() => {
            finishBoot();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    };

    progressInterval = setInterval(tick, 50);

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [showLogo, updateBootProgress, finishBoot]);

  return (
    <div 
      className="flex items-center justify-center bg-black"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <div className="w-full h-full relative scanline">
        {showLogo ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full"
          >
            <div className="text-6xl font-bold text-white mb-4">PORTFOLIO</div>
            <div className="text-xl text-gray-400">Loading System...</div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl px-8"
          >
            <div className="mb-8">
              <div className="text-green-400 font-mono text-sm mb-2">
                Initializing system...
              </div>
              <div className="text-green-400 font-mono text-sm mb-2">
                Loading desktop environment...
              </div>
              <div className="text-green-400 font-mono text-sm mb-2">
                Starting services...
              </div>
            </div>
            
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${bootProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-gray-400 text-sm mt-2 text-center">
              {Math.round(bootProgress)}%
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

