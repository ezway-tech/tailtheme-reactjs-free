import * as React from 'react';
import { tableCellPaddingClassName } from '@/components/ui';
import { cn } from '@/lib/cn';

/** Single row in the Props/Slots reference table. */
export interface ComponentApiPropRow {
  /** Prop, slot or API name. */
  name: string;
  /**
   * Type signature shown in monospace.
   * Use literal unions (e.g. `'sm' | 'default' | 'lg'`) where applicable.
   */
  type: string;
  /** Default value when the prop is omitted. Falls back to `—` when not provided. */
  default?: string;
  /** Short, human-readable description of the prop or slot. */
  description: React.ReactNode;
}

/** Single row in the Styling tokens reference list. */
export interface ComponentApiTokenRow {
  /** Token key (CSS variable, Tailwind utility class, etc.). */
  name: string;
  /** What the token controls. */
  description?: React.ReactNode;
}

export interface ComponentApiProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Section title. Defaults to `API & usage`. */
  title?: React.ReactNode;
  /** Optional intro paragraph above the import block. */
  description?: React.ReactNode;
  /**
   * Import statement(s) to display in a code block.
   * Pass a single string, or an array of lines / separate import statements.
   */
  importCode: string | string[];
  /** Heading shown above the props table. Defaults to `Props`. */
  propsTitle?: React.ReactNode;
  /** Rows for the props/slots table. Omit or empty to hide the section. */
  props?: ComponentApiPropRow[];
  /** Heading shown above the styling tokens list. Defaults to `Styling tokens`. */
  tokensTitle?: React.ReactNode;
  /** Tokens / utility classes the component reads. Omit or empty to hide the section. */
  tokens?: ComponentApiTokenRow[];
}

/**
 * Documentation block that summarizes a UI primitive's import path, public
 * props (or slots) and the styling tokens it consumes. Used at the top of
 * each Core component showcase page for consistent visual rhythm with
 * `<ShowcaseSection>`.
 */
export const ComponentApi = React.forwardRef<HTMLElement, ComponentApiProps>(
  (
    {
      title = 'API & usage',
      description,
      importCode,
      propsTitle = 'Props',
      props,
      tokensTitle = 'Styling tokens',
      tokens,
      className,
      ...rest
    },
    ref,
  ) => {
    const importBlock = Array.isArray(importCode) ? importCode.join('\n') : importCode;
    const hasProps = props && props.length > 0;
    const hasTokens = tokens && tokens.length > 0;

    return (
      <section
        ref={ref}
        className={cn('space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm', className)}
        {...rest}
      >
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Import
          </p>
          <pre className="overflow-x-auto rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-xs leading-relaxed">
            <code>{importBlock}</code>
          </pre>
        </div>

        {hasProps ? (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {propsTitle}
            </p>
            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full caption-bottom text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th
                      scope="col"
                      className={cn(tableCellPaddingClassName, 'text-left font-medium')}
                    >
                      Prop
                    </th>
                    <th
                      scope="col"
                      className={cn(tableCellPaddingClassName, 'text-left font-medium')}
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className={cn(tableCellPaddingClassName, 'text-left font-medium')}
                    >
                      Default
                    </th>
                    <th
                      scope="col"
                      className={cn(tableCellPaddingClassName, 'text-left font-medium')}
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.map((row) => (
                    <tr key={row.name} className="border-t border-border align-top">
                      <td
                        className={cn(
                          tableCellPaddingClassName,
                          'whitespace-nowrap font-mono text-xs text-foreground',
                        )}
                      >
                        {row.name}
                      </td>
                      <td
                        className={cn(
                          tableCellPaddingClassName,
                          'font-mono text-xs text-muted-foreground',
                        )}
                      >
                        {row.type}
                      </td>
                      <td
                        className={cn(
                          tableCellPaddingClassName,
                          'whitespace-nowrap font-mono text-xs text-muted-foreground',
                        )}
                      >
                        {row.default ?? '—'}
                      </td>
                      <td
                        className={cn(tableCellPaddingClassName, 'text-sm text-muted-foreground')}
                      >
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {hasTokens ? (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {tokensTitle}
            </p>
            <ul className="space-y-1.5 rounded-md border border-border bg-muted/20 p-3 text-sm">
              {tokens.map((token) => (
                <li key={token.name} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <code className="font-mono text-xs text-foreground sm:min-w-[14rem]">
                    {token.name}
                  </code>
                  {token.description ? (
                    <span className="text-sm text-muted-foreground">{token.description}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    );
  },
);
ComponentApi.displayName = 'ComponentApi';
