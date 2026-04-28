'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Map, LayoutDashboard, Truck, Users, Bell, BarChart3,
  Settings, LogOut, Zap
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/map',       label: 'Live Map',  icon: Map },
  { path: '/vehicles',  label: 'Vehicles',  icon: Truck },
  { path: '/drivers',   label: 'Drivers',   icon: Users },
  { path: '/alerts',    label: 'Alerts',    icon: Bell },
  { path: '/reports',   label: 'Reports',   icon: BarChart3 },
];

interface SidebarProps {
  orgName: string;
  userEmail: string;
  unreadAlerts?: number;
  onLogout?: () => void;
}

export function Sidebar({ orgName, userEmail, unreadAlerts = 0, onLogout }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-fleer-surface border-r border-fleer-border flex flex-col z-30">
      
      {/* Logo Area */}
      <div className="h-14 flex items-center gap-3 px-6 border-b border-fleer-border">
        <div className="w-8 h-8 rounded-lg bg-fleer-accent flex items-center justify-center shadow-accent">
          <Zap size={16} className="text-fleer-bg" fill="currentColor" />
        </div>
        <span className="font-display font-bold text-base text-fleer-text tracking-tight uppercase">Fleer</span>
      </div>

      {/* Nav Section */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1 overflow-y-auto">
        <p className="px-3 mb-2 text-[11px] text-fleer-text-dim font-display font-medium uppercase tracking-wider">
          Operations
        </p>
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = pathname === path || (path !== '/dashboard' && pathname.startsWith(path));
          const hasAlert = label === 'Alerts' && unreadAlerts > 0;
          
          return (
            <Link
              key={path}
              href={path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg font-display text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-fleer-accent/10 text-fleer-accent border-l-2 border-l-fleer-accent pl-[10px]'
                  : 'text-fleer-text-muted hover:text-fleer-text hover:bg-fleer-card'
              )}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {hasAlert && (
                <span className="bg-fleer-danger text-white text-[10px] font-bold h-[18px] min-w-[18px] rounded-full flex items-center justify-center px-1">
                  {unreadAlerts > 9 ? '9+' : unreadAlerts}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-5 border-t border-fleer-border bg-fleer-bg/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent text-sm font-bold font-display shrink-0 border border-fleer-accent/20">
            {orgName ? orgName.charAt(0).toUpperCase() : 'F'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-display font-semibold text-fleer-text truncate">{orgName || 'Fleer Demo'}</p>
            <p className="text-[11px] font-body text-fleer-text-muted truncate">{userEmail || 'demo@fleer.ng'}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 h-9 text-xs font-display font-medium text-fleer-text-muted rounded-lg border border-fleer-border hover:border-fleer-accent/50 hover:text-fleer-text transition-all">
            <Settings size={14} />
            Settings
          </button>
          <button
            onClick={onLogout}
            className="w-9 h-9 flex items-center justify-center text-fleer-text-muted rounded-lg border border-fleer-border hover:bg-fleer-danger/10 hover:text-fleer-danger hover:border-fleer-danger/20 transition-all"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
