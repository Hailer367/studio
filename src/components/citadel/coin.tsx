
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { RuneIcon } from '../icons/rune-icon';

export function Coin() {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    // Automatically flip the coin when the component mounts
    setIsFlipping(true);
    const timer = setTimeout(() => setIsFlipping(false), 1000); // Corresponds to animation duration
    return () => clearTimeout(timer);
  }, []);


  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => setIsFlipping(false), 1000); // Duration of the flip animation
  };

  return (
    <div className="group flex flex-col items-center justify-center gap-4 [perspective:1000px]">
      <div
        className={cn(
          "relative h-48 w-48 cursor-pointer rounded-full transition-transform duration-1000 [transform-style:preserve-3d]",
          isFlipping && "[transform:rotateY(1860deg)]"
        )}
        onClick={handleFlip}
      >
        {/* Front Face */}
        <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary/50 via-primary/80 to-accent/70 p-1 [backface-visibility:hidden]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-card animate-coin-glow">
             <RuneIcon className="h-24 w-24 text-primary" />
          </div>
        </div>
        {/* Back Face */}
        <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-accent/50 via-accent/80 to-primary/70 p-1 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-card animate-coin-glow">
                <RuneIcon className="h-24 w-24 text-accent -scale-x-100" />
            </div>
        </div>
      </div>
       <div className="text-center">
            <p className="text-sm text-muted-foreground">Click the coin to see it flip</p>
        </div>
    </div>
  );
}
