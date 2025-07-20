
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function SidePanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    // Default to open on desktop, closed on mobile
    if (isMobile === undefined) return; // Wait until the hook has determined the screen size
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="relative">
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen ? "w-80" : "w-0"
        )}
      >
        <aside
          className={cn(
            "h-full overflow-hidden border-r border-border/40",
            isOpen ? "p-6" : "p-0"
          )}
        >
          {/* Side Panel Content */}
          <h3 className="font-headline text-lg">Side Panel</h3>
          <p className="text-sm text-muted-foreground">Future content goes here.</p>
        </aside>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-12 top-6 rounded-full"
        aria-label={isOpen ? "Close panel" : "Open panel"}
      >
        {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
      </Button>
    </div>
  );
}
