'use client';

import { motion, useDragControls } from 'framer-motion';
import { useState, useRef } from 'react';
import { useAppStore } from '@/state/store';

interface WindowProps {
  id: string;
  title: string;
  isActive: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  width?: number;
  height?: number;
}

export default function Window({
  id,
  title,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  children,
  initialPosition = { x: 100, y: 80 },
  width = 450,
  height = 350,
}: WindowProps) {
  const { setActiveWindow, minimizeWindow, maximizeWindow, setIsDraggingWindow } = useAppStore();
  const [position, setPosition] = useState(initialPosition);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!isActive) {
      setActiveWindow(id);
    }
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
    maximizeWindow(id);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <motion.div
      ref={windowRef}
      className={`absolute bg-white rounded-lg overflow-hidden ${
        isActive ? 'shadow-2xl' : 'shadow-xl'
      }`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : width,
        height: isMaximized ? 'calc(100% - 48px)' : height,
        zIndex: isActive ? 100 : 50,
      }}
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={handleClick}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => {
        setIsDraggingWindow(true);
      }}
      onDragEnd={(_, info) => {
        setIsDraggingWindow(false);
        if (!isMaximized) {
          setPosition({
            x: Math.max(0, position.x + info.offset.x),
            y: Math.max(0, position.y + info.offset.y),
          });
        }
      }}
    >
      {/* Window Title Bar - Windows 11 style */}
      <div
        className={`h-10 flex items-center justify-between px-3 ${
          isActive
            ? 'bg-white border-b border-gray-200'
            : 'bg-gray-50 border-b border-gray-300'
        } cursor-move select-none`}
        onPointerDown={(e) => {
          if (!isMaximized) {
            dragControls.start(e);
          }
        }}
      >
        <div className="flex items-center gap-2 flex-1">
          <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h11v11H0V0zm0 13h11v11H0V13zm13-13h11v11H13V0zm0 13h11v11H13V13z"/>
            </svg>
          </div>
          <span className="text-gray-800 text-sm font-medium truncate">{title}</span>
        </div>
        
        {/* Window Controls */}
        <div className="flex items-center gap-1">
          {/* Minimize */}
          <button
            onClick={handleMinimize}
            className="w-11 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors rounded"
            title="Minimize"
          >
            <svg className="w-3 h-3 text-gray-700" viewBox="0 0 12 12" fill="currentColor">
              <rect x="0" y="5" width="12" height="2"/>
            </svg>
          </button>
          
          {/* Maximize/Restore */}
          <button
            onClick={handleMaximize}
            className="w-11 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors rounded"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? (
              <svg className="w-3 h-3 text-gray-700" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="7" height="7"/>
                <path d="M3 2v-1a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1"/>
              </svg>
            ) : (
              <svg className="w-3 h-3 text-gray-700" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="0.5" y="0.5" width="11" height="11"/>
              </svg>
            )}
          </button>
          
          {/* Close */}
          <button
            onClick={handleClose}
            className="w-11 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors rounded"
            title="Close"
          >
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 1l10 10M11 1L1 11"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="h-[calc(100%-2.5rem)] overflow-auto bg-white">
        {children}
      </div>
    </motion.div>
  );
}

