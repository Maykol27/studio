'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getAutomationSuggestions, type AutomationSuggestionsInput, type AutomationSuggestionsOutput } from '@/ai/flows/automation-suggestions';
import { Loader2, ListChecksIcon, LightbulbIcon, BriefcaseIcon } from 'lucide-react';

const texts = {
  title: "Análisis Inicial Gratuito",
  description: "Completa este formulario para recibir sugerencias de automatización personalizadas impulsadas por IA para tu negocio.",
  formCardTitle: "Cuéntanos Sobre Tu Negocio",
  formCardDescription: "Proporciona algunos detalles y nuestra IA te ofrecerá ideas.",
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
    { value: "experto", label: "Experto (Desarrollo o implementación profunda de IA)" }
  ],
  aiBudgetLabel: "Presupuesto para IA (Opcional)",
  aiBudgetPlaceholder: "Selecciona un rango",
  aiBudgetOptions: [
    { value: "no-especificado", label: "No especificado / No estoy seguro" },
    { value: "muy-limitado", label: "Muy limitado" },
    { value: "limitado", label: "Limitado" },
    { value: "moderado", label: "Moderado" },
    { value: "sustancial", label: "Sustancial" }
  ],
  submitButton: "Obtener Sugerencias",
  submitButtonLoading: "Analizando...",
  resultsCardTitle: "¡Excelente Primer Paso!",
  generatingTitle: "Generando Ideas...",
  scheduleConsultationButton: "Agendar Asesoría Personalizada",
  toastSuccessTitle: "¡Análisis Completado!",
  toastSuccessDescription: "Hemos procesado tu información. Revisa las ideas generadas y ¡agendemos una cita para explorarlas!",
  toastErrorTitle: "Error en el Análisis",
  toastErrorDescription: "No se pudo procesar tu solicitud. Por favor, inténtalo de nuevo."
};

const suggestionIcons = [
  LightbulbIcon,
  ListChecksIcon,
  BriefcaseIcon,
];

export function AutomationAdvisorSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AutomationSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const formSchema = z.object({
    businessDescription: z.string().min(30, { message: texts.businessDescriptionError }),
    businessNeeds: z.string().min(30, { message: texts.businessNeedsError }),
    aiExperienceLevel: z.string({ required_error: texts.aiExperienceLevelError }).min(1, { message: texts.aiExperienceLevelError }),
    aiBudget: z.string().optional(),
  });
  
  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    control, 
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aiBudget: "no-especificado",
      aiExperienceLevel: "",
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const input: AutomationSuggestionsInput = { 
        businessDescription: data.businessDescription,
        businessNeeds: data.businessNeeds,
        aiExperienceLevel: data.aiExperienceLevel,
        aiBudget: data.aiBudget || "no-especificado", 
      };
      const result = await getAutomationSuggestions(input);
      setAnalysisResult(result);
      toast({
        title: texts.toastSuccessTitle,
        description: texts.toastSuccessDescription,
      });
    } catch (error) {
      console.error("Error getting analysis:", error);
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

        <div className={`grid gap-8 items-start ${analysisResult || isLoading ? 'md:grid-cols-2' : 'md:grid-cols-1 justify-center'}`}>
          <Card className={`bg-card border-border rounded-xl shadow-md card-hover w-full ${!(analysisResult || isLoading) ? 'max-w-2xl mx-auto' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-foreground">{texts.formCardTitle}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {texts.formCardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="businessDescription" className="block text-sm font-medium text-foreground/90 mb-1">
                    {texts.businessDescriptionLabel}
                  </Label>
                  <Textarea
                    id="businessDescription"
                    {...register('businessDescription')}
                    rows={3}
                    className={`w-full bg-input border-border rounded-xs p-3 sm:h-20 input-focus ${errors.businessDescription ? 'border-destructive' : ''}`}
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
                    className={`w-full bg-input border-border rounded-xs p-3 sm:h-20 input-focus ${errors.businessNeeds ? 'border-destructive' : ''}`}
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
                      <Select onValueChange={field.onChange} defaultValue={field.value || "no-especificado"}>
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
                   {errors.aiBudget && ( 
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
          
          {isLoading && (
             <Card className="bg-card border-border rounded-xl shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-foreground">{texts.generatingTitle}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="text-muted-foreground">Estamos preparando tus ideas...</p>
              </CardContent>
            </Card>
          )}

          {analysisResult && !isLoading && (
            <Card className="bg-card border-border rounded-xl shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-primary">{texts.resultsCardTitle}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {analysisResult.introductoryMessage}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {analysisResult.suggestions.map((suggestion, index) => {
                    const Icon = suggestionIcons[index % suggestionIcons.length];
                    return (
                      <li key={index} className="p-4 bg-secondary/5 rounded-lg border border-border/50">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg inline-flex items-center justify-center shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground/90 mb-1">{suggestion.title}</h4>
                            <p className="text-sm text-foreground/80">{suggestion.generalExplanation}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="text-foreground/90 font-semibold pt-4 border-t border-border/50">{analysisResult.callToAction}</p>
                <Button asChild className="w-full btn-cta-primary rounded-md py-3 text-base mt-2">
                  <Link href="#contact">{texts.scheduleConsultationButton}</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
