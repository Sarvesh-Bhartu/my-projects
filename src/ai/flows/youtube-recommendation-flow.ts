'use server';
/**
 * @fileOverview A flow for recommending YouTube videos based on a user's query.
 *
 * - youtubeRecommendation - A function that returns video recommendations and query intensity.
 * - YouTubeRecommendationInput - The input type for the youtubeRecommendation function.
 * - YouTubeRecommendationOutput - The return type for the youtubeRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const YouTubeRecommendationInputSchema = z.object({
  query: z.string().describe('The user query to base recommendations on.'),
});
export type YouTubeRecommendationInput = z.infer<typeof YouTubeRecommendationInputSchema>;

const VideoSchema = z.object({
  videoId: z.string().describe('A plausible YouTube video ID (e.g., dQw4w9WgXcQ).'),
  title: z.string().describe('The title of the YouTube video.'),
  channel: z.string().describe('The name of the YouTube channel.'),
  thumbnailUrl: z.string().describe('A placeholder image URL for the video thumbnail from picsum.photos.'),
});

const YouTubeRecommendationOutputSchema = z.object({
  intensity: z
    .enum(['low', 'medium', 'high'])
    .describe('The perceived intensity or urgency of the user query.'),
  videos: z
    .array(VideoSchema)
    .max(3)
    .describe('An array of recommended YouTube videos.'),
});
export type YouTubeRecommendationOutput = z.infer<typeof YouTubeRecommendationOutputSchema>;

export async function youtubeRecommendation(
  input: YouTubeRecommendationInput
): Promise<YouTubeRecommendationOutput> {
  return youtubeRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'youtubeRecommendationPrompt',
  input: { schema: YouTubeRecommendationInputSchema },
  output: { schema: YouTubeRecommendationOutputSchema },
  prompt: `You are an expert at recommending helpful YouTube videos for wellness and mental health.
Based on the user's query, first determine the intensity of their situation (low, medium, or high).
Then, generate a list of 3 relevant and helpful YouTube video recommendations.
For each video, provide a plausible but fake video ID, a compelling title, a relevant channel name, and a random placeholder thumbnail URL from picsum.photos (e.g., https://picsum.photos/seed/video1/200/125). Use a different seed for each video.

User Query: {{{query}}}
`,
});

const youtubeRecommendationFlow = ai.defineFlow(
  {
    name: 'youtubeRecommendationFlow',
    inputSchema: YouTubeRecommendationInputSchema,
    outputSchema: YouTubeRecommendationOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
