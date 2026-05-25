import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import * as React from 'react';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { MotionPlayground } from '@/components/showcase/motion-playground';
import { ComponentApi } from '@/components/showcase/component-api';
import { ActivePill } from '@/components/motion';
import { cn } from '@/lib/cn';

function AnimatedTabs() {
  const items = ['Overview', 'Usage', 'Props', 'Accessibility'];
  const [active, setActive] = React.useState(items[0]!);
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="inline-flex w-full gap-1 border-b border-border">
        {items.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(label)}
            className={cn(
              'relative px-3 py-2 text-sm font-medium transition-colors',
              active === label ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {active === label ? (
              <ActivePill
                layoutId="tabs-demo-underline"
                className="!bottom-0 !top-auto !h-0.5 !rounded-none !bg-primary !ring-0"
              />
            ) : null}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>
      <div className="rounded-md border border-border bg-muted/30 p-4 text-sm">
        Content for <strong>{active}</strong>
      </div>
    </div>
  );
}

export default function TabsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tabs & Accordion"
        description="Switch between related views or disclose hidden content."
      />

      <ComponentApi
        description="Source: src/components/ui/tabs.tsx (Radix Tabs). Always wrap triggers in <TabsList> and content in <TabsContent value=…>."
        importCode={[
          `import {`,
          `  Tabs,`,
          `  TabsList,`,
          `  TabsTrigger,`,
          `  TabsContent,`,
          `} from '@/components/ui';`,
        ]}
        propsTitle="Props (Tabs root)"
        props={[
          {
            name: 'value / defaultValue',
            type: 'string',
            description: 'Controlled / uncontrolled selected tab value.',
          },
          {
            name: 'onValueChange',
            type: '(value: string) => void',
            description: 'Fired when the active tab changes.',
          },
          {
            name: 'orientation',
            type: `'horizontal' | 'vertical'`,
            default: `'horizontal'`,
            description: 'Layout direction. Vertical tabs swap arrow-key navigation.',
          },
          {
            name: 'activationMode',
            type: `'automatic' | 'manual'`,
            default: `'automatic'`,
            description:
              'Whether arrow keys also activate the focused tab (automatic) or just move focus (manual).',
          },
          {
            name: 'TabsTrigger value',
            type: 'string',
            description: 'Required. Matches the corresponding <TabsContent value=…>.',
          },
        ]}
        tokens={[
          { name: '--muted', description: 'TabsList background.' },
          { name: '--background / --foreground', description: 'Active trigger surface and text.' },
          { name: '--ring', description: 'Focus ring on triggers.' },
        ]}
      />

      <ComponentApi
        title="Accordion API"
        description="Source: src/components/ui/accordion.tsx (Radix Accordion). Pick type='single' for FAQ-style or 'multiple' to allow several open at once."
        importCode={[
          `import {`,
          `  Accordion,`,
          `  AccordionItem,`,
          `  AccordionTrigger,`,
          `  AccordionContent,`,
          `} from '@/components/ui';`,
        ]}
        propsTitle="Props (Accordion root)"
        props={[
          {
            name: 'type',
            type: `'single' | 'multiple'`,
            description: 'Required. "single" allows one item open; "multiple" allows several.',
          },
          {
            name: 'collapsible',
            type: 'boolean',
            default: 'false',
            description: 'Only valid for type="single". Allows closing the open item.',
          },
          {
            name: 'value / defaultValue',
            type: 'string | string[]',
            description: 'Controlled / uncontrolled open item(s).',
          },
          {
            name: 'onValueChange',
            type: '(value) => void',
            description: 'Fires when an item opens or closes.',
          },
          {
            name: 'AccordionItem value',
            type: 'string',
            description: 'Required. Identifies the item in the accordion state.',
          },
        ]}
      />

      <ShowcaseSection
        title="Tabs"
        code={`<Tabs defaultValue="a">
  <TabsList>
    <TabsTrigger value="a">Account</TabsTrigger>
    <TabsTrigger value="b">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="a">…</TabsContent>
  <TabsContent value="b">…</TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="a" className="w-full">
          <TabsList>
            <TabsTrigger value="a">Account</TabsTrigger>
            <TabsTrigger value="b">Password</TabsTrigger>
            <TabsTrigger value="c" disabled>
              Billing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="a" className="text-sm">
            Manage your account details and linked providers.
          </TabsContent>
          <TabsContent value="b" className="text-sm">
            Change your password and enable 2FA.
          </TabsContent>
          <TabsContent value="c" className="text-sm">
            Billing coming soon.
          </TabsContent>
        </Tabs>
      </ShowcaseSection>

      <ShowcaseSection
        title="Accordion"
        code={`<Accordion type="single" collapsible>
  <AccordionItem value="a"><AccordionTrigger>…</AccordionTrigger><AccordionContent>…</AccordionContent></AccordionItem>
</Accordion>`}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="a">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes — built on Radix primitives with keyboard support.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Can I theme it?</AccordionTrigger>
            <AccordionContent>
              Yes — every color is a token defined in globals.css.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionTrigger>Animated?</AccordionTrigger>
            <AccordionContent>
              The open/close transition uses CSS variables for height.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ShowcaseSection>

      <ShowcaseSection
        title="Multiple accordion"
        description="Allow several items open at the same time."
        code={`<Accordion type="multiple">…</Accordion>`}
      >
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="1">
            <AccordionTrigger>Shipping</AccordionTrigger>
            <AccordionContent>Free shipping on orders over $50.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>Returns</AccordionTrigger>
            <AccordionContent>30-day return policy.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </ShowcaseSection>

      <ShowcaseSection
        title="Motion"
        description="Tabs panels fade and slide in on activation. Accordion content morphs height with a smooth easing. Use Slow-mo to study the transitions, Replay to remount."
        code={`<TabsContent className="data-[state=active]:animate-in fade-in-0 slide-in-from-bottom-1" />`}
      >
        <MotionPlayground caption="Tabs • content fade/slide on activation">
          {({ animKey }) => (
            <Tabs key={`tabs-${animKey}`} defaultValue="a" className="w-full">
              <TabsList>
                <TabsTrigger value="a">Account</TabsTrigger>
                <TabsTrigger value="b">Security</TabsTrigger>
                <TabsTrigger value="c">Billing</TabsTrigger>
              </TabsList>
              <TabsContent value="a" className="text-sm">
                Switching panels fades + slides the new content into place.
              </TabsContent>
              <TabsContent value="b" className="text-sm">
                Notice the bottom-1 slide-in offset — softer than a hard cut.
              </TabsContent>
              <TabsContent value="c" className="text-sm">
                Slow-mo doubles the duration so you can study the easing curve.
              </TabsContent>
            </Tabs>
          )}
        </MotionPlayground>
        <MotionPlayground caption="Accordion • height morph">
          {({ animKey }) => (
            <Accordion key={`acc-${animKey}`} type="single" collapsible className="w-full">
              <AccordionItem value="a">
                <AccordionTrigger>Open me to see the height transition</AccordionTrigger>
                <AccordionContent>
                  CSS animates from 0 to{' '}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                    --radix-accordion-content-height
                  </code>{' '}
                  with a soft ease.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>And toggle between siblings</AccordionTrigger>
                <AccordionContent>
                  The closing item collapses while the new one opens.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </MotionPlayground>
        <MotionPlayground caption="ActivePill • shared layout underline">
          {() => <AnimatedTabs />}
        </MotionPlayground>
      </ShowcaseSection>
    </div>
  );
}
