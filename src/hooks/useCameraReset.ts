import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useAppStore } from '@/state/store';

const DEFAULT_POSITION = new Vector3(0, 2.5, 6);
const DEFAULT_TARGET = new Vector3(0, 0.6, 0);

export function useCameraReset() {
  const { camera } = useThree();
  const { isCameraControlEnabled } = useAppStore();
  const wasEnabled = useRef(false);
  const animationFrame = useRef<number>();

  useEffect(() => {
    // Detect when camera control is turned OFF
    if (wasEnabled.current && !isCameraControlEnabled) {
      // Smoothly animate camera back to default position
      const startPos = camera.position.clone();
      const startTime = Date.now();
      const duration = 1000; // 1 second animation

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing
        const eased = 1 - Math.pow(1 - progress, 3);
        
        // Interpolate position
        camera.position.lerpVectors(startPos, DEFAULT_POSITION, eased);
        camera.lookAt(DEFAULT_TARGET);
        
        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
    
    wasEnabled.current = isCameraControlEnabled;
    
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isCameraControlEnabled, camera]);
}
