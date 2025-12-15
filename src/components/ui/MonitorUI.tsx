'use client';

import { useAppStore } from '@/state/store';
import FullscreenOverlay from './FullscreenOverlay';

export default function MonitorUI() {
  const { isFullscreen } = useAppStore();

  // Only render fullscreen overlay here (desktop UI is inside the 3D monitor)
  return (
    <>
      {isFullscreen && <FullscreenOverlay />}
    </>
  );
}

