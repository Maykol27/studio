import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

interface BlogPostData {
  id: string;
  title: string;
  summary: string;
  slug: string;
}

// Texts are now hardcoded in English
const texts = {
  title: "Our Blog",
  description: "Stay up-to-date with the latest trends in AI and business automation. Ideas, tips, and success stories to inspire your business.",
  readMore: "Read More",
  posts: [
    {
      id: "1",
      title: "The Future of AI in Small Businesses",
      summary: "Learn how AI is no longer just for large corporations and how your SME can benefit today.",
      slug: "future-of-ai-smb"
    },
    {
      id: "2",
      title: "5 Ways to Automate Your Marketing with AI",
      summary: "Discover practical AI tools and strategies to streamline your marketing efforts and boost engagement.",
      slug: "automate-marketing-ai"
    },
    {
      id: "3",
      title: "Understanding Natural Language Processing (NLP)",
      summary: "A beginner-friendly guide to NLP and its applications in improving customer interactions.",
      slug: "understanding-nlp"
    }
  ]
};

const blogPostAssets = [
  { imageUrl: 'https://placehold.co/600x400.png', imageHint: 'futuristic technology' },
  { imageUrl: 'https://placehold.co/600x400.png', imageHint: 'marketing automation' },
  { imageUrl: 'https://placehold.co/600x400.png', imageHint: 'language processing' },
];


export function BlogSection() {
  return (
    <section id="blog" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{texts.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {texts.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {texts.posts.map((post, index) => (
            <Card key={post.id} className="bg-card border-border rounded-xl card-hover overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={blogPostAssets[index % blogPostAssets.length].imageUrl}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                  data-ai-hint={blogPostAssets[index % blogPostAssets.length].imageHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold text-primary-foreground font-heading mb-2">{post.title}</CardTitle>
                <p className="text-foreground/80 text-sm leading-relaxed line-clamp-3">{post.summary}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                {/* Blog detail pages would need to be /blog/[slug] not /en/blog/[slug] */}
                <Link href={`/blog/${post.slug}`} passHref> 
                  <Button variant="link" className="text-primary p-0 hover:text-accent group">
                    {texts.readMore}
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
