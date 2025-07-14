import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-transcript.ts';
import '@/ai/flows/transcribe-audio.ts';