// Wellness Guidance Chat Flow

'use server';

/**
 * @fileOverview This file defines a Genkit flow for an AI-powered wellness guidance chat.
 *
 * - wellnessGuidanceChat - A function that initiates the wellness guidance chat flow.
 * - WellnessGuidanceChatInput - The input type for the wellnessGuidanceChat function, including the user's message and optional voice input.
 * - WellnessGuidanceChatOutput - The return type for the wellnessGuidanceChat function, providing the AI's response.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WellnessGuidanceChatInputSchema = z.object({
  message: z.string().describe('The user message.'),
  voiceInput: z.string().optional().describe('Optional voice input from the user.'),
  riskLevel: z.enum(['low', 'medium', 'high']).optional().describe('The user\'s assessed anxiety risk level.'),
});

export type WellnessGuidanceChatInput = z.infer<typeof WellnessGuidanceChatInputSchema>;

const WellnessGuidanceChatOutputSchema = z.object({
  response: z.string().describe('The AI response to the user message.'),
});

export type WellnessGuidanceChatOutput = z.infer<typeof WellnessGuidanceChatOutputSchema>;

export async function wellnessGuidanceChat(input: WellnessGuidanceChatInput): Promise<WellnessGuidanceChatOutput> {
  return wellnessGuidanceChatFlow(input);
}

const wellnessGuidanceChatPrompt = ai.definePrompt({
  name: 'wellnessGuidanceChatPrompt',
  input: { schema: WellnessGuidanceChatInputSchema },
  output: { schema: WellnessGuidanceChatOutputSchema },
  prompt: `You are a wellness guidance chatbot designed to provide personalized advice and support.

  Your response should be tailored to the user's assessed risk level, if available.
  - If the risk level is 'low', provide general encouragement and wellness tips.
  - If the risk level is 'medium', offer supportive strategies and gently suggest resources like peer support.
  - If the risk level is 'high', respond with extra empathy and care. Prioritize gentle, calming language and strongly encourage seeking professional help without being alarming.

  User's Assessed Risk Level: {{{riskLevel}}}

  Respond to the user message with helpful and encouraging guidance.

  User Message: {{{message}}}
  Voice Input: {{{voiceInput}}}
  `,
});

const wellnessGuidanceChatFlow = ai.defineFlow(
  {
    name: 'wellnessGuidanceChatFlow',
    inputSchema: WellnessGuidanceChatInputSchema,
    outputSchema: WellnessGuidanceChatOutputSchema,
  },
  async (input) => {
    const { output } = await wellnessGuidanceChatPrompt(input);
    return output!;
  }
);
