import { MarketingAITool } from "@/components/citadel/marketing-ai-tool";
import { Separator } from "@/components/ui/separator";

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline">AI Marketing Oracle</h1>
        <p className="text-muted-foreground">
          Let the digital spirits craft compelling marketing campaigns for Citadel Coin.
        </p>
      </div>
      <Separator />
      <MarketingAITool />
    </div>
  );
}
