import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlayCircleIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background to-secondary/30 min-h-screen flex items-center pt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground font-heading leading-tight">
              AI Tailored to You: <br /> <span className="text-primary">Our Process</span> Towards Your Success.
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              Looking to take your business to the next level? At Aetheria Consulting, we transform the complexity of automation and AI into practical and accessible solutions for your SME. We help you professionalize and scale, unlocking your potential and maximizing your focus on what you're most passionate about and what led you to build your company.
            </p>
            <Link href="#automation-advisor" passHref>
              <Button size="lg" className="btn-yellow rounded-md px-8 py-6 text-lg group">
                Boost Your Business with AI: Free Diagnosis!
                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="relative group rounded-xl overflow-hidden shadow-custom aspect-video">
            <Image
              src="https://placehold.co/600x400.png"
              alt="CEO Video Thumbnail"
              width={600}
              height={400}
              className="w-full h-full object-cover"
              data-ai-hint="professional portrait"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircleIcon className="h-20 w-20 text-white/80" />
            </div>
            <div className="absolute bottom-4 left-4 bg-background/70 backdrop-blur-sm p-2 rounded-md">
              <p className="text-sm text-foreground">Meet Aetheria's CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
