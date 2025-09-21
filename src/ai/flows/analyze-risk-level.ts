'use server';
/**
 * @fileOverview Analyzes a GAD-9 score to determine a risk level and provide a summary.
 *
 * - analyzeRiskLevel - The main function to trigger the analysis.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const lowRiskExamples = `
- Social Awkwardness: "I'm going to a party this weekend where I won't know many people. I'm feeling a bit nervous about making small talk. Do you have any conversation starters I could use?"
- Minor Setback: "I missed my workout for the third time this week and I feel a little guilty. I'm struggling to find the motivation to get back on track."
- Simple Disagreement: "I had a small argument with my parents about my curfew. It's a bit frustrating, but I know we'll sort it out. I just need to cool off."
- Pre-Presentation Jitters: "I have a big presentation at work tomorrow and I'm feeling the pressure. I'm worried I might forget my lines. Any tips for calming my nerves beforehand?"
`;

const mediumRiskExamples = `
- Intense Loneliness: "I feel like I have no real friends. I see everyone else hanging out online and I just feel so completely alone and isolated. I haven't left my room much all week because I don't see the point."
- Negative Self-Image: "I can't stand looking in the mirror lately. I feel so worthless and unattractive, and it's affecting my confidence in everything I do. I've been avoiding seeing people because of it."
- Constant Family Conflict: "The fighting at home is unbearable. It's every single day. I can't sleep because of the stress, and I feel like I have to walk on eggshells all the time. I just feel trapped."
- Severe Burnout: "I am completely burned out from my job. I dread waking up in the morning. I'm exhausted all the time, making silly mistakes, and I feel like I'm failing at every task. I don't know how much longer I can keep this up."
`;

const highRiskExamples = `
- Post-Breakup Despair: "She left me and my whole world is over. There is absolutely nothing left for me without her. I am a complete failure and a burden to everyone. I just want the pain to stop."
- Deep Depression: "I feel nothing but emptiness. Every day is the same gray fog. There's no point in getting out of bed, no point in anything. I'm just taking up space. It would be better for everyone if I wasn't here."
- Feeling Trapped & Abused: "I can't escape my family. It's never going to get better. I'm a burden and I'm worthless. There is no way out of this pain. I just want to disappear forever."
- Job Loss & Hopelessness: "I lost my job and I've failed my family. I have no future and no way to provide for them. I'm a complete disgrace. There's no coming back from this. I just want it all to end."
`;


const AnalyzeRiskLevelInputSchema = z.object({
  score: z.number().describe('The total score from the GAD-9 questionnaire (0-21).'),
});
type AnalyzeRiskLevelInput = z.infer<typeof AnalyzeRiskLevelInputSchema>;

const AnalyzeRiskLevelOutputSchema = z.object({
  riskLevel: z.enum(['low', 'medium', 'high']).describe('The assessed risk level.'),
  summary: z.string().describe('A brief, empathetic summary for the user based on their score.'),
});
export type AnalyzeRiskLevelOutput = z.infer<typeof AnalyzeRiskLevelOutputSchema>;


export async function analyzeRiskLevel(input: AnalyzeRiskLevelInput): Promise<AnalyzeRiskLevelOutput> {
  return analyzeRiskLevelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeRiskLevelPrompt',
  input: { schema: AnalyzeRiskLevelInputSchema },
  output: { schema: AnalyzeRiskLevelOutputSchema },
  prompt: `You are an AI assistant specialized in mental wellness. Your task is to analyze a user's GAD-9 score and determine their anxiety risk level.

GAD-9 Score Interpretation:
- 0-4: Minimal anxiety (Low Risk)
- 5-9: Mild anxiety (Low Risk)
- 10-14: Moderate anxiety (Medium Risk)
- 15-21: Severe anxiety (High Risk)

User's GAD-9 Score: {{{score}}}

Based on the score, determine the risk level ('low', 'medium', or 'high'). Then, write a brief, one-sentence summary for the user that is empathetic and encouraging.

Here are some examples of user expressions for each risk level to help you calibrate the tone of your summary:

Low Risk Examples:
${lowRiskExamples}

Medium Risk Examples:
${mediumRiskExamples}

High Risk Examples:
${highRiskExamples}

Your response must be in the specified JSON format.
`,
});


const analyzeRiskLevelFlow = ai.defineFlow(
  {
    name: 'analyzeRiskLevelFlow',
    inputSchema: AnalyzeRiskLevelInputSchema,
    outputSchema: AnalyzeRiskLevelOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
