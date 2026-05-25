import * as React from 'react';
import { Mail, Lock, Search, User } from 'lucide-react';
import { Button, Input, Label, Textarea } from '@/components/ui';
import { PageHeader, PatternFormField } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';
import { Shake } from '@/components/motion';

function ShakeOnError() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="flex items-center gap-2">
      <Shake trigger={count}>
        <Input placeholder="This field is required" variant={count > 0 ? 'error' : 'default'} />
      </Shake>
      <Button size="sm" variant="outline" onClick={() => setCount((c) => c + 1)}>
        Trigger error
      </Button>
    </div>
  );
}

export default function InputPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Input & Textarea"
        description="Single- and multi-line text entry with icons, clearable, validation state."
      />

      <ComponentApi
        description="Source: src/components/ui/{input,textarea}.tsx. Both forward all native props (Input is HTMLInputElement, Textarea is HTMLTextAreaElement)."
        importCode={[
          `import { Input, inputVariants, type InputProps } from '@/components/ui';`,
          `import { Textarea, textareaVariants, type TextareaProps } from '@/components/ui';`,
        ]}
        propsTitle="Props (Input)"
        props={[
          {
            name: 'variant',
            type: `'default' | 'error'`,
            default: `'default'`,
            description: 'Visual state. "error" applies the danger token border + ring.',
          },
          {
            name: 'size',
            type: `'sm' | 'default' | 'lg'`,
            default: `'default'`,
            description: 'Height + padding preset (h-8 / h-9 / h-10).',
          },
          {
            name: 'leftIcon',
            type: 'ReactNode',
            description:
              'Adornment rendered absolutely on the left, with input padding adjusted automatically.',
          },
          {
            name: 'rightIcon',
            type: 'ReactNode',
            description: 'Right-side adornment. Hidden when clearable shows the clear button.',
          },
          {
            name: 'clearable',
            type: 'boolean',
            default: 'false',
            description: 'Shows a × button when the input has a value (uncontrolled-friendly).',
          },
          {
            name: 'onClear',
            type: '() => void',
            description: 'Fired after the value is cleared via the × button.',
          },
          {
            name: 'wrapperClassName',
            type: 'string',
            description:
              'Class for the wrapper <div> when affixes (icons / clear) are rendered. Use className for the <input>.',
          },
          {
            name: 'disabled / readOnly',
            type: 'boolean',
            description: 'Native HTML behavior. Disabled also dims the wrapper opacity.',
          },
        ]}
        tokens={[
          { name: '--input', description: 'Default border color.' },
          { name: '--background / --foreground', description: 'Surface and text.' },
          { name: '--ring', description: 'Focus ring (default variant).' },
          {
            name: '--danger / --danger-bg / --danger-border / --danger-text',
            description: 'Error variant tokens.',
          },
          { name: '--muted-foreground', description: 'Placeholder + icon color.' },
        ]}
      />

      <ComponentApi
        title="Textarea API"
        importCode={`import { Textarea, type TextareaProps } from '@/components/ui';`}
        propsTitle="Props (Textarea)"
        props={[
          {
            name: 'variant',
            type: `'default' | 'error'`,
            default: `'default'`,
            description: 'Same semantics as Input.',
          },
          {
            name: 'resize',
            type: `'none' | 'y' | 'both'`,
            default: `'y'`,
            description: 'Maps to CSS resize. Forced to "none" when autoResize is true.',
          },
          {
            name: 'autoResize',
            type: 'boolean',
            default: 'false',
            description: 'Grow to fit content up to maxRows lines, then scroll.',
          },
          {
            name: 'maxRows',
            type: 'number',
            default: '8',
            description: 'Upper bound for autoResize.',
          },
          {
            name: 'rows',
            type: 'number',
            default: '3',
            description: 'Initial visible rows (native attribute).',
          },
        ]}
      />

      <ShowcaseSection
        title="Variants"
        description="default and error"
        code={`<Input placeholder="Default" />
<Input variant="error" placeholder="Error state" />`}
      >
        <Input placeholder="Default" />
        <Input variant="error" placeholder="Error state" />
      </ShowcaseSection>

      <ShowcaseSection
        title="With icons"
        description="leftIcon / rightIcon props."
        code={`<Input leftIcon={<Mail />} placeholder="you@example.com" />
<Input leftIcon={<Search />} placeholder="Search" />
<Input leftIcon={<Lock />} type="password" />`}
      >
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          <Input leftIcon={<Mail className="h-4 w-4" />} placeholder="you@example.com" />
          <Input leftIcon={<Search className="h-4 w-4" />} placeholder="Search" />
          <Input leftIcon={<Lock className="h-4 w-4" />} type="password" placeholder="Password" />
          <Input leftIcon={<User className="h-4 w-4" />} placeholder="Username" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Clearable"
        description="Adds a clear button when there's a value."
        code={`<Input clearable defaultValue="Type to clear" />`}
      >
        <Input clearable defaultValue="Type to clear" />
      </ShowcaseSection>

      <ShowcaseSection
        title="States"
        code={`<Input disabled placeholder="Disabled" />
<Input readOnly defaultValue="Read-only" />`}
      >
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          <Input disabled placeholder="Disabled" />
          <Input readOnly defaultValue="Read-only" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="With label + helper + error"
        description="Use the FormField pattern for a full composed field."
        code={`<PatternFormField
  label="Email"
  placeholder="you@example.com"
  description="We'll never share your email."
  required
/>`}
      >
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          <PatternFormField
            label="Email"
            placeholder="you@example.com"
            required
            description="We'll never share your email."
          />
          <PatternFormField
            label="Password"
            type="password"
            description="At least 8 characters"
            error="Too short"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Textarea"
        code={`<Textarea placeholder="Tell us more…" />
<Textarea autoResize placeholder="Auto-resizes as you type" />`}
      >
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <Label htmlFor="ta-1">Message</Label>
            <Textarea id="ta-1" placeholder="Tell us more…" />
          </div>
          <div>
            <Label htmlFor="ta-2">Bio</Label>
            <Textarea id="ta-2" autoResize placeholder="Auto-resizes as you type" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Motion"
        description="Wrap an input in <Shake/> to draw attention to validation errors."
        code={`<Shake trigger={errorCount}><Input variant="error" /></Shake>`}
      >
        <ShakeOnError />
      </ShowcaseSection>
    </div>
  );
}
