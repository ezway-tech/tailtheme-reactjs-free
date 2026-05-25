import { Check, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function PulsingBadges() {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <>
        <Badge>Default</Badge>
        <Badge variant="secondary">Live</Badge>
      </>
    );
  }
  return (
    <>
      <motion.span whileHover={{ scale: 1.08 }} transition={SPRING.press} className="inline-flex">
        <Badge>Default</Badge>
      </motion.span>
      <motion.span
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex"
      >
        <Badge variant="secondary">
          <span className="mr-1 h-1.5 w-1.5 rounded-full bg-primary" />
          Live
        </Badge>
      </motion.span>
    </>
  );
}

export default function BadgePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Badge & Avatar" description="Compact status labels and user imagery." />

      <ComponentApi
        description="Source: src/components/ui/badge.tsx. <Badge> renders a styled <span>; pass any HTML attributes through."
        importCode={`import { Badge, badgeVariants, type BadgeProps } from '@/components/ui';`}
        propsTitle="Props (Badge)"
        props={[
          {
            name: 'variant',
            type: `'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger'`,
            default: `'default'`,
            description: 'Color preset.',
          },
          {
            name: 'className',
            type: 'string',
            description:
              'Tailwind classes merged with the variant. Use for size / padding overrides (e.g. text-[10px] uppercase).',
          },
          {
            name: 'children',
            type: 'ReactNode',
            description: 'Label text. Combine with a leading dot or icon for richer status pills.',
          },
        ]}
        tokens={[
          { name: '--primary / --primary-foreground', description: 'Default variant.' },
          { name: '--secondary / --secondary-foreground', description: 'Secondary variant.' },
          { name: '--success-bg / --success-text / --success-border', description: 'Success.' },
          { name: '--danger-bg / --danger-text / --danger-border', description: 'Danger.' },
          {
            name: 'amber-50 / amber-200 / amber-700',
            description: 'Warning palette (Tailwind utilities).',
          },
        ]}
      />

      <ComponentApi
        title="Avatar API"
        description="Source: src/components/ui/avatar.tsx (Radix Avatar). Use AvatarImage with AvatarFallback for graceful degradation."
        importCode={`import { Avatar, AvatarImage, AvatarFallback, type AvatarProps } from '@/components/ui';`}
        propsTitle="Props (Avatar)"
        props={[
          {
            name: 'size',
            type: `'sm' | 'default' | 'lg' | 'xl'`,
            default: `'default'`,
            description: 'Maps to h-7 / h-9 / h-12 / h-16 with matching text size.',
          },
          {
            name: 'className',
            type: 'string',
            description:
              'Use for ring, ring-offset or shape overrides (rounded-md for square avatars).',
          },
          {
            name: 'AvatarImage src',
            type: 'string',
            description: 'Image URL. Falls back to AvatarFallback when the image fails to load.',
          },
          {
            name: 'AvatarFallback',
            type: 'children',
            description:
              'Initials, icon or skeleton shown while the image loads or when it errors.',
          },
        ]}
        tokens={[
          { name: '--muted / --muted-foreground', description: 'Fallback background and text.' },
          { name: '--background', description: 'Recommended ring-offset for stacked avatars.' },
        ]}
      />

      <ShowcaseSection
        title="Badge variants"
        code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>`}
      >
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">
          <Check className="h-3 w-3" /> Success
        </Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
      </ShowcaseSection>

      <ShowcaseSection
        title="With dot"
        description="Use a leading colored dot for list statuses."
        code={`<Badge variant="outline"><span className="h-1.5 w-1.5 rounded-full bg-success" />Online</Badge>`}
      >
        <Badge variant="outline" className="gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-success-hsl,150_55%_42%))]" />
          Online
        </Badge>
        <Badge variant="outline" className="gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
          Idle
        </Badge>
        <Badge variant="outline" className="gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
          Offline
        </Badge>
      </ShowcaseSection>

      <ShowcaseSection
        title="Avatar"
        code={`<Avatar>
  <AvatarImage src="…" />
  <AvatarFallback>VU</AvatarFallback>
</Avatar>`}
      >
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/64?img=1" alt="avatar" />
          <AvatarFallback>VU</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </ShowcaseSection>

      <ShowcaseSection
        title="Avatar group"
        description="`<AvatarGroup>` stacks avatars with optional +N overflow."
        code={`<AvatarGroup limit={4}>
  <Avatar>…</Avatar>
</AvatarGroup>`}
      >
        <AvatarGroup limit={4}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Avatar key={i}>
              <AvatarImage src={`https://i.pravatar.cc/64?img=${i + 10}`} alt="member" />
              <AvatarFallback>U{i}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </ShowcaseSection>

      <ShowcaseSection
        title="Motion"
        description="Wrap a badge with motion.span for a hover scale or a repeating pulse (e.g. live indicator)."
      >
        <PulsingBadges />
      </ShowcaseSection>
    </div>
  );
}
