'use client';

import { useRef, useMemo } from 'react';
import { Mesh } from 'three';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function Phone() {
  const phoneRef = useRef<Mesh>(null);

  const phoneMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1.5,
  }), []);

  const screenMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#000000',
    emissive: '#0a0a1a',
    emissiveIntensity: 0.3,
    roughness: 0.1,
    metalness: 0.0,
  }), []);

  return (
    <group ref={phoneRef} position={[0.7, 0.753, 0.35]} rotation={[0, -0.4, 0]}>
      {/* Phone Body - rounded edges - adjusted for new desk height */}
      <RoundedBox args={[0.08, 0.16, 0.012]} radius={0.008} smoothness={8} castShadow receiveShadow>
        <primitive object={phoneMaterial} />
      </RoundedBox>
      
      {/* Phone Screen with slight recess */}
      <mesh position={[0, 0, 0.007]} castShadow={false}>
        <planeGeometry args={[0.07, 0.14]} />
        <primitive object={screenMaterial} />
      </mesh>
      
      {/* Camera bump */}
      <mesh position={[0.025, 0.06, 0.008]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.003, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

