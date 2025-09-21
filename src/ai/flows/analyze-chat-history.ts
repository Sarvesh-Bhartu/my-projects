'use server';
/**
 * @fileOverview A Genkit flow for analyzing a user's chat history to provide wellness recommendations.
 *
 * - analyzeChatHistory - The main function to trigger the analysis.
 * - ChatAnalysisInput - Input type for the chat history.
 * - ChatAnalysisOutput - The structured output with intensity and recommendations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schemas
const ChatAnalysisInputSchema = z.object({
    chatHistory: z.string().describe("The user's chat history as a single text block."),
});
export type ChatAnalysisInput = z.infer<typeof ChatAnalysisInputSchema>;

const ChatAnalysisOutputSchema = z.object({
  intensity: z
    .enum(['low', 'medium', 'high'])
    .describe('The assessed intensity level of the user\'s needs.'),
  recommendation: z
    .string()
    .describe('A detailed, empathetic recommendation paragraph based on the analysis.'),
  suggestedAction: z
    .enum(['soulSprints', 'meetingPods', 'professionalHelp'])
    .describe('A specific action category to recommend to the user.'),
});
export type ChatAnalysisOutput = z.infer<typeof ChatAnalysisOutputSchema>;


// Main analysis flow
const analysisFlow = ai.defineFlow(
  {
    name: 'analyzeChatHistoryFlow',
    inputSchema: ChatAnalysisInputSchema,
    outputSchema: ChatAnalysisOutputSchema,
  },
  async ({ chatHistory }) => {
    const { output } = await ai.generate({
      prompt: `You will be provided with a user's chat history. Analyze the user's chat history to assess their current wellness state. Determine the intensity of their needs (low, medium, or high).
      
      - Low intensity: User might be curious, seeking general advice, or exploring wellness topics.
      - Medium intensity: User might be dealing with mild stress, looking for coping mechanisms, or needs community support.
      - High intensity: User might be expressing significant distress, feelings of crisis, or mentioning topics that require immediate professional attention.
      
      Based on the intensity, provide an empathetic recommendation and a suggested action.
      - Low: Recommend exploring 'Soul Sprints' to build positive habits.
      - Medium: Recommend joining 'Meeting Pods' for peer support.
      - High: Strongly and gently recommend seeking 'professional help' and provide resources if possible (though do not list actual resources, just state that they should seek them).

      Your response MUST be in the specified JSON format and should not include any extra fields.

      Here is the user's chat history:
      ---
      ${chatHistory}
      ---
      `,
    });

    if (!output) {
        throw new Error("Analysis failed to produce an output.");
    }
    
    return output as ChatAnalysisOutput;
  }
);

// Exported wrapper function
export async function analyzeChatHistory(input: ChatAnalysisInput): Promise<ChatAnalysisOutput> {
  return analysisFlow(input);
}
