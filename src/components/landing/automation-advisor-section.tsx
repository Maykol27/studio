'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  businessDescriptionPlaceholder: "Describe los procesos, desafíos y objetivos de tu negocio...",
  businessDescriptionError: "Por favor, proporciona una descripción detallada de al menos 50 caracteres.",
  submitButton: "Obtener Sugerencias",
  submitButtonLoading: "Generando...",
  suggestionsCardTitle: "Tus Sugerencias Impulsadas por IA",
  suggestionsGeneratingTitle: "Generando Sugerencias...",
  toastSuccessTitle: "¡Sugerencias Generadas!",
  toastSuccessDescription: "Tus sugerencias de automatización personalizadas están listas.",
  toastErrorTitle: "Error",
  toastErrorDescription: "No se pudieron generar las sugerencias. Por favor, inténtalo de nuevo."
};

export function AutomationAdvisorSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const { toast } = useToast();

  const formSchema = z.object({
    businessDescription: z.string().min(50, { message: texts.businessDescriptionError }),
  });
  
  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const input: AutomationSuggestionsInput = { businessDescription: data.businessDescription };
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
    <section id="automation-advisor" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{texts.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {texts.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-custom bg-card border-border rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary-foreground">{texts.formCardTitle}</CardTitle>
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
                    rows={6}
                    className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.businessDescription ? 'border-destructive' : ''}`}
                    placeholder={texts.businessDescriptionPlaceholder}
                  />
                  {errors.businessDescription && (
                    <p className="mt-1 text-sm text-destructive">{errors.businessDescription.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full btn-yellow rounded-md py-3 text-base">
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
            <Card className="shadow-custom bg-card border-border rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-primary-foreground">{texts.suggestionsCardTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none text-foreground/90 whitespace-pre-line">
                  {suggestions}
                </div>
              </CardContent>
            </Card>
          )}
          {!suggestions && isLoading && (
             <Card className="shadow-custom bg-card border-border rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-primary-foreground">{texts.suggestionsGeneratingTitle}</CardTitle>
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
