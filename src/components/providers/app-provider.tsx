"use client";

import { ReactNode } from "react";
import { SimulatedWalletProvider } from "@/hooks/use-simulated-wallet";
import { PwaInstallProvider } from "@/hooks/use-pwa-install";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidePanelProvider } from "@/hooks/use-side-panel";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SimulatedWalletProvider>
        <PwaInstallProvider>
          <SidePanelProvider>
            {children}
          </SidePanelProvider>
        </PwaInstallProvider>
      </SimulatedWalletProvider>
    </TooltipProvider>
  );
}
