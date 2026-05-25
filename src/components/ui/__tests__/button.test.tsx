import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, buttonVariants } from '../button';

describe('Button', () => {
  it('renders every variant without crashing', () => {
    const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;
    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole('button', { name: variant })).toBeInTheDocument();
      unmount();
    }
  });

  it('renders every size without crashing', () => {
    const sizes = ['sm', 'default', 'lg', 'icon'] as const;
    for (const size of sizes) {
      const { unmount } = render(<Button size={size}>{size}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      unmount();
    }
  });

  it('fires onClick when clicked', async () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const handler = vi.fn();
    render(
      <Button onClick={handler} disabled>
        click
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('blocks click and hides right icon when loading', async () => {
    const handler = vi.fn();
    render(
      <Button onClick={handler} loading rightIcon={<span data-testid="right" />}>
        submit
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.queryByTestId('right')).not.toBeInTheDocument();
    await userEvent.click(button);
    expect(handler).not.toHaveBeenCalled();
  });

  it('renders asChild as the provided element', () => {
    render(
      <Button asChild>
        <a href="/docs">link</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'link' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('exposes buttonVariants class helper', () => {
    const cls = buttonVariants({ variant: 'outline', size: 'sm' });
    expect(cls).toContain('border');
    expect(cls).toContain('h-8');
  });
});
