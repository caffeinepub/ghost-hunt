import { useState, useEffect, useCallback } from 'react';

interface GhostData {
  id: string;
  position: [number, number, number];
}

const SPAWN_INTERVAL = 3000; // 3 seconds
const MAX_GHOSTS = 8;

export function useGhostSpawner() {
  const [ghosts, setGhosts] = useState<GhostData[]>([]);

  const spawnGhost = useCallback(() => {
    if (ghosts.length >= MAX_GHOSTS) return;

    const newGhost: GhostData = {
      id: `ghost-${Date.now()}-${Math.random()}`,
      position: [
        (Math.random() - 0.5) * 20,
        2 + Math.random() * 3,
        (Math.random() - 0.5) * 20,
      ],
    };

    setGhosts((prev) => [...prev, newGhost]);
  }, [ghosts.length]);

  const removeGhost = useCallback((id: string) => {
    setGhosts((prev) => prev.filter((ghost) => ghost.id !== id));
  }, []);

  useEffect(() => {
    // Spawn initial ghosts
    const initialGhosts: GhostData[] = Array.from({ length: 3 }).map((_, i) => ({
      id: `ghost-initial-${i}`,
      position: [
        (Math.random() - 0.5) * 15,
        2 + Math.random() * 2,
        (Math.random() - 0.5) * 15,
      ],
    }));
    setGhosts(initialGhosts);

    // Spawn new ghosts periodically
    const interval = setInterval(() => {
      spawnGhost();
    }, SPAWN_INTERVAL);

    return () => clearInterval(interval);
  }, [spawnGhost]);

  return {
    ghosts,
    removeGhost,
  };
}
