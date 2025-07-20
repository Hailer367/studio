"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swords, User, Loader2 } from "lucide-react";
import { useSimulatedWallet } from "@/hooks/use-simulated-wallet";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type MatchmakingState = "idle" | "searching" | "found";

export function MatchmakingCard() {
  const { connected } = useSimulatedWallet();
  const [state, setState] = useState<MatchmakingState>("idle");

  const handleFindMatch = () => {
    if (!connected) return;
    setState("searching");
    setTimeout(() => {
      setState("found");
    }, 3000);
  };

  const handleReset = () => {
    setState("idle");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Swords className="h-8 w-8 text-accent" />
        <div>
          <CardTitle className="font-headline">Play a Match</CardTitle>
          <CardDescription>Find an opponent and flip for glory.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        {state === "idle" && (
          <div className="text-center">
            <Button size="lg" onClick={handleFindMatch} disabled={!connected}>
              Find Match
            </Button>
            {!connected && <p className="text-sm text-muted-foreground mt-4">Connect your wallet to play.</p>}
          </div>
        )}
        {state === "searching" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="font-semibold text-lg">Searching for opponent...</p>
            <p className="text-muted-foreground">The runes are casting, a worthy foe will appear soon.</p>
          </div>
        )}
        {state === "found" && (
            <div className="flex flex-col items-center gap-4 text-center w-full">
                <p className="font-semibold text-lg text-primary">Match Found!</p>
                <div className="flex items-center justify-around w-full">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-20 w-20 border-2 border-primary">
                            <AvatarImage src="https://placehold.co/100x100" alt="Your avatar" data-ai-hint="warrior avatar" />
                            <AvatarFallback>YOU</AvatarFallback>
                        </Avatar>
                        <p className="font-bold">You</p>
                    </div>
                    <Swords className="h-8 w-8 text-muted-foreground shrink-0" />
                    <div className="flex flex-col items-center gap-2">
                         <Avatar className="h-20 w-20 border-2 border-destructive">
                            <AvatarImage src="https://placehold.co/100x100" alt="Opponent's avatar" data-ai-hint="mage avatar"/>
                            <AvatarFallback>OPP</AvatarFallback>
                        </Avatar>
                        <p className="font-bold">RuneMaster69</p>
                    </div>
                </div>
                 <Button onClick={handleReset} variant="outline" className="mt-4">
                    Back to Lobby
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
