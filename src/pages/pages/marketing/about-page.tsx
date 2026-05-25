import { Globe, Heart, Rocket, Users } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const VALUES = [
  {
    icon: Rocket,
    title: 'Ship fast, learn faster',
    text: 'Deliver small, reversible increments. Talk to customers weekly.',
  },
  {
    icon: Heart,
    title: 'Design with care',
    text: 'Motion, contrast, and copy deserve the same rigor as architecture.',
  },
  {
    icon: Users,
    title: 'Open by default',
    text: 'Public changelogs, transparent roadmaps, and honest trade-offs.',
  },
  {
    icon: Globe,
    title: 'Accessible worldwide',
    text: 'WCAG AA, i18n, and RTL support are table stakes — not features.',
  },
];

const TEAM = [
  { name: 'Alex Nguyen', role: 'Co-founder · Design', avatar: 'https://i.pravatar.cc/128?img=1' },
  {
    name: 'Maria Garcia',
    role: 'Co-founder · Engineering',
    avatar: 'https://i.pravatar.cc/128?img=5',
  },
  { name: 'Hiro Tanaka', role: 'Head of Product', avatar: 'https://i.pravatar.cc/128?img=3' },
  { name: 'Priya Patel', role: 'Lead Designer', avatar: 'https://i.pravatar.cc/128?img=10' },
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="About TailTheme"
        description="The team, mission, and principles behind the product."
      />

      <section className="grid gap-6 rounded-lg border border-border bg-muted/30 p-6 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Making great software UI effortless.</h2>
          <p className="text-sm text-muted-foreground">
            TailTheme started in 2024 as a shared design system across our own apps. Today it powers
            learning, commerce, finance, and healthcare experiences — so teams can focus on their
            product, not their primitives.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-2xl font-semibold">12K+</p>
            <p className="text-xs text-muted-foreground">Developers</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">48</p>
            <p className="text-xs text-muted-foreground">Countries</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">2024</p>
            <p className="text-xs text-muted-foreground">Founded</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Our values</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Team</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {TEAM.map((m) => (
            <Card key={m.name}>
              <CardHeader className="items-center text-center">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={m.avatar} alt={m.name} />
                  <AvatarFallback>
                    {m.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-base">{m.name}</CardTitle>
                <CardDescription>{m.role}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
