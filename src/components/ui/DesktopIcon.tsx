'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode | string;
  color?: string;
  bgColor?: string;
  onClick: () => void;
}

export default function DesktopIcon({ id, label, icon, color = 'text-white', bgColor = 'bg-blue-500', onClick }: DesktopIconProps) {
  const [hovered, setHovered] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(prev => prev + 1);
    
    // Double-click detection
    setTimeout(() => {
      if (clicks + 1 === 2) {
        onClick();
      }
      setClicks(0);
    }, 300);
  };

  return (
    <motion.button
      className="flex flex-col items-center justify-center cursor-pointer w-24 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-14 h-14 rounded-lg ${bgColor} ${color} flex items-center justify-center mb-1.5 shadow-lg backdrop-blur-sm`}
        animate={{
          boxShadow: hovered
            ? '0 8px 20px rgba(0,0,0,0.4)'
            : '0 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        {typeof icon === 'string' ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          icon
        )}
      </motion.div>
      <motion.span
        className="text-white text-xs text-center font-medium drop-shadow-lg px-1 py-0.5 rounded"
        style={{
          textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
        }}
        animate={{
          backgroundColor: hovered ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
        }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

