import { Info, Settings, Trash2 } from 'lucide-react';
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { MotionPlayground } from '@/components/showcase/motion-playground';
import { ComponentApi } from '@/components/showcase/component-api';

export default function TooltipPage() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6">
        <PageHeader
          title="Tooltip"
          description="Brief, contextual hint shown on hover or focus. Built on Radix `Tooltip`."
        />

        <ComponentApi
          description="Source: src/components/ui/tooltip.tsx. Wrap an interactive descendant — passive elements like <span> need a tabIndex to receive focus."
          importCode={`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui';`}
          propsTitle="Slots & key props"
          props={[
            {
              name: 'TooltipProvider',
              type: '{ delayDuration?, skipDelayDuration?, disableHoverableContent? }',
              default: 'delayDuration=700, skipDelayDuration=300',
              description: 'Mount once near the app root to share timing across tooltips.',
            },
            {
              name: 'Tooltip',
              type: '{ open?, defaultOpen?, onOpenChange?, delayDuration? }',
              description: 'Per-instance overrides. `open` makes the tooltip controlled.',
            },
            {
              name: 'TooltipTrigger',
              type: '{ asChild?: boolean }',
              description:
                'Element that fires hover/focus. Use `asChild` to wrap your own button or icon.',
            },
            {
              name: 'TooltipContent',
              type: '{ side?, align?, sideOffset?, alignOffset?, avoidCollisions? }',
              default: 'side="top" align="center" sideOffset=4',
              description: 'Floating content. Combine `side` + `align` for placement.',
            },
          ]}
          tokens={[
            { name: '--popover / --popover-foreground', description: 'Surface and text color.' },
            { name: '--border', description: 'Subtle outline (1px).' },
            { name: '--radius', description: 'Corner radius — defaults to `rounded-md`.' },
          ]}
        />

        <ShowcaseSection
          title="Basic"
          description="Wrap a button with `<TooltipTrigger asChild>`."
          code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon" aria-label="Settings">
      <Settings />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Open settings</TooltipContent>
</Tooltip>`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open settings</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="More info">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Read the docs · ⌘?</TooltipContent>
          </Tooltip>
        </ShowcaseSection>

        <ShowcaseSection
          title="Sides"
          description="`side` controls placement: top · right · bottom · left."
          code={`<TooltipContent side="top">Top</TooltipContent>`}
        >
          {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button variant="outline">{side}</Button>
              </TooltipTrigger>
              <TooltipContent side={side}>From the {side}</TooltipContent>
            </Tooltip>
          ))}
        </ShowcaseSection>

        <ShowcaseSection
          title="Long content"
          description="Tooltips should stay short. For richer content, prefer `Popover` or `HoverCard`."
          code={`<TooltipContent className="max-w-xs">…</TooltipContent>`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover for details</Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              Permanently delete this item. This action cannot be undone and removes related logs.
            </TooltipContent>
          </Tooltip>
        </ShowcaseSection>

        <ShowcaseSection
          title="On a destructive action"
          description="Pair tooltips with icon-only buttons so screen-readers and hover users both know the meaning."
          code={`<TooltipTrigger asChild>
  <Button variant="destructive" size="icon" aria-label="Delete row">
    <Trash2 />
  </Button>
</TooltipTrigger>`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" size="icon" aria-label="Delete row">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete row · ⌫</TooltipContent>
          </Tooltip>
        </ShowcaseSection>

        <ShowcaseSection
          title="Motion"
          description="Tooltip enters with fade + scale + slide-from-side. Toggle Slow-mo to inspect easing; Replay re-mounts the tooltip."
        >
          <MotionPlayground caption="Hover to open · 200ms delay">
            {({ animKey }) => (
              <div key={`tooltip-${animKey}`} className="flex flex-wrap gap-3">
                {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                  <Tooltip key={side}>
                    <TooltipTrigger asChild>
                      <Button variant="outline">From {side}</Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}>Slide-in from the {side}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            )}
          </MotionPlayground>
        </ShowcaseSection>
      </div>
    </TooltipProvider>
  );
}
