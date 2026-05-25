import { useTranslation } from 'react-i18next';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { sampleCourses } from '@/mocks/fixtures';

export default function ProfilePage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-lg border border-border bg-gradient-to-r from-primary/10 via-background to-accent/10 p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">AN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">Alex Nguyen</h1>
            <p className="text-sm text-muted-foreground">
              alex@tailtheme.test · Learning since 2024
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge>Admin</Badge>
              <Badge variant="secondary">27 day streak</Badge>
              <Badge variant="outline">4,120 pts</Badge>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t('pages.profile.tabs.overview', 'Overview')}</TabsTrigger>
          <TabsTrigger value="activity">{t('pages.profile.tabs.activity', 'Activity')}</TabsTrigger>
          <TabsTrigger value="courses">{t('pages.profile.tabs.courses', 'Courses')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            {sampleCourses.slice(0, 3).map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle className="text-base">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {course.progress}% complete · {course.lessons.length} lessons
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="pt-4">
          <Card>
            <CardContent className="py-6 text-sm text-muted-foreground">
              Activity feed coming soon.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {sampleCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle className="text-base">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <Progress value={course.progress} />
                  <p className="text-muted-foreground">
                    {course.instructor} · {course.level}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
