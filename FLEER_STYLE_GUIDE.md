# FLEER UI STYLE GUIDE
### The single source of truth for all visual decisions in the Fleer dashboard
**Version:** 1.0 | **Stack:** React + Tailwind CSS | **Theme:** Dark

> **For AI assistants:** Read this entire file before touching any component. Every styling decision — color, spacing, typography, radius, shadow, state — is defined here. Never hardcode values that exist as tokens. Never invent styles not in this guide.

---

## 0 — CORE PRINCIPLE

Fleer is a **professional fleet intelligence tool** used by logistics operations managers. The aesthetic is **refined dark dashboard** — not a flashy SaaS landing page. Every design choice prioritizes: clarity of data, hierarchy of information, and trust through consistency.

One rule above all: **use the token system. Never hardcode hex colors or arbitrary px values in JSX.**

---

## 1 — COLOR SYSTEM

### 1.1 Background Layers (deepest → shallowest)

| Token | Hex | Tailwind Class | Used For |
|-------|-----|----------------|----------|
| bg-base | `#0A0E1A` | `bg-fleer-bg` | Page background, outermost layer |
| bg-surface | `#111827` | `bg-fleer-surface` | Sidebar, inputs, sub-panels, table headers |
| bg-card | `#1A2235` | `bg-fleer-card` | All `<Card>` components, detail panels |
| bg-border | `#1E2D42` | `bg-fleer-border` | All borders (use as border-color) |

**Layering rule:** Each surface must sit on a layer darker than itself. Never place bg-card directly on bg-card.

### 1.2 Accent & Semantic Colors

| Token | Hex | Tailwind Class | Used For |
|-------|-----|----------------|----------|
| accent | `#00C896` | `text-fleer-accent` / `bg-fleer-accent` | Active nav, CTA buttons, savings highlight, live indicator, score rings ≥80 |
| accent-dim | `rgba(0,200,150,0.12)` | `bg-fleer-accent/10` or `bg-fleer-accent/20` | Badge backgrounds, card hover tints, icon backgrounds |
| warning | `#F59E0B` | `text-fleer-warning` | Anomaly status, score 60–79, amber alerts |
| danger | `#EF4444` | `text-fleer-danger` | Critical alerts, score <60, negative financials, error states |
| info | `#3B82F6` | `text-fleer-info` | Idle vehicle status, informational badges |
| purple | `#6366F1` | `text-indigo-400` | Idle vehicle badge only |

### 1.3 Text Colors

| Token | Hex | Tailwind Class | Used For |
|-------|-----|----------------|----------|
| text-primary | `#E2E8F0` | `text-fleer-text` | All primary text, headings, card titles, values |
| text-muted | `#64748B` | `text-fleer-text-muted` | Labels, secondary info, timestamps, subtitles |
| text-dim | `#334155` | `text-fleer-text-dim` | Placeholders, tertiary text, rank numbers, dividers |

### 1.4 Dynamic Score Colors

These are not static tokens — compute them at render time using `SCORE_COLOR(value)` from `src/constants/index.ts`:

```typescript
export const SCORE_COLOR = (score: number): string => {
  if (score >= 80) return '#00C896';  // green
  if (score >= 60) return '#F59E0B';  // amber
  return '#EF4444';                   // red
};
```

Apply to: score ring strokes, progress bar fills, score text, fuel bar fills.

### 1.5 Fuel Bar Colors

```typescript
const fuelColor = fuel > 50 ? '#00C896' : fuel > 20 ? '#F59E0B' : '#EF4444';
```

### 1.6 Vehicle Status Colors

```typescript
export const VEHICLE_STATUS_COLORS = {
  on_route: '#00C896',
  anomaly:  '#F59E0B',
  alert:    '#EF4444',
  idle:     '#6366F1',
  offline:  '#374151',
};
```

---

## 2 — TYPOGRAPHY

### 2.1 Font Stack

```css
/* Import in index.css */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
```

| Role | Font | Tailwind Class | Used For |
|------|------|----------------|----------|
| Display | Space Grotesk | `font-display` | **All** headings, nav labels, card titles, badge text, button text, stat values, section labels |
| Body | DM Sans | `font-body` | Descriptions, alert body text, multi-sentence prose |
| Mono | JetBrains Mono | `font-mono` | Vehicle plates, GPS coordinates, ₦ financial figures, timestamps, speed/fuel readings |

**Rule:** When in doubt between display and body, use display. DM Sans is only for prose sentences.

### 2.2 Type Scale

| Element | Size | Weight | Class |
|---------|------|--------|-------|
| Page title (TopBar) | 16px / 1rem | 700 | `text-base font-bold font-display` |
| Card title | 13px | 600 | `text-sm font-semibold font-display` |
| Stat value (large) | 24–28px | 700 | `text-2xl font-bold font-display tabular-nums` |
| Stat value (small) | 20px | 700 | `text-xl font-bold font-display tabular-nums` |
| Nav label | 13px | 500 | `text-sm font-medium font-display` |
| Badge / pill | 11px | 500 | `text-xs font-medium font-display` |
| Alert title | 13px | 600 | `text-sm font-semibold font-display` |
| Body / description | 13–14px | 400 | `text-sm font-body` |
| Plate / figure | 12–13px | 400–500 | `text-xs font-mono` |
| Section label | 10–11px | 500 | `text-xs font-medium font-display uppercase tracking-wider` |
| Timestamp / meta | 11px | 400 | `text-xs text-fleer-text-muted` |
| Card subtitle | 11px | 400 | `text-xs text-fleer-text-muted` |

**Critical:** Always add `tabular-nums` to any numeric display value. This prevents layout shift as numbers change.

---

## 3 — SPACING SYSTEM

**Rule:** Only use values from this scale. Never write `style={{ padding: '13px' }}` or `mt-[17px]`.

| Token | Value | Tailwind | Used For |
|-------|-------|----------|----------|
| space-1 | 4px | `p-1` / `gap-1` | Icon internal padding, badge dot margin |
| space-2 | 8px | `p-2` / `gap-2` | Inline icon gap, tight row gap |
| space-3 | 12px | `p-3` / `gap-3` | Nav item padding-x, badge padding |
| space-4 | 16px | `p-4` / `gap-4` | Card body padding (compact), grid gap (tight) |
| space-5 | 20px | `p-5` / `gap-5` | Card body padding (standard), metric gap |
| space-6 | 24px | `p-6` / `gap-6` | Main content padding, section gap |
| space-8 | 32px | `p-8` / `gap-8` | Page section separation |
| space-10 | 40px | `p-10` | — |
| space-12 | 48px | `p-12` | Login panel padding |

### 3.1 Layout Constants

| Zone | Property | Value |
|------|----------|-------|
| Sidebar | `width` | `240px` (w-60) |
| TopBar | `height` | `56px` (h-14) |
| Main content | `margin-left` | `240px` (ml-60) |
| Main content | `margin-top` | `56px` (mt-14) |
| Main content | `padding` | `24px` (p-6) |
| Card inner | `padding` | `20px` (p-5) |
| CardHeader | `padding` | `16px 20px` (px-5 py-4) |
| Alert row (full) | `padding` | `16px 20px` (px-5 py-4) |
| Alert row (compact) | `padding` | `10px 16px` (px-4 py-2.5) |
| Card grid gap | `gap` | `16–24px` (gap-4 or gap-6) |
| Nav item | `padding` | `10px 12px` (px-3 py-2.5) |
| Badge | `padding` | `2px 8px` (px-2 py-0.5) |
| Button (sm) | `padding` | `6px 12px` (px-3 py-1.5) |
| Button (md) | `padding` | `8px 16px` (px-4 py-2) |
| Button (lg) | `padding` | `12px 24px` (px-6 py-3) |

---

## 4 — BORDER RADIUS

| Name | Value | Used For |
|------|-------|----------|
| sm | 6px (`rounded-md`) | Badges inner elements, small chips |
| md | 8px (`rounded-lg`) | Buttons, inputs, nav items, small cards, icon containers |
| lg | 12px (`rounded-xl`) | Main cards, panels, map container, tabs bar |
| xl | 16px (`rounded-2xl`) | Login card, dialogs, large modals |
| full | 9999px (`rounded-full`) | All badges/pills, avatar circles, score rings container, dots |

**Special rule:** When using `border-left` accent only (e.g., active nav item, savings card), set `border-radius: 0` on the left side — rounded corners only make sense with full borders.

---

## 5 — BORDERS

All borders in Fleer use a single color: `#1E2D42` (`border-fleer-border`).

| Context | Style |
|---------|-------|
| Card default | `border border-fleer-border` |
| Card hover | `border-fleer-accent/50` (transition on hover) |
| Sidebar active nav | `border-l-2 border-l-fleer-accent` |
| Savings card accent | `border-l-2 border-l-fleer-accent` |
| Input default | `border border-fleer-border` |
| Input focus | `border-fleer-accent/60` |
| Section separator | `border-b border-fleer-border` |
| CardHeader bottom | `border-b border-fleer-border` |
| Alert row separator | `border-b border-fleer-border` (last:border-0) |

**Semantic badge/banner borders:**
```
amber anomaly:  border border-amber-500/20
red critical:   border border-red-500/20
blue info:      border border-blue-500/20
green success:  border border-emerald-500/20
```

---

## 6 — SHADOWS

```javascript
// tailwind.config.js — shadow tokens
boxShadow: {
  'card':       '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(30,45,66,0.8)',
  'card-hover': '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,150,0.08)',
  'accent':     '0 0 20px rgba(0,200,150,0.15)',
  'danger':     '0 0 20px rgba(239,68,68,0.15)',
}
```

| Shadow | When to use |
|--------|-------------|
| `shadow-card` | Default on all Card components |
| `shadow-card-hover` | On Card hover state |
| `shadow-accent` | Primary button hover, active vehicle on map |
| `shadow-danger` | Critical alert toasts, danger button hover |

---

## 7 — COMPONENT SPECIFICATIONS

### 7.1 Card

```tsx
// Structure
<div className="bg-fleer-card rounded-xl border border-fleer-border shadow-card
                hover:border-fleer-accent/50 hover:shadow-card-hover
                transition-all duration-200 cursor-pointer">
```

- Default: `bg-fleer-card`, `border-fleer-border`, `shadow-card`
- Hover: `border-fleer-accent/50`, `shadow-card-hover`, `translateY(-2px)`
- Accent variant (savings only): add `border-l-2 border-l-fleer-accent`
- Never put a colored border on any card except the savings/highlight card

### 7.2 CardHeader

```tsx
<div className="flex items-start justify-between px-5 py-4 border-b border-fleer-border">
  <div className="flex items-center gap-3">
    {/* Icon container */}
    <div className="w-8 h-8 rounded-lg bg-fleer-accent/10 flex items-center justify-center text-fleer-accent">
      {icon}  {/* 16px icon */}
    </div>
    <div>
      <h3 className="font-display font-semibold text-fleer-text text-sm">{title}</h3>
      <p className="text-fleer-text-muted text-xs mt-0.5">{subtitle}</p>
    </div>
  </div>
  {action}
</div>
```

### 7.3 Badge / Status Pill

```tsx
// Base structure — always this pattern
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium font-display {variantClasses}">
  {dot && <span className="w-1.5 h-1.5 rounded-full {dotColor}" />}
  {label}
</span>

// Variant classes
success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
danger:  'bg-red-500/10 text-red-400 border border-red-500/20'
info:    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
neutral: 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
purple:  'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
```

Always include the animated dot for live vehicle statuses:
```tsx
<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-green" />
```

### 7.4 Button

```tsx
// Variant styles
primary:   'bg-fleer-accent text-fleer-bg hover:bg-fleer-accent/90 font-semibold shadow-accent'
secondary: 'bg-fleer-surface text-fleer-text border border-fleer-border hover:border-fleer-accent/50'
danger:    'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
ghost:     'text-fleer-text-muted hover:text-fleer-text hover:bg-fleer-surface'

// Size styles
sm:  'px-3 py-1.5 text-xs rounded-lg'
md:  'px-4 py-2 text-sm rounded-lg'
lg:  'px-6 py-3 text-base rounded-xl'

// Always include
'inline-flex items-center justify-center gap-2 font-display transition-all duration-200
 focus:outline-none focus:ring-2 focus:ring-fleer-accent/50
 disabled:opacity-40 disabled:cursor-not-allowed'
```

### 7.5 Input / Form Field

```tsx
// Standard input
<input className="
  bg-fleer-surface border border-fleer-border rounded-lg
  px-4 py-2.5 text-sm text-fleer-text font-display
  placeholder:text-fleer-text-dim
  focus:outline-none focus:border-fleer-accent/60
  focus:ring-2 focus:ring-fleer-accent/15
  transition-colors duration-150
  w-full
" />

// Label above input
<label className="block text-xs font-display font-medium text-fleer-text-muted mb-1.5 uppercase tracking-wider">
  Email
</label>
```

### 7.6 Sidebar Navigation

```tsx
// Nav item
<NavLink className={({ isActive }) => clsx(
  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-display font-medium transition-all duration-150',
  isActive
    ? 'bg-fleer-accent/10 text-fleer-accent border-l-2 border-l-fleer-accent pl-[10px]'
    : 'text-fleer-text-muted hover:text-fleer-text hover:bg-fleer-card'
)}>
  <Icon size={16} />
  {label}
</NavLink>

// Active padding note: pl-[10px] compensates for the 2px border-l so text doesn't shift
```

### 7.7 Progress Bar (Driver Score Breakdown)

```tsx
// Track
<div className="w-full bg-fleer-surface rounded-full h-1.5 overflow-hidden">
  // Fill
  <div
    className="h-full rounded-full transition-all duration-700"
    style={{ width: `${value}%`, background: SCORE_COLOR(value) }}
  />
</div>

// Full metric row
<div className="flex items-center gap-2">
  <span className="text-xs text-fleer-text-muted font-display w-36 shrink-0">{label}</span>
  {/* track */}
  <span className="text-xs font-mono text-fleer-text-muted w-8 text-right">{value}</span>
</div>
```

- Track height: always `h-1.5` (6px) for driver breakdown, `h-1` (4px) for compact versions
- Track background: `bg-fleer-surface` (not pure black, not border color)
- Fill color: always dynamic via `SCORE_COLOR(value)`
- Transition: `duration-700` for animated entry

### 7.8 Score Ring (SVG)

```tsx
function ScoreRing({ score, size = 64 }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = SCORE_COLOR(score);

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {/* Track */}
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#1E2D42" strokeWidth={4} />
      {/* Progress */}
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={4}
        strokeDasharray={`${progress} ${circumference}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.8s ease' }} />
      {/* Score text — counter-rotate to stay upright */}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize="14" fontWeight="700" fontFamily="'Space Grotesk'"
        style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%' }}>
        {score}
      </text>
    </svg>
  );
}
```

### 7.9 Fuel Bar

```tsx
// Wrapper
<div className="w-full bg-fleer-surface rounded-full h-2 overflow-hidden">
  <div
    className="h-full rounded-full transition-all duration-700"
    style={{ width: `${fuel_level}%`, background: fuelColor }}
  />
</div>
// fuelColor = fuel_level > 50 ? '#00C896' : fuel_level > 20 ? '#F59E0B' : '#EF4444'
```

### 7.10 Stat Card

```tsx
<div className="bg-fleer-card rounded-xl border border-fleer-border p-4">
  {/* Label */}
  <span className="text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider">
    {label}
  </span>
  {/* Value */}
  <div className="flex items-baseline gap-2 mt-1">
    <span className="font-display font-bold text-2xl text-fleer-text tabular-nums">
      {value}
    </span>
    {subValue && <span className="text-sm text-fleer-text-muted">{subValue}</span>}
  </div>
  {/* Trend */}
  {trend && (
    <div className="flex items-center gap-1 text-xs mt-1 {trendColor}">
      <TrendIcon size={12} />
      {trendLabel}
    </div>
  )}
</div>

// Savings card only — accent variant:
// Add: border-l-2 border-l-fleer-accent bg-fleer-accent/5
// Value color: text-fleer-accent (not text-fleer-text)
```

### 7.11 Alert Row

```tsx
<div className={clsx(
  'flex items-start gap-3 border-b border-fleer-border last:border-0 transition-colors',
  alert.resolved && 'opacity-50',
  !alert.resolved && alert.severity === 'critical' && 'bg-red-500/5'
)}>
  <span className="text-lg shrink-0 mt-0.5">{ANOMALY_ICONS[alert.type]}</span>
  <div className="flex-1 min-w-0">
    <p className="font-display font-semibold text-sm text-fleer-text">{anomalyLabel[alert.type]}</p>
    <p className="text-xs text-fleer-text-muted mt-0.5">
      <span className="font-mono">{alert.vehicle_plate}</span> · {alert.driver_name} · {formatRelative(alert.timestamp)}
    </p>
  </div>
  {alert.naira_value && (
    <span className="text-sm font-mono font-medium text-fleer-danger shrink-0">
      -{formatNaira(alert.naira_value)}
    </span>
  )}
</div>
```

### 7.12 Driver Leaderboard Row

```tsx
<div className="flex items-center gap-3 px-5 py-3 border-b border-fleer-border last:border-0 hover:bg-fleer-surface/50 transition-colors">
  {/* Rank — medal emoji for top 3, #{n} for rest */}
  <span className={`text-sm font-display font-bold w-5 text-center ${
    index === 0 ? 'text-yellow-400' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-600' : 'text-fleer-text-dim'
  }`}>
    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
  </span>
  {/* Avatar */}
  <div className="w-7 h-7 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent text-xs font-bold font-display shrink-0">
    {driver.name.charAt(0)}
  </div>
  {/* Name */}
  <div className="flex-1 min-w-0">
    <p className="text-sm font-display font-medium text-fleer-text truncate">{driver.name}</p>
    <p className="text-xs text-fleer-text-muted">{driver.trips_this_week} trips</p>
  </div>
  {/* Score */}
  <div className="text-right">
    <span className="text-base font-display font-bold tabular-nums" style={{ color: SCORE_COLOR(driver.score) }}>
      {driver.score}
    </span>
    <p className="text-xs text-fleer-text-muted">/ 100</p>
  </div>
</div>
```

### 7.13 Anomaly Banner (inside Driver Card)

```tsx
// Amber — most common
<div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
  <p className="text-xs text-amber-400 font-display font-medium">
    ⚠️ {driver.anomalies_this_week} anomalies this week
  </p>
</div>

// Red — critical count
<div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
  <p className="text-xs text-red-400 font-display font-medium">
    ⚠️ {driver.anomalies_this_week} anomalies this week
  </p>
</div>
```

### 7.14 TopBar Live Indicator

```tsx
// Connected
<div className="flex items-center gap-1.5 text-xs font-display font-medium px-2.5 py-1 rounded-full
                text-fleer-accent bg-fleer-accent/10 border border-fleer-accent/20">
  <span className="w-1.5 h-1.5 rounded-full bg-fleer-accent pulse-green" />
  LIVE
</div>

// Disconnected
<div className="flex items-center gap-1.5 text-xs font-display font-medium px-2.5 py-1 rounded-full
                text-fleer-text-muted bg-fleer-surface border border-fleer-border">
  <WifiOff size={11} />
  OFFLINE
</div>
```

### 7.15 Filter Tab Bar

```tsx
// Container
<div className="flex items-center gap-1 bg-fleer-surface border border-fleer-border rounded-xl p-1">
  {tabs.map(tab => (
    <button key={tab.value} onClick={() => setActive(tab.value)}
      className={`px-4 py-2 rounded-lg text-sm font-display font-medium transition-all duration-150 ${
        active === tab.value
          ? 'bg-fleer-card text-fleer-text shadow-sm'
          : 'text-fleer-text-muted hover:text-fleer-text'
      }`}>
      {tab.label}
    </button>
  ))}
</div>
```

### 7.16 Toast Notification

```tsx
// react-hot-toast config in App.tsx
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
```

### 7.17 Avatar / Initials Circle

```tsx
// Standard avatar
<div className="w-8 h-8 rounded-full bg-fleer-accent/10 flex items-center justify-center
                text-fleer-accent text-xs font-bold font-display shrink-0">
  {name.charAt(0).toUpperCase()}
</div>

// Large avatar (sidebar user)
<div className="w-10 h-10 rounded-full bg-fleer-accent/10 flex items-center justify-center
                text-fleer-accent text-sm font-bold font-display">
  {orgName.charAt(0).toUpperCase()}
</div>
```

### 7.18 Icon Container (in CardHeader / Stat)

```tsx
<div className="w-8 h-8 rounded-lg bg-fleer-accent/10 flex items-center justify-center text-fleer-accent">
  <IconComponent size={16} />
</div>
```

---

## 8 — INTERACTIVE STATES

Every interactive element must have visible hover and focus states. No exceptions.

| Element | Default | Hover | Focus / Active |
|---------|---------|-------|----------------|
| Card | `border-fleer-border` | `border-fleer-accent/50` + `translateY(-2px)` | — |
| Nav item | `text-muted`, transparent | `text-fleer-text`, `bg-fleer-card` | Green accent border + bg |
| Input | `border-fleer-border` | `border-fleer-border` (no change) | `border-fleer-accent/60` + soft ring |
| Button primary | `bg-fleer-accent` | `bg-fleer-accent/90`, `translateY(-1px)` | `ring-2 ring-fleer-accent/50` |
| Button secondary | `border-fleer-border` | `border-fleer-accent/50` | `ring-2 ring-fleer-accent/50` |
| Alert row | transparent | `bg-fleer-surface/50` | — |
| Tab / filter | `text-muted` | `text-fleer-text` | `bg-fleer-card text-fleer-text` |
| Sidebar item | `text-muted` | `text-fleer-text bg-fleer-card` | Green accent |
| TopBar button | `text-muted` | `text-fleer-text bg-fleer-surface` | `ring-fleer-accent/50` |

**All transitions:** `transition-all duration-150` or `transition-colors duration-200`. Never `duration-0`.

---

## 9 — ANIMATIONS

```css
/* index.css */

/* Live dot pulse */
@keyframes pulse-green {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.pulse-green { animation: pulse-green 2s ease-in-out infinite; }

/* Alert/panel slide-in from right */
@keyframes slide-in-right {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.slide-in { animation: slide-in-right 0.3s ease-out; }

/* Loading skeleton pulse */
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
```

| Animation | Applied To |
|-----------|------------|
| `pulse-green` | Live dot in TopBar, active vehicle dot in badges |
| `slide-in` | VehicleDetailPanel, alert panels |
| `animate-spin` | Button loading spinner (`border-t-transparent`) |
| `animate-pulse` | Skeleton loading cards |
| `transition: stroke-dasharray 0.8s ease` | Score ring on mount |
| `transition-all duration-700` | Progress bar fills on mount |

---

## 10 — PAGE LAYOUTS

### 10.1 Dashboard
```
[FleetSummaryBar — 5 stat cards in grid-cols-5, gap-4, mb-6]
[FleetMap — height: 380px, rounded-xl, mb-6]
[grid grid-cols-2 gap-6]
  [Card: AlertsLog compact]
  [Card: DriverLeaderboard]
```

### 10.2 Live Map
```
[Full height map: calc(100vh - 56px - 48px)]
[VehicleDetailPanel — absolute, right-4, top-4, bottom-4, w-80, z-[500]]
[Filter bar — absolute, top-4, left-4, z-[400]]
[Count badge — absolute, top-4, right-4, z-[400]]
```

### 10.3 Drivers
```
[grid grid-cols-2 xl:grid-cols-3 gap-4]
  [DriverScorecard × n]
```

### 10.4 Vehicles
```
[Search + Filter row, mb-6]
[grid grid-cols-3 xl:grid-cols-4 gap-4]
  [VehicleCard × n]
```

### 10.5 Alerts
```
[FilterTab bar, mb-6]
[Card: AlertsLog full — with resolve buttons]
```

### 10.6 Reports
```
[grid grid-cols-3 gap-4, mb-6]
  [Savings stat card (accent)]
  [Variance stat card]
  [Anomaly count card]
[Card: SavingsChart, mb-6]
[Card: FuelReconciliation table]
```

### 10.7 Login
```
[min-h-screen flex items-center justify-center bg-fleer-bg]
  [max-w-sm w-full]
    [Logo centered]
    [Card: form — email, password, submit button]
```

---

## 11 — SCROLLBAR STYLING

```css
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #111827; }
::-webkit-scrollbar-thumb { background: #1E2D42; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #334155; }
```

---

## 12 — LEAFLET MAP OVERRIDES

```css
.leaflet-container {
  background: #0A0E1A !important;
  font-family: 'DM Sans', sans-serif;
}
.leaflet-tile {
  filter: brightness(0.85) saturate(0.7) hue-rotate(180deg) invert(1);
}
```

**Do not change the tile CSS filter.** This is what makes OpenStreetMap tiles look native to the dark theme.

---

## 13 — FORMATTING UTILITIES

Always use these formatters. Never format inline.

```typescript
// src/lib/formatters.ts
formatNaira(1200000)  → '₦1.2M'
formatNaira(67200)    → '₦67K'
formatLitres(42.3)    → '42.3L'
formatKm(340)         → '340 km'
formatSpeed(67)       → '67 km/h'
formatRelative(ts)    → '12 mins ago'
formatTimestamp(ts)   → 'Apr 28, 11:43'
```

**Naira display rule:** Negative values (losses) get `-` prefix and `text-fleer-danger`. Positive values (savings) get no prefix and `text-fleer-accent`.

---

## 14 — DO / DON'T RULES

### ✅ DO
- Use `fleer-*` Tailwind tokens for every color reference
- Use `font-display` (Space Grotesk) for all labels, headings, and numbers
- Use `font-mono` (JetBrains Mono) for plates, coordinates, and ₦ values
- Add `tabular-nums` to every numeric display value
- Use `SCORE_COLOR(value)` — never hardcode score colors
- Keep progress bar track height at 4–6px
- Add `transition-all duration-150` or `duration-200` to every interactive element
- Use `formatNaira()` for every financial figure
- Add `pulse-green` class to all live status dots
- Add `slide-in` class to panels that animate in from the right
- Use `opacity-50` on resolved/inactive alert rows
- Use `bg-red-500/5` tint on critical unresolved alert rows
- Add `last:border-0` to remove the bottom border on the final list row
- Use `shrink-0` on icons and fixed-width elements inside flex rows
- Use `min-w-0` + `truncate` on flex children that could overflow

### ❌ DON'T
- Never hardcode hex colors in TSX/JSX (exceptions: SVG strokes/fills using SCORE_COLOR or VEHICLE_STATUS_COLORS constants)
- Never use `Inter`, `Roboto`, `Arial`, or `system-ui` fonts
- Never use arbitrary spacing values (`mt-[13px]`, `p-[7px]`)
- Never set `transition-duration: 0ms` on interactive elements
- Never use `border-radius` on sidebar left-border accents
- Never put a colored left border on any card except the savings/highlight stat card
- Never use white `#ffffff` as text-primary — always `#E2E8F0`
- Never render raw ₦ figures — always use `formatNaira()`
- Never use more than 3 font families on any single page
- Never disable Tailwind's `fleer-*` color tokens
- Never use `ShadingType.SOLID` in any table component
- Never place `bg-fleer-card` directly on `bg-fleer-card` (always use a layer in between)
- Never use `text-white` — use `text-fleer-text` instead
- Never omit `font-display` from badge, button, or nav text

---

## 15 — TAILWIND CONFIG REFERENCE

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fleer: {
          bg:           '#0A0E1A',
          surface:      '#111827',
          card:         '#1A2235',
          border:       '#1E2D42',
          accent:       '#00C896',
          'accent-dim': '#00C89620',
          warning:      '#F59E0B',
          danger:       '#EF4444',
          info:         '#3B82F6',
          text:         '#E2E8F0',
          'text-muted': '#64748B',
          'text-dim':   '#334155',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(30,45,66,0.8)',
        'card-hover': '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,150,0.08)',
        'accent':     '0 0 20px rgba(0,200,150,0.15)',
        'danger':     '0 0 20px rgba(239,68,68,0.15)',
      }
    },
  },
  plugins: [],
}
```

---

## 16 — QUICK COMPONENT CHECKLIST

When reviewing or building any component, verify:

- [ ] All colors use `fleer-*` tokens or semantic Tailwind (no hex literals in JSX)
- [ ] Text uses `font-display` or `font-mono` (no unstyled default font)
- [ ] Numeric values have `tabular-nums`
- [ ] All spacing uses token scale values (4, 8, 12, 16, 20, 24, 32px)
- [ ] Interactive elements have hover + focus states
- [ ] Transitions are present (`duration-150` or `duration-200`)
- [ ] Financial figures go through `formatNaira()`
- [ ] Vehicle plates use `font-mono`
- [ ] Score/fuel colors use the dynamic color functions, not static values
- [ ] List rows have `border-b border-fleer-border last:border-0`
- [ ] Cards have `shadow-card` + hover shadow
- [ ] Badges are `rounded-full`, not `rounded-md`
- [ ] Resolved/inactive items have `opacity-50`
- [ ] Critical alert rows have `bg-red-500/5` background tint

---

*End of FLEER_STYLE_GUIDE.md — v1.0*
*Reference this file in every prompt when building or fixing Fleer components.*
