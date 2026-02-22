import { useRef, useState } from 'react';
import { useFrame, useLoader, type ThreeEvent } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { useGameScore } from '../hooks/useGameScore';

interface GhostProps {
  position: [number, number, number];
  onCatch: () => void;
}

export function Ghost({ position, onCatch }: GhostProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [catching, setCatching] = useState(false);
  const ghostTexture = useLoader(TextureLoader, '/assets/generated/ghost-sprite.dim_256x256.png');
  const { incrementScore } = useGameScore();

  // Random movement parameters
  const moveSpeed = useRef(0.3 + Math.random() * 0.3);
  const floatOffset = useRef(Math.random() * Math.PI * 2);
  const driftDirection = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.5,
    0,
    (Math.random() - 0.5) * 0.5
  ));

  useFrame((state) => {
    if (meshRef.current && !catching) {
      const time = state.clock.elapsedTime;
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(time * 2 + floatOffset.current) * 0.3;
      
      // Drift movement
      meshRef.current.position.x += driftDirection.current.x * 0.01;
      meshRef.current.position.z += driftDirection.current.z * 0.01;

      // Keep within bounds
      if (Math.abs(meshRef.current.position.x) > 15) {
        driftDirection.current.x *= -1;
      }
      if (Math.abs(meshRef.current.position.z) > 15) {
        driftDirection.current.z *= -1;
      }

      // Rotate to face camera
      meshRef.current.lookAt(state.camera.position);

      // Scale pulse when hovered
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Catching animation
    if (catching && meshRef.current) {
      meshRef.current.scale.multiplyScalar(0.9);
      if (meshRef.current.scale.x < 0.1) {
        onCatch();
      }
    }
  });

  const handleClick = async (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!catching) {
      setCatching(true);
      await incrementScore(1);
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1.5, 1.5]} />
      <meshBasicMaterial
        map={ghostTexture}
        transparent
        opacity={catching ? 0.5 : 0.9}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
