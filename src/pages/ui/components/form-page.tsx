import { useState } from 'react';
import {
  Button,
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  toast,
} from '@/components/ui';
import { PageHeader, PatternFormField } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';
import { Shake } from '@/components/motion';

function MotionSection() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  const invalid = count > 0 && value.length < 3;
  return (
    <ShowcaseSection
      title="Motion"
      description="Combine <Shake/> with a validation state to draw attention to an invalid form field on submit."
      code={`<Shake trigger={submitCount}><Input variant={invalid ? 'error' : 'default'} /></Shake>`}
    >
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1">
          <Label htmlFor="motion-name">Name (min 3 chars)</Label>
          <Shake trigger={count}>
            <Input
              id="motion-name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant={invalid ? 'error' : 'default'}
            />
          </Shake>
        </div>
        <Button type="button" onClick={() => setCount((c) => c + 1)}>
          Submit
        </Button>
      </div>
    </ShowcaseSection>
  );
}

export default function FormPage() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success('Saved');
    }, 600);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Form"
        description="Compose Input, Select, Checkbox, RadioGroup, Switch and Textarea with labels, help text and validation errors."
      />

      <ComponentApi
        title="Form slots"
        description="Source: src/components/ui/form.tsx. Thin wrappers around react-hook-form's <Controller> with consistent label / control / description / message slots."
        importCode={[
          `import {`,
          `  Form,`,
          `  FormField,`,
          `  FormItem,`,
          `  FormLabel,`,
          `  FormControl,`,
          `  FormDescription,`,
          `  FormMessage,`,
          `} from '@/components/ui';`,
          `import { useForm } from 'react-hook-form';`,
        ]}
        propsTitle="Slots"
        props={[
          {
            name: 'Form',
            type: 'FormProvider',
            description: 'Re-export of react-hook-form FormProvider. Wrap your <form> with it.',
          },
          {
            name: 'FormField',
            type: '{ control, name, render }',
            description: 'Renders a Controller and provides field state to FormItem children.',
          },
          {
            name: 'FormItem',
            type: 'div wrapper',
            description: 'Vertical stack with spacing for label / control / description / message.',
          },
          {
            name: 'FormLabel',
            type: 'wraps Label',
            description: 'Auto-associates with the rendered control via aria-describedby.',
          },
          {
            name: 'FormControl',
            type: 'Slot',
            description: 'Forwards the field id, aria-describedby and aria-invalid to its child.',
          },
          {
            name: 'FormDescription',
            type: 'p',
            description:
              'Helper text. Hidden when an error is present and replaced by FormMessage.',
          },
          {
            name: 'FormMessage',
            type: 'p',
            description: 'Renders validation errors from react-hook-form using danger tokens.',
          },
          {
            name: 'PatternFormField',
            type: 'composed',
            description:
              'High-level convenience: label + Input + description + error in one prop API. Import from @/components/patterns.',
          },
        ]}
        tokens={[
          { name: '--danger-text / --danger-border', description: 'Validation error styling.' },
          { name: '--muted-foreground', description: 'Description / helper copy.' },
          { name: 'space-y-1.5', description: 'Default vertical rhythm between slots.' },
        ]}
      />

      <ShowcaseSection
        title="FormField pattern"
        description="Canonical label + helper + error layout."
        code={`<PatternFormField label="Email" required description="Your work address" />
<PatternFormField label="Password" type="password" error="Password is too short" />`}
      >
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          <PatternFormField
            label="Email"
            placeholder="you@example.com"
            required
            description="Your work address"
          />
          <PatternFormField label="Password" type="password" error="Password is too short" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Composed sign-up form"
        description="All primitives wired together. Submit triggers a toast."
        code={`<form onSubmit={handleSubmit}>…</form>`}
      >
        <form onSubmit={handleSubmit} className="grid w-full gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" placeholder="Jane Doe" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="jane@example.com" required />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger id="role">
                <SelectValue placeholder="Pick a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="pm">Product manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="A short intro…" />
          </div>
          <div>
            <Label>Visibility</Label>
            <RadioGroup defaultValue="public" className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem id="vis-pub" value="public" />
                <Label htmlFor="vis-pub" className="font-normal">
                  Public
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="vis-pri" value="private" />
                <Label htmlFor="vis-pri" className="font-normal">
                  Private
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="notify" defaultChecked />
            <Label htmlFor="notify" className="font-normal">
              Email notifications
            </Label>
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <Checkbox id="tos" required />
            <Label htmlFor="tos" className="font-normal">
              I agree to the terms
            </Label>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" loading={submitting}>
              Create account
            </Button>
          </div>
        </form>
      </ShowcaseSection>

      <MotionSection />
    </div>
  );
}
