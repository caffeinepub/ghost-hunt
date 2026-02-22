import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export function GameEnvironment() {
  const forestTexture = useLoader(TextureLoader, '/assets/generated/forest-bg.dim_1920x1080.png');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.9} />
      </mesh>

      {/* Background cylinder with forest texture */}
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[20, 20, 20, 32, 1, true]} />
        <meshBasicMaterial
          map={forestTexture}
          side={THREE.BackSide}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Atmospheric fog particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            Math.random() * 8,
            (Math.random() - 0.5) * 30,
          ]}
        >
          <sphereGeometry args={[0.5 + Math.random() * 0.5, 8, 8]} />
          <meshBasicMaterial
            color="#7209b7"
            transparent
            opacity={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}
