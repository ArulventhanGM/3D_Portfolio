'use client';

import { useAppStore } from '@/state/store';
import BootSequence from './BootSequence';
import Desktop from './Desktop';

export default function MonitorScreenContent() {
  const { isBooting, showDesktop, isFullscreen } = useAppStore();

  // Don't render anything if fullscreen (it will be handled separately)
  if (isFullscreen) return null;

  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '1.714',  // Match screen plane aspect ratio (1.32 / 0.77)
        margin: 0,
        padding: 0,
        backgroundColor: '#0a0a0a',
        borderRadius: '4px',
        boxSizing: 'border-box',
      }}
    >
      {isBooting && <BootSequence />}
      {showDesktop && <Desktop />}
    </div>
  );
}

