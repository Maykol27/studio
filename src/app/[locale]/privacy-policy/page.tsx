
import type { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

interface PrivacyPolicyPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: PrivacyPolicyPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(locale);
  const pageTitle = dictionary.privacyPolicyPage?.title || (locale === 'pt' ? 'Política de Privacidade' : 'Política de Privacidad');
  const siteName = dictionary.metadata?.title || 'SIKAI Consulting';
  const metaDescription = dictionary.privacyPolicyPage?.metaDescription || `Detalles sobre la política de privacidad de ${siteName}.`;
  return {
    title: `${pageTitle} | ${siteName}`,
    description: metaDescription,
    openGraph: {
      title: `${pageTitle} | ${siteName}`,
      description: metaDescription,
    },
    twitter: {
      title: `${pageTitle} | ${siteName}`,
      description: metaDescription,
    },
  };
}

export default async function PrivacyPolicyPage({ params: { locale } }: PrivacyPolicyPageProps) {
  const dictionary = await getDictionary(locale);
  const texts = dictionary.privacyPolicyPage || {};
  const headerTexts = dictionary.header || {};
  const langSwitcherTexts = dictionary.languageSwitcher || {};
  const footerTexts = dictionary.footer || {};

  // Default placeholder content if not in dictionary
  const defaultContent = {
    title: locale === 'pt' ? 'Política de Privacidade' : 'Política de Privacidad',
    lastUpdated: locale === 'pt' ? 'Última atualização: 1 de Agosto de 2024' : 'Última actualización: 1 de Agosto de 2024',
    introduction: locale === 'pt' ? 'Bem-vindo à nossa Política de Privacidade...' : 'Bienvenido a nuestra Política de Privacidad...',
    sections: [
      {
        heading: locale === 'pt' ? '1. Informações que Coletamos' : '1. Información que Recopilamos',
        paragraphs: [
          locale === 'pt' ? 'Parágrafo de exemplo 1.1...' : 'Párrafo de ejemplo 1.1...',
          locale === 'pt' ? 'Parágrafo de exemplo 1.2...' : 'Párrafo de ejemplo 1.2...',
        ],
      },
      {
        heading: locale === 'pt' ? '2. Como Usamos Suas Informações' : '2. Cómo Usamos tu Información',
        paragraphs: [
          locale === 'pt' ? 'Parágrafo de exemplo 2.1...' : 'Párrafo de ejemplo 2.1...',
        ],
      },
    ],
    contactUs: locale === 'pt' ? 'Contate-Nos' : 'Contáctanos',
    contactDetails: locale === 'pt' ? 'Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco em [seu email de contato].' : 'Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en [tu email de contacto].',
  };

  const pageContent = {
    title: texts.title || defaultContent.title,
    lastUpdated: texts.lastUpdated || defaultContent.lastUpdated,
    introduction: texts.introduction || defaultContent.introduction,
    sections: texts.sections && texts.sections.length > 0 ? texts.sections : defaultContent.sections,
    contactUs: texts.contactUs || defaultContent.contactUs,
    contactDetails: texts.contactDetails || defaultContent.contactDetails,
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header
        headerDictionary={headerTexts}
        languageSwitcherDictionary={langSwitcherTexts}
        currentLocale={locale}
      />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <article className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary font-heading mb-4">
              {pageContent.title}
            </h1>
            <p className="text-sm text-muted-foreground italic">{pageContent.lastUpdated}</p>
            
            <p>{pageContent.introduction}</p>

            {pageContent.sections.map((section, index) => (
              <section key={index} className="space-y-3">
                <h2 className="text-2xl font-semibold text-primary font-heading mt-6 mb-2">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </section>
            ))}

            <h2 className="text-2xl font-semibold text-primary font-heading mt-8 mb-2">
              {pageContent.contactUs}
            </h2>
            <p>{pageContent.contactDetails}</p>

          </article>
        </div>
      </main>
      <Footer dictionary={footerTexts} currentLocale={locale} />
    </div>
  );
}
