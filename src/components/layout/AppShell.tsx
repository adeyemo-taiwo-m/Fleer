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
  const { org, user, logout } = useOrganization();

  return (
    <div className="min-h-screen bg-fleer-bg flex font-body">
      <Sidebar 
        orgName={org?.name || ''} 
        userEmail={user?.email || ''} 
        unreadAlerts={unreadAlerts}
        onLogout={logout}
      />
      
      <main className="flex-1 ml-60 min-h-screen flex flex-col mt-14">
        <div className="w-full max-w-[1400px] mx-auto p-6 flex-1">
          {children}
        </div>
      </main>

      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1A2235',
            color: '#E2E8F0',
            border: '1px solid #1E2D42',
            borderRadius: '12px',
            fontFamily: 'DM Sans',
            fontSize: '13px',
          },
          error: {
            style: { borderLeft: '3px solid #EF4444' },
          },
        }}
      />
    </div>
  );
}
