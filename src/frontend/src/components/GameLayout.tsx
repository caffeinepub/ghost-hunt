import { type ReactNode } from 'react';

interface GameLayoutProps {
  children: ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Atmospheric moon decoration */}
      <div 
        className="pointer-events-none fixed right-0 top-0 h-96 w-96 opacity-20 blur-sm"
        style={{
          backgroundImage: 'url(/assets/generated/moon.dim_512x512.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right',
        }}
      />
      
      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground">
          <span>Built with</span>
          <span className="text-accent">♥</span>
          <span>using</span>
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground transition-colors hover:text-accent"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
