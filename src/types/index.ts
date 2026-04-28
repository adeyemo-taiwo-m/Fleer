// ─── Organization ───────────────────────────────────────────────
export interface Organization {
  id: string;
  name: string;
  plan: 'starter' | 'professional' | 'enterprise';
  created_at: string;
}

// ─── Vehicle ─────────────────────────────────────────────────────
export type VehicleStatus = 'on_route' | 'anomaly' | 'alert' | 'idle' | 'offline';

export interface Vehicle {
  id: string;
  org_id: string;
  plate: string;
  type: 'truck' | 'van' | 'trailer' | 'bus';
  fuel_capacity: number;
  efficiency_baseline: number;
  status: VehicleStatus;
  current_driver_id?: string;
  last_seen?: string;
  current_lat?: number;
  current_lng?: number;
  current_speed?: number;
  fuel_level?: number;
}

// ─── Driver ──────────────────────────────────────────────────────
export interface Driver {
  id: string;
  org_id: string;
  name: string;
  phone: string;
  rfid_tag?: string;
  score: number;
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
  fuel_expected: number;
  fuel_actual: number;
  fuel_variance: number;
  status: 'active' | 'completed';
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
  | 'fuel_siphoning'
  | 'unauthorized_stop'
  | 'route_deviation'
  | 'idle_abuse'
  | 'refuel_anomaly'
  | 'night_movement'
  | 'speeding'
  | 'geofence_breach';

export type AlertSeverity = 'critical' | 'warning' | 'info';

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
  naira_value?: number;
  resolved: boolean;
  resolver_id?: string;
  resolved_at?: string;
}

// ─── Fuel Event ──────────────────────────────────────────────────
export interface FuelEvent {
  id: string;
  vehicle_id: string;
  type: 'refuel' | 'anomaly' | 'drain';
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
