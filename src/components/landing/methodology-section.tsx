import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, DraftingCompassIcon, RocketIcon, HandshakeIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface ProcessStep {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    icon: SearchIcon,
    title: '1. Deep and Strategic Diagnosis',
    description: 'We go beyond the superficial. We listen to your story, thoroughly understand your unique challenges and goals (even those you haven\'t clearly identified yet), and precisely identify automation and AI opportunities that will generate the greatest impact on your business and peace of mind. It\'s the map to your success.',
  },
  {
    icon: DraftingCompassIcon,
    title: '2. Tailored Solution Design',
    description: 'No generic solutions. We develop a personalized and robust AI strategy that perfectly aligns with your budget, capabilities, and, above all, your business objectives. We design the path you need.',
  },
  {
    icon: RocketIcon,
    title: '3. Agile and Purposeful Implementation',
    description: 'We turn the plan into action. We manage implementation efficiently and with minimal disruption, ensuring AI integrates smoothly. We provide clear guidance and constant support so your team adopts the new technology with confidence.',
  },
  {
    icon: HandshakeIcon,
    title: '4. Continuous Optimization and Sustainable Growth',
    description: 'Our partnership doesn\'t end with implementation. We offer post-implementation support, performance monitoring, and proactive adjustments to ensure your AI investment continues to evolve, maximizing your return and adapting to your future needs, acting as your strategic partner in continuous improvement.',
  },
];

export function MethodologySection() {
  return (
    <section id="process" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">AI Tailored to You: Our Process Towards Your Success</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            We don't just implement technology; we create custom AI solutions that understand your challenges, optimize your operations, and boost your real growth, freeing you to focus on what matters most.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="bg-card border-border rounded-xl card-hover p-6 flex flex-col sm:flex-row items-start gap-6">
              <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                 <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl font-semibold text-primary-foreground font-heading">{step.title}</CardTitle>
                <p className="text-foreground/80 text-sm leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
