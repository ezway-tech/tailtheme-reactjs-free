import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TEMPLATE_PURCHASE_URL } from '@/config';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageContent, PageHeader, UpgradeCta } from '@/components/patterns';
import { urls } from '@/routes/urls';

const COMPARISON = [
  { feature: 'Dashboards', lite: '3', pro: '9+' },
  {
    feature: 'Vertical page packs',
    lite: 'SaaS + Project (8 pages)',
    pro: '8 verticals, 60+ pages',
  },
  { feature: 'UI primitives', lite: '30', pro: '40+' },
  { feature: 'Languages', lite: 'EN + VI + FR', pro: 'EN + VI + FR' },
  { feature: 'Theme customizer (palette)', lite: false, pro: true },
  { feature: 'Charts & data table demos', lite: false, pro: true },
  { feature: 'License', lite: 'MIT (public)', pro: 'Commercial' },
] as const;

const EXTERNAL_URL_PATTERN = /^https?:\/\//i;

/** Lite vs Pro comparison at `/app/upgrade`. */
export default function UpgradePage() {
  const isExternal = EXTERNAL_URL_PATTERN.test(TEMPLATE_PURCHASE_URL);

  return (
    <PageContent width="content" className="flex flex-col gap-8">
      <PageHeader
        title="Upgrade to TailTheme Pro"
        description="Everything in Free, plus full verticals, primitives, i18n, and commercial license."
      />
      <UpgradeCta className="max-w-2xl" />

      <Card>
        <CardHeader>
          <CardTitle>Free vs Pro</CardTitle>
          <CardDescription>
            Compare what ships in this MIT repo versus the full template.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-input">
            <table className="w-full min-w-[28rem] text-sm">
              <thead>
                <tr className="border-b border-input bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-foreground">Feature</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Free</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Pro</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-input last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                    <td className="px-4 py-3 text-foreground">
                      {typeof row.lite === 'boolean' ? (
                        row.lite ? (
                          <Check className="h-4 w-4 text-primary" aria-label="Included" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground" aria-label="Not included" />
                        )
                      ) : (
                        row.lite
                      )}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="h-4 w-4 text-primary" aria-label="Included" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground" aria-label="Not included" />
                        )
                      ) : (
                        row.pro
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              {isExternal ? (
                <a href={TEMPLATE_PURCHASE_URL} target="_blank" rel="noreferrer">
                  Get TailTheme Pro
                </a>
              ) : (
                <Link to={TEMPLATE_PURCHASE_URL}>Get TailTheme Pro</Link>
              )}
            </Button>
            <Button asChild variant="outline">
              <Link to={urls.app.dashboard}>Back to dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContent>
  );
}
