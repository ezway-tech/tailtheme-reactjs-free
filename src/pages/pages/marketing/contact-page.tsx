import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const CHANNELS = [
  { icon: Mail, label: 'Email', value: 'hello@tailtheme.dev', href: 'mailto:hello@tailtheme.dev' },
  { icon: Phone, label: 'Phone', value: '+1 (415) 555-0101', href: 'tel:+14155550101' },
  { icon: MessageCircle, label: 'Live chat', value: 'Mon–Fri · 9am–6pm PT', href: '#' },
  { icon: MapPin, label: 'HQ', value: '123 Market St, San Francisco', href: '#' },
];

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Get in touch"
        description="We'll get back to you within one business day."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          {CHANNELS.map(({ icon: Icon, label, value, href }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <a href={href} className="text-sm font-medium hover:underline">
                    {value}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>We reply within one business day.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="first">First name</Label>
                  <Input id="first" placeholder="Ada" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="last">Last name</Label>
                  <Input id="last" placeholder="Lovelace" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ada@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="topic">Topic</Label>
                <Select defaultValue="general">
                  <SelectTrigger id="topic">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General inquiry</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} placeholder="Tell us what's on your mind…" />
              </div>
              <Button type="submit" className="justify-self-end">
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
