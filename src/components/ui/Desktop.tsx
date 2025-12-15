'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import WindowManager from './WindowManager';
import { useAppStore } from '@/state/store';

const icons = [
  {
    id: 'github',
    label: 'GitHub',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: 'text-white',
    bgColor: 'bg-gray-800',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'text-white',
    bgColor: 'bg-blue-600',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
      </svg>
    ),
    color: 'text-white',
    bgColor: 'bg-purple-600',
  },
  {
    id: 'gmail',
    label: 'Gmail',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
    color: 'text-white',
    bgColor: 'bg-red-500',
  },
];

export default function Desktop() {
  const { openWindow } = useAppStore();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Update clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleIconClick = (id: string) => {
    if (id === 'github') {
      window.open('https://github.com', '_blank');
    } else if (id === 'linkedin') {
      window.open('https://linkedin.com', '_blank');
    } else if (id === 'gmail') {
      window.open('mailto:your-email@gmail.com', '_blank');
    } else {
      openWindow(id);
    }
  };

  return (
    <div 
      className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 relative"
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      {/* Windows-style wallpaper with subtle pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-3 z-10">
        {icons.map((icon, index) => (
          <motion.div
            key={icon.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <DesktopIcon
              id={icon.id}
              label={icon.label}
              icon={icon.icon}
              color={icon.color}
              bgColor={icon.bgColor}
              onClick={() => handleIconClick(icon.id)}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Window Manager */}
      <WindowManager />

      {/* Windows-style Taskbar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 flex items-center px-2 z-50"
      >
        {/* Start Button */}
        <button
          className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-sm flex items-center gap-2 transition-colors"
          onClick={() => {}}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h11v11H0V0zm0 13h11v11H0V13zm13-13h11v11H13V0zm0 13h11v11H13V13z"/>
          </svg>
          <span className="font-semibold text-sm">Start</span>
        </button>

        {/* Open Windows Indicators */}
        <div className="flex-1 flex items-center gap-1 px-2">
          {/* Placeholder for open windows */}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-3 px-3 text-white text-sm">
          {/* Volume Icon */}
          <button className="hover:bg-white/10 p-1 rounded">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
          </button>

          {/* Network Icon */}
          <button className="hover:bg-white/10 p-1 rounded">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
          </button>

          {/* Clock */}
          <div className="text-xs text-right px-2 py-1 hover:bg-white/10 rounded cursor-default">
            <div className="font-medium">{currentTime}</div>
            <div className="text-gray-400">{currentDate}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

