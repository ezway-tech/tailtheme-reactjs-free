import * as React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

/** Direction of the trend pill / arrow next to the KPI value. */
export type StatTrend = 'up' | 'down' | 'neutral';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short field name shown above the value (e.g. "Revenue"). */
  label: React.ReactNode;
  /** Big formatted KPI value (e.g. "$12,480"). */
  value: React.ReactNode;
  /** Optional caption under the value (e.g. "vs last week"). */
  caption?: React.ReactNode;
  /**
   * Trend pill — pass a delta string (e.g. "+12.4%") and a direction.
   * Direction defaults to `'neutral'` and controls the icon + color.
   */
  delta?: React.ReactNode;
  /** Trend direction. Drives icon and color. Default `'neutral'`. */
  trend?: StatTrend;
  /** Optional icon shown in a subtle pill in the top-right corner. */
  icon?: LucideIcon;
  /** Numeric series for an inline sparkline. Omit to hide the chart. */
  sparkline?: number[];
  /** Tint of the sparkline stroke and fill. Default mirrors the trend. */
  sparklineTone?: StatTrend;
}

/**
 * Single KPI tile with label, value, optional trend pill, icon and a small
 * inline sparkline. Compose multiple `StatCard`s in a CSS grid to build a
 * dashboard summary row.
 */
export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      label,
      value,
      caption,
      delta,
      trend = 'neutral',
      icon: Icon,
      sparkline,
      sparklineTone,
      className,
      ...rest
    },
    ref,
  ) => {
    const trendStyles = TREND_STYLES[trend];
    const TrendIcon = TREND_ICONS[trend];
    const tone = sparklineTone ?? trend;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm',
          className,
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {Icon ? (
            <span className="rounded-md bg-muted p-1.5 text-muted-foreground" aria-hidden>
              <Icon className="h-4 w-4" />
            </span>
          ) : null}
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          <div className="flex flex-wrap items-center gap-2">
            {delta !== undefined ? (
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                  trendStyles,
                )}
              >
                <TrendIcon className="h-3 w-3" aria-hidden />
                {delta}
              </span>
            ) : null}
            {caption ? <span className="text-xs text-muted-foreground">{caption}</span> : null}
          </div>
        </div>
        {sparkline && sparkline.length > 1 ? (
          <Sparkline points={sparkline} tone={tone} className="-mb-1 h-10 w-full" />
        ) : null}
      </div>
    );
  },
);
StatCard.displayName = 'StatCard';

const TREND_STYLES: Record<StatTrend, string> = {
  up: 'bg-success-bg text-success-text',
  down: 'bg-danger-bg text-danger-text',
  neutral: 'bg-muted text-muted-foreground',
};

const TREND_ICONS: Record<StatTrend, LucideIcon> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus,
};

const SPARK_STROKES: Record<StatTrend, string> = {
  up: 'stroke-success-text',
  down: 'stroke-danger-text',
  neutral: 'stroke-muted-foreground',
};

const SPARK_FILLS: Record<StatTrend, string> = {
  up: 'fill-success-text/15',
  down: 'fill-danger-text/15',
  neutral: 'fill-muted-foreground/15',
};

interface SparklineProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'points'> {
  /** Series of Y-values, oldest first. */
  points: number[];
  /** Color tone — mirrors the StatCard trend system. */
  tone?: StatTrend;
}

/**
 * Tiny SVG sparkline. Draws a polyline plus a soft area fill scaled to the
 * series' min / max. Designed for inline use inside KPI cards — not for
 * full charts (use Recharts for those).
 */
export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  ({ points, tone = 'neutral', className, ...rest }, ref) => {
    const width = 120;
    const height = 32;
    const padding = 2;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const span = max - min || 1;
    const stepX = (width - padding * 2) / Math.max(1, points.length - 1);
    const coords = points.map((value, index) => {
      const x = padding + index * stepX;
      const y = padding + (height - padding * 2) * (1 - (value - min) / span);
      return [x, y] as const;
    });

    const linePath = coords
      .map(([x, y], idx) => `${idx === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
      .join(' ');
    const areaPath = `${linePath} L${coords[coords.length - 1]?.[0].toFixed(2)},${
      height - padding
    } L${coords[0]?.[0].toFixed(2)},${height - padding} Z`;

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className={cn('text-muted-foreground', className)}
        aria-hidden
        {...rest}
      >
        <path d={areaPath} className={cn('stroke-none', SPARK_FILLS[tone])} />
        <path
          d={linePath}
          className={cn('fill-none', SPARK_STROKES[tone])}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);
Sparkline.displayName = 'Sparkline';
