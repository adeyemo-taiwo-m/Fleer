'use client';

import React, { useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useOrganization } from '@/hooks/useOrganization';
import { useAlerts } from '@/hooks/useAlerts';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { org, user, logout, isLoading } = useOrganization();
  const { unread } = useAlerts();
  const router = useRouter();

  // Handle logout
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  useEffect(() => {
    if (!isLoading && !user && localStorage.getItem('fleer_demo_mode') !== 'true') {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1E2D42] border-t-[#00C896] rounded-full animate-spin" />
      </div>
    );
  }

  // Note: We could redirect to /login here if !user, 
  // but let's keep it simple for now as per instructions.

  return (
    <AppShell
      title="" // Title will be set by pages via a context or we can pass it down
      orgName={org?.name}
      userEmail={user?.email}
      unreadAlerts={unread}
      onLogout={handleLogout}
    >
      {children}
    </AppShell>
  );
}
