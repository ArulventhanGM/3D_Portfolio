'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DirectionalLight } from 'three';

export default function Lighting() {
  const keyLightRef = useRef<DirectionalLight>(null);
  const fillLightRef = useRef<DirectionalLight>(null);
  const rimLightRef = useRef<DirectionalLight>(null);

  useFrame(() => {
    // Subtle ambient movement for realism
    const time = Date.now() * 0.00005;
    if (keyLightRef.current) {
      keyLightRef.current.intensity = 1.2 + Math.sin(time) * 0.1;
    }
  });

  return (
    <>
      {/* Ambient - very soft base illumination for realistic shadows */}
      <ambientLight intensity={0.25} color="#f0f0f5" />
      
      {/* Key Light - main light source (studio photography style) */}
      <directionalLight
        ref={keyLightRef}
        position={[8, 12, 6]}
        intensity={2.2}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0005}
        shadow-normalBias={0.05}
        shadow-radius={4}  // Softer shadows
      />
      
      {/* Fill Light - soft indirect lighting from left */}
      <directionalLight
        ref={fillLightRef}
        position={[-6, 8, 4]}
        intensity={0.7}
        color="#e8f0ff"
        castShadow={false}
      />
      
      {/* Rim Light - creates depth and separation */}
      <directionalLight
        ref={rimLightRef}
        position={[0, 6, -8]}
        intensity={0.6}
        color="#fff8e8"
        castShadow={false}
      />
      
      {/* Hemisphere light for natural sky/ground simulation */}
      <hemisphereLight
        args={["#e8f0ff", "#b8c0d0", 0.5]}
        position={[0, 10, 0]}
      />
      
      {/* Focused spotlight for desk area - enhanced shadows */}
      <spotLight
        position={[3, 8, 3]}
        intensity={1.0}
        angle={Math.PI / 3}
        penumbra={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0003}
      />
      
      {/* Additional fill from right for balance */}
      <directionalLight
        position={[5, 6, -3]}
        intensity={0.4}
        color="#ffe8d0"
        castShadow={false}
      />
    </>
  );
}

