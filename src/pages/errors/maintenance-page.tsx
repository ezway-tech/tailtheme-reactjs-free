import { Link } from 'react-router-dom';
import { Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { urls } from '@/routes/urls';

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warning-bg text-warning-text">
        <Construction className="h-8 w-8" aria-hidden />
      </div>
      <div className="max-w-md space-y-2">
        <h1 className="text-h2">We&apos;ll be right back</h1>
        <p className="text-muted-foreground">
          Scheduled maintenance is in progress. Most services return within 30 minutes.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link to={urls.landing}>Back to home</Link>
      </Button>
    </div>
  );
}
