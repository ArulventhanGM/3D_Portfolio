import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, MathUtils } from 'three';
import { useAppStore } from '@/state/store';

// Camera positions
const DEFAULT_POSITION = new Vector3(0, 2.5, 6);
const DEFAULT_TARGET = new Vector3(0, 0.6, 0);

const MONITOR_POSITION = new Vector3(0, 1.3, 2.2);  // Centered on monitor
const MONITOR_TARGET = new Vector3(0, 1.228, -0.3);  // Monitor group center position

// Parallax settings for monitor mode
const PARALLAX_STRENGTH = 0.08;
const PARALLAX_SMOOTHING = 0.08;
const PARALLAX_ROTATION_LIMIT = 0.06;  // ±3.4 degrees

export function usePointerCameraController() {
  const { camera } = useThree();
  const { cameraMode, mousePosition, isDraggingWindow, isCameraControlEnabled } = useAppStore();
  
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());
  const currentPosition = useRef(new Vector3());
  const currentLookAt = useRef(new Vector3());
  const parallaxOffset = useRef({ x: 0, y: 0 });
  const isInitialized = useRef(false);

  useFrame(() => {
    // Initialize camera position on first frame
    if (!isInitialized.current) {
      currentPosition.current.copy(camera.position);
      currentLookAt.current.copy(DEFAULT_TARGET);
      isInitialized.current = true;
    }

    // Don't control camera when orbit controls are enabled
    if (isCameraControlEnabled) {
      return;
    }

    // Don't apply camera movement while dragging windows
    if (isDraggingWindow) {
      return;
    }

    // Set target based on camera mode - reactive every frame
    if (cameraMode === 'monitor') {
      targetPosition.current.copy(MONITOR_POSITION);
      targetLookAt.current.copy(MONITOR_TARGET);
    } else {
      targetPosition.current.copy(DEFAULT_POSITION);
      targetLookAt.current.copy(DEFAULT_TARGET);
      // Reset parallax when leaving monitor mode
      parallaxOffset.current.x = MathUtils.lerp(parallaxOffset.current.x, 0, 0.15);
      parallaxOffset.current.y = MathUtils.lerp(parallaxOffset.current.y, 0, 0.15);
    }

    // Continuous smooth lerp to target position with adaptive speed
    const lerpSpeed = cameraMode === 'monitor' ? 0.06 : 0.05;
    currentPosition.current.lerp(targetPosition.current, lerpSpeed);
    currentLookAt.current.lerp(targetLookAt.current, lerpSpeed);

    // Apply parallax only when in monitor mode
    if (cameraMode === 'monitor') {
      // Normalize mouse position to -1 to 1 range
      const normalizedX = (mousePosition.x / window.innerWidth) * 2 - 1;
      const normalizedY = -(mousePosition.y / window.innerHeight) * 2 + 1;
      
      // Calculate target parallax
      const targetParallaxX = normalizedX * PARALLAX_STRENGTH;
      const targetParallaxY = normalizedY * PARALLAX_STRENGTH;
      
      // Smooth parallax offset with damping
      parallaxOffset.current.x = MathUtils.lerp(
        parallaxOffset.current.x,
        targetParallaxX,
        PARALLAX_SMOOTHING
      );
      parallaxOffset.current.y = MathUtils.lerp(
        parallaxOffset.current.y,
        targetParallaxY,
        PARALLAX_SMOOTHING
      );
      
      // Apply parallax to camera position
      camera.position.set(
        currentPosition.current.x + parallaxOffset.current.x,
        currentPosition.current.y + parallaxOffset.current.y * 0.5,
        currentPosition.current.z
      );
      
      // Apply parallax to look target for rotation effect
      const lookTarget = new Vector3(
        currentLookAt.current.x + parallaxOffset.current.x * PARALLAX_ROTATION_LIMIT,
        currentLookAt.current.y + parallaxOffset.current.y * PARALLAX_ROTATION_LIMIT,
        currentLookAt.current.z
      );
      camera.lookAt(lookTarget);
    } else {
      // Reset parallax when not in monitor mode
      parallaxOffset.current.x = MathUtils.lerp(parallaxOffset.current.x, 0, 0.1);
      parallaxOffset.current.y = MathUtils.lerp(parallaxOffset.current.y, 0, 0.1);
      
      camera.position.copy(currentPosition.current);
      camera.lookAt(currentLookAt.current);
    }
  });

  return null;
}
