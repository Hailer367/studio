
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swords, User, Loader2, ShieldCheck } from "lucide-react";
import { useSimulatedWallet } from "@/hooks/use-simulated-wallet";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";

type MatchmakingState = "idle" | "searching" | "found";

const availableGames = [
  { id: 1, opponent: 'RuneMaster69', wager: 0.5, avatar: 'https://placehold.co/40x40' },
  { id: 2, opponent: 'SolanaSorcerer', wager: 1.0, avatar: 'https://placehold.co/40x40' },
  { id: 3, opponent: 'ShadowGamer_42', wager: 0.25, avatar: 'https://placehold.co/40x40' },
  { id: 4, opponent: 'CryptoKing', wager: 5.0, avatar: 'https://placehold.co/40x40' },
  { id: 5, opponent: 'MysticMarvin', wager: 0.1, avatar: 'https://placehold.co/40x40' },
];

export function MatchmakingCard() {
  const { connected } = useSimulatedWallet();
  const [state, setState] = useState<MatchmakingState>("idle");

  const handleJoinMatch = () => {
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
      <CardHeader>
        <CardTitle className="font-headline">The Arena</CardTitle>
        <CardDescription>Find an opponent and flip for glory.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center p-6">
        {state === "idle" && (
           <div className="flex-grow flex flex-col justify-center">
            {!connected ? (
              <div className="text-center">
                <p className="text-lg text-muted-foreground">Connect your wallet to see available games.</p>
              </div>
            ) : (
                <ScrollArea className="flex-grow h-64 pr-4">
                    <div className="space-y-4">
                        {availableGames.map(game => (
                            <div key={game.id} className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-secondary/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={game.avatar} alt={game.opponent} data-ai-hint="gaming avatar"/>
                                        <AvatarFallback>{game.opponent.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{game.opponent}</p>
                                        <p className="text-xs text-muted-foreground">Wager: ◎ {game.wager.toFixed(2)}</p>
                                    </div>
                                </div>
                                <Button size="sm" onClick={handleJoinMatch} className="font-headline tracking-wider">
                                    <Swords className="mr-2 h-4 w-4"/>
                                    Join
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )}
           </div>
        )}
        {state === "searching" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="font-semibold text-lg font-headline">Joining match...</p>
            <p className="text-muted-foreground">The runes are casting, prepare for battle.</p>
          </div>
        )}
        {state === "found" && (
            <div className="flex flex-col items-center gap-6 text-center w-full">
                <p className="font-headline text-2xl text-primary tracking-widest">Match Found!</p>
                <div className="flex items-center justify-around w-full">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-24 w-24 border-4 border-primary shadow-lg">
                            <AvatarImage src="https://placehold.co/100x100" alt="Your avatar" data-ai-hint="warrior avatar" />
                            <AvatarFallback>YOU</AvatarFallback>
                        </Avatar>
                        <p className="font-bold text-lg">You</p>
                    </div>
                    <Swords className="h-12 w-12 text-muted-foreground shrink-0 mx-4" />
                    <div className="flex flex-col items-center gap-2">
                         <Avatar className="h-24 w-24 border-4 border-destructive shadow-lg">
                            <AvatarImage src="https://placehold.co/100x100" alt="Opponent's avatar" data-ai-hint="mage avatar"/>
                            <AvatarFallback>OPP</AvatarFallback>
                        </Avatar>
                        <p className="font-bold text-lg">RuneMaster69</p>
                    </div>
                </div>
                 <Button onClick={handleReset} variant="outline" className="mt-4">
                    Return to Lobby
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
