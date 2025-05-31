
import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { AutomationAdvisorSection } from '@/components/landing/automation-advisor-section';
import { BenefitsSection } from '@/components/landing/benefits-section';
import { MethodologySection } from '@/components/landing/methodology-section';
import { BlogSection } from '@/components/landing/blog-section'; // Re-added
import { AboutSection } from '@/components/landing/about-section';
import { ContactSection } from '@/components/landing/contact-section';
import { Footer } from '@/components/landing/footer';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n, type Locale } from '@/i18n-config';

interface LandingPageProps {
  params: {
    locale: Locale;
  };
}

export default async function LandingPage({ params: { locale } }: LandingPageProps) {
  // If no locale is found, use the default locale.
  const currentLocale = i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
  const dictionary = await getDictionary(currentLocale);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        headerDictionary={dictionary.header}
        languageSwitcherDictionary={dictionary.languageSwitcher}
        currentLocale={currentLocale}
      />
      <main className="flex-grow">
        <HeroSection dictionary={dictionary.heroSection} />
        <AutomationAdvisorSection dictionary={dictionary.automationAdvisorSection} />
        <BenefitsSection dictionary={dictionary.benefitsSection} />
        <MethodologySection dictionary={dictionary.methodologySection} />
        <BlogSection dictionary={dictionary.blogSection} locale={currentLocale} />
        <AboutSection dictionary={dictionary.aboutSection} />
        <ContactSection dictionary={dictionary.contactSection} />
      </main>
      <Footer dictionary={dictionary.footer} currentLocale={currentLocale} />
    </div>
  );
}
