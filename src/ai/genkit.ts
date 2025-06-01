
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Log to check if the API key is visible at module load time (server-side)
// IMPORTANT: Do not log the key itself in production for security reasons.
// This log helps confirm if the env var is loaded.
if (process.env.NODE_ENV === 'development') {
  console.log('[genkit.ts] GOOGLE_API_KEY is set:', !!process.env.GOOGLE_API_KEY ? "Yes" : "No (or not visible here)");
  if (process.env.GOOGLE_API_KEY) {
    console.log('[genkit.ts] GOOGLE_API_KEY (first 5 chars for verification in dev):', process.env.GOOGLE_API_KEY.substring(0,5));
  }
} else {
  // In production, we just check if it's defined to avoid logging "No" if it's actually set
  // but we don't want to confirm its presence too explicitly in logs unless necessary.
  if (!process.env.GOOGLE_API_KEY) {
    console.warn("[genkit.ts] WARNING: GOOGLE_API_KEY environment variable does not appear to be set. Genkit AI features may fail.");
  } else {
    console.log("[genkit.ts] GOOGLE_API_KEY is present (production check).");
  }
}

export const ai = genkit({
  plugins: [googleAI()], // This will look for GOOGLE_API_KEY in process.env
  model: 'googleai/gemini-2.0-flash',
});
