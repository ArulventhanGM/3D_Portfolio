'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, ContactShadows } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Desk from './Desk';
import Monitor from './Monitor';
import Keyboard from './Keyboard';
import Phone from './Phone';
import Bonsai from './Bonsai';
import DecorativeItems from './DecorativeItems';
import Lighting from './Lighting';
import MonitorUI from '../ui/MonitorUI';
import { useAppStore } from '@/state/store';

export default function OfficeScene() {
  const updateMousePosition = useAppStore((state) => state.updateMousePosition);
  const controlsRef = useRef<any>(null);

  // Track mouse position for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [updateMousePosition]);

  // Reset camera to default position with smooth animation
  const handleResetCamera = () => {
    if (controlsRef.current) {
      // Smoothly reset camera position and rotation
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,  // Slightly brighter for better visibility
          outputColorSpace: THREE.SRGBColorSpace,
          shadowMap: true,
          shadowMapType: THREE.PCFSoftShadowMap,  // Softer shadow rendering
        }}
        dpr={[1, 2]}
        shadows="soft"
      >
        <color attach="background" args={['#c8d0d8']} />
        <fog attach="fog" args={['#c8d0d8', 10, 30]} />
        
        <Suspense fallback={null}>
          {/* Camera positioned for optimal desk view */}
          <PerspectiveCamera makeDefault position={[0, 2.5, 6]} fov={45} />
          
          {/* 360° Orbit Controls with smooth damping and constraints */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.5}
            zoomSpeed={0.8}
            panSpeed={0.5}
            minDistance={2}      // Prevent clipping into objects
            maxDistance={15}     // Keep scene in view
            minPolarAngle={0}    // Allow full vertical rotation
            maxPolarAngle={Math.PI / 2}  // Don't go below floor
            enablePan={true}     // Allow limited panning
            maxAzimuthAngle={Infinity}   // Full 360° horizontal rotation
            minAzimuthAngle={-Infinity}
            target={[0, 0.6, 0]} // Focus point slightly above desk
          />
          
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
      
      {/* Reset Camera Button - Bottom right corner */}
      <button
        onClick={handleResetCamera}
        className="absolute bottom-6 right-6 z-50 px-4 py-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 group"
        title="Reset camera view"
      >
        <svg 
          className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
          Reset Camera
        </span>
      </button>
      
      {/* Fullscreen Desktop UI */}
      <MonitorUI />
    </div>
  );
}

