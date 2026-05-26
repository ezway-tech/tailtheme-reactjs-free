import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { CountUp, StaggerGrid } from '@/components/motion';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

interface Plan {
  id: string;
  name: string;
  price: number;
  highlight?: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    features: ['Up to 3 courses', 'Community forum', 'Dark & light mode', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    highlight: true,
    features: [
      'Unlimited courses',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'Team seats (5)',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    price: 49,
    features: [
      'Everything in Pro',
      'SSO / SAML',
      'Audit logs',
      'Team seats (25)',
      'Dedicated manager',
    ],
  },
];

export default function PricingPage() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('monthly');
  const multiplier = cycle === 'yearly' ? 10 : 1;
  const suffix =
    cycle === 'yearly'
      ? t('pages.pricing.perYear', '/ year')
      : t('pages.pricing.perMonth', '/ month');
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t('pages.pricing.title', 'Plans & pricing')}
        description={t('pages.pricing.subtitle', 'Pick a plan that fits your learning goals.')}
      />
      <div className="flex justify-center">
        <ToggleGroup
          type="single"
          value={cycle}
          onValueChange={(v) => v && setCycle(v as 'monthly' | 'yearly')}
          className="rounded-md border border-border p-0.5"
        >
          <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
          <ToggleGroupItem value="yearly">Yearly · save 17%</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <StaggerGrid className="grid gap-4 md:grid-cols-3" stagger="normal">
        {PLANS.map((plan) => {
          const total = plan.price * multiplier;
          const card = (
            <Card
              className={cn(
                'relative flex h-full flex-col',
                plan.highlight && 'border-primary shadow-lg',
              )}
            >
              {plan.highlight ? (
                <Badge className="absolute -top-2 left-4">
                  {t('pages.pricing.mostPopular', 'Most popular')}
                </Badge>
              ) : null}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <CountUp
                    value={total}
                    prefix="$"
                    duration={0.6}
                    className="text-3xl font-semibold text-foreground"
                  />
                  <span className="text-muted-foreground">{suffix}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.highlight ? 'default' : 'outline'}>
                  {plan.price === 0 ? 'Get started' : 'Choose plan'}
                </Button>
              </CardFooter>
            </Card>
          );
          if (reduced) return <div key={plan.id}>{card}</div>;
          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: plan.highlight ? -4 : -2, scale: plan.highlight ? 1.02 : 1.01 }}
              transition={SPRING.press}
              className={cn(plan.highlight && 'md:scale-[1.03]')}
            >
              {card}
            </motion.div>
          );
        })}
      </StaggerGrid>
    </div>
  );
}
