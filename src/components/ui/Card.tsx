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
        'bg-fleer-card rounded-xl border border-fleer-border shadow-card transition-all duration-200',
        accent && 'border-l-2 border-l-fleer-accent',
        onClick && 'cursor-pointer hover:border-fleer-accent/50 hover:shadow-card-hover hover:-translate-y-[2px]',
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
    <div className="flex items-start justify-between px-5 py-4 border-b border-fleer-border">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-fleer-accent/10 flex items-center justify-center text-fleer-accent shrink-0 border border-fleer-accent/10">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-display font-semibold text-fleer-text text-sm leading-tight tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="font-display text-[11px] text-fleer-text-muted mt-1 font-medium uppercase tracking-wider">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="ml-4 shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('p-5', className)}>{children}</div>;
}
