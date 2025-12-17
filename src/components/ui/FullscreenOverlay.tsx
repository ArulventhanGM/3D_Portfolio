'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/state/store';
import PortfolioWindow from './windows/PortfolioWindow';

export default function FullscreenOverlay() {
  const { exitFullscreen } = useAppStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [exitFullscreen]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-[100] flex items-center justify-center">
      <div className="w-full h-full max-w-7xl max-h-[90vh] m-4">
        <div className="bg-gray-800 border-2 border-blue-500 rounded-lg overflow-hidden h-full flex flex-col">
          {/* Title Bar */}
          <div className="h-10 flex items-center justify-between px-4 bg-blue-600">
            <span className="text-white font-medium">Portfolio - Fullscreen</span>
            <button
              onClick={exitFullscreen}
              className="px-4 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
            >
              Exit Fullscreen (ESC)
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <PortfolioWindow />
          </div>
        </div>
      </div>
    </div>
  );
}



