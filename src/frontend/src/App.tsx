import { GameLayout } from './components/GameLayout';
import { Game3DScene } from './components/Game3DScene';
import { GameUI } from './components/GameUI';
import { useGameState } from './hooks/useGameState';
import { Button } from './components/ui/button';
import { Ghost, Play, RotateCcw } from 'lucide-react';

function App() {
  const { gameStatus, startGame, resetGame } = useGameState();

  if (gameStatus === 'idle') {
    return (
      <GameLayout>
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <Ghost className="h-24 w-24 text-accent animate-pulse" />
            <h1 className="text-6xl font-bold tracking-wider text-foreground">
              GHOST HUNT
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Enter the haunted forest and catch as many ghosts as you can. Click on the floating spirits before they vanish into the darkness.
            </p>
          </div>
          <Button
            size="lg"
            onClick={startGame}
            className="group relative overflow-hidden text-lg font-semibold"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Hunting
          </Button>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout>
      <div className="relative h-screen w-full">
        <Game3DScene />
        <GameUI onReset={resetGame} />
      </div>
    </GameLayout>
  );
}

export default App;
