"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useOrganization } from "@/hooks/useOrganization";
import { 
  User, Building, Bell, Shield, CreditCard, 
  Save, Mail, Phone, MapPin, Globe, Check
} from "lucide-react";
import toast from "react-hot-toast";

type SettingsTab = "profile" | "organization" | "notifications" | "security" | "billing";

export default function SettingsPage() {
  const { org, user, logout } = useOrganization();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 1500);
  };

  const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "organization", label: "Organization", icon: Building },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <AppShell
      title="Settings"
      subtitle="Manage your account and preferences"
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      onLogout={logout}
      topBarActions={
        <Button 
          variant="primary" 
          size="sm" 
          icon={<Save size={14} />} 
          loading={isSaving}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      }
    >
      <div className="flex gap-6">
        {/* Navigation Sidebar (Local) */}
        <div className="w-64 shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-display text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-fleer-accent/10 text-fleer-accent border-r-2 border-fleer-accent pr-[14px]"
                    : "text-fleer-text-muted hover:text-fleer-text hover:bg-fleer-surface"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === "profile" && (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-500">
              <CardHeader 
                title="User Profile" 
                subtitle="Your personal information and account details"
              />
              <CardBody className="space-y-6">
                <div className="flex items-center gap-6 pb-6 border-b border-fleer-border">
                  <div className="w-20 h-20 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent text-2xl font-bold font-display border-2 border-fleer-accent/20">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <Button variant="secondary" size="sm">Change Avatar</Button>
                    <p className="text-xs text-fleer-text-muted mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-fleer-text-dim" size={16} />
                      <input 
                        type="text" 
                        defaultValue="Admin User"
                        className="w-full bg-fleer-surface border border-fleer-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-fleer-text focus:border-fleer-accent/50 transition-colors outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-fleer-text-dim" size={16} />
                      <input 
                        type="email" 
                        defaultValue={user?.email || ""}
                        className="w-full bg-fleer-surface border border-fleer-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-fleer-text focus:border-fleer-accent/50 transition-colors outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-fleer-text-dim" size={16} />
                      <input 
                        type="tel" 
                        defaultValue="+234 800 123 4567"
                        className="w-full bg-fleer-surface border border-fleer-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-fleer-text focus:border-fleer-accent/50 transition-colors outline-none"
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {activeTab === "organization" && (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-500">
              <CardHeader 
                title="Organization Settings" 
                subtitle="Company profile and fleet configuration"
              />
              <CardBody className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider">Organization Name</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-fleer-text-dim" size={16} />
                      <input 
                        type="text" 
                        defaultValue={org?.name || "Fleer Logistics"}
                        className="w-full bg-fleer-surface border border-fleer-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-fleer-text focus:border-fleer-accent/50 transition-colors outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider">Fleet Size</label>
                    <input 
                      type="number" 
                      defaultValue="45"
                      className="w-full bg-fleer-surface border border-fleer-border rounded-xl py-2.5 px-4 text-sm text-fleer-text focus:border-fleer-accent/50 transition-colors outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider">Default Region</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-fleer-text-dim" size={16} />
                      <input 
                        type="text" 
                        defaultValue="Lagos, Nigeria"
                        className="w-full bg-fleer-surface border border-fleer-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-fleer-text focus:border-fleer-accent/50 transition-colors outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-fleer-border">
                  <h4 className="text-sm font-display font-semibold text-fleer-text mb-4">Currency & Units</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider">Base Currency</label>
                      <select className="w-full bg-fleer-surface border border-fleer-border rounded-xl py-2.5 px-4 text-sm text-fleer-text outline-none">
                        <option>NGN - Naira</option>
                        <option>USD - US Dollar</option>
                        <option>GBP - British Pound</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider">Distance Unit</label>
                      <select className="w-full bg-fleer-surface border border-fleer-border rounded-xl py-2.5 px-4 text-sm text-fleer-text outline-none">
                        <option>Kilometers (km)</option>
                        <option>Miles (mi)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-500">
              <CardHeader 
                title="Notification Channels" 
                subtitle="Control how and when you receive alerts"
              />
              <CardBody className="space-y-6">
                {[
                  { title: "Anomaly Detection", desc: "Receive alerts for suspicious fuel drops or route deviations.", enabled: true },
                  { title: "Maintenance Reminders", desc: "Get notified when vehicles are due for servicing.", enabled: true },
                  { title: "Financial Reports", desc: "Receive weekly PDF summaries of your fleet's financial health.", enabled: false },
                  { title: "Security Alerts", desc: "Notifications for login attempts from new devices.", enabled: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-fleer-border last:border-0">
                    <div className="flex-1 pr-8">
                      <h4 className="text-sm font-display font-medium text-fleer-text">{item.title}</h4>
                      <p className="text-xs text-fleer-text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${item.enabled ? "bg-fleer-accent" : "bg-fleer-surface border border-fleer-border"}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${item.enabled ? "translate-x-6" : "translate-x-0"}`} />
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          {activeTab === "billing" && (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-500">
              <CardHeader 
                title="Subscription & Billing" 
                subtitle="Manage your plan and payment methods"
              />
              <CardBody className="space-y-6">
                <div className="bg-fleer-accent/5 border border-fleer-accent/20 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-display font-bold text-fleer-accent uppercase tracking-widest px-2 py-0.5 bg-fleer-accent/10 rounded-md">Enterprise Plan</span>
                    <h3 className="text-xl font-display font-bold text-fleer-text mt-2">Professional Fleet Analytics</h3>
                    <p className="text-sm text-fleer-text-muted mt-1">Next renewal: May 24, 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-display font-bold text-fleer-text">₦450,000</p>
                    <p className="text-xs text-fleer-text-muted">per year</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-display font-semibold text-fleer-text uppercase tracking-wider">Payment Methods</h4>
                  <div className="flex items-center gap-4 p-4 border border-fleer-border rounded-xl bg-fleer-surface/50">
                    <div className="w-10 h-7 bg-fleer-card border border-fleer-border rounded flex items-center justify-center font-bold text-[10px] text-fleer-text-dim italic">VISA</div>
                    <div className="flex-1">
                      <p className="text-sm font-display font-medium text-fleer-text">Visa ending in 4242</p>
                      <p className="text-xs text-fleer-text-muted">Expiry: 12/28</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}
