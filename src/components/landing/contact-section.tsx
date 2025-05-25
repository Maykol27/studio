'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { Dictionary } from '@/lib/get-dictionary';

interface ContactSectionProps {
  dictionary: Dictionary['contactSection'];
}

export function ContactSection({ dictionary }: ContactSectionProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getContactFormSchema = () => z.object({
    name: z.string().min(2, { message: dictionary.nameError }),
    email: z.string().email({ message: dictionary.emailError }),
    company: z.string().optional(),
    message: z.string().min(10, { message: dictionary.messageError }),
  });

  type ContactFormData = z.infer<ReturnType<typeof getContactFormSchema>>;
  const contactFormSchema = getContactFormSchema();


  // Placeholder server action
  async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message?: string }> {
    console.log("Contact form submitted:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: dictionary.toastSuccessDescription };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await submitContactForm(data);
      const message = response.message || dictionary.toastErrorDescriptionGeneral;

      if (response.success) {
        toast({
          title: dictionary.toastSuccessTitle,
          description: message,
        });
        reset();
      } else {
        toast({
          title: dictionary.toastErrorTitle,
          description: message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: dictionary.toastErrorTitle,
        description: dictionary.toastErrorDescriptionUnexpected,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-10 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{dictionary.title}</h2>
          <p className="mt-3 sm:mt-4 text-md sm:text-lg text-foreground/80 max-w-xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <Card className="max-w-2xl mx-auto bg-card border-border rounded-xl shadow-md">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-heading text-foreground">{dictionary.cardTitle}</CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground">
              {dictionary.cardDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-foreground/90 mb-1">{dictionary.nameLabel}</Label>
                <Input id="name" {...register('name')} className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.name ? 'border-destructive' : ''}`} placeholder={dictionary.namePlaceholder} />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-1">{dictionary.emailLabel}</Label>
                <Input id="email" type="email" {...register('email')} className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.email ? 'border-destructive' : ''}`} placeholder={dictionary.emailPlaceholder} />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="company" className="block text-sm font-medium text-foreground/90 mb-1">{dictionary.companyLabel}</Label>
                <Input id="company" {...register('company')} className="w-full bg-input border-border rounded-xs p-3 input-focus" placeholder={dictionary.companyPlaceholder} />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-foreground/90 mb-1">{dictionary.messageLabel}</Label>
                <Textarea id="message" {...register('message')} rows={3} className={`w-full bg-input border-border rounded-xs p-3 input-focus sm:h-24 ${errors.message ? 'border-destructive' : ''}`} placeholder={dictionary.messagePlaceholder} />
                {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
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
      </div>
    </section>
  );
}
