"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateMarketingContent,
  GenerateMarketingContentInput,
  GenerateMarketingContentOutput,
} from "@/ai/flows/marketing-content-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Loader2, Twitter, Lightbulb } from "lucide-react";

const formSchema = z.object({
  gameDescription: z.string().min(10, "Please provide a more detailed description."),
  targetAudience: z.string().min(5, "Please describe your target audience."),
  promotionalGoal: z.string().min(5, "Please describe your promotional goal."),
});

export function MarketingAITool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateMarketingContentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<GenerateMarketingContentInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameDescription: "Citadel Coin is a high-stakes, mystical coin flip game on the Solana blockchain. Players wager SOL in a 1v1 match, where fate is decided by the flip of a rune-engraved coin.",
      targetAudience: "Crypto enthusiasts, Web3 gamers, and gamblers who enjoy high-risk, high-reward games. They are active on Twitter/X and Discord.",
      promotionalGoal: "Drive new user sign-ups and initial deposits. Increase engagement on Twitter/X with viral content.",
    },
  });

  const onSubmit: SubmitHandler<GenerateMarketingContentInput> = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateMarketingContent(data);
      setResult(response);
    } catch (e) {
      setError("Failed to generate content. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Marketing Content Generator</CardTitle>
          <CardDescription>Fill in the details to generate promotional content with AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="gameDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your game..." rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Crypto gamers, NFT collectors" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="promotionalGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promotional Goal</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Increase user sign-ups" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate Content
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generated Content</CardTitle>
          <CardDescription>Here are the AI-powered suggestions for your campaign.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p>The AI oracle is consulting the runes...</p>
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {result && (
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 font-headline"><Twitter className="text-blue-400" /> Tweets</h3>
                <div className="space-y-4">
                  {result.tweets.map((tweet, index) => (
                    <div key={index} className="p-3 border rounded-md bg-background text-sm">
                      <p>{tweet}</p>
                      <p className="text-blue-400 mt-2">#RuneFlip #SolanaGaming #Web3Gaming</p>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 font-headline"><Lightbulb className="text-yellow-400" /> Marketing Ideas</h3>
                <ul className="space-y-2 list-disc list-inside">
                  {result.marketingIdeas.map((idea, index) => (
                    <li key={index} className="text-sm">{idea}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {!loading && !result && !error && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-muted-foreground">Your generated content will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
