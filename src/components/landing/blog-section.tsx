import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Small Businesses',
    summary: 'Learn how AI is no longer just for large corporations and how your SME can benefit today.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'futuristic technology',
    slug: 'future-of-ai-smb',
  },
  {
    id: '2',
    title: '5 Ways to Automate Your Marketing with AI',
    summary: 'Discover practical AI tools and strategies to streamline your marketing efforts and boost engagement.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'marketing automation',
    slug: 'automate-marketing-ai',
  },
  {
    id: '3',
    title: 'Understanding Natural Language Processing (NLP)',
    summary: 'A beginner-friendly guide to NLP and its applications in improving customer interactions.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'language processing',
    slug: 'understanding-nlp',
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">Our Blog</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Stay up-to-date with the latest trends in AI and business automation. Ideas, tips, and success stories to inspire your business.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-card border-border rounded-xl card-hover overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={300} // Adjusted for better aspect ratio in card
                  className="w-full h-48 object-cover"
                  data-ai-hint={post.imageHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold text-primary-foreground font-heading mb-2">{post.title}</CardTitle>
                <p className="text-foreground/80 text-sm leading-relaxed line-clamp-3">{post.summary}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/blog/${post.slug}`} passHref>
                  <Button variant="link" className="text-primary p-0 hover:text-accent group">
                    Read More
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
