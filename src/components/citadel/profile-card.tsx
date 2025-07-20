"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSimulatedWallet } from "@/hooks/use-simulated-wallet";
import { User, Swords, BarChart, History } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ProfileCard() {
  const { connected, publicKey, connect } = useSimulatedWallet();

  const stats = [
    { name: "Matches Played", value: 42, icon: Swords },
    { name: "Win Rate", value: "69%", icon: BarChart },
    { name: "Total Wagered", value: "◎ 10.5", icon: "SOL" },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <User className="h-8 w-8 text-accent" />
        <div>
          <CardTitle className="font-headline">Your Profile</CardTitle>
          <CardDescription>Your legend in the Citadel</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {connected && publicKey ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={`https://placehold.co/100x100`} alt="Your avatar" data-ai-hint="warrior avatar" />
                <AvatarFallback>{publicKey.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-lg">Challenger</p>
                <p className="text-xs text-muted-foreground font-mono" title={publicKey}>
                  {publicKey.substring(0, 6)}...{publicKey.substring(publicKey.length - 6)}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {stats.map((stat) => (
                <div key={stat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {stat.icon === 'SOL' ? <span className="font-bold">◎</span> : <stat.icon className="h-4 w-4" />}
                    <span>{stat.name}</span>
                  </div>
                  <span className="font-bold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full space-y-4">
            <User className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Connect your wallet to view your profile.</p>
            <Button onClick={connect}>Connect Wallet</Button>
          </div>
        )}
      </CardContent>
      {connected && (
        <CardFooter>
            <Button asChild variant="outline" className="w-full">
                <Link href="/history">
                    <History className="mr-2" /> View Match History
                </Link>
            </Button>
        </CardFooter>
      )}
    </Card>
  );
}
