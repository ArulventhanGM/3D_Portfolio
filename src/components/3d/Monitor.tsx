'use client';

import { useRef, useState, useMemo } from 'react';
import { Mesh, Group } from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '@/state/store';
import { useCursor, Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import MonitorScreenContent from '../ui/MonitorScreenContent';

export default function Monitor() {
  const monitorRef = useRef<Group>(null);
  const screenRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { isMonitorOn, setCameraMode, isCameraControlEnabled } = useAppStore();
  
  useCursor(hovered);

  // Ultra-realistic PBR materials with improved properties
  const screenOffMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#000000',
    emissive: '#000000',
    roughness: 0.2,
    metalness: 0.05,
    envMapIntensity: 0.1,
  }), []);

  const screenOnMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    emissive: '#1a1a2e',
    emissiveIntensity: 0.6,
    roughness: 0.08,
    metalness: 0.0,
    envMapIntensity: 0.2,
  }), []);

  const bezelMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 0.2,
    metalness: 0.85,
    envMapIntensity: 1.2,
  }), []);

  const glassOverlayMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.1,
    roughness: 0.0,
    metalness: 0.0,
    transmission: 0.95,
    thickness: 0.5,
    ior: 1.5,
    reflectivity: 0.5,
    clearcoat: 0.4,
    clearcoatRoughness: 0.05,
  }), []);

  const glowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#4a90e2',
    transparent: true,
    opacity: 0,
    side: THREE.BackSide,
  }), []);

  useFrame(() => {
    if (screenRef.current && glowRef.current) {
      if (isMonitorOn) {
        const time = Date.now() * 0.001;
        const pulse = Math.sin(time * 1.5) * 0.1 + 0.3;
        (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.3;
      } else {
        (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
      }
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!isMonitorOn) {
      useAppStore.getState().turnOnMonitor();
      setTimeout(() => {
        useAppStore.getState().startBoot();
      }, 500);
    }
  };

  // Pointer enters screen - trigger camera focus (only if camera control is disabled)
  const handlePointerEnter = () => {
    setHovered(true);
    if (!isCameraControlEnabled) {
      setCameraMode('monitor');  // Camera moves to monitor
    }
  };

  // Pointer leaves screen - reset camera
  const handlePointerLeave = () => {
    setHovered(false);
    if (!isCameraControlEnabled) {
      setCameraMode('default');  // Camera returns to default
    }
  };

  // Handle pointer events on HTML overlay
  const handleHtmlPointerEnter = () => {
    setHovered(true);
    if (!isCameraControlEnabled) {
      setCameraMode('monitor');
    }
  };

  const handleHtmlPointerLeave = () => {
    setHovered(false);
    if (!isCameraControlEnabled) {
      setCameraMode('default');
    }
  };

  return (
    <group ref={monitorRef} position={[0, 1.228, -0.3]}>
      {/* Monitor Stand - adjusted to sit on desk surface at 0.753 */}
      <mesh position={[0, -0.475, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.35, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.15} metalness={0.9} />
      </mesh>
      
      {/* Monitor Base - sits on desk at y=0.753 */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.38, 0.05, 32]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.85} />
      </mesh>
      
      {/* Monitor Back Frame */}
      <RoundedBox args={[1.6, 1.0, 0.08]} radius={0.02} smoothness={8} position={[0, 0.3, -0.04]} castShadow>
        <meshStandardMaterial color="#0d0d0d" roughness={0.25} metalness={0.7} />
      </RoundedBox>
      
      {/* Monitor Bezel */}
      <RoundedBox args={[1.5, 0.9, 0.03]} radius={0.015} smoothness={8} position={[0, 0.3, 0.025]} castShadow>
        <primitive object={bezelMaterial} />
      </RoundedBox>
      
      {/* Screen Surface - Dedicated screen mesh for OS rendering */}
      <mesh
        ref={screenRef}
        position={[0, 0.3, 0.045]}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        castShadow={false}
        receiveShadow={false}
      >
        {/* Screen size: 1.32 x 0.77 (aspect ratio 1.714:1) */}
        <planeGeometry args={[1.32, 0.77]} />
        <primitive object={isMonitorOn ? screenOnMaterial : screenOffMaterial} />
        
        {/* OS UI - Rendered directly on screen mesh with exact fit */}
        {isMonitorOn && (
          <Html
            transform
            occlude={false}
            distanceFactor={0.5}
            position={[0, 0, 0.002]}
            style={{
              width: '1320px',
              height: '770px',
              pointerEvents: isMonitorOn ? 'auto' : 'none',
              transformOrigin: 'center center',
              overflow: 'hidden',
              clipPath: 'inset(0)',
              margin: 0,
              padding: 0,
            }}
            center
            onPointerEnter={handleHtmlPointerEnter}
            onPointerLeave={handleHtmlPointerLeave}
          >
            <MonitorScreenContent />
          </Html>
        )}
      </mesh>

      {/* Soft edge glow - behind screen */}
      <mesh ref={glowRef} position={[0, 0.3, 0.044]} scale={1.02}>
        <planeGeometry args={[1.32, 0.77]} />
        <primitive object={glowMaterial} />
      </mesh>

      {/* Glass overlay - in front of screen for reflections */}
      <mesh position={[0, 0.3, 0.048]}>
        <planeGeometry args={[1.32, 0.77]} />
        <primitive object={glassOverlayMaterial} />
      </mesh>
    </group>
  );
}



