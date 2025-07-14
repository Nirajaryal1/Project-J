import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const googleApiKey = process.env.GOOGLE_API_KEY;

if (!googleApiKey) {
  throw new Error(
    'GOOGLE_API_KEY is not defined. Please create a .env file in the root of your project and add your API key.'
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: googleApiKey,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
