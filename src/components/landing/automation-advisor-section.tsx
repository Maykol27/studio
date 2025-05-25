
'use client';

import { useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getAutomationSuggestions, type AutomationSuggestionsInput, type AutomationSuggestionsOutput } from '@/ai/flows/automation-suggestions';
import { Loader2 } from 'lucide-react';

// Texts are now hardcoded in Spanish
const texts = {
  title: "Descubre Tu Potencial de Automatización",
  description: "Completa este formulario para recibir sugerencias de automatización personalizadas impulsadas por IA para tu negocio.",
  formCardTitle: "Obtén Tus Sugerencias",
  formCardDescription: "Cuéntanos sobre tu negocio y nuestra IA te proporcionará ideas de automatización a medida.",
  
  businessDescriptionLabel: "Descripción del Negocio",
  businessDescriptionPlaceholder: "Describe los procesos clave, la industria y el tamaño de tu negocio...",
  businessDescriptionError: "Por favor, proporciona una descripción detallada de al menos 30 caracteres.",
  
  businessNeedsLabel: "Necesidades del Negocio",
  businessNeedsPlaceholder: "Describe los principales desafíos, puntos débiles o áreas que te gustaría mejorar...",
  businessNeedsError: "Por favor, describe las necesidades de tu negocio (mínimo 30 caracteres).",

  aiExperienceLevelLabel: "Nivel de Experiencia con IA",
  aiExperienceLevelPlaceholder: "Selecciona tu nivel",
  aiExperienceLevelError: "Por favor, selecciona tu nivel de experiencia con IA.",
  aiExperienceOptions: [
    { value: "principiante", label: "Principiante (Poco o ningún conocimiento)" },
    { value: "intermedio", label: "Intermedio (Conocimiento básico, algunas herramientas usadas)" },
    { value: "avanzado", label: "Avanzado (Experiencia aplicando IA, familiar con conceptos)" },
    { value: "experto", label: "Experto (Desarrollo o implementación profunda de IA)" },
  ],

  aiBudgetLabel: "Presupuesto para IA (Opcional)",
  aiBudgetPlaceholder: "Selecciona un rango de presupuesto",
   aiBudgetOptions: [
    { value: "no-especificado", label: "No especificado / No estoy seguro" },
    { value: "menos-de-500", label: "Menos de $500" },
    { value: "500-1000", label: "$500 - $1000" },
    { value: "1000-5000", label: "$1000 - $5000" },
    { value: "mas-de-5000", label: "Más de $5000" },
    { value: "proyecto-especifico", label: "Presupuesto por proyecto específico" },
  ],

  submitButton: "Obtener Sugerencias",
  submitButtonLoading: "Generando...",
  suggestionsCardTitle: "Tus Sugerencias Impulsadas por IA",
  suggestionsGeneratingTitle: "Generando Sugerencias...",
  toastSuccessTitle: "¡Sugerencias Generadas!",
  toastSuccessDescription: "Tus sugerencias de automatización personalizadas están listas.",
  toastErrorTitle: "Error",
  toastErrorDescription: "No se pudieron generar las sugerencias. Por favor, inténtalo de nuevo."
};

const formSchema = z.object({
  businessDescription: z.string().min(30, { message: texts.businessDescriptionError }),
  businessNeeds: z.string().min(30, { message: texts.businessNeedsError }),
  aiExperienceLevel: z.string({ required_error: texts.aiExperienceLevelError }).min(1, { message: texts.aiExperienceLevelError }),
  aiBudget: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AutomationAdvisorSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control, 
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { // Ensure optional fields have a default for Controller
      aiBudget: "",
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const input: AutomationSuggestionsInput = { 
        businessDescription: data.businessDescription,
        businessNeeds: data.businessNeeds,
        aiExperienceLevel: data.aiExperienceLevel,
        aiBudget: data.aiBudget || "no-especificado", 
      };
      const result: AutomationSuggestionsOutput = await getAutomationSuggestions(input);
      setSuggestions(result.suggestions);
      toast({
        title: texts.toastSuccessTitle,
        description: texts.toastSuccessDescription,
      });
      reset(); 
    } catch (error) {
      console.error("Error getting suggestions:", error);
      toast({
        title: texts.toastErrorTitle,
        description: texts.toastErrorDescription,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="automation-advisor" className="py-10 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{texts.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {texts.description}
          </p>
        </div>

        <div className={
          (suggestions || isLoading) 
          ? "grid md:grid-cols-2 gap-8 items-start" 
          : "flex justify-center" 
        }>
          <Card className={`bg-card border-border rounded-xl shadow-md card-hover ${
            !(suggestions || isLoading) ? 'w-full max-w-2xl' : ''
          }`}>
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-foreground">{texts.formCardTitle}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {texts.formCardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="businessDescription" className="block text-sm font-medium text-foreground/90 mb-1">
                    {texts.businessDescriptionLabel}
                  </Label>
                  <Textarea
                    id="businessDescription"
                    {...register('businessDescription')}
                    rows={3}
                    className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.businessDescription ? 'border-destructive' : ''}`}
                    placeholder={texts.businessDescriptionPlaceholder}
                  />
                  {errors.businessDescription && (
                    <p className="mt-1 text-sm text-destructive">{errors.businessDescription.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="businessNeeds" className="block text-sm font-medium text-foreground/90 mb-1">
                    {texts.businessNeedsLabel}
                  </Label>
                  <Textarea
                    id="businessNeeds"
                    {...register('businessNeeds')}
                    rows={3}
                    className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.businessNeeds ? 'border-destructive' : ''}`}
                    placeholder={texts.businessNeedsPlaceholder}
                  />
                  {errors.businessNeeds && (
                    <p className="mt-1 text-sm text-destructive">{errors.businessNeeds.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="aiExperienceLevel" className="block text-sm font-medium text-foreground/90 mb-1">
                    {texts.aiExperienceLevelLabel}
                  </Label>
                  <Controller
                    control={control}
                    name="aiExperienceLevel"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger 
                          id="aiExperienceLevel" 
                          className={`w-full bg-input border-border rounded-xs input-focus ${errors.aiExperienceLevel ? 'border-destructive' : ''}`}
                        >
                          <SelectValue placeholder={texts.aiExperienceLevelPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {texts.aiExperienceOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.aiExperienceLevel && (
                    <p className="mt-1 text-sm text-destructive">{errors.aiExperienceLevel.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="aiBudget" className="block text-sm font-medium text-foreground/90 mb-1">
                    {texts.aiBudgetLabel}
                  </Label>
                  <Controller
                    control={control}
                    name="aiBudget"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                        <SelectTrigger
                          id="aiBudget"
                          className={`w-full bg-input border-border rounded-xs input-focus ${errors.aiBudget ? 'border-destructive' : ''}`}
                        >
                          <SelectValue placeholder={texts.aiBudgetPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {texts.aiBudgetOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                   {errors.aiBudget && ( // Optional: show error if field becomes required
                    <p className="mt-1 text-sm text-destructive">{errors.aiBudget.message}</p>
                  )}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full btn-cta-primary rounded-md py-3 text-base">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {texts.submitButtonLoading}
                    </>
                  ) : (
                    texts.submitButton
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {suggestions && (
            <Card className="bg-card border-border rounded-xl shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-foreground">{texts.suggestionsCardTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-foreground/90 whitespace-pre-line">
                  {suggestions}
                </div>
              </CardContent>
            </Card>
          )}
          {!suggestions && isLoading && (
             <Card className="bg-card border-border rounded-xl shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-foreground">{texts.suggestionsGeneratingTitle}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-10">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
