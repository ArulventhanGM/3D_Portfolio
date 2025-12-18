'use client';

import { useAppStore } from '@/state/store';
import { motion } from 'framer-motion';

export default function CameraResetButton() {
  const { resetCamera, setCameraMode } = useAppStore();

  const handleReset = () => {
    // Reset camera state - the camera controller will handle the animation
    setCameraMode('default');
    resetCamera();
  };

  return (
    <motion.button
      onClick={handleReset}
      className="fixed bottom-8 right-24 z-50 p-3 rounded-full bg-gray-700 hover:bg-gray-600 shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title="Reset Camera"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    </motion.button>
  );
}

