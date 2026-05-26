import { Alert, AlertDescription, AlertTitle, Button, toast } from '@/components/ui';
import { Bell, Check, Info, TriangleAlert } from 'lucide-react';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { MotionPlayground } from '@/components/showcase/motion-playground';
import { ComponentApi } from '@/components/showcase/component-api';
import { Reveal } from '@/components/motion';

export default function ToastPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Toast & Alert"
        description="Transient toasts for async feedback and inline alerts for contextual info."
      />

      <ComponentApi
        description="Source: src/components/ui/sonner.tsx (Sonner). The <Toaster /> is mounted globally in AppShell — call toast() from anywhere in the tree."
        importCode={[
          `import { toast } from '@/components/ui';`,
          `// Variants:`,
          `toast(message, options);`,
          `toast.success(message, options);`,
          `toast.error(message, options);`,
          `toast.warning(message, options);`,
          `toast.info(message, options);`,
          `toast.promise(promise, { loading, success, error });`,
        ]}
        propsTitle="toast() options"
        props={[
          {
            name: 'description',
            type: 'string | ReactNode',
            description: 'Secondary line under the title.',
          },
          {
            name: 'duration',
            type: 'number',
            default: '3000',
            description:
              'Auto-dismiss timeout (ms). Pass Infinity to keep open until acknowledged.',
          },
          {
            name: 'action',
            type: '{ label, onClick }',
            description: 'Inline action button on the toast.',
          },
          {
            name: 'cancel',
            type: '{ label, onClick }',
            description: 'Secondary cancel button.',
          },
          {
            name: 'id',
            type: 'string | number',
            description: 'Stable id; useful with toast.dismiss(id) and toast.promise().',
          },
          {
            name: 'icon',
            type: 'ReactNode',
            description: 'Custom leading icon. Variants supply sensible defaults.',
          },
          {
            name: 'position',
            type: `'top-left' | 'top-center' | … | 'bottom-right'`,
            description:
              'Per-toast override. Otherwise inherits from the global <Toaster /> mounted in AppShell.',
          },
        ]}
        tokens={[
          { name: '--background / --foreground', description: 'Default toast surface and text.' },
          {
            name: '--success-bg / --success-text / --success-border',
            description: 'Success toasts.',
          },
          { name: '--danger-bg / --danger-text / --danger-border', description: 'Error toasts.' },
        ]}
      />

      <ComponentApi
        title="Alert API"
        description="Source: src/components/ui/alert.tsx. Inline, non-dismissable status block. Pair with a leading lucide icon."
        importCode={`import { Alert, AlertTitle, AlertDescription, alertVariants, type AlertProps } from '@/components/ui';`}
        propsTitle="Props (Alert)"
        props={[
          {
            name: 'variant',
            type: `'info' | 'success' | 'warning' | 'danger'`,
            default: `'info'`,
            description: 'Tone preset. Wraps icon, surface and text in matching tokens.',
          },
          {
            name: 'children',
            type: 'ReactNode',
            description:
              'Compose with <AlertTitle> + <AlertDescription>; place a lucide icon as the first child for the leading badge.',
          },
        ]}
      />

      <ShowcaseSection
        title="Toast types"
        description="Hover over a toast to pause auto-dismiss."
        code={`toast('Saved successfully', { description: 'Your changes have been applied.' });
toast.success('Profile updated');
toast.warning('Storage almost full');
toast.error('Upload failed', { action: { label: 'Retry', onClick: fn } });
toast.info('New update available');`}
      >
        <Button
          onClick={() =>
            toast('Saved successfully', { description: 'Your changes have been applied.' })
          }
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.success('Profile updated', {
              description: 'Your preferences have been saved.',
              duration: 5000,
            })
          }
        >
          Success (5s)
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.warning('Storage almost full', { description: 'You are at 90% of your quota.' })
          }
        >
          Warning
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            toast.error('Upload failed', {
              description: 'Please check your connection and retry.',
              action: { label: 'Retry', onClick: () => toast.success('Retrying…') },
            })
          }
        >
          Error + action
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            toast.info('New update available', {
              description: 'Click to reload and get the latest.',
              duration: 8000,
            })
          }
        >
          Info (8s)
        </Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="Alert (inline)"
        description="Static, contextual information — not dismissed automatically."
        code={`<Alert variant="warning">
  <TriangleAlert />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Something might be off.</AlertDescription>
</Alert>`}
      >
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          <Alert>
            <Bell />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>This is an info alert.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <Check />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>All good.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <TriangleAlert />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Heads up, something might be off.</AlertDescription>
          </Alert>
          <Alert variant="danger">
            <Info />
            <AlertTitle>Danger</AlertTitle>
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Motion"
        description="Sonner handles toast enter/exit out of the box. Inline alerts compose with Reveal for a scale-in entrance. Replay re-mounts the demo, Slow-mo doubles the duration."
      >
        <MotionPlayground caption="Toast stack — staggered enter and exit">
          {() => (
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  toast.success('Profile updated');
                  window.setTimeout(() => toast.info('Synced to cloud'), 220);
                  window.setTimeout(() => toast.warning('Two-factor recommended'), 440);
                }}
              >
                Trigger 3 toasts
              </Button>
            </div>
          )}
        </MotionPlayground>
        <MotionPlayground caption="Inline alert — Reveal scale-in on mount">
          {({ animKey }) => (
            <Reveal key={`alert-${animKey}`} className="w-full" direction="up" distance={8}>
              <Alert variant="success">
                <Check />
                <AlertTitle>Saved successfully</AlertTitle>
                <AlertDescription>
                  Your changes were committed and the alert slid into view.
                </AlertDescription>
              </Alert>
            </Reveal>
          )}
        </MotionPlayground>
      </ShowcaseSection>
    </div>
  );
}
