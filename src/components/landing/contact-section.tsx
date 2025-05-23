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

interface ContactSectionProps {
  dictionary: {
    title: string;
    description: string;
    cardTitle: string;
    cardDescription: string;
    nameLabel: string;
    namePlaceholder: string;
    nameError: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailError: string;
    companyLabel: string;
    companyPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    messageError: string;
    submitButton: string;
    submitButtonLoading: string;
    toastSuccessTitle: string;
    toastSuccessDescription: string;
    toastErrorTitle: string;
    toastErrorDescriptionGeneral: string;
    toastErrorDescriptionUnexpected: string;
  };
}

type ContactFormData = z.infer<ReturnType<typeof getContactFormSchema>>;

// Placeholder server action
async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; messageKey?: keyof ContactSectionProps['dictionary'] | string, rawMessage?: string }> {
  console.log("Contact form submitted:", data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Example: return { success: false, messageKey: "toastErrorDescriptionGeneral" }; 
  return { success: true, messageKey: "toastSuccessDescription" };
}

const getContactFormSchema = (dictionary: ContactSectionProps['dictionary']) => z.object({
  name: z.string().min(2, { message: dictionary.nameError }),
  email: z.string().email({ message: dictionary.emailError }),
  company: z.string().optional(),
  message: z.string().min(10, { message: dictionary.messageError }),
});


export function ContactSection({ dictionary }: ContactSectionProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const contactFormSchema = getContactFormSchema(dictionary);

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
      const message = response.messageKey ? dictionary[response.messageKey as keyof ContactSectionProps['dictionary']] || response.rawMessage : dictionary.toastErrorDescriptionGeneral;

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
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <Card className="max-w-2xl mx-auto bg-card border-border rounded-xl shadow-custom p-2 sm:p-0">
          <CardHeader className="sm:p-6">
            <CardTitle className="text-2xl font-heading text-primary-foreground">{dictionary.cardTitle}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {dictionary.cardDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="sm:p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <Textarea id="message" {...register('message')} rows={5} className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.message ? 'border-destructive' : ''}`} placeholder={dictionary.messagePlaceholder} />
                {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={isLoading} className="w-full btn-yellow rounded-md py-3 text-base">
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
