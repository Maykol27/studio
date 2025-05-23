import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StarIcon } from 'lucide-react'; // For ratings

interface Testimonial {
  id: string;
  name: string;
  company: string;
  quote: string;
  imageUrl: string;
  imageHint: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jane Doe',
    company: 'Innovatech Solutions',
    quote: 'Aetheria Consulting transformed our operations. Their AI solutions increased our efficiency by <strong class="text-primary">40%</strong> and significantly <strong class="text-primary">reduced costs</strong>. Highly recommended!',
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'happy client',
    rating: 5,
  },
  {
    id: '2',
    name: 'John Smith',
    company: 'MarketBoosters Inc.',
    quote: 'The personalized approach and deep understanding of our needs were exceptional. We now make <strong class="text-primary">data-driven decisions</strong> with confidence, thanks to Aetheria.',
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'satisfied customer',
    rating: 5,
  },
  {
    id: '3',
    name: 'Alice Brown',
    company: 'Creative Ventures LLC',
    quote: 'Their team is not just technically proficient but also great strategic partners. The <strong class="text-primary">customer experience optimization</strong> has been a game-changer for us.',
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'smiling person',
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Real stories from businesses thriving with our AI solutions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card border-border rounded-xl card-hover p-6 flex flex-col items-center text-center">
              <CardHeader className="mb-4">
                <Image
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full mb-3 mx-auto"
                  data-ai-hint={testimonial.imageHint}
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
        {/* Placeholder for carousel controls if many testimonials */}
        {/* <p className="text-center mt-8 text-sm text-muted-foreground">Note: A carousel will be implemented for more testimonials.</p> */}
      </div>
    </section>
  );
}
