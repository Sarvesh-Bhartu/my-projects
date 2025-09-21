'use server';

/**
 * @fileOverview Processes wellness-related images, either by generating them from a description or validating an uploaded image.
 *
 * - processWellnessImage - A function that generates or validates a wellness image.
 * - ProcessWellnessImageInput - The input type for the processWellnessImage function.
 * - ProcessWellnessImageOutput - The return type for the processWellnessImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessWellnessImageInputSchema = z.object({
  imageDescription: z
    .string()
    .describe('A description of the wellness-related image.'),
  imageDataUri: z
    .string()
    .optional()
    .describe(
      "Optional. A data URI of an image to validate. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ProcessWellnessImageInput = z.infer<typeof ProcessWellnessImageInputSchema>;

const ProcessWellnessImageOutputSchema = z.object({
  imageUrl: z.string().describe('The processed image URL in data URI format.'),
  isValid: z
    .boolean()
    .describe(
      'Whether the image is valid and related to the wellness activity.'
    ),
  feedback: z
    .string()
    .describe('Feedback on why the image is or is not valid.'),
});
export type ProcessWellnessImageOutput = z.infer<typeof ProcessWellnessImageOutputSchema>;

export async function processWellnessImage(
  input: ProcessWellnessImageInput
): Promise<ProcessWellnessImageOutput> {
  return processWellnessImageFlow(input);
}

const validationPrompt = ai.definePrompt({
  name: 'validateWellnessImagePrompt',
  input: {
    schema: z.object({
      imageDescription: z.string(),
      imageDataUri: z.string(),
    }),
  },
  output: {
    schema: z.object({
      isValid: z.boolean(),
      feedback: z.string(),
    }),
  },
  prompt: `You are an AI agent that validates if an image is appropriate proof for a described wellness activity.

The user performed the following activity: "{{imageDescription}}"

They submitted this image as proof:
{{media url=imageDataUri}}

Analyze the image and determine if it's valid proof for the described activity.
- The image must be safe and appropriate.
- The image must genuinely relate to the activity. For example, for "went for a run", a picture of running shoes, a park, or a selfie post-run is valid. A picture of a cat is not.

Set 'isValid' to true if the image is valid proof, and false otherwise.
Provide brief 'feedback' explaining your decision.`,
});

const processWellnessImageFlow = ai.defineFlow(
  {
    name: 'processWellnessImageFlow',
    inputSchema: ProcessWellnessImageInputSchema,
    outputSchema: ProcessWellnessImageOutputSchema,
  },
  async input => {
    let imageUrl = input.imageDataUri;
    let validationResult: { isValid: boolean; feedback: string };

    // If no image is uploaded, generate one.
    if (!imageUrl) {
      const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `Generate an image of ${input.imageDescription}`,
      });

      if (!media || !media.url) {
        throw new Error('Failed to generate image.');
      }
      imageUrl = media.url;
      // Assume generated images are always valid for the description.
      validationResult = {
        isValid: true,
        feedback: 'Image generated successfully based on your description.',
      };
    } else {
      // If an image is uploaded, validate it.
      const { output } = await validationPrompt({
        imageDescription: input.imageDescription,
        imageDataUri: imageUrl,
      });
      validationResult = output!;
    }

    if (!validationResult) {
        throw new Error('Image validation failed to return a result.');
    }

    return {
      imageUrl: imageUrl,
      isValid: validationResult.isValid,
      feedback: validationResult.feedback,
    };
  }
);
