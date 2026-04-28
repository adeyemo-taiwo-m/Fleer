import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-[#111827] border border-[#1E2D42] flex items-center justify-center text-3xl mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-[#E2E8F0] text-base mb-1">{title}</h3>
      {description && <p className="text-sm text-[#64748B] max-w-xs">{description}</p>}
      {action && (
        <Button variant="primary" className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
