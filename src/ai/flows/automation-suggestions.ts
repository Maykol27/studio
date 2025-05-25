
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
      'The approximate budget the user has for AI solutions, selected from a predefined list (e.g., "no-especificado", "muy-limitado", "limitado", "moderado", "sustancial").'
    ),
});
export type AutomationSuggestionsInput = z.infer<typeof AutomationSuggestionsInputSchema>;

const AutomationSuggestionItemSchema = z.object({
  title: z.string().describe('The concise title of the automation suggestion.'),
  generalExplanation: z.string().describe('A general explanation of the automation suggestion (2-3 sentences), highlighting how it can help the business, without mentioning specific tools.'),
});

const AutomationSuggestionsOutputSchema = z.object({
  introductoryMessage: z
    .string()
    .describe('A brief, encouraging introductory message before listing the suggestions.'),
  suggestions: z.array(AutomationSuggestionItemSchema).min(3).max(3)
    .describe('A list of exactly three distinct automation suggestions, each with a title and a general explanation.'),
  callToAction: z
    .string()
    .describe('A clear call to action prompting the user to complete the contact form for a personalized consultation to discuss specific strategies and tools.'),
});
export type AutomationSuggestionsOutput = z.infer<typeof AutomationSuggestionsOutputSchema>;

export async function getAutomationSuggestions(input: AutomationSuggestionsInput): Promise<AutomationSuggestionsOutput> {
  return automationSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automationSuggestionsPrompt',
  input: {schema: AutomationSuggestionsInputSchema},
  output: {schema: AutomationSuggestionsOutputSchema},
  prompt: `Eres un consultor experto de Aetheria Consulting. Un usuario ha proporcionado información sobre su negocio. Tu tarea es analizar esta información y generar TRES sugerencias de automatización, cada una con un título y una explicación general y concisa (2-3 frases).
Adicionalmente, debes proporcionar un mensaje introductorio breve y positivo, y un llamado a la acción claro para que el usuario complete el formulario de contacto para una asesoría personalizada.

Contexto del usuario (NO lo repitas directamente en la respuesta, úsalo para inspirar las sugerencias):
- Descripción del Negocio: {{{businessDescription}}}
- Necesidades Específicas: {{{businessNeeds}}}
- Nivel de Experiencia con IA: {{{aiExperienceLevel}}}
- Presupuesto Estimado para IA: {{{aiBudget}}}

Formato de Salida Esperado:
{
  "introductoryMessage": "¡Gracias por compartir los detalles! Basado en tu información, aquí hay tres áreas generales donde la IA y la automatización podrían impulsar tu negocio:",
  "suggestions": [
    {
      "title": "Ej: Optimización de Consultas de Clientes",
      "generalExplanation": "Ej: Implementar un sistema inteligente podría agilizar la respuesta a preguntas frecuentes, liberando tiempo para consultas más complejas y mejorando la satisfacción del cliente."
    },
    {
      "title": "Ej: Gestión Eficiente de Tareas Repetitivas",
      "generalExplanation": "Ej: Identificar y automatizar procesos manuales y repetitivos puede reducir errores, aumentar la productividad general y permitir que tu equipo se enfoque en actividades de mayor valor."
    },
    {
      "title": "Ej: Análisis Básico de Datos para Decisiones",
      "generalExplanation": "Ej: Utilizar herramientas sencillas para recopilar y visualizar datos clave de tu negocio puede ofrecer insights valiosos para tomar decisiones más informadas y estratégicas sin una gran inversión inicial."
    }
  ],
  "callToAction": "Para explorar estas ideas más a fondo, discutir herramientas específicas y crear una estrategia a tu medida, te invitamos a completar nuestro formulario de contacto. ¡Agendemos una cita!"
}

Asegúrate de que las explicaciones sean generales y no mencionen herramientas o software específicos. El objetivo es dar una visión de alto nivel.
Las tres sugerencias deben ser distintas y relevantes para el contexto proporcionado.
El introductoryMessage debe ser alentador.
El callToAction debe invitar claramente al contacto para una consulta más detallada.
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

