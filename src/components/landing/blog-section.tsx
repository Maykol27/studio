import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data'; // Blog data is currently only in Spanish
import type { Dictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface BlogSectionProps {
  dictionary: Dictionary['blogSection'];
  locale: Locale;
}

export function BlogSection({ dictionary, locale }: BlogSectionProps) {
  // Nota: los datos del blog (títulos, resúmenes) vienen de blog-data.ts y están en español.
  // Para una localización completa del contenido del blog, se necesitaría una estrategia más avanzada.
  return (
    <section id="blog" className="py-10 sm:py-12 md:py-16 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-card border-border rounded-xl card-hover overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={post.imageUrl}
                  alt={post.title} // Usamos el título en español del post como alt
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                  data-ai-hint={post.imageHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold text-foreground font-heading mb-2">{post.title}</CardTitle>
                <p className="text-foreground/80 text-sm leading-relaxed line-clamp-3">{post.summary}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/${locale}/blog/${post.slug}`} passHref>
                  <Button variant="link" className="text-primary p-0 hover:text-accent group">
                    {dictionary.readMore}
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
