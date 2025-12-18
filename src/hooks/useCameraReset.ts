import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useAppStore } from '@/state/store';

const DEFAULT_POSITION = new Vector3(0, 2.5, 6);
const DEFAULT_TARGET = new Vector3(0, 0.6, 0);

export function useCameraReset() {
  const { camera } = useThree();
  const { isCameraControlEnabled, resetCamera } = useAppStore();
  const wasEnabled = useRef(false);
  const isResetting = useRef(false);
  const resetStartPos = useRef<Vector3 | null>(null);
  const resetStartTime = useRef<number>(0);

  useEffect(() => {
    // Detect when camera control is turned OFF
    if (wasEnabled.current && !isCameraControlEnabled) {
      isResetting.current = true;
      resetStartPos.current = camera.position.clone();
      resetStartTime.current = Date.now();
    }
    
    wasEnabled.current = isCameraControlEnabled;
  }, [isCameraControlEnabled, camera]);

  useFrame(() => {
    if (isResetting.current && resetStartPos.current) {
      const elapsed = Date.now() - resetStartTime.current;
      const duration = 1000; // 1 second
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      // Interpolate position
      camera.position.lerpVectors(resetStartPos.current, DEFAULT_POSITION, eased);
      camera.lookAt(DEFAULT_TARGET);
      
      if (progress >= 1) {
        isResetting.current = false;
        resetStartPos.current = null;
        resetCamera(); // Update state
      }
    }
  });
}
