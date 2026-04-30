import React from "react";
import { clsx } from "clsx";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            "bg-fleer-border/50 animate-pulse rounded-lg",
            className
          )}
        />
      ))}
    </>
  );
}

export function AlertRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-fleer-border last:border-0">
      <Skeleton className="w-10 h-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2 min-w-0">
        <Skeleton className="w-1/3 h-4 rounded" />
        <Skeleton className="w-1/4 h-3 rounded" />
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <Skeleton className="w-16 h-5 rounded-full" />
        <Skeleton className="w-12 h-3 rounded" />
      </div>
    </div>
  );
}
