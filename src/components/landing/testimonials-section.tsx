import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';

interface TestimonialData {
  id: string;
  name: string;
  company: string;
  quote: string;
  rating: number;
}

interface TestimonialsSectionProps {
  dictionary: {
    title: string;
    description: string;
    testimonials: TestimonialData[];
  };
}

// Placeholder images and hints
const testimonialAssets = [
  { imageUrl: 'https://placehold.co/100x100.png', imageHint: 'happy client' },
  { imageUrl: 'https://placehold.co/100x100.png', imageHint: 'satisfied customer' },
  { imageUrl: 'https://placehold.co/100x100.png', imageHint: 'smiling person' },
];

export function TestimonialsSection({ dictionary }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dictionary.testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="bg-card border-border rounded-xl card-hover p-6 flex flex-col items-center text-center">
              <CardHeader className="mb-4">
                <Image
                  src={testimonialAssets[index % testimonialAssets.length].imageUrl}
                  alt={testimonial.name} // Alt text uses localized name
                  width={80}
                  height={80}
                  className="rounded-full mb-3 mx-auto"
                  data-ai-hint={testimonialAssets[index % testimonialAssets.length].imageHint}
                />
                <div className="flex justify-center mb-1">
                  {Array(5).fill(0).map((_, i) => (
                    <StarIcon key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground font-heading">{testimonial.name}</h3>
                <p className="text-sm text-accent">{testimonial.company}</p>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: `"${testimonial.quote}"` }} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
