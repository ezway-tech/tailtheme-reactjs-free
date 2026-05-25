import { ArrowRight, Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';
import { MotionCard } from '@/components/motion';

export default function CardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Card"
        description="Container for related information. Compose Header, Content, Footer as needed."
      />

      <ComponentApi
        description="Source: src/components/ui/card.tsx. Plain divs with consistent rounding, border, padding and typography."
        importCode={[
          `import {`,
          `  Card,`,
          `  CardHeader,`,
          `  CardTitle,`,
          `  CardDescription,`,
          `  CardContent,`,
          `  CardFooter,`,
          `} from '@/components/ui';`,
        ]}
        propsTitle="Slots"
        props={[
          {
            name: 'Card',
            type: 'div',
            description: 'Outer container. Adds rounded-lg, border, bg-card, shadow-sm.',
          },
          {
            name: 'CardHeader',
            type: 'div',
            description: 'Vertical stack with p-6 + space-y-1.5. Holds title + description.',
          },
          {
            name: 'CardTitle',
            type: 'h3',
            description: 'Semibold heading, leading-none, tracking-tight.',
          },
          {
            name: 'CardDescription',
            type: 'p',
            description: 'Muted-foreground supporting copy.',
          },
          {
            name: 'CardContent',
            type: 'div',
            description: 'Body slot. Padding p-6 + pt-0 to align with header.',
          },
          {
            name: 'CardFooter',
            type: 'div',
            description: 'Action row with flex items-center, p-6 + pt-0.',
          },
        ]}
        tokens={[
          { name: '--card / --card-foreground', description: 'Surface background and text.' },
          { name: '--border', description: 'Outline color.' },
          { name: '--radius', description: 'Corner radius (rounded-lg).' },
          {
            name: 'shadow-sm',
            description: 'Default elevation. Override with className for stronger shadows.',
          },
        ]}
      />

      <ShowcaseSection
        title="Basic"
        code={`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Body</CardContent>
  <CardFooter><Button>Action</Button></CardFooter>
</Card>`}
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Pick a template, connect your git repo and we'll handle the rest.
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="Stat cards" description="Dense KPI tiles for dashboards.">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { label: 'Active users', value: '1,284', delta: '+12.4%' },
            { label: 'Revenue', value: '$18,420', delta: '+3.1%' },
            { label: 'Churn', value: '2.1%', delta: '-0.3%' },
          ].map((s) => (
            <Card key={s.label}>
              <CardHeader className="pb-2">
                <CardDescription>{s.label}</CardDescription>
                <CardTitle className="text-2xl tabular-nums">{s.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="success">{s.delta}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Linked card"
        description="Make the whole card clickable by wrapping in a link or using asChild patterns."
      >
        <Card className="group w-full max-w-md transition-colors hover:border-primary">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Teams</CardTitle>
            </div>
            <CardDescription>Invite teammates and organize workspaces.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button variant="link" className="gap-1">
              Explore
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Motion"
        description="Wrap a card with <MotionCard/> for a subtle lift on hover and press feedback."
        code={`<MotionCard><Card>…</Card></MotionCard>`}
      >
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <MotionCard>
            <Card>
              <CardHeader>
                <CardTitle>Quick stats</CardTitle>
                <CardDescription>Hover to lift, press for feedback.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Perfect for dashboards and product grids.
              </CardContent>
            </Card>
          </MotionCard>
          <MotionCard lift={4}>
            <Card>
              <CardHeader>
                <CardTitle>Strong lift</CardTitle>
                <CardDescription>Pass lift={4} for extra emphasis.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Good for featured CTAs.
              </CardContent>
            </Card>
          </MotionCard>
        </div>
      </ShowcaseSection>
    </div>
  );
}
