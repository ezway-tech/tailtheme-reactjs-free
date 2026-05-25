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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { MotionPlayground } from '@/components/showcase/motion-playground';
import { ComponentApi } from '@/components/showcase/component-api';

export default function DialogPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dialog, Drawer & Sheet"
        description="Modal overlays for focused tasks. Dialog for short confirmations, Sheet for side panels, Drawer for bottom panels on mobile."
      />

      <ComponentApi
        description="Source: src/components/ui/{dialog,alert-dialog,sheet,drawer}.tsx. Dialog/AlertDialog/Sheet are Radix-based; Drawer is built on Vaul."
        importCode={[
          `import {`,
          `  Dialog, DialogTrigger, DialogContent,`,
          `  DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,`,
          `  AlertDialog, AlertDialogTrigger, AlertDialogContent,`,
          `  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,`,
          `  AlertDialogFooter, AlertDialogAction, AlertDialogCancel,`,
          `  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription,`,
          `  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter,`,
          `} from '@/components/ui';`,
        ]}
        propsTitle="When to use which"
        props={[
          {
            name: 'Dialog',
            type: 'Radix Dialog',
            description:
              'Centered modal for short tasks (edit a value, confirm an action). Closable via overlay click or Escape.',
          },
          {
            name: 'AlertDialog',
            type: 'Radix AlertDialog',
            description:
              'Destructive or critical confirmations. Cannot be dismissed by clicking the overlay — both buttons must be explicit.',
          },
          {
            name: 'Sheet',
            type: 'Radix Dialog (side variant)',
            description:
              'Slides from an edge (left/right/top/bottom). Best for settings, filters, side details.',
          },
          {
            name: 'Drawer',
            type: 'Vaul',
            description:
              'Mobile-first bottom drawer with drag-to-dismiss. Use on touch surfaces or when a Sheet would feel oversized.',
          },
          {
            name: 'open / defaultOpen / onOpenChange',
            type: 'boolean / fn',
            description: 'All four primitives accept controlled-or-uncontrolled open state.',
          },
          {
            name: 'modal',
            type: 'boolean',
            default: 'true',
            description: 'When false, background remains interactive (Dialog/Sheet only).',
          },
          {
            name: 'side (SheetContent)',
            type: `'top' | 'right' | 'bottom' | 'left'`,
            default: `'right'`,
            description: 'Edge to slide from.',
          },
        ]}
        tokens={[
          { name: '--background / --foreground', description: 'Content surface and text.' },
          { name: '--border', description: 'Edge between header / footer / content.' },
          {
            name: 'overlay (bg-black/50)',
            description: 'Backdrop dim. Customise on DialogOverlay.',
          },
          { name: '--ring', description: 'Focus ring on close button + actions.' },
        ]}
      />

      <ShowcaseSection
        title="Dialog"
        code={`<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Edit profile</DialogTitle></DialogHeader>
    …
    <DialogFooter><Button>Save</Button></DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Update your display name. Changes save instantly.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="dp-name">Display name</Label>
              <Input id="dp-name" defaultValue="Jane Doe" />
            </div>
            <DialogFooter>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ShowcaseSection>

      <ShowcaseSection
        title="AlertDialog"
        description="Use for destructive confirmations. Both actions must be explicit."
        code={`<AlertDialog>
  <AlertDialogTrigger asChild><Button variant="destructive">Delete</Button></AlertDialogTrigger>
  <AlertDialogContent>…</AlertDialogContent>
</AlertDialog>`}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete file</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete file?</AlertDialogTitle>
              <AlertDialogDescription>
                This action is permanent and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sheet (side panel)"
        description="Slides in from the edge. Good for settings, filters or details."
        code={`<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="right">…</SheetContent>
</Sheet>`}
      >
        {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                Open {side}
              </Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>From {side}</SheetTitle>
                <SheetDescription>A side panel sliding from the {side}.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ))}
      </ShowcaseSection>

      <ShowcaseSection
        title="Drawer (bottom sheet)"
        description="Vaul-based bottom drawer — great for mobile."
        code={`<Drawer>
  <DrawerTrigger asChild><Button>Open</Button></DrawerTrigger>
  <DrawerContent>…</DrawerContent>
</Drawer>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer title</DrawerTitle>
              <DrawerDescription>A bottom drawer for secondary actions.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ShowcaseSection>

      <ShowcaseSection
        title="Motion"
        description="Open and close to inspect the entrance and exit. Toggle Slow-mo to study each easing step; Replay re-mounts the trigger so the entrance plays again."
      >
        <MotionPlayground caption="Dialog • fade + scale (Radix)">
          {({ animKey }) => (
            <Dialog key={`dialog-${animKey}`}>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Motion preview</DialogTitle>
                  <DialogDescription>
                    Notice the backdrop fade and content scale-in. Close to see exit easing.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </MotionPlayground>
        <MotionPlayground caption="Sheet • slide from edge">
          {({ animKey }) => (
            <Sheet key={`sheet-${animKey}`}>
              <SheetTrigger asChild>
                <Button variant="outline">Open sheet</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Motion preview</SheetTitle>
                  <SheetDescription>
                    Slide-in from the right; slide-out the same direction.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          )}
        </MotionPlayground>
        <MotionPlayground caption="Drawer • bottom sheet (Vaul)">
          {({ animKey }) => (
            <Drawer key={`drawer-${animKey}`}>
              <DrawerTrigger asChild>
                <Button variant="outline">Open drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Motion preview</DrawerTitle>
                  <DrawerDescription>
                    Spring entrance; drag to dismiss for tactile feel.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Done</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </MotionPlayground>
      </ShowcaseSection>
    </div>
  );
}
