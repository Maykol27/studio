
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
      'The approximate budget the user has for AI solutions, selected from a predefined list (e.g., "muy-limitado", "limitado", "moderado", "sustancial", "no-especificado").'
    ),
});
export type AutomationSuggestionsInput = z.infer<typeof AutomationSuggestionsInputSchema>;

const AutomationSuggestionsOutputSchema = z.object({
  shortResponse: z
    .string()
    .describe('A short, encouraging message acknowledging the user input.'),
  callToAction: z
    .string()
    .describe('A clear call to action prompting the user to complete the contact form for a personalized consultation to discuss specific strategies.'),
});
export type AutomationSuggestionsOutput = z.infer<typeof AutomationSuggestionsOutputSchema>;

export async function getAutomationSuggestions(input: AutomationSuggestionsInput): Promise<AutomationSuggestionsOutput> {
  return automationSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automationSuggestionsPrompt',
  input: {schema: AutomationSuggestionsInputSchema},
  output: {schema: AutomationSuggestionsOutputSchema},
  prompt: `Eres un consultor de Aetheria Consulting. Un usuario ha completado un formulario inicial con detalles sobre su negocio.
Tu tarea es generar una respuesta breve y positiva, seguida de un claro llamado a la acción para que el usuario complete el formulario de contacto principal y así poder agendar una cita para una asesoría personalizada donde se discutirán estrategias específicas.

Utiliza la siguiente información del usuario como contexto para tu respuesta, pero NO la repitas directamente en la respuesta generada:
- Descripción del Negocio: {{{businessDescription}}}
- Necesidades Específicas: {{{businessNeeds}}}
- Nivel de Experiencia con IA: {{{aiExperienceLevel}}}
- Presupuesto Estimado para IA: {{{aiBudget}}}

Debes generar la respuesta en el formato especificado por el esquema de salida.
El 'shortResponse' debe ser un mensaje alentador que reconozca la información recibida y mencione brevemente que hay potencial para aplicar soluciones de IA.
El 'callToAction' debe invitar claramente al usuario a la sección de contacto para una consulta más detallada y personalizada.
Ejemplo de Tono y Estructura:
shortResponse: "¡Gracias por compartir los detalles de tu negocio! Vemos un gran potencial para aplicar soluciones de IA y automatización que se ajusten a tus necesidades y presupuesto."
callToAction: "Para explorar estas oportunidades a fondo y recibir una asesoría completamente personalizada, te invitamos a completar nuestro formulario de contacto. ¡Agendemos una cita para diseñar juntos el futuro de tu empresa!"
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
