import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GameEnvironment } from './GameEnvironment';
import { Ghost } from './Ghost';
import { useGhostSpawner } from '../hooks/useGhostSpawner';
import { Crosshair } from './Crosshair';

export function Game3DScene() {
  const { ghosts, removeGhost } = useGhostSpawner();

  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{ alpha: false }}
        className="h-full w-full"
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#9d4edd" />
        <pointLight position={[-10, 5, -10]} intensity={0.2} color="#3a86ff" />
        
        {/* Fog for atmosphere */}
        <fog attach="fog" args={['#0a0a0f', 5, 25]} />

        {/* Environment */}
        <GameEnvironment />

        {/* Ghosts */}
        {ghosts.map((ghost) => (
          <Ghost
            key={ghost.id}
            position={ghost.position}
            onCatch={() => removeGhost(ghost.id)}
          />
        ))}

        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Crosshair overlay */}
      <Crosshair />
    </>
  );
}
