
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts, getLocalizedPostField, type LocalizedText } from '@/lib/blog-data';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { CalendarDaysIcon, UserIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import { es, pt } from 'date-fns/locale';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

interface BlogPostPageProps {
  params: { slug: string; locale: Locale };
}

export async function generateStaticParams({ params: { locale: defaultLocale } }: { params: { locale: Locale }}) {
  return blogPosts.map(post => ({
    slug: post.slug,
    locale: defaultLocale, 
  }));
}


export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  const dictionary = await getDictionary(params.locale);

  if (!post) {
    return {
      title: dictionary.blogPostPage?.notFoundTitle || "Post no encontrado",
      description: dictionary.blogPostPage?.notFoundDescription || "El artículo de blog que buscas no existe o fue movido.",
    };
  }
  
  const postTitle = getLocalizedPostField(post.title, params.locale) as string;
  const postSummary = getLocalizedPostField(post.summary, params.locale) as string;
  const publishedDate = parseISO(post.date);

  return {
    title: `${postTitle} | ${dictionary.metadata.title}`,
    description: postSummary,
    openGraph: {
        title: postTitle,
        description: postSummary,
        images: [
            {
                url: post.imageUrl, 
                width: 800, 
                height: 450, 
                alt: postTitle,
            },
        ],
        type: 'article',
        publishedTime: publishedDate.toISOString(),
        authors: [post.author],
    },
    twitter: {
        card: 'summary_large_image',
        title: postTitle,
        description: postSummary,
        images: [post.imageUrl], 
    }
  };
}

const parseTextForFormatting = (text: string): ReactNode[] => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      if (boldText) { 
        return <strong key={`bold-${index}`}>{boldText}</strong>;
      }
    }
    return part;
  });
};


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  const dictionary = await getDictionary(params.locale);

  if (!post) {
    notFound();
  }
  
  const dateLocale = params.locale === 'pt' ? pt : es;
  const parsedDate = parseISO(post.date);
  const displayDate = format(parsedDate, "dd 'de' MMMM, yyyy", { locale: dateLocale });

  const postTitle = getLocalizedPostField(post.title, params.locale) as string;
  const postFullContent = getLocalizedPostField(post.fullContent, params.locale) as string[];

  const firstPostSlug = blogPosts.length > 0 ? blogPosts[0].slug : null;
  const thirdPostSlug = blogPosts.length > 2 ? blogPosts[2].slug : null;
  const lastPostSlug = blogPosts.length > 0 ? blogPosts[blogPosts.length - 1].slug : null;

  let imagePositionClass = '';
  if (post.slug === thirdPostSlug) {
    imagePositionClass = 'object-top'; 
  } else if (post.slug === firstPostSlug || post.slug === lastPostSlug) {
    imagePositionClass = 'object-bottom';
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 z-0 opacity-100">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/20 rounded-full animate-bubble-1 hidden md:block" />
        <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-accent/20 rounded-full animate-bubble-2" />
        <div className="absolute bottom-[15%] left-[20%] w-72 h-72 bg-secondary/20 rounded-full animate-bubble-3" />
        <div className="absolute top-[50%] left-[40%] w-48 h-48 bg-primary/15 rounded-full animate-bubble-1 animation-delay-[2s]" />
        <div className="absolute bottom-[5%] right-[25%] w-56 h-56 bg-accent/15 rounded-full animate-bubble-2 animation-delay-[4s]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          headerDictionary={dictionary.header}
          languageSwitcherDictionary={dictionary.languageSwitcher}
          currentLocale={params.locale}
        />
        <main className="flex-grow pt-24 md:pt-28">
          <article className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-3xl">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary font-heading mb-4">
                {postTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1.5">
                  <UserIcon className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <time dateTime={parsedDate.toISOString()}>{displayDate}</time>
                </div>
              </div>
              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg mb-8">
                <Image
                  src={post.imageUrl}
                  alt={postTitle}
                  fill
                  className={`object-cover ${imagePositionClass}`}
                  priority
                  data-ai-hint={post.imageHint}
                />
              </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed space-y-6">
              {postFullContent.map((paragraph, index) => {
                if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**') && !paragraph.slice(2, -2).includes(' ') && !paragraph.slice(2,-2).includes('**')) {
                  const headingText = paragraph.slice(2, -2);
                  return <h3 key={`heading-${index}`} className="text-xl font-semibold text-primary font-heading mt-6 mb-3">{headingText}</h3>;
                }
                if (paragraph.trim().startsWith('* ') || paragraph.trim().startsWith('  * ') || paragraph.trim().startsWith('    * ')) {
                  const items = paragraph.split('\\n').map(item => item.trim().replace(/^\\*\\s*/, ''));
                  return (
                    <ul key={`list-${index}`} className="list-disc space-y-1 pl-6">
                      {items.map((item, itemIndex) => (
                        <li key={`list-item-${index}-${itemIndex}`}>{parseTextForFormatting(item)}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={`p-${index}`}>{parseTextForFormatting(paragraph)}</p>;
              })}
            </div>
          </article>
        </main>
        <Footer dictionary={dictionary.footer} currentLocale={params.locale} />
      </div>
    </div>
  );
}
