'use client';

import { useRef, useMemo } from 'react';
import { Mesh } from 'three';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function Keyboard() {
  const keyboardRef = useRef<Mesh>(null);

  // Ultra-realistic materials
  const baseMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 0.3,
    metalness: 0.4,
    envMapIntensity: 0.8,
  }), []);

  const keyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.4,
    metalness: 0.05,
  }), []);

  const keycapMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    roughness: 0.5,
    metalness: 0.0,
  }), []);

  // Mechanical keyboard layout with realistic spacing
  const keyRows = [
    { keys: 15, startX: -0.60, z: -0.16, keyWidth: 0.07 }, // Top row (ESC + F-keys)
    { keys: 14, startX: -0.58, z: -0.08, keyWidth: 0.075 }, // Number row
    { keys: 13, startX: -0.55, z: 0.0, keyWidth: 0.08 },   // QWERTY row
    { keys: 12, startX: -0.52, z: 0.08, keyWidth: 0.08 },  // ASDF row
    { keys: 10, startX: -0.45, z: 0.16, keyWidth: 0.08 },  // ZXCV row
  ];

  return (
    <group ref={keyboardRef} position={[0, 0.753, 0.5]} rotation={[0, 0, 0]}>
      {/* Keyboard Base - aluminum frame - adjusted for new desk height */}
      <RoundedBox
        args={[1.3, 0.04, 0.45]}
        radius={0.01}
        smoothness={8}
        castShadow
        receiveShadow
        rotation={[-0.03, 0, 0]}
      >
        <primitive object={baseMaterial} />
      </RoundedBox>
      
      {/* Keyboard plate */}
      <mesh position={[0, 0.02, 0]} rotation={[-0.03, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.22, 0.005, 0.38]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.4} metalness={0.6} />
      </mesh>
      
      {/* Mechanical Keys - realistic sculpted keycaps */}
      {keyRows.map((row, rowIndex) => 
        Array.from({ length: row.keys }).map((_, keyIndex) => {
          const keySpacing = 0.008;
          const x = row.startX + keyIndex * (row.keyWidth + keySpacing);
          const randomHeight = Math.random() * 0.001; // Slight variation for realism
          
          return (
            <group
              key={`${rowIndex}-${keyIndex}`}
              position={[x, 0.03 + randomHeight, row.z]}
              rotation={[-0.03, 0, 0]}
            >
              {/* Key base */}
              <mesh castShadow>
                <boxGeometry args={[row.keyWidth - 0.01, 0.008, row.keyWidth - 0.01]} />
                <primitive object={keyMaterial.clone()} />
              </mesh>
              
              {/* Keycap with rounded top */}
              <RoundedBox
                args={[row.keyWidth - 0.012, 0.015, row.keyWidth - 0.012]}
                radius={0.002}
                smoothness={4}
                position={[0, 0.012, 0]}
                castShadow
              >
                <primitive object={keycapMaterial.clone()} />
              </RoundedBox>
            </group>
          );
        })
      )}
      
      {/* Spacebar - extra wide */}
      <RoundedBox
        args={[0.45, 0.015, 0.08]}
        radius={0.002}
        smoothness={4}
        position={[0, 0.045, 0.20]}
        rotation={[-0.03, 0, 0]}
        castShadow
      >
        <primitive object={keycapMaterial} />
      </RoundedBox>
    </group>
  );
}

