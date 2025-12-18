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
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        backgroundColor: '#0a0a0a',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isBooting && <BootSequence />}
      {showDesktop && <Desktop />}
    </div>
  );
}

