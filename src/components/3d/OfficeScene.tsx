'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows, OrbitControls } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import Desk from './Desk';
import Monitor from './Monitor';
import Keyboard from './Keyboard';
import Phone from './Phone';
import Bonsai from './Bonsai';
import DecorativeItems from './DecorativeItems';
import Lighting from './Lighting';
import MonitorUI from '../ui/MonitorUI';
import CameraControl from '../ui/CameraControl';
import { useAppStore } from '@/state/store';
import { usePointerCameraController } from '@/hooks/usePointerCameraController';
import { useCameraReset } from '@/hooks/useCameraReset';

function CameraController() {
  usePointerCameraController();
  useCameraReset();
  return null;
}

export default function OfficeScene() {
  const updateMousePosition = useAppStore((state) => state.updateMousePosition);
  const isCameraControlEnabled = useAppStore((state) => state.isCameraControlEnabled);

  // Track mouse position for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [updateMousePosition]);

  return (
    <div className="relative w-full h-full">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,  // Slightly brighter for better visibility
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={[1, 2]}
        shadows="soft"
      >
        <color attach="background" args={['#c8d0d8']} />
        <fog attach="fog" args={['#c8d0d8', 10, 30]} />
        
        <Suspense fallback={null}>
          {/* Camera positioned for optimal desk view */}
          <PerspectiveCamera makeDefault position={[0, 2.5, 6]} fov={45} />
          
          {/* Orbit Controls - enabled only when camera control is on */}
          <OrbitControls
            enabled={isCameraControlEnabled}
            enablePan={false}
            enableZoom={isCameraControlEnabled}
            enableRotate={isCameraControlEnabled}
            enableDamping={true}
            dampingFactor={0.08}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.5}
            target={[0, 0.6, 0]}
          />
          
          {/* Pointer-driven camera controller - only when orbit is disabled */}
          {!isCameraControlEnabled && <CameraController />}
          
          <Lighting />
          
          {/* Contact shadows for enhanced realism */}
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
            resolution={256}
            color="#000000"
          />
          
          {/* Office Scene Objects */}
          <Desk />
          <Monitor />
          <Keyboard />
          <Phone />
          <Bonsai />
          <DecorativeItems />
        </Suspense>
      </Canvas>
      
      {/* Fullscreen Desktop UI */}
      <MonitorUI />
      
      {/* Camera Control Icon */}
      <CameraControl />
    </div>
  );
}

