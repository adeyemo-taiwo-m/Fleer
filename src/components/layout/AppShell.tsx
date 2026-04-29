"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AppShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  isLive?: boolean;
  topBarActions?: React.ReactNode;
  orgName: string;
  userEmail: string;
  unreadAlerts?: number;
  onLogout: () => void;
}

export function AppShell({
  children,
  title,
  subtitle,
  isLive,
  topBarActions,
  orgName,
  userEmail,
  unreadAlerts,
  onLogout,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-fleer-bg flex">
      <Sidebar
        orgName={orgName}
        userEmail={userEmail}
        unreadAlerts={unreadAlerts}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col">
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
    </div>
  );
}
