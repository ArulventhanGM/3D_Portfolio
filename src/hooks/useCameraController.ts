import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import { Vector3, Euler } from 'three';
import { useAppStore } from '@/state/store';

// Camera positions
const DEFAULT_POSITION = new Vector3(0, 2.5, 6);
const DEFAULT_ROTATION = new Euler(0, 0, 0);
const DEFAULT_TARGET = new Vector3(0, 0.5, 0);

const FOCUS_POSITION = new Vector3(0, 1.2, 2);
const FOCUS_ROTATION = new Euler(-0.1, 0, 0);
const FOCUS_TARGET = new Vector3(0, 0.8, -0.3);

// Parallax settings
const PARALLAX_STRENGTH_DEFAULT = 0.002;
const PARALLAX_STRENGTH_FOCUS = 0.015;
const PARALLAX_SMOOTHING = 0.1;

export function useCameraController() {
  const { camera } = useThree();
  const { 
    cameraMode, 
    mousePosition, 
    isDraggingWindow,
    booted,
    hoveringMonitor 
  } = useAppStore();
  
  const parallaxOffset = useRef({ x: 0, y: 0 });
  const targetParallax = useRef({ x: 0, y: 0 });
  const isTransitioning = useRef(false);

  // Smooth camera position spring
  const [{ position, rotation }, api] = useSpring(() => ({
    position: [DEFAULT_POSITION.x, DEFAULT_POSITION.y, DEFAULT_POSITION.z],
    rotation: [DEFAULT_ROTATION.x, DEFAULT_ROTATION.y, DEFAULT_ROTATION.z],
    config: {
      mass: 1,
      tension: 80,
      friction: 26,
    },
  }));

  // Update camera mode transition
  useEffect(() => {
    if (cameraMode === 'focus') {
      isTransitioning.current = true;
      api.start({
        position: [FOCUS_POSITION.x, FOCUS_POSITION.y, FOCUS_POSITION.z],
        rotation: [FOCUS_ROTATION.x, FOCUS_ROTATION.y, FOCUS_ROTATION.z],
        onRest: () => {
          isTransitioning.current = false;
        },
      });
    } else {
      isTransitioning.current = true;
      // Reset parallax when going back to default
      parallaxOffset.current = { x: 0, y: 0 };
      targetParallax.current = { x: 0, y: 0 };
      
      api.start({
        position: [DEFAULT_POSITION.x, DEFAULT_POSITION.y, DEFAULT_POSITION.z],
        rotation: [DEFAULT_ROTATION.x, DEFAULT_ROTATION.y, DEFAULT_ROTATION.z],
        onRest: () => {
          isTransitioning.current = false;
        },
      });
    }
  }, [cameraMode, api]);

  // Handle parallax based on mouse movement
  useFrame(() => {
    // Don't apply parallax while dragging windows
    if (isDraggingWindow) {
      return;
    }

    // Calculate target parallax based on mouse position
    const strength = cameraMode === 'focus' ? PARALLAX_STRENGTH_FOCUS : PARALLAX_STRENGTH_DEFAULT;
    
    // Normalize mouse position to -1 to 1 range
    const normalizedX = (mousePosition.x / window.innerWidth) * 2 - 1;
    const normalizedY = -(mousePosition.y / window.innerHeight) * 2 + 1;
    
    targetParallax.current.x = normalizedX * strength;
    targetParallax.current.y = normalizedY * strength;

    // Smooth interpolation
    parallaxOffset.current.x += (targetParallax.current.x - parallaxOffset.current.x) * PARALLAX_SMOOTHING;
    parallaxOffset.current.y += (targetParallax.current.y - parallaxOffset.current.y) * PARALLAX_SMOOTHING;

    // Apply parallax to camera
    if (cameraMode === 'focus') {
      camera.position.set(
        FOCUS_POSITION.x + parallaxOffset.current.x * 2,
        FOCUS_POSITION.y + parallaxOffset.current.y * 1.5,
        FOCUS_POSITION.z
      );
      
      // Look at target with parallax rotation
      const target = new Vector3(
        FOCUS_TARGET.x + parallaxOffset.current.x * 0.5,
        FOCUS_TARGET.y + parallaxOffset.current.y * 0.3,
        FOCUS_TARGET.z
      );
      camera.lookAt(target);
    } else if (!isTransitioning.current) {
      // Subtle parallax in default mode
      camera.position.set(
        DEFAULT_POSITION.x + parallaxOffset.current.x * 0.5,
        DEFAULT_POSITION.y + parallaxOffset.current.y * 0.3,
        DEFAULT_POSITION.z
      );
      
      const target = new Vector3(
        DEFAULT_TARGET.x + parallaxOffset.current.x * 0.2,
        DEFAULT_TARGET.y + parallaxOffset.current.y * 0.15,
        DEFAULT_TARGET.z
      );
      camera.lookAt(target);
    }
  });

  return null;
}
