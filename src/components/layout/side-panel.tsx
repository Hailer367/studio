
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidePanel } from "@/hooks/use-side-panel";

export function SidePanel() {
  const { isOpen } = useSidePanel();

  return (
    <aside
      className={cn(
        "h-full overflow-hidden border-r border-border/40 transition-all duration-300 ease-in-out",
        isOpen ? "w-80 p-6" : "w-0 p-0"
      )}
    >
      <h3 className="font-headline text-lg">Side Panel</h3>
    </aside>
  );
}
