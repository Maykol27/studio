
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
    .describe('Detailed description of the user business processes, industry, and size.'),
  businessNeeds: z
    .string()
    .describe('Specific needs, pain points, or areas the user wants to improve in their business.'),
  aiExperienceLevel: z
    .string()
    .describe("The user's level of experience with AI (e.g., Principiante, Intermedio, Avanzado, Experto)."),
  aiBudget: z
    .string()
    .optional()
    .describe(
      'The approximate budget the user has for AI solutions, selected from a predefined list (e.g., "menos-de-500", "500-1000", "proyecto-especifico", "no-especificado").'
    ),
});
export type AutomationSuggestionsInput = z.infer<typeof AutomationSuggestionsInputSchema>;

const AutomationSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of personalized automation strategies for the business, formatted as a multi-line string. Each suggestion should be actionable and tailored to the input.'),
});
export type AutomationSuggestionsOutput = z.infer<typeof AutomationSuggestionsOutputSchema>;

export async function getAutomationSuggestions(input: AutomationSuggestionsInput): Promise<AutomationSuggestionsOutput> {
  return automationSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automationSuggestionsPrompt',
  input: {schema: AutomationSuggestionsInputSchema},
  output: {schema: AutomationSuggestionsOutputSchema},
  prompt: `Eres un consultor experto en IA y automatización de procesos de negocio, especializado en ayudar a PyMEs.

Analiza la siguiente información sobre el negocio de un usuario para proponer estrategias de automatización personalizadas y accionables. Considera su nivel de experiencia y presupuesto para que las sugerencias sean realistas y relevantes.

**Descripción del Negocio:**
{{{businessDescription}}}

**Necesidades Específicas del Negocio:**
{{{businessNeeds}}}

**Nivel de Experiencia con IA del Usuario:**
{{{aiExperienceLevel}}}

**Presupuesto Estimado para IA (seleccionado de una lista):**
{{{aiBudget}}}

Basado en esta información, proporciona una lista detallada de al menos 3-5 sugerencias de automatización. Para cada sugerencia:
1. Describe claramente el proceso o tarea a automatizar.
2. Explica cómo la IA o la automatización pueden ayudar.
3. Menciona los beneficios esperados (ej. ahorro de tiempo, reducción de costos, mejora de eficiencia, etc.).
4. Si es posible, sugiere herramientas o tipos de soluciones de IA que podrían ser adecuadas, considerando el nivel de experiencia y presupuesto.

Formatea tus sugerencias de manera clara, por ejemplo, usando encabezados o listas con viñetas para cada una. El tono debe ser profesional, alentador y fácil de entender para alguien que no sea experto en IA.
Prioriza soluciones que ofrezcan un alto impacto y sean relativamente fáciles de implementar para una PyME.
Si el presupuesto es "no-especificado", ofrece un rango de opciones o pregunta por más detalles para refinar las sugerencias.
`,
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

    
