'use client';

import { useRef, useMemo } from 'react';
import { Mesh } from 'three';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function DecorativeItems() {
  const coffeeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#f5f5f5',
    roughness: 0.3,
    metalness: 0.0,
  }), []);

  const notebookMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a2e',
    roughness: 0.6,
    metalness: 0.0,
  }), []);

  const paperMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#fafafa',
    roughness: 0.9,
    metalness: 0.0,
  }), []);

  return (
    <>
      {/* Coffee Mug - ceramic white - adjusted for new desk height */}
      <group position={[-0.9, 0.753, 0.6]}>
        {/* Mug body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.1, 32]} />
          <primitive object={coffeeMaterial} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.055, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.03, 0.008, 16, 32, Math.PI]} />
          <primitive object={coffeeMaterial} />
        </mesh>
        {/* Coffee inside */}
        <mesh position={[0, 0.048, 0]}>
          <cylinderGeometry args={[0.042, 0.042, 0.002, 32]} />
          <meshStandardMaterial color="#3d2817" roughness={0.2} />
        </mesh>
      </group>
      
      {/* Notebook with realistic pages - adjusted for new desk height */}
      <group position={[0.9, 0.753, 0.6]} rotation={[0, 0.4, 0]}>
        <RoundedBox args={[0.15, 0.2, 0.02]} radius={0.002} smoothness={4} castShadow receiveShadow>
          <primitive object={notebookMaterial} />
        </RoundedBox>
        {/* Pages */}
        <mesh position={[0.002, 0, 0.011]} castShadow>
          <boxGeometry args={[0.148, 0.198, 0.015]} />
          <primitive object={paperMaterial} />
        </mesh>
      </group>
      
      {/* Pen - realistic design - adjusted for new desk height */}
      <group position={[0.95, 0.765, 0.5]} rotation={[0, 0.6, -0.1]}>
        {/* Pen body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.004, 0.004, 0.14, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Pen tip */}
        <mesh position={[0, -0.075, 0]} castShadow>
          <cylinderGeometry args={[0.002, 0.001, 0.01, 16]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Pen clip */}
        <mesh position={[0, 0.05, 0.005]} rotation={[0.3, 0, 0]} castShadow>
          <boxGeometry args={[0.003, 0.025, 0.001]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>
      
      {/* Mouse - adjusted for new desk height */}
      <group position={[0.35, 0.753, 0.5]} rotation={[0, -0.2, 0]}>
        <RoundedBox args={[0.06, 0.09, 0.03]} radius={0.008} smoothness={8} castShadow receiveShadow>
          <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.8} />
        </RoundedBox>
        {/* Mouse scroll wheel */}
        <mesh position={[0, 0.032, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.006, 0.006, 0.003, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
        </mesh>
      </group>
      
      {/* Papers stack - adjusted for new desk height */}
      <group position={[-0.5, 0.753, 0.4]} rotation={[0, 0.2, 0]}>
        {[0, 0.002, 0.004, 0.006].map((offset, i) => (
          <mesh key={i} position={[0, offset, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.18, 0.001, 0.24]} />
            <primitive object={paperMaterial} />
          </mesh>
        ))}
      </group>
    </>
  );
}

