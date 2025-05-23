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

// Texts are now hardcoded in Spanish
const texts = {
  title: "Lo que Dicen Nuestros Clientes",
  description: "Historias reales de negocios prosperando con nuestras soluciones de IA.",
  testimonials: [
    {
      id: "1",
      name: "Juana Pérez",
      company: "Soluciones Innovatech",
      quote: "Aetheria Consulting transformó nuestras operaciones. Sus soluciones de IA aumentaron nuestra eficiencia en un <strong class=\"text-primary\">40%</strong> y redujeron significativamente los <strong class=\"text-primary\">costos</strong>. ¡Altamente recomendados!",
      rating: 5
    },
    {
      id: "2",
      name: "Juan García",
      company: "Impulsores de Mercado Inc.",
      quote: "El enfoque personalizado y la profunda comprensión de nuestras necesidades fueron excepcionales. Ahora tomamos <strong class=\"text-primary\">decisiones basadas en datos</strong> con confianza, gracias a Aetheria.",
      rating: 5
    },
    {
      id: "3",
      name: "Alicia Moreno",
      company: "Emprendimientos Creativos LLC",
      quote: "Su equipo no solo es técnicamente competente sino también grandes socios estratégicos. La <strong class=\"text-primary\">optimización de la experiencia del cliente</strong> ha sido un cambio de juego para nosotros.",
      rating: 4
    }
  ]
};

const testimonialAssets = [
  { imageUrl: 'https://placehold.co/100x100.png', imageHint: 'cliente feliz' },
  { imageUrl: 'https://placehold.co/100x100.png', imageHint: 'cliente satisfecho' },
  { imageUrl: 'https://placehold.co/100x100.png', imageHint: 'persona sonriendo' },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{texts.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {texts.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {texts.testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="bg-card border-border rounded-xl card-hover p-6 flex flex-col items-center text-center">
              <CardHeader className="mb-4">
                <Image
                  src={testimonialAssets[index % testimonialAssets.length].imageUrl}
                  alt={testimonial.name}
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
