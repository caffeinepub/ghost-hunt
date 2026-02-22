import { useGameScore } from '../hooks/useGameScore';
import { useGameState } from '../hooks/useGameState';
import { Button } from './ui/button';
import { Ghost, RotateCcw, Loader2 } from 'lucide-react';
import { Card } from './ui/card';

interface GameUIProps {
  onReset: () => void;
}

export function GameUI({ onReset }: GameUIProps) {
  const { score, isLoading } = useGameScore();
  const { gameStatus } = useGameState();

  return (
    <div className="pointer-events-none absolute inset-0 z-30 p-4">
      {/* Top bar */}
      <div className="flex items-start justify-between">
        {/* Score display */}
        <Card className="pointer-events-auto border-accent/20 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 p-4">
            <Ghost className="h-6 w-6 text-accent" />
            <div>
              <div className="text-xs text-muted-foreground">Ghosts Caught</div>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  score
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Reset button */}
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="pointer-events-auto border-accent/20 bg-background/80 backdrop-blur-sm hover:bg-accent/20"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <Card className="border-accent/20 bg-background/80 px-6 py-3 backdrop-blur-sm">
          <p className="text-center text-sm text-muted-foreground">
            Click on ghosts to catch them • Drag to look around
          </p>
        </Card>
      </div>
    </div>
  );
}
