import { Inbox, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle, Button, Progress, Skeleton } from '@/components/ui';
import { EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

export default function FeedbackCategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Feedback" description="Status, progress and empty/error/loading states." />

      <ShowcaseSection title="Alert">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          <Alert>
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Neutral message.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Saved</AlertTitle>
            <AlertDescription>Your changes are live.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Something might be off.</AlertDescription>
          </Alert>
          <Alert variant="danger">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="EmptyState / ErrorState / LoadingState">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          <EmptyState
            icon={<Inbox className="h-5 w-5" />}
            title="Inbox zero"
            description="No new messages."
            action={<Button size="sm">Refresh</Button>}
          />
          <ErrorState
            title="Failed to load"
            description="We could not load your data."
            action={
              <Button size="sm" variant="outline">
                Retry
              </Button>
            }
          />
          <LoadingState label="Loading data…" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Progress + Skeleton">
        <div className="w-full max-w-md space-y-3">
          <Progress value={42} />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Empty state — with icon">
        <EmptyState
          icon={<User className="h-5 w-5" />}
          title="No users yet"
          description="Invite your first teammate to get started."
          action={<Button size="sm">Invite</Button>}
        />
      </ShowcaseSection>
    </div>
  );
}
