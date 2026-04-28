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
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-[#111827] border-r border-[var(--border-subtle)] flex flex-col z-30">
      
      {/* Logo Area */}
      <div className="h-[56px] flex items-center gap-[var(--space-3)] px-[var(--space-4)] border-b border-[var(--border-subtle)]">
        <div className="w-8 h-8 rounded-lg bg-[var(--accent-green)] flex items-center justify-center shadow-[0_0_12px_rgba(0,229,160,0.25)]">
          <Zap size={16} className="text-[#0d1117]" fill="currentColor" />
        </div>
        <span className="font-display font-extrabold text-[var(--text-xl)] text-[var(--text-primary)] tracking-tight">Fleer</span>
      </div>

      {/* Nav Section */}
      <nav className="flex-1 px-[var(--space-3)] py-[var(--space-6)] flex flex-col gap-[var(--space-1)] overflow-y-auto">
        <p className="px-[var(--space-3)] mb-[var(--space-2)] text-[var(--text-xs)] text-[var(--text-muted)] font-bold uppercase tracking-[0.08em]">
          Menu
        </p>
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = pathname === path || (path !== '/dashboard' && pathname.startsWith(path));
          const hasAlert = label === 'Alerts' && unreadAlerts > 0;
          
          return (
            <Link
              key={path}
              href={path}
              className={clsx(
                'flex items-center gap-[var(--space-3)] px-[var(--space-3)] h-[36px] rounded-[var(--radius-md)] transition-all duration-200',
                isActive
                  ? 'bg-[var(--accent-green-dim)] text-[var(--accent-green)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)]'
              )}
            >
              <Icon size={16} />
              <span className="text-[var(--text-sm)] flex-1">{label}</span>
              {hasAlert && (
                <span className="bg-[var(--accent-red)] text-white text-[10px] font-bold h-[18px] min-w-[18px] rounded-full flex items-center justify-center px-1">
                  {unreadAlerts > 9 ? '9+' : unreadAlerts}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="p-[var(--space-4)] border-t border-[var(--border-subtle)] bg-black/10">
        <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-4)]">
          <div className="w-8 h-8 rounded-full bg-[var(--accent-green-dim)] flex items-center justify-center text-[var(--accent-green)] text-[var(--text-sm)] font-bold border border-[var(--accent-green)]/20">
            {orgName ? orgName.charAt(0).toUpperCase() : 'F'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[var(--text-xs)] font-bold text-[var(--text-primary)] truncate">{orgName || 'Fleer Demo'}</p>
            <p className="text-[10px] text-[var(--text-muted)] truncate">{userEmail || 'demo@fleer.ng'}</p>
          </div>
        </div>
        
        <div className="flex gap-[var(--space-2)]">
          <button className="flex-1 flex items-center justify-center gap-[var(--space-2)] h-[32px] text-[var(--text-xs)] font-medium text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-white/5 hover:text-[var(--text-primary)] transition-colors">
            <Settings size={14} />
            Settings
          </button>
          <button
            onClick={onLogout}
            className="w-[32px] h-[32px] flex items-center justify-center text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-[var(--accent-red)]/10 hover:text-[var(--accent-red)] transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
