import { Download, Mail, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';
import { MotionCard } from '@/components/motion';

export default function ButtonPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Button"
        description="Primary action element. Supports 6 variants, 4 sizes, loading, icons and polymorphic `asChild`."
      />

      <ComponentApi
        description="Source: src/components/ui/button.tsx. Built on top of native <button>; switch the rendered element with asChild."
        importCode={`import { Button, buttonVariants, type ButtonProps } from '@/components/ui';`}
        props={[
          {
            name: 'variant',
            type: `'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'`,
            default: `'default'`,
            description: 'Visual style preset.',
          },
          {
            name: 'size',
            type: `'sm' | 'default' | 'lg' | 'icon'`,
            default: `'default'`,
            description: 'Padding + height preset. Use "icon" for square buttons.',
          },
          {
            name: 'loading',
            type: 'boolean',
            default: 'false',
            description: 'Shows a spinner and forces the button into a disabled state.',
          },
          {
            name: 'leftIcon',
            type: 'ReactNode',
            description: 'Icon rendered before the label. Hidden while loading.',
          },
          {
            name: 'rightIcon',
            type: 'ReactNode',
            description: 'Icon rendered after the label. Hidden while loading.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: 'false',
            description: (
              <>
                Render the button styles on the child element (e.g. <code>{'<a>'}</code>) using
                Radix <code>Slot</code>.
              </>
            ),
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Native disabled state. Implied when loading.',
          },
          {
            name: 'className',
            type: 'string',
            description:
              'Tailwind classes merged with the variant — use for one-off tweaks (e.g. w-full, rounded-full).',
          },
        ]}
        tokens={[
          {
            name: '--primary / --primary-foreground',
            description: 'Default variant background and text.',
          },
          { name: '--secondary / --secondary-foreground', description: 'Secondary variant.' },
          { name: '--destructive / --destructive-foreground', description: 'Destructive variant.' },
          { name: '--brand-hover', description: 'Hover background for default variant.' },
          { name: '--input / --background', description: 'Outline / ghost surfaces.' },
          { name: '--ring + ring-offset-background', description: 'Focus-visible ring.' },
          { name: '--radius', description: 'Corner radius (rounded-md).' },
        ]}
      />

      <ShowcaseSection
        title="Variants"
        description="default · secondary · outline · ghost · destructive · link"
        code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
      >
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sizes"
        description="sm · default · lg · icon"
        code={`<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Search"><Search /></Button>`}
      >
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="With icons"
        description="Use leftIcon / rightIcon props or pass icons as children."
        code={`<Button leftIcon={<Mail />}>Email</Button>
<Button variant="outline" rightIcon={<Download />}>Download</Button>
<Button variant="destructive" leftIcon={<Trash2 />}>Delete</Button>`}
      >
        <Button leftIcon={<Mail className="h-4 w-4" />}>Email</Button>
        <Button variant="outline" rightIcon={<Download className="h-4 w-4" />}>
          Download
        </Button>
        <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
          Delete
        </Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="States"
        description="Disabled and loading are mutually exclusive."
        code={`<Button disabled>Disabled</Button>
<Button loading>Saving…</Button>`}
      >
        <Button disabled>Disabled</Button>
        <Button loading>Saving…</Button>
        <Button variant="outline" disabled>
          Outline disabled
        </Button>
        <Button variant="destructive" loading>
          Deleting…
        </Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="asChild (polymorphic)"
        description="Render as any element (e.g. Link, anchor) while keeping button styles."
        code={`<Button asChild variant="link">
  <a href="/docs">Read docs</a>
</Button>`}
      >
        <Button asChild variant="link">
          <a href="#top">Read docs</a>
        </Button>
        <Button asChild variant="outline">
          <a href="#top">External anchor</a>
        </Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="Customization"
        description="Combine with className for one-off adjustments. Prefer variants for repeated patterns."
        code={`<Button className="w-full">Full width</Button>
<Button className="rounded-full px-5">Pill shape</Button>`}
      >
        <Button className="w-full sm:w-auto">Full width on mobile</Button>
        <Button className="rounded-full px-5">Pill shape</Button>
        <Button variant="outline" className="border-dashed">
          Dashed border
        </Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="Motion"
        description="Wrap buttons in <MotionCard/> for a spring-based lift + press feedback."
        code={`<MotionCard lift={3}><Button>Hover me</Button></MotionCard>`}
      >
        <MotionCard lift={3} className="inline-flex">
          <Button>Hover me</Button>
        </MotionCard>
        <MotionCard lift={2} className="inline-flex">
          <Button variant="outline">Outline lift</Button>
        </MotionCard>
      </ShowcaseSection>
    </div>
  );
}
