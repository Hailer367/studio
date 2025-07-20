import { Coin } from "@/components/citadel/coin";
import { MatchmakingCard } from "@/components/citadel/matchmaking-card";
import { WalletCard } from "@/components/citadel/wallet-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-4xl font-headline text-white">Welcome, Challenger</h1>
        <p className="text-muted-foreground">Fate awaits your coin flip. Will you emerge victorious?</p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <MatchmakingCard />
        </div>
        <div className="lg:col-span-1">
            <WalletCard />
        </div>
        <div className="lg:col-span-3">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">The Citadel's Coin</CardTitle>
                    <CardDescription>This mystical artifact determines the fate of each match.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-12">
                   <Coin />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
