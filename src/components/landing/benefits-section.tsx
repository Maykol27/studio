import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUpIcon, DollarSignIcon, BarChart2Icon, SmileIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface Benefit {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: TrendingUpIcon,
    title: 'Maximum Efficiency and Productivity',
    description: 'Automate tedious tasks, free up valuable time for you and your team. Get fast, measurable results, so you can focus on strategic growth and what you\'re passionate about.',
  },
  {
    icon: DollarSignIcon,
    title: 'Intelligent Cost Reduction',
    description: 'Optimize resources and eliminate costly errors with AI solutions that directly impact your profitability. Transform expenses into smart investments that give you peace of mind.',
  },
  {
    icon: BarChart2Icon,
    title: 'Data-Driven Decisions',
    description: 'Make smarter decisions and anticipate your business\'s future with the power of AI. Transform complex data into a competitive advantage, with expert support and intuitive tools that give you confidence.',
  },
  {
    icon: SmileIcon,
    title: 'Optimized Customer Experience',
    description: 'Improve customer loyalty and satisfaction with AI. Personalize interactions and offer 24/7 support easily, freeing up your team for high-value relationships.',
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">Key Benefits of AI for Your Business</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Discover how Artificial Intelligence transforms your business, optimizing resources and maximizing your ROI with a simple, guided implementation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card border-border rounded-xl card-hover p-2">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                  <benefit.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-primary-foreground font-heading">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-foreground/80 text-sm leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
