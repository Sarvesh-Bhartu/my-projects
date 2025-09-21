import { config } from 'dotenv';
config();

import '@/ai/flows/process-wellness-image.ts';
import '@/ai/flows/wellness-guidance-chat.ts';
import '@/aiflows/youtube-recommendation-flow.ts';
import '@/ai/flows/analyze-chat-history.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/analyze-risk-level.ts';
