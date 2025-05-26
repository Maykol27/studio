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
import type { Dictionary } from '@/lib/get-dictionary';

interface AutomationAdvisorSectionProps {
  dictionary: Dictionary['automationAdvisorSection'];
}

const suggestionIcons = [
  LightbulbIcon,
  ListChecksIcon,
  BriefcaseIcon,
];

export function AutomationAdvisorSection({ dictionary }: AutomationAdvisorSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AutomationSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const formSchema = z.object({
    businessDescription: z.string().min(30, { message: dictionary.businessDescriptionError }),
    businessNeeds: z.string().min(30, { message: dictionary.businessNeedsError }),
    aiExperienceLevel: z.string({ required_error: dictionary.aiExperienceLevelError }).min(1, { message: dictionary.aiExperienceLevelError }),
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
        title: dictionary.toastSuccessTitle,
        description: dictionary.toastSuccessDescription,
      });
    } catch (error) {
      console.error("Error getting analysis:", error);
      toast({
        title: dictionary.toastErrorTitle,
        description: dictionary.toastErrorDescription,
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        <div className={`grid gap-8 items-start ${analysisResult || isLoading ? 'md:grid-cols-2' : 'md:grid-cols-1 justify-center'}`}>
          <Card className={`bg-card border-border rounded-xl shadow-md card-hover w-full ${!(analysisResult || isLoading) ? 'max-w-2xl mx-auto' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-foreground">{dictionary.formCardTitle}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {dictionary.formCardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="businessDescription" className="block text-sm font-medium text-foreground/90 mb-1">
                    {dictionary.businessDescriptionLabel}
                  </Label>
                  <Textarea
                    id="businessDescription"
                    {...register('businessDescription')}
                    rows={3}
                    className={`w-full bg-input border-border rounded-xs p-3 sm:h-20 input-focus ${errors.businessDescription ? 'border-destructive' : ''}`}
                    placeholder={dictionary.businessDescriptionPlaceholder}
                  />
                  {errors.businessDescription && (
                    <p className="mt-1 text-sm text-destructive">{errors.businessDescription.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="businessNeeds" className="block text-sm font-medium text-foreground/90 mb-1">
                    {dictionary.businessNeedsLabel}
                  </Label>
                  <Textarea
                    id="businessNeeds"
                    {...register('businessNeeds')}
                    rows={3}
                    className={`w-full bg-input border-border rounded-xs p-3 sm:h-20 input-focus ${errors.businessNeeds ? 'border-destructive' : ''}`}
                    placeholder={dictionary.businessNeedsPlaceholder}
                  />
                  {errors.businessNeeds && (
                    <p className="mt-1 text-sm text-destructive">{errors.businessNeeds.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="aiExperienceLevel" className="block text-sm font-medium text-foreground/90 mb-1">
                    {dictionary.aiExperienceLevelLabel}
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
                          <SelectValue placeholder={dictionary.aiExperienceLevelPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {dictionary.aiExperienceOptions.map(option => (
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
                    {dictionary.aiBudgetLabel}
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
                          <SelectValue placeholder={dictionary.aiBudgetPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {dictionary.aiBudgetOptions.map(option => (
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
                      {dictionary.submitButtonLoading}
                    </>
                  ) : (
                    dictionary.submitButton
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {isLoading && (
             <Card className="bg-card border-border rounded-xl shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-foreground">{dictionary.generatingTitle}</CardTitle>
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
                <CardTitle className="text-2xl font-heading text-primary">{dictionary.resultsCardTitle}</CardTitle>
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
                  <Link href="#contact">{dictionary.scheduleConsultationButton}</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
