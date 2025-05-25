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

// Texts are now hardcoded in Spanish
const texts = {
  title: "Hablemos de Tu Negocio",
  description: "Completa el formulario para tener una conversación inicial gratuita y dar el primer paso hacia la trasnformación digital de tu negocio.",
  cardTitle: "Contáctanos",
  cardDescription: "Estamos emocionados de saber de ti.",
  nameLabel: "Nombre Completo",
  namePlaceholder: "Juan Pérez",
  nameError: "El nombre debe tener al menos 2 caracteres.",
  emailLabel: "Dirección de Correo Electrónico",
  emailPlaceholder: "tu@ejemplo.com",
  emailError: "Por favor, ingresa una dirección de correo electrónico válida.",
  companyLabel: "Empresa (Opcional)",
  companyPlaceholder: "Tu Empresa Inc.",
  messageLabel: "Mensaje",
  messagePlaceholder: "¿Cómo podemos ayudarte?",
  messageError: "El mensaje debe tener al menos 10 caracteres.",
  submitButton: "Enviar Solicitud",
  submitButtonLoading: "Enviando...",
  toastSuccessTitle: "¡Mensaje Enviado!",
  toastSuccessDescription: "¡Tu solicitud ha sido enviada con éxito! Nos pondremos en contacto pronto.",
  toastErrorTitle: "Error",
  toastErrorDescriptionGeneral: "No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.",
  toastErrorDescriptionUnexpected: "Ocurrió un error inesperado. Por favor, inténtalo más tarde."
};

type ContactFormData = z.infer<ReturnType<typeof getContactFormSchema>>;

// Placeholder server action
async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message?: string }> {
  console.log("Contact form submitted:", data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Example: return { success: false, message: texts.toastErrorDescriptionGeneral };
  return { success: true, message: texts.toastSuccessDescription };
}

const getContactFormSchema = () => z.object({
  name: z.string().min(2, { message: texts.nameError }),
  email: z.string().email({ message: texts.emailError }),
  company: z.string().optional(),
  message: z.string().min(10, { message: texts.messageError }),
});


export function ContactSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const contactFormSchema = getContactFormSchema();

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
      const message = response.message || texts.toastErrorDescriptionGeneral;

      if (response.success) {
        toast({
          title: texts.toastSuccessTitle,
          description: message,
        });
        reset();
      } else {
        toast({
          title: texts.toastErrorTitle,
          description: message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: texts.toastErrorTitle,
        description: texts.toastErrorDescriptionUnexpected,
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{texts.title}</h2>
          <p className="mt-3 sm:mt-4 text-md sm:text-lg text-foreground/80 max-w-xl mx-auto">
            {texts.description}
          </p>
        </div>
        <Card className="max-w-2xl mx-auto bg-card border-border rounded-xl shadow-md">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-heading text-foreground">{texts.cardTitle}</CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground">
              {texts.cardDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-foreground/90 mb-1">{texts.nameLabel}</Label>
                <Input id="name" {...register('name')} className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.name ? 'border-destructive' : ''}`} placeholder={texts.namePlaceholder} />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-1">{texts.emailLabel}</Label>
                <Input id="email" type="email" {...register('email')} className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.email ? 'border-destructive' : ''}`} placeholder={texts.emailPlaceholder} />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="company" className="block text-sm font-medium text-foreground/90 mb-1">{texts.companyLabel}</Label>
                <Input id="company" {...register('company')} className="w-full bg-input border-border rounded-xs p-3 input-focus" placeholder={texts.companyPlaceholder} />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-foreground/90 mb-1">{texts.messageLabel}</Label>
                <Textarea id="message" {...register('message')} rows={3} className={`w-full bg-input border-border rounded-xs p-3 input-focus sm:h-24 ${errors.message ? 'border-destructive' : ''}`} placeholder={texts.messagePlaceholder} />
                {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
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
      </div>
    </section>
  );
}
