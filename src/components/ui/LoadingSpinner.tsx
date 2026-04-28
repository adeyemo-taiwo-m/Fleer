import React from 'react';

interface LoadingSpinnerProps { size?: 'sm' | 'md' | 'lg'; label?: string; }

export function LoadingSpinner({ size = 'md', label }: LoadingSpinnerProps) {
  const sizeClass = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }[size];
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className={`${sizeClass} border-2 border-[#1E2D42] border-t-[#00C896] rounded-full animate-spin`} />
      {label && <p className="text-sm text-[#64748B]">{label}</p>}
    </div>
  );
}
