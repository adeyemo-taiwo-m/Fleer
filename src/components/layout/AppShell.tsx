'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { useOrganization } from '@/hooks/useOrganization';
import { Toaster } from 'react-hot-toast';

interface AppShellProps {
  children: React.ReactNode;
  unreadAlerts?: number;
}

export function AppShell({ children, unreadAlerts = 0 }: AppShellProps) {
  const { organization, user, logout } = useOrganization();

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex selection:bg-[var(--accent-green)]/30">
      <Sidebar 
        orgName={organization?.name || ''} 
        userEmail={user?.email || ''} 
        unreadAlerts={unreadAlerts}
        onLogout={logout}
      />
      
      <main className="flex-1 ml-[220px] min-h-screen flex flex-col">
        <div className="w-full max-w-[1400px] mx-auto p-[var(--space-8)] flex-1">
          {children}
        </div>
      </main>

      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
            fontSize: 'var(--text-sm)',
            borderRadius: 'var(--radius-md)',
          },
        }}
      />
    </div>
  );
}
