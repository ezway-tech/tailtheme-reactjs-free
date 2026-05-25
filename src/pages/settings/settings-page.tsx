import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@/components/ui';
import { PageHeader, ThemeMenu, UpgradeCta } from '@/components/patterns';
import { PRESET_PALETTES } from '@/config';
import { usePreferences } from '@/hooks/usePreferences';
import { cn } from '@/lib/cn';

/** Lite settings — Profile, Account, and Appearance only. */
export default function SettingsPage() {
  const { t } = useTranslation();
  const { preferences, setPreferences } = usePreferences();
  const [profileDirty, setProfileDirty] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t('pages.settings.title', 'Settings')}
        description={t(
          'pages.settings.subtitle',
          'Manage your account, preferences and appearance.',
        )}
      />
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile">{t('pages.settings.tabs.profile', 'Profile')}</TabsTrigger>
          <TabsTrigger value="account">{t('pages.settings.tabs.account', 'Account')}</TabsTrigger>
          <TabsTrigger value="appearance">
            {t('pages.settings.tabs.appearance', 'Appearance')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>This is how others will see you on the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="set-name">Display name</Label>
                  <Input
                    id="set-name"
                    defaultValue="Alex Nguyen"
                    onChange={() => setProfileDirty(true)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="set-email">Email</Label>
                  <Input
                    id="set-email"
                    type="email"
                    defaultValue="alex@tailtheme.test"
                    onChange={() => setProfileDirty(true)}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="set-bio">Bio</Label>
                  <Textarea
                    id="set-bio"
                    rows={4}
                    placeholder="Tell us about yourself"
                    onChange={() => setProfileDirty(true)}
                  />
                </div>
              </div>
              {profileDirty ? (
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setProfileDirty(false)}>
                    Discard
                  </Button>
                  <Button onClick={() => setProfileDirty(false)}>Save profile</Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Email and marketing preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="acct-email">Primary email</Label>
                <Input id="acct-email" type="email" defaultValue="alex@tailtheme.test" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Product updates</Label>
                  <p className="text-xs text-muted-foreground">News and tips.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This permanently removes your data. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete account</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Color mode and preset palettes included in Lite.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Color mode</p>
                  <p className="text-xs text-muted-foreground">Light, dark, or follow system.</p>
                </div>
                <ThemeMenu />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Preset palettes</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {PRESET_PALETTES.map((preset) => {
                    const active = preferences.primaryHsl === preset.primaryHsl;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() =>
                          setPreferences({
                            primaryHsl: preset.primaryHsl,
                            accentHsl: preset.accentHsl,
                            successHsl: preset.successHsl,
                            warningHsl: preset.warningHsl,
                            infoHsl: preset.infoHsl,
                            sidebarPrimaryHsl: preset.sidebarPrimaryHsl,
                            chart1Hsl: preset.chart1Hsl,
                            chart2Hsl: preset.chart2Hsl,
                          })
                        }
                        className={cn(
                          'rounded-lg border border-input bg-card p-3 text-left text-sm shadow-sm transition-colors',
                          active && 'border-primary bg-primary/10 ring-1 ring-primary/20',
                        )}
                      >
                        <span className="font-medium text-foreground">{preset.name}</span>
                        <span className="mt-1 flex gap-1">
                          {[
                            preset.primaryHsl,
                            preset.accentHsl,
                            preset.successHsl,
                            preset.chart2Hsl,
                          ].map((hsl) => (
                            <span
                              key={hsl}
                              className="h-4 w-4 rounded-full border border-input"
                              style={{ background: `hsl(${hsl})` }}
                              aria-hidden
                            />
                          ))}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
          <UpgradeCta />
        </TabsContent>
      </Tabs>
    </div>
  );
}
