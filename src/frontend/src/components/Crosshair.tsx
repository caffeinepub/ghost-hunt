export function Crosshair() {
  return (
    <div className="pointer-events-none fixed left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
      <div className="relative h-8 w-8">
        {/* Center dot */}
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        
        {/* Crosshair lines */}
        <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-accent/60" />
        <div className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-accent/60" />
        <div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-accent/60" />
        <div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-accent/60" />
        
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-accent/30" />
      </div>
    </div>
  );
}
