import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

export default function LayoutCategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Layout"
        description="Primitives that structure content: Separator, Collapsible, and utility patterns."
      />

      <ShowcaseSection title="Separator">
        <div className="w-full max-w-md space-y-3">
          <div>
            <p className="text-sm font-medium">Radix UI</p>
            <p className="text-xs text-muted-foreground">
              Unstyled primitives for building design systems.
            </p>
          </div>
          <Separator />
          <div className="flex h-5 items-center gap-3 text-xs text-muted-foreground">
            <span>Blog</span>
            <Separator orientation="vertical" />
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Source</span>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Collapsible">
        <Collapsible className="w-full max-w-md rounded-md border border-border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Advanced settings</span>
            <CollapsibleTrigger asChild>
              <Button size="sm" variant="ghost">
                Toggle
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
            Hidden content that expands. Build your own disclosure widget with custom triggers.
          </CollapsibleContent>
        </Collapsible>
      </ShowcaseSection>

      <ShowcaseSection
        title="Container + grid patterns"
        description="Compose with Tailwind utility classes."
      >
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-4 text-sm">Sidebar</div>
          <div className="rounded-md border border-border bg-muted/30 p-4 text-sm md:col-span-2">
            Main
          </div>
        </div>
        <div className="w-full rounded-md border border-border bg-muted/30 p-4 text-sm">
          Footer (full width)
        </div>
      </ShowcaseSection>
    </div>
  );
}
