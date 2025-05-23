'use server';

/**
 * @fileOverview A blog post summarization AI agent.
 *
 * - summarizeBlogPost - A function that handles the blog post summarization process.
 * - BlogPostSummarizerInput - The input type for the summarizeBlogPost function.
 * - BlogPostSummarizerOutput - The return type for the summarizeBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BlogPostSummarizerInputSchema = z.object({
  blogPostContent: z.string().describe('The content of the blog post to summarize.'),
});
export type BlogPostSummarizerInput = z.infer<typeof BlogPostSummarizerInputSchema>;

const BlogPostSummarizerOutputSchema = z.object({
  summary: z.string().describe('A short summary of the blog post.'),
});
export type BlogPostSummarizerOutput = z.infer<typeof BlogPostSummarizerOutputSchema>;

export async function summarizeBlogPost(input: BlogPostSummarizerInput): Promise<BlogPostSummarizerOutput> {
  return summarizeBlogPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'blogPostSummarizerPrompt',
  input: {schema: BlogPostSummarizerInputSchema},
  output: {schema: BlogPostSummarizerOutputSchema},
  prompt: `Summarize the following blog post in a concise paragraph.\n\nBlog Post:\n{{{blogPostContent}}}`,
});

const summarizeBlogPostFlow = ai.defineFlow(
  {
    name: 'blogPostSummarizerFlow',
    inputSchema: BlogPostSummarizerInputSchema,
    outputSchema: BlogPostSummarizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
