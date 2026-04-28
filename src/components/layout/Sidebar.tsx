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
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#111827] border-r border-[#1E2D42] flex flex-col z-30">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#1E2D42]">
        <div className="w-8 h-8 rounded-lg bg-[#00C896] flex items-center justify-center shadow-[0_0_20px_rgba(0,200,150,0.3)]">
          <Zap size={16} className="text-[#0A0E1A]" fill="currentColor" />
        </div>
        <div>
          <span className="font-bold text-[#E2E8F0] text-base tracking-tight">Fleer</span>
          <p className="text-[#64748B] text-xs leading-none mt-0.5">Fleet Intelligence</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
          const hasAlert = label === 'Alerts' && unreadAlerts > 0;
          return (
            <Link
              key={path}
              href={path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-[#00C896]/10 text-[#00C896] border-l-2 border-[#00C896] pl-[10px]'
                  : 'text-[#64748B] hover:text-[#E2E8F0] hover:bg-[#1A2235]'
              )}
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {hasAlert && (
                <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadAlerts > 9 ? '9+' : unreadAlerts}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: User + Org */}
      <div className="border-t border-[#1E2D42] px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#00C896]/20 flex items-center justify-center text-[#00C896] text-xs font-bold">
            {orgName ? orgName.charAt(0).toUpperCase() : 'F'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#E2E8F0] truncate">{orgName || 'Fleer Demo'}</p>
            <p className="text-xs text-[#64748B] truncate">{userEmail || 'demo@fleer.ng'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 text-xs text-[#64748B] hover:text-[#E2E8F0] py-1.5 rounded-lg hover:bg-[#1A2235] transition-colors">
            <Settings size={13} />
            Settings
          </button>
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-1.5 text-xs text-[#64748B] hover:text-red-400 py-1.5 px-2 rounded-lg hover:bg-red-500/5 transition-colors"
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
