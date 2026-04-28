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
        'bg-[#1A2235] rounded-xl border border-[#1E2D42] shadow-[0_1px_3px_rgba(0,0,0,0.4),0_0_0_1px_rgba(30,45,66,0.8)]',
        accent && 'border-l-2 border-l-[#00C896]',
        onClick && 'cursor-pointer hover:border-[#00C896]/50 transition-colors duration-200',
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
    <div className="flex items-start justify-between px-5 py-4 border-b border-[#1E2D42]">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-[#00C896]/10 flex items-center justify-center text-[#00C896]">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-[#E2E8F0] text-sm">{title}</h3>
          {subtitle && <p className="text-[#64748B] text-xs mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('p-5', className)}>{children}</div>;
}
