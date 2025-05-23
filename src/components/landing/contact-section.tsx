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

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Placeholder server action
async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  console.log("Contact form submitted:", data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  // return { success: false, message: "This is a test error." }; 
  return { success: true, message: "Your request has been sent successfully! We'll be in touch soon." };
}


export function ContactSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
      // Call your server action here
      const response = await submitContactForm(data);
      if (response.success) {
        toast({
          title: "Message Sent!",
          description: response.message,
        });
        reset();
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">Let's Talk About Your Business</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-xl mx-auto">
            Complete the form and take the first step towards the digital transformation of your business.
          </p>
        </div>
        <Card className="max-w-2xl mx-auto bg-card border-border rounded-xl shadow-custom p-2 sm:p-0">
          <CardHeader className="sm:p-6">
            <CardTitle className="text-2xl font-heading text-primary-foreground">Contact Us</CardTitle>
            <CardDescription className="text-muted-foreground">
              We're excited to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent className="sm:p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-foreground/90 mb-1">Full Name</Label>
                <Input id="name" {...register('name')} className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.name ? 'border-destructive' : ''}`} placeholder="John Doe" />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-1">Email Address</Label>
                <Input id="email" type="email" {...register('email')} className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.email ? 'border-destructive' : ''}`} placeholder="you@example.com" />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="company" className="block text-sm font-medium text-foreground/90 mb-1">Company (Optional)</Label>
                <Input id="company" {...register('company')} className="w-full bg-input border-border rounded-xs p-3 input-focus" placeholder="Your Company Inc." />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-foreground/90 mb-1">Message</Label>
                <Textarea id="message" {...register('message')} rows={5} className={`w-full bg-input border-border rounded-xs p-3 input-focus ${errors.message ? 'border-destructive' : ''}`} placeholder="How can we help you?" />
                {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={isLoading} className="w-full btn-yellow rounded-md py-3 text-base">
                 {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Request'
                  )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
