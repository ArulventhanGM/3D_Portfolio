'use client';

import { useAppStore } from '@/state/store';
import { motion } from 'framer-motion';

export default function CameraControl() {
  const { isCameraControlEnabled, toggleCameraControl } = useAppStore();

  return (
    <motion.button
      onClick={toggleCameraControl}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
        isCameraControlEnabled
          ? 'bg-blue-500 hover:bg-blue-600'
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={isCameraControlEnabled ? 'Camera Control: ON' : 'Camera Control: OFF'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-colors duration-300 ${
          isCameraControlEnabled ? 'text-white' : 'text-gray-400'
        }`}
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
        {isCameraControlEnabled && (
          <motion.path
            d="M9 13 L11 15 L15 11"
            stroke="white"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </svg>
    </motion.button>
  );
}
