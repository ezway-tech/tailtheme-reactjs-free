import * as React from 'react';
import { Cloud, CreditCard, LogOut, Settings, User } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { MotionPlayground } from '@/components/showcase/motion-playground';
import { ComponentApi } from '@/components/showcase/component-api';

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [position, setPosition] = React.useState('bottom');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dropdown menu"
        description="Action menu anchored to a trigger. Built on Radix `DropdownMenu` with full keyboard nav, sub-menus and checkable items."
      />

      <ComponentApi
        description="Source: src/components/ui/dropdown-menu.tsx. Re-exports Radix primitives so every prop documented at radix-ui.com works as-is."
        importCode={`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
} from '@/components/ui';`}
        propsTitle="Slots & key props"
        props={[
          {
            name: 'DropdownMenu',
            type: '{ open?, defaultOpen?, onOpenChange?, modal? }',
            description: 'Root container. Use `modal={false}` to allow background interactions.',
          },
          {
            name: 'DropdownMenuTrigger',
            type: '{ asChild?: boolean }',
            description: 'Trigger element. Pair with `asChild` to wrap your own button.',
          },
          {
            name: 'DropdownMenuContent',
            type: '{ side?, align?, sideOffset?, alignOffset?, collisionPadding? }',
            default: 'side="bottom" align="center"',
            description: 'Floating panel. Use `align="end"` for trailing toolbar buttons.',
          },
          {
            name: 'DropdownMenuItem',
            type: '{ disabled?, onSelect?, inset?: boolean }',
            description: 'Single action row. `onSelect` fires before menu closes.',
          },
          {
            name: 'DropdownMenuCheckboxItem',
            type: '{ checked, onCheckedChange, disabled? }',
            description: 'Toggle row with a check indicator on the left.',
          },
          {
            name: 'DropdownMenuRadioGroup / RadioItem',
            type: '{ value, onValueChange } / { value, disabled? }',
            description: 'Single-selection group inside the menu.',
          },
          {
            name: 'DropdownMenuShortcut',
            type: 'span — children',
            description: 'Right-aligned hint, e.g. `⇧⌘P`. Visual only — bind shortcuts yourself.',
          },
          {
            name: 'DropdownMenuSub*',
            type: 'Sub / SubTrigger / SubContent',
            description: 'Nested second-level menu. Trigger renders a chevron automatically.',
          },
        ]}
        tokens={[
          { name: '--popover / --popover-foreground', description: 'Floating menu surface.' },
          { name: '--accent / --accent-foreground', description: 'Hover & focused row.' },
          { name: '--border / --radius', description: 'Outline and corner curve.' },
          { name: 'shadow-lg', description: 'Default elevation, switch via className.' },
        ]}
      />

      <ShowcaseSection
        title="Basic menu"
        description="Single-level action list with shortcuts and a separator."
        code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start">
    <DropdownMenuLabel>My account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User className="h-4 w-4" /> Profile
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    …
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="h-4 w-4" />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="h-4 w-4" />
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4" />
                Settings
                <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <Cloud className="h-4 w-4" />
              API (coming soon)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="h-4 w-4" />
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ShowcaseSection>

      <ShowcaseSection
        title="Checkbox items"
        description="Boolean toggles inside the menu. The check appears on the leading edge."
        code={`<DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
  Status bar
</DropdownMenuCheckboxItem>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">View</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
              Status bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Activity bar
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ShowcaseSection>

      <ShowcaseSection
        title="Radio group"
        description="Single-select group — only one item is active at a time."
        code={`<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Panel: {position}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuLabel>Panel position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ShowcaseSection>

      <ShowcaseSection
        title="Submenu"
        description="Nest a second level of actions. Hover or arrow-right to expand."
        code={`<DropdownMenuSub>
  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>…</DropdownMenuSubContent>
</DropdownMenuSub>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Account</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>New team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More…</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ShowcaseSection>

      <ShowcaseSection
        title="Motion"
        description="Menu fades + slides from the trigger side. Submenus animate independently. Replay re-mounts the menu."
      >
        <MotionPlayground caption="Open the menu and submenu to see the entrance">
          {({ animKey }) => (
            <DropdownMenu key={`menu-${animKey}`}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </MotionPlayground>
      </ShowcaseSection>
    </div>
  );
}
