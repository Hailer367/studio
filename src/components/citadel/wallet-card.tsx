"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSimulatedWallet } from "@/hooks/use-simulated-wallet";
import { PiggyBank, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function WalletCard() {
  const { connected } = useSimulatedWallet();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <PiggyBank className="h-8 w-8 text-accent" />
        <div>
          <CardTitle className="font-headline">Your Wallet</CardTitle>
          <CardDescription>Manage your funds</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {connected ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="text-3xl font-bold font-headline">◎ 1.25 SOL</p>
              <p className="text-sm text-muted-foreground">$168.75 USD</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24" />
            <p className="pt-4 text-sm text-muted-foreground">Connect your wallet to see your balance.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outline" disabled={!connected}>
            <ArrowDownToLine className="mr-2" /> Deposit
          </Button>
          <Button variant="outline" disabled={!connected}>
            <ArrowUpFromLine className="mr-2" /> Withdraw
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
