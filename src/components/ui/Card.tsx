import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, accent, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-[var(--bg-card)] rounded-[var(--radius-xl)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] transition-all duration-200',
        accent && 'border-l-2 border-l-[var(--accent-green)]',
        onClick && 'cursor-pointer hover:border-[var(--border-default)] hover:bg-[var(--bg-card-hover)] hover:shadow-[var(--shadow-card-hover)]',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, icon }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between px-[var(--space-5)] py-[var(--space-4)] border-b border-[var(--border-subtle)]">
      <div className="flex items-center gap-[var(--space-3)]">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-green-dim)] flex items-center justify-center text-[var(--accent-green)]">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-bold text-[var(--text-base)] text-[var(--text-primary)] leading-none tracking-tight">{title}</h3>
          {subtitle && <p className="text-[var(--text-xs)] text-[var(--text-secondary)] mt-1.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="ml-4 shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('p-[var(--space-6)]', className)}>{children}</div>;
}
