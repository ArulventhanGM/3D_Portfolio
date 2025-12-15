'use client';

import { useRef, useMemo, useState } from 'react';
import { Mesh } from 'three';
import { RoundedBox, useCursor } from '@react-three/drei';
import * as THREE from 'three';

export default function Desk() {
  const deskTopRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useCursor(hovered, 'grab', 'auto');

  // Ultra-realistic wood material - Natural oak color with visible grain
  const woodMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#A0826D', // Natural oak/walnut wood color
    roughness: 0.65,
    metalness: 0.0,
    envMapIntensity: 0.4,
  }), []);

  // Darker wood edge for depth and realism
  const woodEdgeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#6B5744', // Darker wood edge
    roughness: 0.75,
    metalness: 0.0,
  }), []);

  // Brushed metal leg material - Modern desk legs
  const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2a2a2a', // Darker brushed metal
    roughness: 0.18,
    metalness: 0.92,
    envMapIntensity: 1.0,
  }), []);

  return (
    <group position={[0, 0, 0]}>
      {/* Desk Top - Real-world proportions: ~140cm x 80cm x 2.5cm thick */}
      <RoundedBox
        ref={deskTopRef}
        args={[3.5, 0.063, 2]}  // Realistic desk dimensions
        radius={0.015}
        smoothness={8}
        position={[0, 0.72, 0]}  // Standard desk height: 72-75cm from floor
        receiveShadow
        castShadow
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <primitive object={woodMaterial} />
      </RoundedBox>
      
      {/* Desk edge trim for added depth and realism */}
      <mesh position={[0, 0.689, 1.0]} receiveShadow castShadow>
        <boxGeometry args={[3.52, 0.015, 0.015]} />
        <primitive object={woodEdgeMaterial} />
      </mesh>
      
      {/* Desk Legs - Proper height to reach floor (72cm total height) */}
      {[
        [-1.65, 0.36, -0.9],   // Adjusted positions for new dimensions
        [1.65, 0.36, -0.9],
        [-1.65, 0.36, 0.9],
        [1.65, 0.36, 0.9],
      ].map((position, index) => (
        <group key={index} position={position as [number, number, number]}>
          {/* Main leg - realistic height from floor to tabletop */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.035, 0.03, 0.72, 32]} />  {/* Full leg height */}
            <primitive object={metalMaterial.clone()} />
          </mesh>
          {/* Foot pad - larger weighted base for stability */}
          <mesh position={[0, -0.37, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.055, 0.05, 0.02, 32]} />
            <primitive object={metalMaterial.clone()} />
          </mesh>
          {/* Top connector bracket */}
          <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.025, 32]} />
            <primitive object={metalMaterial.clone()} />
          </mesh>
        </group>
      ))}
      
      {/* Floor plane for shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
}

