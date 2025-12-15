'use client';

import { useRef, useMemo } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Bonsai() {
  const potRef = useRef<Mesh>(null);
  const treeRef = useRef<Mesh>(null);
  const foliageRefs = useRef<Mesh[]>([]);

  const potMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8B4513',
    roughness: 0.7,
    metalness: 0.1,
  }), []);

  const trunkMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#654321',
    roughness: 0.9,
    metalness: 0.0,
  }), []);

  const leafMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3a6b2e',
    roughness: 0.7,
    metalness: 0.0,
    emissive: '#1a3008',
    emissiveIntensity: 0.05,
    side: THREE.DoubleSide,
  }), []);

  useFrame(() => {
    const time = Date.now() * 0.001;
    if (treeRef.current) {
      // Gentle sway animation
      treeRef.current.rotation.z = Math.sin(time) * 0.03;
    }
    // Individual leaf movement
    foliageRefs.current.forEach((ref, i) => {
      if (ref) {
        const offset = i * 0.5;
        ref.rotation.z = Math.sin(time + offset) * 0.02;
        ref.position.y = 0.35 + Math.sin(time * 0.5 + offset) * 0.01;
      }
    });
  });

  return (
    <group position={[-1.2, 0.753, 0.6]}>
      {/* Pot - ceramic with realistic proportions - adjusted for new desk height */}
      <mesh ref={potRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.13, 0.16, 16]} />
        <primitive object={potMaterial.clone()} />
      </mesh>
      
      {/* Tree Trunk - organic shape */}
      <mesh ref={treeRef} position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 0.3, 12]} />
        <primitive object={trunkMaterial.clone()} />
      </mesh>
      
      {/* Tree Foliage - more realistic leaf clusters */}
      {[
        { pos: [0, 0.38, 0], scale: 0.1 },
        { pos: [-0.08, 0.42, 0.04], scale: 0.08 },
        { pos: [0.08, 0.42, -0.04], scale: 0.08 },
        { pos: [0, 0.46, 0.08], scale: 0.07 },
        { pos: [-0.06, 0.44, -0.06], scale: 0.06 },
        { pos: [0.06, 0.44, 0.06], scale: 0.06 },
      ].map((foliage, index) => (
        <mesh
          key={index}
          ref={(el) => { if (el) foliageRefs.current[index] = el; }}
          position={foliage.pos as [number, number, number]}
          castShadow
        >
          <sphereGeometry args={[foliage.scale, 12, 12]} />
          <primitive object={leafMaterial.clone()} />
        </mesh>
      ))}
    </group>
  );
}

