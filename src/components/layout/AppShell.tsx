import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface AppShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  isLive?: boolean;
  topBarActions?: React.ReactNode;
  orgName?: string;
  userEmail?: string;
  unreadAlerts?: number;
  onLogout?: () => void;
}

export function AppShell({
  children, title, subtitle, isLive, topBarActions,
  orgName = 'Fleer Demo', userEmail = 'demo@fleer.ng', unreadAlerts, onLogout
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <Sidebar
        orgName={orgName}
        userEmail={userEmail}
        unreadAlerts={unreadAlerts}
        onLogout={onLogout}
      />
      <TopBar
        title={title}
        subtitle={subtitle}
        isLive={isLive}
        actions={topBarActions}
      />
      <main className="ml-60 mt-14 p-6 min-h-[calc(100vh-3.5rem)]">
        {children}
      </main>
    </div>
  );
}
