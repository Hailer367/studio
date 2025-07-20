"use client";

import { ReactNode } from "react";
import { SimulatedWalletProvider } from "@/hooks/use-simulated-wallet";
import { PwaInstallProvider } from "@/hooks/use-pwa-install";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SimulatedWalletProvider>
        <PwaInstallProvider>
          {children}
        </PwaInstallProvider>
      </SimulatedWalletProvider>
    </TooltipProvider>
  );
}
