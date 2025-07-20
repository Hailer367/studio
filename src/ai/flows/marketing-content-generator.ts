'use server';

/**
 * @fileOverview A marketing content generation AI agent.
 *
 * - generateMarketingContent - A function that handles the marketing content generation process.
 * - GenerateMarketingContentInput - The input type for the generateMarketingContent function.
 * - GenerateMarketingContentOutput - The return type for the generateMarketingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingContentInputSchema = z.object({
  gameDescription: z
    .string()
    .describe('A description of the Citadel Coin game.'),
  targetAudience: z
    .string()
    .describe('The target audience for the marketing content.'),
  promotionalGoal: z
    .string()
    .describe('The promotional goal for the marketing content.'),
});

export type GenerateMarketingContentInput = z.infer<typeof GenerateMarketingContentInputSchema>;

const GenerateMarketingContentOutputSchema = z.object({
  tweets: z.array(z.string()).describe('A list of engaging tweets for Twitter X.'),
  marketingIdeas: z.array(z.string()).describe('A list of marketing ideas for Citadel Coin.'),
});

export type GenerateMarketingContentOutput = z.infer<typeof GenerateMarketingContentOutputSchema>;

export async function generateMarketingContent(input: GenerateMarketingContentInput): Promise<GenerateMarketingContentOutput> {
  return generateMarketingContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingContentPrompt',
  input: {schema: GenerateMarketingContentInputSchema},
  output: {schema: GenerateMarketingContentOutputSchema},
  prompt: `You are a marketing expert specializing in creating engaging content for Twitter X.

You will use the following information to generate a list of engaging tweets and marketing ideas for Citadel Coin.

Game Description: {{{gameDescription}}}
Target Audience: {{{targetAudience}}}
Promotional Goal: {{{promotionalGoal}}}

Tweets:
Marketing Ideas:`,
});

const generateMarketingContentFlow = ai.defineFlow(
  {
    name: 'generateMarketingContentFlow',
    inputSchema: GenerateMarketingContentInputSchema,
    outputSchema: GenerateMarketingContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
