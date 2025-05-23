// AutomationSuggestions.ts
'use server';
/**
 * @fileOverview AI-powered automation suggestion tool.
 *
 * - getAutomationSuggestions - A function that handles the automation suggestion process.
 * - AutomationSuggestionsInput - The input type for the getAutomationSuggestions function.
 * - AutomationSuggestionsOutput - The return type for the getAutomationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomationSuggestionsInputSchema = z.object({
  businessDescription: z
    .string()
    .describe('Detailed description of the user business processes.'),
});
export type AutomationSuggestionsInput = z.infer<typeof AutomationSuggestionsInputSchema>;

const AutomationSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of personalized automation strategies for the business.'),
});
export type AutomationSuggestionsOutput = z.infer<typeof AutomationSuggestionsOutputSchema>;

export async function getAutomationSuggestions(input: AutomationSuggestionsInput): Promise<AutomationSuggestionsOutput> {
  return automationSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automationSuggestionsPrompt',
  input: {schema: AutomationSuggestionsInputSchema},
  output: {schema: AutomationSuggestionsOutputSchema},
  prompt: `You are an AI consultant expert in business process automation.

You will analyze the business description and suggest personalized automation strategies.

Business Description: {{{businessDescription}}}

Provide a detailed list of suggestions.`,
});

const automationSuggestionsFlow = ai.defineFlow(
  {
    name: 'automationSuggestionsFlow',
    inputSchema: AutomationSuggestionsInputSchema,
    outputSchema: AutomationSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
