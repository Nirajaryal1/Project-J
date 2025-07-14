'use server';

import { transcribeAudio } from '@/ai/flows/transcribe-audio';
import { summarizeTranscript } from '@/ai/flows/summarize-transcript';

export async function getTranscriptionAndSummaryAction(audioDataUri: string) {
  if (!audioDataUri) {
    throw new Error('Audio data is missing.');
  }

  try {
    const { transcript } = await transcribeAudio({ audioDataUri });
    if (!transcript) {
      throw new Error('Transcription failed to return text.');
    }

    const { summary } = await summarizeTranscript({ transcript });
    if (!summary) {
      throw new Error('Summarization failed to return text.');
    }

    return { transcript, summary };
  } catch (error) {
    console.error('Error in AI processing pipeline:', error);
    throw new Error('Failed to process audio. Please try again.');
  }
}
