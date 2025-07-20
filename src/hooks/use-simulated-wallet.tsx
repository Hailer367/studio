"use client";

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from "react";

type SimulatedWallet = {
  connected: boolean;
  publicKey: string | null;
  connect: () => void;
  disconnect: () => void;
};

const SimulatedWalletContext = createContext<SimulatedWallet | null>(null);

export function SimulatedWalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const connect = useCallback(() => {
    // Simulate wallet connection
    setTimeout(() => {
      const fakePublicKey = "C1tADE" + Math.random().toString(36).substring(2, 12).toUpperCase() + "...";
      setPublicKey(fakePublicKey);
      setConnected(true);
    }, 500);
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setPublicKey(null);
  }, []);

  const value = useMemo(() => ({
    connected,
    publicKey,
    connect,
    disconnect
  }), [connected, publicKey, connect, disconnect]);

  return (
    <SimulatedWalletContext.Provider value={value}>
      {children}
    </SimulatedWalletContext.Provider>
  );
}

export const useSimulatedWallet = () => {
  const context = useContext(SimulatedWalletContext);
  if (!context) {
    throw new Error("useSimulatedWallet must be used within a SimulatedWalletProvider");
  }
  return context;
};
