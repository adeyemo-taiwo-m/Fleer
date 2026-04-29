# FLEER — Frontend Build Instructions

### Complete Step-by-Step Guide for the MVP Dashboard

**Version:** 1.0 | **Stack:** React + Leaflet.js + Supabase + Socket.IO | **Target:** MVP in 30 Days

---

## HOW TO USE THIS DOCUMENT

This file is your single source of truth for building the entire Fleer frontend. Every step is atomic — meaning each instruction is one action. Hand this to your AI code editor and it can build each section independently.

**Reading Order:**

1. Read Section 0 (Project Setup) first — do this before writing any component code
2. Work through Sections 1–9 in order
3. Each section has a "Checkpoint" — don't move to the next section until it passes
4. Every component spec includes: what it looks like, what data it needs, what it does

---

## SECTION 0 — PROJECT SETUP & DESIGN SYSTEM

### 0.1 — Initialize the Project

**Step 1:** Open your terminal and run:

```bash
npx create-react-app fleer-dashboard --template typescript
cd fleer-dashboard
```

**Step 2:** Install all dependencies in one command:

```bash
npm install \
  @supabase/supabase-js \
  socket.io-client \
  leaflet \
  react-leaflet \
  @types/leaflet \
  react-router-dom \
  @types/react-router-dom \
  recharts \
  date-fns \
  axios \
  react-hot-toast \
  lucide-react \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-tabs \
  @radix-ui/react-badge \
  clsx \
  tailwind-merge
```

**Step 3:** Install and initialize Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Step 4:** Replace the contents of `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fleer: {
          bg: "#0A0E1A",
          surface: "#111827",
          card: "#1A2235",
          border: "#1E2D42",
          accent: "#00C896",
          "accent-dim": "#00C89620",
          warning: "#F59E0B",
          danger: "#EF4444",
          info: "#3B82F6",
          text: "#E2E8F0",
          "text-muted": "#64748B",
          "text-dim": "#334155",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(30,45,66,0.8)",
        accent: "0 0 20px rgba(0, 200, 150, 0.15)",
        danger: "0 0 20px rgba(239, 68, 68, 0.15)",
      },
    },
  },
  plugins: [],
};
```

**Step 5:** Replace the contents of `src/index.css` with:

```css
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

body {
  background-color: #0a0e1a;
  color: #e2e8f0;
  font-family: "DM Sans", sans-serif;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #111827;
}
::-webkit-scrollbar-thumb {
  background: #1e2d42;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #334155;
}

/* Leaflet map overrides */
.leaflet-container {
  background: #0a0e1a !important;
  font-family: "DM Sans", sans-serif;
}
.leaflet-tile {
  filter: brightness(0.85) saturate(0.7) hue-rotate(180deg) invert(1);
}

/* Pulse animation for live indicators */
@keyframes pulse-green {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
.pulse-green {
  animation: pulse-green 2s ease-in-out infinite;
}

/* Slide-in animation for alerts */
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.slide-in {
  animation: slide-in-right 0.3s ease-out;
}
```

---

### 0.2 — Project File Structure

**Step 6:** Create this exact folder structure inside `src/`:

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── AppShell.tsx
│   ├── map/
│   │   ├── FleetMap.tsx
│   │   ├── VehicleMarker.tsx
│   │   └── RouteOverlay.tsx
│   ├── fleet/
│   │   ├── FleetSummaryBar.tsx
│   │   ├── VehicleCard.tsx
│   │   ├── VehicleList.tsx
│   │   └── VehicleDetailPanel.tsx
│   ├── alerts/
│   │   ├── AlertsLog.tsx
│   │   ├── AlertBadge.tsx
│   │   └── AlertToast.tsx
│   ├── drivers/
│   │   ├── DriverScorecard.tsx
│   │   └── DriverLeaderboard.tsx
│   ├── reports/
│   │   ├── FinancialReport.tsx
│   │   ├── SavingsChart.tsx
│   │   └── FuelReconciliation.tsx
│   ├── onboarding/
│   │   ├── OnboardingWizard.tsx
│   │   ├── AddVehicleForm.tsx
│   │   └── SetRouteForm.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── Button.tsx
│       ├── Stat.tsx
│       ├── LoadingSpinner.tsx
│       └── EmptyState.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── LiveMap.tsx
│   ├── Vehicles.tsx
│   ├── VehicleDetail.tsx
│   ├── Drivers.tsx
│   ├── Alerts.tsx
│   ├── Reports.tsx
│   ├── Onboarding.tsx
│   └── Login.tsx
├── hooks/
│   ├── useVehicles.ts
│   ├── useAlerts.ts
│   ├── useDrivers.ts
│   ├── useSocket.ts
│   └── useOrganization.ts
├── lib/
│   ├── supabase.ts
│   ├── socket.ts
│   └── formatters.ts
├── types/
│   └── index.ts
├── constants/
│   └── index.ts
└── App.tsx
```

**Step 7:** Create each folder using:

```bash
mkdir -p src/components/{layout,map,fleet,alerts,drivers,reports,onboarding,ui}
mkdir -p src/{pages,hooks,lib,types,constants}
```

---

### 0.3 — TypeScript Types

**Step 8:** Create `src/types/index.ts` with this content:

```typescript
// ─── Organization ───────────────────────────────────────────────
export interface Organization {
  id: string;
  name: string;
  plan: "starter" | "professional" | "enterprise";
  created_at: string;
}

// ─── Vehicle ─────────────────────────────────────────────────────
export type VehicleStatus =
  | "on_route"
  | "anomaly"
  | "alert"
  | "idle"
  | "offline";

export interface Vehicle {
  id: string;
  org_id: string;
  plate: string;
  type: "truck" | "van" | "trailer" | "bus";
  fuel_capacity: number; // litres
  efficiency_baseline: number; // km/litre
  status: VehicleStatus;
  current_driver_id?: string;
  last_seen?: string;
  current_lat?: number;
  current_lng?: number;
  current_speed?: number;
  fuel_level?: number; // percentage 0-100
}

// ─── Driver ──────────────────────────────────────────────────────
export interface Driver {
  id: string;
  org_id: string;
  name: string;
  phone: string;
  rfid_tag?: string;
  score: number; // 0-100
  score_breakdown: {
    unauthorized_stops: number;
    fuel_anomalies: number;
    route_compliance: number;
    idle_time: number;
    speed_compliance: number;
  };
  trips_this_week: number;
  anomalies_this_week: number;
}

// ─── Trip ────────────────────────────────────────────────────────
export interface Trip {
  id: string;
  vehicle_id: string;
  driver_id: string;
  start_time: string;
  end_time?: string;
  distance_km: number;
  fuel_expected: number; // litres
  fuel_actual: number; // litres
  fuel_variance: number; // litres (actual - expected = negative = theft suspect)
  status: "active" | "completed";
}

// ─── Position ────────────────────────────────────────────────────
export interface Position {
  id: string;
  vehicle_id: string;
  trip_id?: string;
  lat: number;
  lng: number;
  speed: number;
  timestamp: string;
}

// ─── Anomaly / Alert ─────────────────────────────────────────────
export type AnomalyType =
  | "fuel_siphoning"
  | "unauthorized_stop"
  | "route_deviation"
  | "idle_abuse"
  | "refuel_anomaly"
  | "night_movement"
  | "speeding"
  | "geofence_breach";

export type AlertSeverity = "critical" | "warning" | "info";

export interface Anomaly {
  id: string;
  vehicle_id: string;
  vehicle_plate: string;
  driver_name?: string;
  type: AnomalyType;
  severity: AlertSeverity;
  timestamp: string;
  lat?: number;
  lng?: number;
  description: string;
  naira_value?: number; // estimated financial impact
  resolved: boolean;
  resolver_id?: string;
  resolved_at?: string;
}

// ─── Fuel Event ──────────────────────────────────────────────────
export interface FuelEvent {
  id: string;
  vehicle_id: string;
  type: "refuel" | "anomaly" | "drain";
  litres: number;
  naira_value: number;
  timestamp: string;
  lat?: number;
  lng?: number;
}

// ─── Financial Report ────────────────────────────────────────────
export interface WeeklyReport {
  id: string;
  org_id: string;
  period_start: string;
  period_end: string;
  total_fuel_bought_litres: number;
  total_fuel_used_litres: number;
  variance_litres: number;
  variance_naira: number;
  anomaly_count: number;
  estimated_savings: number;
  top_offending_vehicle?: string;
  pdf_url?: string;
}

// ─── Fleet Summary ───────────────────────────────────────────────
export interface FleetSummary {
  total_vehicles: number;
  active_vehicles: number;
  vehicles_on_route: number;
  vehicles_with_anomaly: number;
  vehicles_offline: number;
  total_distance_today_km: number;
  total_fuel_today_litres: number;
  anomalies_today: number;
  estimated_savings_today_naira: number;
}
```

### 0.4 — Supabase & Socket Setup

**Step 9:** Create `src/lib/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Step 10:** Create `src/lib/socket.ts`:

```typescript
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.REACT_APP_BACKEND_URL!, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
```

**Step 11:** Create `src/lib/formatters.ts`:

```typescript
import { format, formatDistanceToNow } from "date-fns";
import { AnomalyType, AlertSeverity } from "../types";

export const formatNaira = (amount: number): string => {
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}K`;
  return `₦${amount.toLocaleString()}`;
};

export const formatLitres = (litres: number): string => {
  return `${litres.toFixed(1)}L`;
};

export const formatKm = (km: number): string => {
  return `${km.toFixed(0)} km`;
};

export const formatSpeed = (speed: number): string => {
  return `${speed.toFixed(0)} km/h`;
};

export const formatTimestamp = (ts: string): string => {
  return format(new Date(ts), "MMM d, HH:mm");
};

export const formatRelative = (ts: string): string => {
  return formatDistanceToNow(new Date(ts), { addSuffix: true });
};

export const anomalyLabel: Record<AnomalyType, string> = {
  fuel_siphoning: "Fuel Siphoning",
  unauthorized_stop: "Unauthorized Stop",
  route_deviation: "Route Deviation",
  idle_abuse: "Idle Abuse",
  refuel_anomaly: "Refuel Anomaly",
  night_movement: "Night Movement",
  speeding: "Speeding",
  geofence_breach: "Geofence Breach",
};

export const severityColor: Record<AlertSeverity, string> = {
  critical: "text-fleer-danger",
  warning: "text-fleer-warning",
  info: "text-fleer-info",
};

export const severityBg: Record<AlertSeverity, string> = {
  critical: "bg-red-500/10 border border-red-500/20",
  warning: "bg-amber-500/10 border border-amber-500/20",
  info: "bg-blue-500/10 border border-blue-500/20",
};
```

**Step 12:** Create `.env` in the project root:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_BACKEND_URL=http://localhost:3001
```

---

### 0.5 — Constants

**Step 13:** Create `src/constants/index.ts`:

```typescript
export const VEHICLE_STATUS_COLORS = {
  on_route: "#00C896", // green
  anomaly: "#F59E0B", // amber
  alert: "#EF4444", // red
  idle: "#6366F1", // purple
  offline: "#374151", // gray
} as const;

export const VEHICLE_STATUS_LABELS = {
  on_route: "On Route",
  anomaly: "Anomaly",
  alert: "Alert",
  idle: "Idle",
  offline: "Offline",
} as const;

export const SCORE_COLOR = (score: number): string => {
  if (score >= 80) return "#00C896";
  if (score >= 60) return "#F59E0B";
  return "#EF4444";
};

// Lagos bounding box for default map view
export const LAGOS_CENTER: [number, number] = [6.5244, 3.3792];
export const LAGOS_ZOOM = 11;

export const DIESEL_PRICE_PER_LITRE = 1600; // ₦/litre — update as needed

export const ANOMALY_ICONS: Record<string, string> = {
  fuel_siphoning: "⛽",
  unauthorized_stop: "🛑",
  route_deviation: "↗️",
  idle_abuse: "😴",
  refuel_anomaly: "⚠️",
  night_movement: "🌙",
  speeding: "💨",
  geofence_breach: "📍",
};
```

---

**✅ SECTION 0 CHECKPOINT**
Before moving to Section 1, confirm:

- [ ] `npm start` runs without errors
- [ ] Tailwind classes apply (test by adding `className="bg-fleer-bg"` to App.tsx)
- [ ] Folder structure matches exactly what's in Step 6
- [ ] All type files have no TypeScript errors

---

## SECTION 1 — UI PRIMITIVES (Shared Components)

These are the building blocks used everywhere in the app. Build all of these before any page.

---

### 1.1 — Card Component

**File:** `src/components/ui/Card.tsx`

**What it is:** A dark container box used for every panel and section in the app.

**Step 14:** Create `src/components/ui/Card.tsx`:

```tsx
import React from "react";
import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean; // green left border for highlighted cards
  onClick?: () => void;
}

export function Card({ children, className, accent, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-fleer-card rounded-xl border border-fleer-border shadow-card",
        accent && "border-l-2 border-l-fleer-accent",
        onClick &&
          "cursor-pointer hover:border-fleer-accent/50 transition-colors duration-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, icon }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between px-5 py-4 border-b border-fleer-border">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-fleer-accent/10 flex items-center justify-center text-fleer-accent">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-display font-semibold text-fleer-text text-sm">
            {title}
          </h3>
          {subtitle && (
            <p className="text-fleer-text-muted text-xs mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("p-5", className)}>{children}</div>;
}
```

---

### 1.2 — Badge Component

**File:** `src/components/ui/Badge.tsx`

**What it is:** Small colored pill used for status labels (On Route, Anomaly, Critical, etc.)

**Step 15:** Create `src/components/ui/Badge.tsx`:

```tsx
import React from "react";
import { clsx } from "clsx";
import { VehicleStatus, AlertSeverity } from "../../types";

type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "purple";

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  danger: "bg-red-500/10 text-red-400 border border-red-500/20",
  info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  neutral: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
  purple: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
};

export const vehicleStatusVariant: Record<VehicleStatus, BadgeVariant> = {
  on_route: "success",
  anomaly: "warning",
  alert: "danger",
  idle: "purple",
  offline: "neutral",
};

export const severityVariant: Record<AlertSeverity, BadgeVariant> = {
  critical: "danger",
  warning: "warning",
  info: "info",
};

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
  dot?: boolean;
  className?: string;
}

export function Badge({ label, variant, dot, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium font-display",
        variantStyles[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={clsx(
            "w-1.5 h-1.5 rounded-full",
            variant === "success" && "bg-emerald-400 pulse-green",
            variant === "warning" && "bg-amber-400",
            variant === "danger" && "bg-red-400",
            variant === "info" && "bg-blue-400",
            variant === "neutral" && "bg-slate-400",
            variant === "purple" && "bg-indigo-400",
          )}
        />
      )}
      {label}
    </span>
  );
}
```

---

### 1.3 — Button Component

**File:** `src/components/ui/Button.tsx`

**Step 16:** Create `src/components/ui/Button.tsx`:

```tsx
import React from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-fleer-accent text-fleer-bg hover:bg-fleer-accent/90 font-semibold shadow-accent",
  secondary:
    "bg-fleer-surface text-fleer-text border border-fleer-border hover:border-fleer-accent/50",
  danger:
    "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
  ghost: "text-fleer-text-muted hover:text-fleer-text hover:bg-fleer-surface",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-xl",
};

export function Button({
  variant = "secondary",
  size = "md",
  loading,
  icon,
  iconRight,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-display transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-fleer-accent/50",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
      {children}
      {!loading && iconRight}
    </button>
  );
}
```

---

### 1.4 — Stat Component

**File:** `src/components/ui/Stat.tsx`

**What it is:** A single metric display with label, value, and optional trend indicator. Used in the summary bar and financial reports.

**Step 17:** Create `src/components/ui/Stat.tsx`:

```tsx
import React from "react";
import { clsx } from "clsx";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  trendInverse?: boolean; // for costs: "up" is bad (red), "down" is good (green)
  icon?: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

export function Stat({
  label,
  value,
  subValue,
  trend,
  trendLabel,
  trendInverse,
  icon,
  highlight,
  className,
}: StatProps) {
  const trendColor =
    trend === "neutral"
      ? "text-fleer-text-muted"
      : trendInverse
        ? trend === "up"
          ? "text-fleer-danger"
          : "text-fleer-accent"
        : trend === "up"
          ? "text-fleer-accent"
          : "text-fleer-danger";

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div
      className={clsx(
        "flex flex-col gap-1",
        highlight &&
          "bg-fleer-accent/5 rounded-xl p-4 border border-fleer-accent/20",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-fleer-text-muted">{icon}</span>}
        <span className="text-xs font-medium text-fleer-text-muted uppercase tracking-wider font-display">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className={clsx(
            "font-display font-bold tabular-nums",
            highlight
              ? "text-3xl text-fleer-accent"
              : "text-2xl text-fleer-text",
          )}
        >
          {value}
        </span>
        {subValue && (
          <span className="text-sm text-fleer-text-muted">{subValue}</span>
        )}
      </div>
      {trend && trendLabel && (
        <div className={clsx("flex items-center gap-1 text-xs", trendColor)}>
          <TrendIcon size={12} />
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
```

---

### 1.5 — LoadingSpinner & EmptyState

**Step 18:** Create `src/components/ui/LoadingSpinner.tsx`:

```tsx
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function LoadingSpinner({ size = "md", label }: LoadingSpinnerProps) {
  const sizeClass = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" }[size];

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div
        className={`${sizeClass} border-2 border-fleer-border border-t-fleer-accent rounded-full animate-spin`}
      />
      {label && <p className="text-sm text-fleer-text-muted">{label}</p>}
    </div>
  );
}
```

**Step 19:** Create `src/components/ui/EmptyState.tsx`:

```tsx
import React from "react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-fleer-surface border border-fleer-border flex items-center justify-center text-3xl mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-display font-semibold text-fleer-text text-base mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-fleer-text-muted max-w-xs">{description}</p>
      )}
      {action && (
        <Button variant="primary" className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

---

**✅ SECTION 1 CHECKPOINT**

- [ ] All 5 UI primitive components exist and have no TypeScript errors
- [ ] Import each in App.tsx temporarily and check they render without crashing
- [ ] Badge component shows correct colors for each variant

---

## SECTION 2 — APP LAYOUT (Shell, Sidebar, TopBar)

The shell is the outer frame of the entire app. Every page renders inside it.

---

### 2.1 — Sidebar

**File:** `src/components/layout/Sidebar.tsx`

**What it does:** Fixed left navigation with logo, nav items, and logged-in user info at the bottom.

**Visual:** Dark sidebar `#111827`, width 240px, with Fleer logo at top, nav items as icon + label rows, active item has green left accent. Bottom has user avatar and org name.

**Step 20:** Create `src/components/layout/Sidebar.tsx`:

```tsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Map,
  LayoutDashboard,
  Truck,
  Users,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/map", label: "Live Map", icon: Map },
  { path: "/vehicles", label: "Vehicles", icon: Truck },
  { path: "/drivers", label: "Drivers", icon: Users },
  { path: "/alerts", label: "Alerts", icon: Bell },
  { path: "/reports", label: "Reports", icon: BarChart3 },
];

interface SidebarProps {
  orgName: string;
  userEmail: string;
  unreadAlerts?: number;
  onLogout: () => void;
}

export function Sidebar({
  orgName,
  userEmail,
  unreadAlerts = 0,
  onLogout,
}: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-fleer-surface border-r border-fleer-border flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-fleer-border">
        <div className="w-8 h-8 rounded-lg bg-fleer-accent flex items-center justify-center">
          <Zap size={16} className="text-fleer-bg" fill="currentColor" />
        </div>
        <div>
          <span className="font-display font-bold text-fleer-text text-base tracking-tight">
            Fleer
          </span>
          <p className="text-fleer-text-muted text-xs leading-none mt-0.5">
            Fleet Intelligence
          </p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive =
            location.pathname === path ||
            (path !== "/" && location.pathname.startsWith(path));
          const hasAlert = label === "Alerts" && unreadAlerts > 0;

          return (
            <NavLink
              key={path}
              to={path}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-display font-medium transition-all duration-150",
                isActive
                  ? "bg-fleer-accent/10 text-fleer-accent border-l-2 border-fleer-accent pl-[10px]"
                  : "text-fleer-text-muted hover:text-fleer-text hover:bg-fleer-card",
              )}
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {hasAlert && (
                <span className="bg-fleer-danger text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadAlerts > 9 ? "9+" : unreadAlerts}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom: User + Org */}
      <div className="border-t border-fleer-border px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-fleer-accent/20 flex items-center justify-center text-fleer-accent text-xs font-bold font-display">
            {orgName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-fleer-text truncate font-display">
              {orgName}
            </p>
            <p className="text-xs text-fleer-text-muted truncate">
              {userEmail}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 text-xs text-fleer-text-muted hover:text-fleer-text py-1.5 rounded-lg hover:bg-fleer-card transition-colors">
            <Settings size={13} />
            Settings
          </button>
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-1.5 text-xs text-fleer-text-muted hover:text-red-400 py-1.5 px-2 rounded-lg hover:bg-red-500/5 transition-colors"
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
```

---

### 2.2 — TopBar

**File:** `src/components/layout/TopBar.tsx`

**What it does:** Fixed top bar showing current page title, live clock, and a "LIVE" indicator when socket is connected.

**Step 21:** Create `src/components/layout/TopBar.tsx`:

```tsx
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Wifi, WifiOff } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  isLive?: boolean;
  actions?: React.ReactNode;
}

export function TopBar({ title, subtitle, isLive, actions }: TopBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-fleer-bg/95 backdrop-blur-sm border-b border-fleer-border flex items-center px-6 z-20">
      {/* Page Title */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h1 className="font-display font-bold text-fleer-text text-base">
            {title}
          </h1>
          {subtitle && (
            <span className="text-fleer-text-muted text-sm">{subtitle}</span>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Live Indicator */}
        {isLive !== undefined && (
          <div
            className={`flex items-center gap-1.5 text-xs font-display font-medium px-2.5 py-1 rounded-full border ${
              isLive
                ? "text-fleer-accent bg-fleer-accent/10 border-fleer-accent/20"
                : "text-fleer-text-muted bg-fleer-surface border-fleer-border"
            }`}
          >
            {isLive ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-fleer-accent pulse-green" />
                LIVE
              </>
            ) : (
              <>
                <WifiOff size={11} />
                OFFLINE
              </>
            )}
          </div>
        )}

        {/* Clock */}
        <div className="text-right">
          <p className="font-mono text-sm text-fleer-text tabular-nums">
            {format(time, "HH:mm:ss")}
          </p>
          <p className="text-xs text-fleer-text-muted">
            {format(time, "EEE, MMM d")}
          </p>
        </div>

        {/* Custom Actions */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
```

---

### 2.3 — AppShell

**File:** `src/components/layout/AppShell.tsx`

**What it does:** Combines Sidebar + TopBar + main content area. Every page wraps in this.

**Step 22:** Create `src/components/layout/AppShell.tsx`:

```tsx
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
    <div className="min-h-screen bg-fleer-bg">
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
```

---

**✅ SECTION 2 CHECKPOINT**

- [ ] Sidebar renders with all 6 nav items
- [ ] Active nav item has green left border and green text
- [ ] TopBar clock updates every second
- [ ] LIVE badge pulses when `isLive={true}`
- [ ] Main content area starts at correct left offset (ml-60)

---

## SECTION 3 — LIVE MAP PAGE

This is the most critical page — it's what clients will stare at most. Get this right.

---

### 3.1 — Vehicle Marker Component

**File:** `src/components/map/VehicleMarker.tsx`

**What it does:** Custom Leaflet marker for each vehicle. Color-coded dot with plate number tooltip.

**Step 23:** Create `src/components/map/VehicleMarker.tsx`:

```tsx
import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { Vehicle } from "../../types";
import { VEHICLE_STATUS_COLORS, VEHICLE_STATUS_LABELS } from "../../constants";

interface VehicleMarkerProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

function createVehicleIcon(
  status: Vehicle["status"],
  isSelected: boolean,
): L.DivIcon {
  const color = VEHICLE_STATUS_COLORS[status];
  const size = isSelected ? 16 : 12;
  const ring = isSelected ? `box-shadow: 0 0 0 3px ${color}40;` : "";

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 2px solid #0A0E1A;
        border-radius: 50%;
        ${ring}
        transition: all 0.2s;
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export function VehicleMarker({ vehicle, onClick }: VehicleMarkerProps) {
  if (!vehicle.current_lat || !vehicle.current_lng) return null;

  return (
    <Marker
      position={[vehicle.current_lat, vehicle.current_lng]}
      icon={createVehicleIcon(vehicle.status, false)}
      eventHandlers={{ click: () => onClick(vehicle) }}
    >
      <Tooltip
        direction="top"
        offset={[0, -8]}
        opacity={1}
        className="!bg-fleer-card !border-fleer-border !text-fleer-text !rounded-lg !px-2.5 !py-1.5 !shadow-card !text-xs !font-display"
      >
        <div className="font-semibold">{vehicle.plate}</div>
        <div style={{ color: VEHICLE_STATUS_COLORS[vehicle.status] }}>
          {VEHICLE_STATUS_LABELS[vehicle.status]}
        </div>
        {vehicle.current_speed !== undefined && (
          <div className="text-fleer-text-muted">
            {vehicle.current_speed} km/h
          </div>
        )}
      </Tooltip>
    </Marker>
  );
}
```

---

### 3.2 — Fleet Map Component

**File:** `src/components/map/FleetMap.tsx`

**What it does:** The full Leaflet map with all vehicle markers, legend, and filter controls.

**Step 24:** Create `src/components/map/FleetMap.tsx`:

```tsx
import React, { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { VehicleMarker } from "./VehicleMarker";
import { Vehicle, VehicleStatus } from "../../types";
import {
  LAGOS_CENTER,
  LAGOS_ZOOM,
  VEHICLE_STATUS_COLORS,
  VEHICLE_STATUS_LABELS,
} from "../../constants";

interface FleetMapProps {
  vehicles: Vehicle[];
  onVehicleClick: (vehicle: Vehicle) => void;
  height?: string;
}

type FilterStatus = VehicleStatus | "all";

const filterOptions: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "on_route", label: "On Route" },
  { value: "anomaly", label: "Anomaly" },
  { value: "alert", label: "Alert" },
  { value: "idle", label: "Idle" },
  { value: "offline", label: "Offline" },
];

export function FleetMap({
  vehicles,
  onVehicleClick,
  height = "100%",
}: FleetMapProps) {
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filteredVehicles =
    filter === "all" ? vehicles : vehicles.filter((v) => v.status === filter);

  const counts = vehicles.reduce(
    (acc, v) => {
      acc[v.status] = (acc[v.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-fleer-border"
      style={{ height }}
    >
      {/* Filter Bar (overlaid on map) */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-1.5 bg-fleer-card/90 backdrop-blur-sm border border-fleer-border rounded-lg p-1">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-3 py-1 rounded-md text-xs font-display font-medium transition-all duration-150 flex items-center gap-1.5 ${
              filter === opt.value
                ? "bg-fleer-accent text-fleer-bg"
                : "text-fleer-text-muted hover:text-fleer-text"
            }`}
          >
            {opt.value !== "all" && (
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: VEHICLE_STATUS_COLORS[opt.value as VehicleStatus],
                }}
              />
            )}
            {opt.label}
            {opt.value !== "all" && counts[opt.value] !== undefined && (
              <span className="opacity-60">{counts[opt.value]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Vehicle Count (overlaid) */}
      <div className="absolute top-4 right-4 z-[400] bg-fleer-card/90 backdrop-blur-sm border border-fleer-border rounded-lg px-3 py-2">
        <p className="text-xs text-fleer-text-muted font-display">Showing</p>
        <p className="text-lg font-display font-bold text-fleer-text tabular-nums">
          {filteredVehicles.length}
        </p>
        <p className="text-xs text-fleer-text-muted">
          of {vehicles.length} vehicles
        </p>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={LAGOS_CENTER}
        zoom={LAGOS_ZOOM}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ZoomControl position="bottomright" />
        {filteredVehicles.map((vehicle) => (
          <VehicleMarker
            key={vehicle.id}
            vehicle={vehicle}
            onClick={onVehicleClick}
          />
        ))}
      </MapContainer>
    </div>
  );
}
```

---

### 3.3 — Vehicle Detail Panel (Map Sidebar)

**File:** `src/components/fleet/VehicleDetailPanel.tsx`

**What it does:** Slide-out right panel that shows selected vehicle's details — status, current driver, fuel level, recent anomalies.

**Step 25:** Create `src/components/fleet/VehicleDetailPanel.tsx`:

```tsx
import React from "react";
import { X, MapPin, Gauge, Droplets, User, AlertTriangle } from "lucide-react";
import { Vehicle, Driver, Anomaly } from "../../types";
import { Badge, vehicleStatusVariant } from "../ui/Badge";
import {
  VEHICLE_STATUS_LABELS,
  VEHICLE_STATUS_COLORS,
  ANOMALY_ICONS,
} from "../../constants";
import {
  formatRelative,
  formatNaira,
  anomalyLabel,
} from "../../lib/formatters";
import { clsx } from "clsx";

interface VehicleDetailPanelProps {
  vehicle: Vehicle | null;
  driver?: Driver;
  recentAnomalies?: Anomaly[];
  onClose: () => void;
}

function FuelBar({ level }: { level: number }) {
  const color = level > 50 ? "#00C896" : level > 20 ? "#F59E0B" : "#EF4444";
  return (
    <div className="w-full bg-fleer-surface rounded-full h-2 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${level}%`, background: color }}
      />
    </div>
  );
}

export function VehicleDetailPanel({
  vehicle,
  driver,
  recentAnomalies = [],
  onClose,
}: VehicleDetailPanelProps) {
  if (!vehicle) return null;

  const statusColor = VEHICLE_STATUS_COLORS[vehicle.status];

  return (
    <div className="absolute top-4 right-4 bottom-4 w-80 z-[500] bg-fleer-card/95 backdrop-blur-md border border-fleer-border rounded-xl shadow-card flex flex-col overflow-hidden slide-in">
      {/* Panel Header */}
      <div className="flex items-start justify-between px-4 py-4 border-b border-fleer-border">
        <div>
          <h3 className="font-display font-bold text-fleer-text text-base">
            {vehicle.plate}
          </h3>
          <Badge
            label={VEHICLE_STATUS_LABELS[vehicle.status]}
            variant={vehicleStatusVariant[vehicle.status]}
            dot
            className="mt-1"
          />
        </div>
        <button
          onClick={onClose}
          className="text-fleer-text-muted hover:text-fleer-text p-1 rounded-lg hover:bg-fleer-surface transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Fuel Level */}
        {vehicle.fuel_level !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-fleer-text-muted font-display">
                <Droplets size={12} />
                Fuel Level
              </div>
              <span
                className={clsx(
                  "text-sm font-display font-bold tabular-nums",
                  vehicle.fuel_level > 50
                    ? "text-fleer-accent"
                    : vehicle.fuel_level > 20
                      ? "text-fleer-warning"
                      : "text-fleer-danger",
                )}
              >
                {vehicle.fuel_level}%
              </span>
            </div>
            <FuelBar level={vehicle.fuel_level} />
          </div>
        )}

        {/* Speed */}
        {vehicle.current_speed !== undefined && (
          <div className="flex items-center justify-between py-2 border-b border-fleer-border">
            <div className="flex items-center gap-1.5 text-xs text-fleer-text-muted font-display">
              <Gauge size={12} />
              Speed
            </div>
            <span className="font-mono text-sm text-fleer-text">
              {vehicle.current_speed} km/h
            </span>
          </div>
        )}

        {/* Location */}
        {vehicle.current_lat && vehicle.current_lng && (
          <div className="flex items-center justify-between py-2 border-b border-fleer-border">
            <div className="flex items-center gap-1.5 text-xs text-fleer-text-muted font-display">
              <MapPin size={12} />
              Coordinates
            </div>
            <span className="font-mono text-xs text-fleer-text-muted">
              {vehicle.current_lat.toFixed(4)}, {vehicle.current_lng.toFixed(4)}
            </span>
          </div>
        )}

        {/* Driver */}
        {driver && (
          <div className="bg-fleer-surface rounded-lg p-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent text-xs font-bold font-display">
                {driver.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-display font-medium text-fleer-text">
                  {driver.name}
                </p>
                <p className="text-xs text-fleer-text-muted">{driver.phone}</p>
              </div>
              <div className="ml-auto">
                <div className="text-right">
                  <span
                    className="text-sm font-display font-bold"
                    style={{
                      color:
                        driver.score >= 80
                          ? "#00C896"
                          : driver.score >= 60
                            ? "#F59E0B"
                            : "#EF4444",
                    }}
                  >
                    {driver.score}
                  </span>
                  <p className="text-xs text-fleer-text-muted">score</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Anomalies */}
        {recentAnomalies.length > 0 && (
          <div>
            <h4 className="text-xs font-display font-semibold text-fleer-text-muted uppercase tracking-wider mb-2">
              Recent Anomalies
            </h4>
            <div className="space-y-2">
              {recentAnomalies.slice(0, 4).map((anomaly) => (
                <div
                  key={anomaly.id}
                  className="flex items-start gap-2.5 bg-fleer-surface rounded-lg p-2.5"
                >
                  <span className="text-base">
                    {ANOMALY_ICONS[anomaly.type] || "⚠️"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-display font-medium text-fleer-text truncate">
                      {anomalyLabel[anomaly.type]}
                    </p>
                    <p className="text-xs text-fleer-text-muted">
                      {formatRelative(anomaly.timestamp)}
                    </p>
                  </div>
                  {anomaly.naira_value && (
                    <span className="text-xs text-fleer-danger font-mono font-medium shrink-0">
                      -{formatNaira(anomaly.naira_value)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {recentAnomalies.length === 0 && (
          <div className="text-center py-4">
            <p className="text-xs text-fleer-text-muted">No recent anomalies</p>
          </div>
        )}
      </div>

      {/* View Full Details */}
      <div className="p-4 border-t border-fleer-border">
        <button className="w-full bg-fleer-accent/10 text-fleer-accent hover:bg-fleer-accent/20 text-sm font-display font-medium py-2 rounded-lg transition-colors">
          View Full Details →
        </button>
      </div>
    </div>
  );
}
```

---

### 3.4 — Live Map Page

**File:** `src/pages/LiveMap.tsx`

**Step 26:** Create `src/pages/LiveMap.tsx`:

```tsx
import React, { useState, useEffect } from "react";
import { AppShell } from "../components/layout/AppShell";
import { FleetMap } from "../components/map/FleetMap";
import { VehicleDetailPanel } from "../components/fleet/VehicleDetailPanel";
import { Vehicle, Anomaly } from "../types";
import { useVehicles } from "../hooks/useVehicles";
import { useOrganization } from "../hooks/useOrganization";

export function LiveMapPage() {
  const { vehicles, isLoading } = useVehicles();
  const { org, user, logout } = useOrganization();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle((prev) => (prev?.id === vehicle.id ? null : vehicle));
  };

  return (
    <AppShell
      title="Live Map"
      subtitle={`${vehicles.length} vehicles tracked`}
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      onLogout={logout}
    >
      <div
        className="relative"
        style={{ height: "calc(100vh - 3.5rem - 3rem)" }}
      >
        <FleetMap
          vehicles={vehicles}
          onVehicleClick={handleVehicleClick}
          height="100%"
        />
        <VehicleDetailPanel
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      </div>
    </AppShell>
  );
}
```

---

**✅ SECTION 3 CHECKPOINT**

- [ ] Map renders centered on Lagos
- [ ] Vehicle markers appear as colored dots
- [ ] Clicking a marker opens the detail panel
- [ ] Detail panel slides in from the right
- [ ] Fuel bar color changes based on percentage (green/amber/red)
- [ ] Filter buttons correctly filter visible vehicles

---

## SECTION 4 — DASHBOARD PAGE

The first page clients land on. Shows the financial summary — this is what they pay for.

---

### 4.1 — Fleet Summary Bar

**File:** `src/components/fleet/FleetSummaryBar.tsx`

**What it does:** Horizontal strip of 5 key metrics at the top of the dashboard.

**Step 27:** Create `src/components/fleet/FleetSummaryBar.tsx`:

```tsx
import React from "react";
import { Truck, AlertTriangle, TrendingDown, MapPin, Fuel } from "lucide-react";
import { FleetSummary } from "../../types";
import { Stat } from "../ui/Stat";
import { formatNaira, formatKm, formatLitres } from "../../lib/formatters";
import { Card } from "../ui/Card";

interface FleetSummaryBarProps {
  summary: FleetSummary;
  isLoading?: boolean;
}

export function FleetSummaryBar({ summary, isLoading }: FleetSummaryBarProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-5 gap-4 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-fleer-card rounded-xl border border-fleer-border h-24 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const anomalyPercent =
    summary.total_vehicles > 0
      ? Math.round(
          (summary.vehicles_with_anomaly / summary.total_vehicles) * 100,
        )
      : 0;

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      <Card className="p-4">
        <Stat
          label="Active Vehicles"
          value={summary.active_vehicles}
          subValue={`/ ${summary.total_vehicles}`}
          icon={<Truck size={14} />}
          trend={summary.active_vehicles > 0 ? "up" : "neutral"}
          trendLabel={`${summary.vehicles_on_route} on route`}
        />
      </Card>

      <Card className="p-4">
        <Stat
          label="Anomalies Today"
          value={summary.anomalies_today}
          icon={<AlertTriangle size={14} />}
          trend={summary.anomalies_today > 0 ? "up" : "neutral"}
          trendLabel={
            summary.anomalies_today > 0
              ? `${anomalyPercent}% of fleet`
              : "All clear"
          }
          trendInverse
        />
      </Card>

      <Card className="p-4" accent>
        <Stat
          label="Savings Today"
          value={formatNaira(summary.estimated_savings_today_naira)}
          icon={<TrendingDown size={14} />}
          trend={summary.estimated_savings_today_naira > 0 ? "up" : "neutral"}
          trendLabel={
            summary.estimated_savings_today_naira > 0
              ? "Leakage prevented"
              : "Monitoring..."
          }
          highlight
        />
      </Card>

      <Card className="p-4">
        <Stat
          label="Distance Today"
          value={formatKm(summary.total_distance_today_km)}
          icon={<MapPin size={14} />}
        />
      </Card>

      <Card className="p-4">
        <Stat
          label="Fuel Used"
          value={formatLitres(summary.total_fuel_today_litres)}
          icon={<Fuel size={14} />}
          trend="neutral"
          trendLabel="vs baseline"
        />
      </Card>
    </div>
  );
}
```

---

### 4.2 — Dashboard Page

**File:** `src/pages/Dashboard.tsx`

**What it is:** The home page. Shows: Summary bar → Map (medium height) → 2-column grid of Alerts Log + Driver Leaderboard.

**Step 28:** Create `src/pages/Dashboard.tsx`:

```tsx
import React from "react";
import { AppShell } from "../components/layout/AppShell";
import { FleetSummaryBar } from "../components/fleet/FleetSummaryBar";
import { FleetMap } from "../components/map/FleetMap";
import { AlertsLog } from "../components/alerts/AlertsLog";
import { DriverLeaderboard } from "../components/drivers/DriverLeaderboard";
import { Card, CardHeader } from "../components/ui/Card";
import { useVehicles } from "../hooks/useVehicles";
import { useAlerts } from "../hooks/useAlerts";
import { useDrivers } from "../hooks/useDrivers";
import { useOrganization } from "../hooks/useOrganization";
import { Button } from "../components/ui/Button";
import { RefreshCw } from "lucide-react";

export function DashboardPage() {
  const {
    vehicles,
    summary,
    isLoading: vehiclesLoading,
    refetch,
  } = useVehicles();
  const { alerts, unread } = useAlerts();
  const { drivers } = useDrivers();
  const { org, user, logout } = useOrganization();

  return (
    <AppShell
      title="Dashboard"
      subtitle={org?.name}
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      unreadAlerts={unread}
      onLogout={logout}
      topBarActions={
        <Button
          variant="ghost"
          size="sm"
          icon={<RefreshCw size={13} />}
          onClick={refetch}
        >
          Refresh
        </Button>
      }
    >
      {/* Summary Metrics Row */}
      <FleetSummaryBar summary={summary} isLoading={vehiclesLoading} />

      {/* Map — Medium Height */}
      <div className="mb-6">
        <FleetMap
          vehicles={vehicles}
          onVehicleClick={() => {}}
          height="380px"
        />
      </div>

      {/* Bottom 2-column Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Live Alerts */}
        <Card>
          <CardHeader
            title="Live Alerts"
            subtitle={`${unread} unread`}
            action={
              unread > 0 && (
                <span className="bg-fleer-danger/10 text-fleer-danger text-xs font-display font-bold px-2 py-0.5 rounded-full border border-fleer-danger/20">
                  {unread} new
                </span>
              )
            }
          />
          <AlertsLog alerts={alerts.slice(0, 8)} compact />
        </Card>

        {/* Driver Leaderboard */}
        <Card>
          <CardHeader title="Driver Scores" subtitle="This week" />
          <DriverLeaderboard drivers={drivers.slice(0, 8)} />
        </Card>
      </div>
    </AppShell>
  );
}
```

---

**✅ SECTION 4 CHECKPOINT**

- [ ] Summary bar shows 5 stats with correct labels
- [ ] "Savings Today" card has green accent border
- [ ] Map renders at 380px height inside dashboard
- [ ] Two-column grid at bottom is evenly split
- [ ] Page doesn't crash when data arrays are empty

---

## SECTION 5 — ALERTS PAGE

---

### 5.1 — Alert Badge

**File:** `src/components/alerts/AlertBadge.tsx`

**Step 29:** Create `src/components/alerts/AlertBadge.tsx`:

```tsx
import React from "react";
import { AlertSeverity } from "../../types";
import { Badge, severityVariant } from "../ui/Badge";

const severityLabels: Record<AlertSeverity, string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
};

export function AlertBadge({ severity }: { severity: AlertSeverity }) {
  return (
    <Badge
      label={severityLabels[severity]}
      variant={severityVariant[severity]}
      dot
    />
  );
}
```

---

### 5.2 — Alerts Log Component

**File:** `src/components/alerts/AlertsLog.tsx`

**What it does:** Scrollable list of anomaly alerts. Each row has: icon, anomaly type, vehicle plate, time, naira value, resolve button.

**Step 30:** Create `src/components/alerts/AlertsLog.tsx`:

```tsx
import React from "react";
import { Check, ExternalLink } from "lucide-react";
import { Anomaly } from "../../types";
import { AlertBadge } from "./AlertBadge";
import {
  anomalyLabel,
  formatRelative,
  formatNaira,
} from "../../lib/formatters";
import { ANOMALY_ICONS } from "../../constants";
import { clsx } from "clsx";

interface AlertsLogProps {
  alerts: Anomaly[];
  compact?: boolean;
  onResolve?: (alertId: string) => void;
}

function AlertRow({
  alert,
  compact,
  onResolve,
}: {
  alert: Anomaly;
  compact?: boolean;
  onResolve?: (id: string) => void;
}) {
  return (
    <div
      className={clsx(
        "flex items-start gap-3 border-b border-fleer-border last:border-0 transition-colors",
        compact ? "px-4 py-2.5" : "px-5 py-4",
        alert.resolved && "opacity-50",
        !alert.resolved && alert.severity === "critical" && "bg-red-500/5",
      )}
    >
      {/* Icon */}
      <span className="text-lg shrink-0 mt-0.5">
        {ANOMALY_ICONS[alert.type] || "⚠️"}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display font-semibold text-sm text-fleer-text">
            {anomalyLabel[alert.type]}
          </span>
          {!compact && <AlertBadge severity={alert.severity} />}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-xs text-fleer-text-muted">
            {alert.vehicle_plate}
          </span>
          {alert.driver_name && (
            <>
              <span className="text-fleer-text-dim">·</span>
              <span className="text-xs text-fleer-text-muted">
                {alert.driver_name}
              </span>
            </>
          )}
          <span className="text-fleer-text-dim">·</span>
          <span className="text-xs text-fleer-text-muted">
            {formatRelative(alert.timestamp)}
          </span>
        </div>
        {alert.description && !compact && (
          <p className="text-xs text-fleer-text-muted mt-1 line-clamp-2">
            {alert.description}
          </p>
        )}
      </div>

      {/* Financial Impact */}
      <div className="shrink-0 text-right">
        {alert.naira_value && (
          <span className="text-sm font-mono font-medium text-fleer-danger">
            -{formatNaira(alert.naira_value)}
          </span>
        )}
        {!alert.resolved && onResolve && (
          <button
            onClick={() => onResolve(alert.id)}
            className="block ml-auto mt-1 p-1 rounded text-fleer-text-muted hover:text-fleer-accent hover:bg-fleer-accent/10 transition-colors"
            title="Mark as resolved"
          >
            <Check size={13} />
          </button>
        )}
        {alert.resolved && (
          <span className="block text-xs text-fleer-text-dim mt-1">
            Resolved
          </span>
        )}
      </div>
    </div>
  );
}

export function AlertsLog({ alerts, compact, onResolve }: AlertsLogProps) {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <span className="text-3xl mb-2">✅</span>
        <p className="text-sm font-display font-medium text-fleer-text">
          No alerts
        </p>
        <p className="text-xs text-fleer-text-muted">Fleet is running clean</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-transparent">
      {alerts.map((alert) => (
        <AlertRow
          key={alert.id}
          alert={alert}
          compact={compact}
          onResolve={onResolve}
        />
      ))}
    </div>
  );
}
```

---

### 5.3 — Alerts Page

**File:** `src/pages/Alerts.tsx`

**Step 31:** Create `src/pages/Alerts.tsx`:

```tsx
import React, { useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { AlertsLog } from "../components/alerts/AlertsLog";
import { Card, CardHeader } from "../components/ui/Card";
import { useAlerts } from "../hooks/useAlerts";
import { useOrganization } from "../hooks/useOrganization";
import { AlertSeverity, AnomalyType } from "../types";
import { Button } from "../components/ui/Button";
import { Filter } from "lucide-react";

type FilterTab = "all" | "unresolved" | AlertSeverity;

const tabs: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All Alerts" },
  { value: "unresolved", label: "Unresolved" },
  { value: "critical", label: "Critical" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" },
];

export function AlertsPage() {
  const { alerts, unread, resolveAlert } = useAlerts();
  const { org, user, logout } = useOrganization();
  const [activeTab, setActiveTab] = useState<FilterTab>("unresolved");

  const filtered = alerts.filter((alert) => {
    if (activeTab === "all") return true;
    if (activeTab === "unresolved") return !alert.resolved;
    return alert.severity === activeTab;
  });

  return (
    <AppShell
      title="Alerts"
      subtitle={`${unread} unresolved`}
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      unreadAlerts={unread}
      onLogout={logout}
    >
      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-fleer-surface border border-fleer-border rounded-xl p-1 mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-display font-medium transition-all duration-150 ${
              activeTab === tab.value
                ? "bg-fleer-card text-fleer-text shadow-sm"
                : "text-fleer-text-muted hover:text-fleer-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader
          title="Anomaly Alerts"
          subtitle={`${filtered.length} ${activeTab === "unresolved" ? "unresolved" : "total"}`}
        />
        <AlertsLog alerts={filtered} onResolve={resolveAlert} />
      </Card>
    </AppShell>
  );
}
```

---

**✅ SECTION 5 CHECKPOINT**

- [ ] Alert rows show emoji icon, anomaly type, vehicle plate, and time
- [ ] Critical alerts have a faint red background
- [ ] Resolved alerts are visually dimmed
- [ ] Tab filter correctly filters the list
- [ ] Resolve button calls `resolveAlert` and alert dims out

---

## SECTION 6 — DRIVERS PAGE

---

### 6.1 — Driver Score Ring

**What it does:** Circular SVG progress ring showing a driver's score from 0–100.

**Step 32:** Create `src/components/drivers/DriverScorecard.tsx`:

```tsx
import React from "react";
import { Driver } from "../../types";
import { SCORE_COLOR } from "../../constants";
import { Card } from "../ui/Card";

interface ScoreRingProps {
  score: number;
  size?: number;
}

function ScoreRing({ score, size = 64 }: ScoreRingProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = SCORE_COLOR(score);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#1E2D42"
        strokeWidth={4}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.8s ease" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize="14"
        fontWeight="700"
        fontFamily="'Space Grotesk'"
        style={{ transform: "rotate(90deg)", transformOrigin: "50% 50%" }}
      >
        {score}
      </text>
    </svg>
  );
}

interface DriverScorecardProps {
  driver: Driver;
  rank?: number;
}

const scoreBreakdownLabels: Record<keyof Driver["score_breakdown"], string> = {
  unauthorized_stops: "Unauthorized Stops",
  fuel_anomalies: "Fuel Anomalies",
  route_compliance: "Route Compliance",
  idle_time: "Idle Time",
  speed_compliance: "Speed Compliance",
};

export function DriverScorecard({ driver, rank }: DriverScorecardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4 mb-4">
        {rank && (
          <span className="text-lg font-display font-bold text-fleer-text-dim w-6 text-center">
            #{rank}
          </span>
        )}
        <div className="w-10 h-10 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent font-display font-bold">
          {driver.name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-display font-semibold text-fleer-text">
            {driver.name}
          </p>
          <p className="text-xs text-fleer-text-muted">
            {driver.trips_this_week} trips this week
          </p>
        </div>
        <ScoreRing score={driver.score} />
      </div>

      {/* Score Breakdown */}
      <div className="space-y-2">
        {Object.entries(driver.score_breakdown).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-xs text-fleer-text-muted w-36 shrink-0 font-display">
              {scoreBreakdownLabels[key as keyof Driver["score_breakdown"]]}
            </span>
            <div className="flex-1 bg-fleer-surface rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${value}%`,
                  background: SCORE_COLOR(value),
                }}
              />
            </div>
            <span className="text-xs font-mono text-fleer-text-muted w-8 text-right">
              {value}
            </span>
          </div>
        ))}
      </div>

      {driver.anomalies_this_week > 0 && (
        <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
          <p className="text-xs text-amber-400 font-display">
            ⚠️ {driver.anomalies_this_week} anomalies this week
          </p>
        </div>
      )}
    </Card>
  );
}
```

---

### 6.2 — Driver Leaderboard (Compact)

**File:** `src/components/drivers/DriverLeaderboard.tsx`

**Step 33:** Create `src/components/drivers/DriverLeaderboard.tsx`:

```tsx
import React from "react";
import { Driver } from "../../types";
import { SCORE_COLOR } from "../../constants";

interface DriverLeaderboardProps {
  drivers: Driver[];
}

export function DriverLeaderboard({ drivers }: DriverLeaderboardProps) {
  const sorted = [...drivers].sort((a, b) => b.score - a.score);

  if (sorted.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-fleer-text-muted">No driver data yet</p>
      </div>
    );
  }

  return (
    <div>
      {sorted.map((driver, index) => (
        <div
          key={driver.id}
          className="flex items-center gap-3 px-5 py-3 border-b border-fleer-border last:border-0 hover:bg-fleer-surface/50 transition-colors"
        >
          {/* Rank */}
          <span
            className={`text-sm font-display font-bold w-5 text-center ${
              index === 0
                ? "text-yellow-400"
                : index === 1
                  ? "text-slate-400"
                  : index === 2
                    ? "text-amber-600"
                    : "text-fleer-text-dim"
            }`}
          >
            {index === 0
              ? "🥇"
              : index === 1
                ? "🥈"
                : index === 2
                  ? "🥉"
                  : `#${index + 1}`}
          </span>

          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent text-xs font-bold font-display shrink-0">
            {driver.name.charAt(0)}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-display font-medium text-fleer-text truncate">
              {driver.name}
            </p>
            <p className="text-xs text-fleer-text-muted">
              {driver.trips_this_week} trips
            </p>
          </div>

          {/* Score */}
          <div className="text-right">
            <span
              className="text-base font-display font-bold tabular-nums"
              style={{ color: SCORE_COLOR(driver.score) }}
            >
              {driver.score}
            </span>
            <p className="text-xs text-fleer-text-muted">/ 100</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

### 6.3 — Drivers Page

**Step 34:** Create `src/pages/Drivers.tsx`:

```tsx
import React from "react";
import { AppShell } from "../components/layout/AppShell";
import { DriverScorecard } from "../components/drivers/DriverScorecard";
import { useDrivers } from "../hooks/useDrivers";
import { useOrganization } from "../hooks/useOrganization";

export function DriversPage() {
  const { drivers, isLoading } = useDrivers();
  const { org, user, logout } = useOrganization();
  const sorted = [...drivers].sort((a, b) => b.score - a.score);

  return (
    <AppShell
      title="Driver Scorecards"
      subtitle={`${drivers.length} drivers tracked`}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      onLogout={logout}
    >
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {sorted.map((driver, index) => (
          <DriverScorecard key={driver.id} driver={driver} rank={index + 1} />
        ))}
      </div>
    </AppShell>
  );
}
```

---

**✅ SECTION 6 CHECKPOINT**

- [ ] Score ring shows correct color (green 80+, amber 60-79, red <60)
- [ ] Score breakdown bars animate on load
- [ ] Leaderboard sorts drivers by score (highest first)
- [ ] Medal emojis show for top 3 drivers
- [ ] Anomaly warning tag appears when `anomalies_this_week > 0`

---

## SECTION 7 — FINANCIAL REPORTS PAGE

This is the page that closes contracts. Every number must be visible, clear, and undeniable.

---

### 7.1 — Savings Chart

**File:** `src/components/reports/SavingsChart.tsx`

**Step 35:** Create `src/components/reports/SavingsChart.tsx`:

```tsx
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatNaira } from "../../lib/formatters";
import { format, parseISO } from "date-fns";

interface SavingsDataPoint {
  date: string;
  savings: number;
  fuel_bought: number;
  fuel_used: number;
}

interface SavingsChartProps {
  data: SavingsDataPoint[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-fleer-card border border-fleer-border rounded-xl px-4 py-3 shadow-card">
      <p className="text-xs text-fleer-text-muted font-display mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-fleer-text-muted font-display capitalize">
            {entry.name}:
          </span>
          <span className="font-display font-semibold text-fleer-text">
            {entry.name === "savings"
              ? formatNaira(entry.value)
              : `${entry.value.toFixed(0)}L`}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SavingsChart({ data }: SavingsChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    label: format(parseISO(d.date), "MMM d"),
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart
        data={formatted}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00C896" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00C896" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1E2D42"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fill: "#64748B", fontSize: 11, fontFamily: "DM Sans" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatNaira(v)}
          tick={{ fill: "#64748B", fontSize: 11, fontFamily: "DM Sans" }}
          axisLine={false}
          tickLine={false}
          width={70}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="savings"
          name="savings"
          stroke="#00C896"
          strokeWidth={2}
          fill="url(#savingsGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

---

### 7.2 — Fuel Reconciliation Table

**File:** `src/components/reports/FuelReconciliation.tsx`

**Step 36:** Create `src/components/reports/FuelReconciliation.tsx`:

```tsx
import React from "react";
import { formatNaira, formatLitres } from "../../lib/formatters";
import { clsx } from "clsx";

interface ReconciliationRow {
  vehicle_plate: string;
  driver_name: string;
  fuel_bought_litres: number;
  fuel_used_litres: number;
  variance_litres: number;
  variance_naira: number;
  anomaly_count: number;
}

interface FuelReconciliationProps {
  rows: ReconciliationRow[];
  period: string;
}

export function FuelReconciliation({ rows, period }: FuelReconciliationProps) {
  const sorted = [...rows].sort(
    (a, b) => Math.abs(b.variance_naira) - Math.abs(a.variance_naira),
  );
  const totalVarianceNaira = rows.reduce((s, r) => s + r.variance_naira, 0);
  const totalVarianceLitres = rows.reduce((s, r) => s + r.variance_litres, 0);

  return (
    <div>
      {/* Period header */}
      <div className="flex items-center justify-between px-5 py-3 bg-fleer-surface border-b border-fleer-border">
        <p className="text-sm font-display font-medium text-fleer-text">
          {period}
        </p>
        <div className="text-right">
          <p className="text-xs text-fleer-text-muted">Total Unaccounted</p>
          <p
            className={clsx(
              "text-base font-display font-bold tabular-nums",
              totalVarianceLitres < 0
                ? "text-fleer-danger"
                : "text-fleer-accent",
            )}
          >
            {formatNaira(Math.abs(totalVarianceNaira))}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-fleer-border">
              <th className="text-left text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-5 py-3">
                Vehicle
              </th>
              <th className="text-left text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-3 py-3">
                Driver
              </th>
              <th className="text-right text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-3 py-3">
                Bought
              </th>
              <th className="text-right text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-3 py-3">
                Used
              </th>
              <th className="text-right text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-3 py-3">
                Variance
              </th>
              <th className="text-right text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-5 py-3">
                Naira Impact
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const isNegative = row.variance_litres < 0;
              return (
                <tr
                  key={row.vehicle_plate}
                  className={clsx(
                    "border-b border-fleer-border hover:bg-fleer-surface/50 transition-colors",
                    isNegative &&
                      Math.abs(row.variance_litres) > 10 &&
                      "bg-red-500/5",
                  )}
                >
                  <td className="px-5 py-3 font-mono text-sm text-fleer-text font-medium">
                    {row.vehicle_plate}
                  </td>
                  <td className="px-3 py-3 text-fleer-text-muted">
                    {row.driver_name}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-fleer-text">
                    {formatLitres(row.fuel_bought_litres)}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-fleer-text">
                    {formatLitres(row.fuel_used_litres)}
                  </td>
                  <td
                    className={clsx(
                      "px-3 py-3 text-right font-mono font-medium",
                      isNegative ? "text-fleer-danger" : "text-fleer-accent",
                    )}
                  >
                    {isNegative ? "" : "+"}
                    {formatLitres(row.variance_litres)}
                  </td>
                  <td
                    className={clsx(
                      "px-5 py-3 text-right font-display font-bold tabular-nums",
                      isNegative ? "text-fleer-danger" : "text-fleer-accent",
                    )}
                  >
                    {isNegative ? "-" : "+"}
                    {formatNaira(Math.abs(row.variance_naira))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

### 7.3 — Reports Page

**Step 37:** Create `src/pages/Reports.tsx`:

```tsx
import React, { useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { SavingsChart } from "../components/reports/SavingsChart";
import { FuelReconciliation } from "../components/reports/FuelReconciliation";
import { Stat } from "../components/ui/Stat";
import { Button } from "../components/ui/Button";
import { useOrganization } from "../hooks/useOrganization";
import { Download, TrendingDown, Fuel, AlertTriangle } from "lucide-react";
import { formatNaira, formatLitres } from "../lib/formatters";

// MOCK DATA — replace with real Supabase query
const mockChartData = Array.from({ length: 14 }, (_, i) => ({
  date: new Date(Date.now() - (13 - i) * 86400000).toISOString().split("T")[0],
  savings: Math.random() * 400000 + 100000,
  fuel_bought: Math.random() * 500 + 200,
  fuel_used: Math.random() * 400 + 150,
}));

const mockReconciliation = [
  {
    vehicle_plate: "LND-341-GF",
    driver_name: "Emeka Obi",
    fuel_bought_litres: 340,
    fuel_used_litres: 298,
    variance_litres: -42,
    variance_naira: -67200,
    anomaly_count: 3,
  },
  {
    vehicle_plate: "LND-882-KA",
    driver_name: "Tunde Fashola",
    fuel_bought_litres: 280,
    fuel_used_litres: 271,
    variance_litres: -9,
    variance_naira: -14400,
    anomaly_count: 1,
  },
  {
    vehicle_plate: "LND-119-BB",
    driver_name: "Chidi Okeke",
    fuel_bought_litres: 420,
    fuel_used_litres: 418,
    variance_litres: -2,
    variance_naira: -3200,
    anomaly_count: 0,
  },
];

export function ReportsPage() {
  const { org, user, logout } = useOrganization();
  const [downloading, setDownloading] = useState(false);

  const totalSavings = mockChartData.reduce((s, d) => s + d.savings, 0);
  const totalVarianceNaira = mockReconciliation.reduce(
    (s, r) => s + r.variance_naira,
    0,
  );

  const handleDownloadPDF = async () => {
    setDownloading(true);
    // TODO: Call backend endpoint to generate Puppeteer PDF
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <AppShell
      title="Financial Reports"
      subtitle="Fuel spend & savings analysis"
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      onLogout={logout}
      topBarActions={
        <Button
          variant="primary"
          size="sm"
          icon={<Download size={13} />}
          loading={downloading}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
      }
    >
      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-5" accent>
          <Stat
            label="Total Savings (14 days)"
            value={formatNaira(totalSavings)}
            icon={<TrendingDown size={14} />}
            trend="up"
            trendLabel="Leakage prevented"
            highlight
          />
        </Card>
        <Card className="p-5">
          <Stat
            label="Unaccounted Fuel Value"
            value={formatNaira(Math.abs(totalVarianceNaira))}
            icon={<Fuel size={14} />}
            trend="down"
            trendLabel="Fuel variance this period"
            trendInverse
          />
        </Card>
        <Card className="p-5">
          <Stat
            label="Anomalies Detected"
            value={mockReconciliation.reduce((s, r) => s + r.anomaly_count, 0)}
            icon={<AlertTriangle size={14} />}
            trend="neutral"
            trendLabel="This period"
          />
        </Card>
      </div>

      {/* Savings Trend Chart */}
      <Card className="mb-6">
        <CardHeader
          title="Savings Trend"
          subtitle="Daily estimated savings from anomaly detection"
        />
        <CardBody>
          <SavingsChart data={mockChartData} />
        </CardBody>
      </Card>

      {/* Fuel Reconciliation Table */}
      <Card>
        <CardHeader
          title="Fuel Reconciliation"
          subtitle="Fuel bought vs actual consumption — variance is your exposure"
        />
        <FuelReconciliation rows={mockReconciliation} period="Last 14 Days" />
      </Card>
    </AppShell>
  );
}
```

---

**✅ SECTION 7 CHECKPOINT**

- [ ] Savings chart renders with area gradient
- [ ] Chart tooltip shows formatted naira values
- [ ] Reconciliation table shows correct columns
- [ ] Rows with large negative variance have red background tint
- [ ] Total unaccounted banner shows at top of reconciliation
- [ ] Download PDF button shows loading spinner on click

---

## SECTION 8 — VEHICLES PAGE

---

### 8.1 — Vehicle Card

**File:** `src/components/fleet/VehicleCard.tsx`

**Step 38:** Create `src/components/fleet/VehicleCard.tsx`:

```tsx
import React from "react";
import { Truck, Droplets, Gauge, Clock } from "lucide-react";
import { Vehicle } from "../../types";
import { Card } from "../ui/Card";
import { Badge, vehicleStatusVariant } from "../ui/Badge";
import { VEHICLE_STATUS_LABELS, VEHICLE_STATUS_COLORS } from "../../constants";
import { formatRelative, formatSpeed } from "../../lib/formatters";
import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";

interface VehicleCardProps {
  vehicle: Vehicle;
}

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full bg-fleer-surface rounded-full h-1 overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const navigate = useNavigate();
  const statusColor = VEHICLE_STATUS_COLORS[vehicle.status];
  const fuelColor = vehicle.fuel_level
    ? vehicle.fuel_level > 50
      ? "#00C896"
      : vehicle.fuel_level > 20
        ? "#F59E0B"
        : "#EF4444"
    : "#374151";

  return (
    <Card
      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
      className="p-4 hover:shadow-accent"
      accent={vehicle.status === "alert" || vehicle.status === "anomaly"}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: `${statusColor}20` }}
          >
            <Truck size={16} style={{ color: statusColor }} />
          </div>
          <div>
            <p className="font-display font-bold text-fleer-text">
              {vehicle.plate}
            </p>
            <p className="text-xs text-fleer-text-muted capitalize">
              {vehicle.type}
            </p>
          </div>
        </div>
        <Badge
          label={VEHICLE_STATUS_LABELS[vehicle.status]}
          variant={vehicleStatusVariant[vehicle.status]}
          dot
        />
      </div>

      <div className="space-y-2.5">
        {/* Fuel Level */}
        {vehicle.fuel_level !== undefined && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-fleer-text-muted">
              <span className="flex items-center gap-1 font-display">
                <Droplets size={10} /> Fuel
              </span>
              <span className="font-mono" style={{ color: fuelColor }}>
                {vehicle.fuel_level}%
              </span>
            </div>
            <MiniBar value={vehicle.fuel_level} color={fuelColor} />
          </div>
        )}

        {/* Speed */}
        {vehicle.current_speed !== undefined && (
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-fleer-text-muted font-display">
              <Gauge size={10} /> Speed
            </span>
            <span className="font-mono text-fleer-text">
              {formatSpeed(vehicle.current_speed)}
            </span>
          </div>
        )}

        {/* Last seen */}
        {vehicle.last_seen && (
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-fleer-text-muted font-display">
              <Clock size={10} /> Last seen
            </span>
            <span className="text-fleer-text-muted">
              {formatRelative(vehicle.last_seen)}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
```

---

### 8.2 — Vehicles Page

**Step 39:** Create `src/pages/Vehicles.tsx`:

```tsx
import React, { useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { VehicleCard } from "../components/fleet/VehicleCard";
import { useVehicles } from "../hooks/useVehicles";
import { useOrganization } from "../hooks/useOrganization";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { EmptyState } from "../components/ui/EmptyState";
import { VehicleStatus } from "../types";
import { VEHICLE_STATUS_LABELS } from "../constants";
import { Truck } from "lucide-react";

type StatusFilter = VehicleStatus | "all";

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "on_route", label: "On Route" },
  { value: "anomaly", label: "Anomaly" },
  { value: "alert", label: "Alert" },
  { value: "idle", label: "Idle" },
  { value: "offline", label: "Offline" },
];

export function VehiclesPage() {
  const { vehicles, isLoading } = useVehicles();
  const { org, user, logout } = useOrganization();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = vehicles.filter((v) => {
    const matchesFilter = filter === "all" || v.status === filter;
    const matchesSearch = v.plate.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <AppShell
      title="Vehicles"
      subtitle={`${vehicles.length} in fleet`}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      onLogout={logout}
    >
      {/* Search + Filter */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by plate number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-fleer-surface border border-fleer-border rounded-lg px-4 py-2 text-sm text-fleer-text placeholder:text-fleer-text-muted focus:outline-none focus:border-fleer-accent/50 w-64 font-display"
        />
        <div className="flex items-center gap-1 bg-fleer-surface border border-fleer-border rounded-xl p-1">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-medium transition-all ${
                filter === f.value
                  ? "bg-fleer-card text-fleer-text"
                  : "text-fleer-text-muted hover:text-fleer-text"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <LoadingSpinner label="Loading vehicles..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Truck className="text-fleer-text-muted" />}
          title="No vehicles found"
          description={
            search
              ? `No vehicles match "${search}"`
              : "No vehicles in this category"
          }
          action={
            search
              ? { label: "Clear search", onClick: () => setSearch("") }
              : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
```

---

**✅ SECTION 8 CHECKPOINT**

- [ ] Vehicle cards show in 3-column grid
- [ ] Status badge color matches status
- [ ] Fuel mini-bar shows with correct color
- [ ] Search filters by plate number in real time
- [ ] Status filter tabs work correctly
- [ ] Empty state shows when no results match

---

## SECTION 9 — HOOKS (Data Layer)

These hooks connect your components to Supabase. Build all of these together.

---

### 9.1 — useOrganization Hook

**Step 40:** Create `src/hooks/useOrganization.ts`:

```typescript
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Organization } from "../types";

interface OrgUser {
  email: string;
  id: string;
}

export function useOrganization() {
  const [org, setOrg] = useState<Organization | null>(null);
  const [user, setUser] = useState<OrgUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ email: session.user.email!, id: session.user.id });
        // Fetch organization for this user
        supabase
          .from("organizations")
          .select("*")
          .single()
          .then(({ data }) => {
            setOrg(data);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({ email: session.user.email!, id: session.user.id });
      } else {
        setUser(null);
        setOrg(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { org, user, isLoading, logout };
}
```

---

### 9.2 — useVehicles Hook

**Step 41:** Create `src/hooks/useVehicles.ts`:

```typescript
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { getSocket } from "../lib/socket";
import { Vehicle, FleetSummary, Position } from "../types";

const EMPTY_SUMMARY: FleetSummary = {
  total_vehicles: 0,
  active_vehicles: 0,
  vehicles_on_route: 0,
  vehicles_with_anomaly: 0,
  vehicles_offline: 0,
  total_distance_today_km: 0,
  total_fuel_today_litres: 0,
  anomalies_today: 0,
  estimated_savings_today_naira: 0,
};

function computeSummary(vehicles: Vehicle[]): FleetSummary {
  return {
    total_vehicles: vehicles.length,
    active_vehicles: vehicles.filter((v) => v.status !== "offline").length,
    vehicles_on_route: vehicles.filter((v) => v.status === "on_route").length,
    vehicles_with_anomaly: vehicles.filter(
      (v) => v.status === "anomaly" || v.status === "alert",
    ).length,
    vehicles_offline: vehicles.filter((v) => v.status === "offline").length,
    total_distance_today_km: 0, // computed from trips table — simplified here
    total_fuel_today_litres: 0, // computed from fuel_events table
    anomalies_today: 0, // computed from anomalies table
    estimated_savings_today_naira: 0,
  };
}

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [summary, setSummary] = useState<FleetSummary>(EMPTY_SUMMARY);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVehicles = useCallback(async () => {
    const { data, error } = await supabase.from("vehicles").select("*");
    if (!error && data) {
      setVehicles(data as Vehicle[]);
      setSummary(computeSummary(data as Vehicle[]));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchVehicles();

    // Real-time position updates via Socket.IO
    const socket = getSocket();

    socket.on(
      "vehicle:position",
      (update: {
        vehicle_id: string;
        lat: number;
        lng: number;
        speed: number;
        fuel_level?: number;
        status: Vehicle["status"];
      }) => {
        setVehicles((prev) =>
          prev.map((v) =>
            v.id === update.vehicle_id
              ? {
                  ...v,
                  current_lat: update.lat,
                  current_lng: update.lng,
                  current_speed: update.speed,
                  fuel_level: update.fuel_level,
                  status: update.status,
                }
              : v,
          ),
        );
      },
    );

    // Supabase real-time subscription for status changes
    const channel = supabase
      .channel("vehicles-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "vehicles" },
        (payload) => {
          setVehicles((prev) =>
            prev.map((v) =>
              v.id === payload.new.id ? { ...v, ...payload.new } : v,
            ),
          );
        },
      )
      .subscribe();

    return () => {
      socket.off("vehicle:position");
      supabase.removeChannel(channel);
    };
  }, [fetchVehicles]);

  return { vehicles, summary, isLoading, refetch: fetchVehicles };
}
```

---

### 9.3 — useAlerts Hook

**Step 42:** Create `src/hooks/useAlerts.ts`:

```typescript
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { getSocket } from "../lib/socket";
import { Anomaly } from "../types";
import toast from "react-hot-toast";
import { ANOMALY_ICONS } from "../constants";
import { anomalyLabel } from "../lib/formatters";

export function useAlerts() {
  const [alerts, setAlerts] = useState<Anomaly[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAlerts = useCallback(async () => {
    const { data, error } = await supabase
      .from("anomalies")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(100);
    if (!error && data) setAlerts(data as Anomaly[]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAlerts();

    // Real-time new alert via Socket.IO
    const socket = getSocket();
    socket.on("anomaly:new", (anomaly: Anomaly) => {
      setAlerts((prev) => [anomaly, ...prev]);

      // Show toast notification
      const icon = ANOMALY_ICONS[anomaly.type] || "⚠️";
      const label = anomalyLabel[anomaly.type];
      if (anomaly.severity === "critical") {
        toast.error(`${icon} ${label} — ${anomaly.vehicle_plate}`, {
          duration: 8000,
        });
      } else {
        toast(`${icon} ${label} — ${anomaly.vehicle_plate}`, {
          duration: 5000,
        });
      }
    });

    return () => {
      socket.off("anomaly:new");
    };
  }, [fetchAlerts]);

  const resolveAlert = useCallback(async (alertId: string) => {
    await supabase
      .from("anomalies")
      .update({ resolved: true, resolved_at: new Date().toISOString() })
      .eq("id", alertId);
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, resolved: true } : a)),
    );
  }, []);

  const unread = alerts.filter(
    (a) => !a.resolved && a.severity !== "info",
  ).length;

  return { alerts, unread, isLoading, resolveAlert, refetch: fetchAlerts };
}
```

---

### 9.4 — useDrivers Hook

**Step 43:** Create `src/hooks/useDrivers.ts`:

```typescript
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { Driver } from "../types";

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDrivers = useCallback(async () => {
    const { data, error } = await supabase.from("drivers").select("*");
    if (!error && data) setDrivers(data as Driver[]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  return { drivers, isLoading, refetch: fetchDrivers };
}
```

---

### 9.5 — useSocket Hook

**Step 44:** Create `src/hooks/useSocket.ts`:

```typescript
import { useState, useEffect } from "react";
import { getSocket, disconnectSocket } from "../lib/socket";

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    if (socket.connected) setIsConnected(true);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return { isConnected };
}
```

---

**✅ SECTION 9 CHECKPOINT**

- [ ] `useVehicles` fetches from Supabase without error
- [ ] `useAlerts` shows toast notification when a new anomaly arrives
- [ ] `resolveAlert` updates Supabase and marks alert as resolved locally
- [ ] `useSocket` returns `isConnected: true` when backend is running
- [ ] No TypeScript errors in any hook file

---

## SECTION 10 — ROUTING & APP ENTRY

---

### 10.1 — App.tsx

**Step 45:** Replace `src/App.tsx` with:

```tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { DashboardPage } from "./pages/Dashboard";
import { LiveMapPage } from "./pages/LiveMap";
import { VehiclesPage } from "./pages/Vehicles";
import { DriversPage } from "./pages/Drivers";
import { AlertsPage } from "./pages/Alerts";
import { ReportsPage } from "./pages/Reports";
import { LoginPage } from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1A2235",
            color: "#E2E8F0",
            border: "1px solid #1E2D42",
            borderRadius: "12px",
            fontFamily: "DM Sans",
            fontSize: "13px",
          },
          error: {
            style: {
              borderLeft: "3px solid #EF4444",
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/map" element={<LiveMapPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### 10.2 — Login Page

**Step 46:** Create `src/pages/Login.tsx`:

```tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Zap } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-fleer-bg flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-fleer-accent flex items-center justify-center mb-4 shadow-accent">
            <Zap size={28} className="text-fleer-bg" fill="currentColor" />
          </div>
          <h1 className="font-display font-bold text-2xl text-fleer-text">
            Fleer
          </h1>
          <p className="text-fleer-text-muted text-sm mt-1">
            Fleet Intelligence Platform
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="bg-fleer-card border border-fleer-border rounded-2xl p-6 shadow-card"
        >
          <h2 className="font-display font-semibold text-fleer-text text-base mb-5">
            Sign in to your account
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-display font-medium text-fleer-text-muted mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="fleet@company.com"
                className="w-full bg-fleer-surface border border-fleer-border rounded-lg px-4 py-2.5 text-sm text-fleer-text placeholder:text-fleer-text-dim focus:outline-none focus:border-fleer-accent/60 font-display"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-medium text-fleer-text-muted mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-fleer-surface border border-fleer-border rounded-lg px-4 py-2.5 text-sm text-fleer-text placeholder:text-fleer-text-dim focus:outline-none focus:border-fleer-accent/60 font-display"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-fleer-accent text-fleer-bg font-display font-semibold py-3 rounded-xl hover:bg-fleer-accent/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-fleer-bg border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-fleer-text-muted mt-6">
          Fleer · Fleet Intelligence & Revenue Protection
        </p>
      </div>
    </div>
  );
}
```

---

**✅ FINAL CHECKPOINT — Full App**

- [ ] `npm start` runs without any TypeScript errors
- [ ] Login page renders and accepts email/password
- [ ] Dashboard loads with summary bar (even if data is empty/mock)
- [ ] Sidebar navigation works — clicking each item loads the correct page
- [ ] Live Map renders the Leaflet map centered on Lagos
- [ ] Vehicles page shows grid with filter tabs
- [ ] Alerts page shows tab filter and alert rows
- [ ] Drivers page shows scorecards with score rings
- [ ] Reports page shows chart and reconciliation table
- [ ] Toast notifications appear in top-right with dark styling
- [ ] No console errors in browser DevTools

---

## APPENDIX A — Environment Setup Checklist

Before running the app for the first time, confirm:

```
□ Node.js 18+ installed
□ .env file exists in project root with all 3 variables filled
□ Supabase project created at supabase.com
□ Supabase: "vehicles" table created with schema from types/index.ts
□ Supabase: "drivers" table created
□ Supabase: "anomalies" table created
□ Supabase: "organizations" table created
□ Supabase: Auth enabled (Email provider)
□ Supabase: At least 1 test user created in Auth > Users
□ Backend server running on port 3001 (or update REACT_APP_BACKEND_URL)
```

---

## APPENDIX B — Mock Data for Testing Without Backend

If you want to test the frontend before the backend is ready, add this to `useVehicles.ts` to return hardcoded data:

```typescript
// TEMP — remove when real backend is ready
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "1",
    org_id: "org1",
    plate: "LND-341-GF",
    type: "truck",
    fuel_capacity: 400,
    efficiency_baseline: 3.2,
    status: "on_route",
    current_lat: 6.5244,
    current_lng: 3.3792,
    current_speed: 67,
    fuel_level: 72,
  },
  {
    id: "2",
    org_id: "org1",
    plate: "LND-882-KA",
    type: "trailer",
    fuel_capacity: 600,
    efficiency_baseline: 2.8,
    status: "anomaly",
    current_lat: 6.453,
    current_lng: 3.3958,
    current_speed: 0,
    fuel_level: 34,
  },
  {
    id: "3",
    org_id: "org1",
    plate: "LND-119-BB",
    type: "van",
    fuel_capacity: 200,
    efficiency_baseline: 5.1,
    status: "idle",
    current_lat: 6.4698,
    current_lng: 3.5852,
    current_speed: 0,
    fuel_level: 88,
  },
  {
    id: "4",
    org_id: "org1",
    plate: "LND-557-JA",
    type: "truck",
    fuel_capacity: 400,
    efficiency_baseline: 3.0,
    status: "offline",
    fuel_level: 20,
  },
  {
    id: "5",
    org_id: "org1",
    plate: "LND-773-XY",
    type: "truck",
    fuel_capacity: 350,
    efficiency_baseline: 3.4,
    status: "on_route",
    current_lat: 6.58,
    current_lng: 3.32,
    current_speed: 54,
    fuel_level: 55,
  },
];
```

---

## APPENDIX C — Component → Page Map

| Component            | Used In                          |
| -------------------- | -------------------------------- |
| `FleetMap`           | Dashboard, LiveMap               |
| `VehicleMarker`      | FleetMap                         |
| `VehicleDetailPanel` | LiveMap                          |
| `FleetSummaryBar`    | Dashboard                        |
| `VehicleCard`        | Vehicles page                    |
| `AlertsLog`          | Dashboard (compact), Alerts page |
| `AlertBadge`         | AlertsLog                        |
| `DriverLeaderboard`  | Dashboard                        |
| `DriverScorecard`    | Drivers page                     |
| `SavingsChart`       | Reports page                     |
| `FuelReconciliation` | Reports page                     |
| `Sidebar`            | AppShell                         |
| `TopBar`             | AppShell                         |
| `AppShell`           | Every page                       |

## APPENDIX D — Key Design Decisions (Don't Change These)

1. **Color system** — Always use Tailwind `fleer-*` classes. Never hardcode hex colors in JSX (except in SVG/Canvas). This makes theme changes instant.

2. **Font hierarchy** — `font-display` (Space Grotesk) for all labels, headings, badges, and numbers. `font-body` (DM Sans) for descriptions and body text. `font-mono` (JetBrains Mono) for plate numbers, coordinates, and financial figures.

3. **Map tiles** — Use the CSS filter in `index.css` to dark-theme the OpenStreetMap tiles. Do not switch to a different tile provider without testing the filter.

4. **Socket events** — The frontend listens for exactly these event names from the backend: `vehicle:position`, `anomaly:new`. Make sure the backend emits exactly these names.

5. **Supabase RLS** — Every table must have Row Level Security enabled with a policy that restricts data to the user's `org_id`. Never disable RLS.

6. **Naira formatting** — Always use `formatNaira()` from formatters.ts for any financial figure. Never format raw numbers directly in JSX.

---

_End of Fleer Frontend Build Instructions — v1.0_
_Build this in order. Test each checkpoint. Ship the MVP._
