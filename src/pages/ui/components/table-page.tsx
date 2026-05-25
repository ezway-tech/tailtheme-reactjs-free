import { PageHeader } from '@/components/patterns';
import { ComponentApi } from '@/components/showcase/component-api';
import { PrimitivesTab } from '@/pages/ui/components/table/primitives-tab';

/** Free tier — table primitive showcase only (no TanStack recipes). */
export default function TablePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Table"
        description="Accessible table primitives with semantic tokens. Upgrade to Pro for full data-table recipes."
      />

      <ComponentApi
        description="Source: src/components/ui/table.tsx. Thin styled wrappers around native HTML table elements."
        importCode={[
          `import {`,
          `  Table,`,
          `  TableHeader,`,
          `  TableBody,`,
          `  TableRow,`,
          `  TableHead,`,
          `  TableCell,`,
          `} from '@/components/ui';`,
        ]}
        propsTitle="Slots"
        props={[
          {
            name: 'Table',
            type: 'HTMLTableElement props',
            description: 'Root table; use framed={false} inside cards.',
          },
        ]}
      />

      <PrimitivesTab />
    </div>
  );
}
