import { useState } from 'react';

type GameStatus = 'idle' | 'playing' | 'paused';

export function useGameState() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');

  const startGame = () => {
    setGameStatus('playing');
  };

  const pauseGame = () => {
    setGameStatus('paused');
  };

  const resumeGame = () => {
    setGameStatus('playing');
  };

  const resetGame = () => {
    setGameStatus('idle');
  };

  return {
    gameStatus,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
  };
}
