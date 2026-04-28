export const VEHICLE_STATUS_COLORS = {
  on_route: '#00C896',
  anomaly:  '#F59E0B',
  alert:    '#EF4444',
  idle:     '#6366F1',
  offline:  '#374151',
} as const;

export const VEHICLE_STATUS_LABELS = {
  on_route: 'On Route',
  anomaly:  'Anomaly',
  alert:    'Alert',
  idle:     'Idle',
  offline:  'Offline',
} as const;

export const SCORE_COLOR = (score: number): string => {
  if (score >= 80) return '#00C896';
  if (score >= 60) return '#F59E0B';
  return '#EF4444';
};

// Lagos bounding box for default map view
export const LAGOS_CENTER: [number, number] = [6.5244, 3.3792];
export const LAGOS_ZOOM = 11;

export const DIESEL_PRICE_PER_LITRE = 1600;

export const ANOMALY_ICONS: Record<string, string> = {
  fuel_siphoning:    '⛽',
  unauthorized_stop: '🛑',
  route_deviation:   '↗️',
  idle_abuse:        '😴',
  refuel_anomaly:    '⚠️',
  night_movement:    '🌙',
  speeding:          '💨',
  geofence_breach:   '📍',
};

// Mock data for frontend-only demo
export const MOCK_VEHICLES = [
  { id: '1', org_id: 'org1', plate: 'LND-341-GF', type: 'truck'   as const, fuel_capacity: 400, efficiency_baseline: 3.2, status: 'on_route' as const, current_lat: 6.5244, current_lng: 3.3792, current_speed: 67, fuel_level: 72, last_seen: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: '2', org_id: 'org1', plate: 'LND-882-KA', type: 'trailer' as const, fuel_capacity: 600, efficiency_baseline: 2.8, status: 'anomaly'  as const, current_lat: 6.4530, current_lng: 3.3958, current_speed: 0,  fuel_level: 34, last_seen: new Date(Date.now() - 12 * 60000).toISOString() },
  { id: '3', org_id: 'org1', plate: 'LND-119-BB', type: 'van'     as const, fuel_capacity: 200, efficiency_baseline: 5.1, status: 'idle'     as const, current_lat: 6.4698, current_lng: 3.5852, current_speed: 0,  fuel_level: 88, last_seen: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: '4', org_id: 'org1', plate: 'LND-557-JA', type: 'truck'   as const, fuel_capacity: 400, efficiency_baseline: 3.0, status: 'offline'  as const, fuel_level: 20, last_seen: new Date(Date.now() - 3600000).toISOString() },
  { id: '5', org_id: 'org1', plate: 'LND-773-XY', type: 'truck'   as const, fuel_capacity: 350, efficiency_baseline: 3.4, status: 'on_route' as const, current_lat: 6.5800, current_lng: 3.3200, current_speed: 54, fuel_level: 55, last_seen: new Date(Date.now() - 1 * 60000).toISOString() },
  { id: '6', org_id: 'org1', plate: 'LND-229-HK', type: 'bus'     as const, fuel_capacity: 300, efficiency_baseline: 4.0, status: 'alert'    as const, current_lat: 6.5100, current_lng: 3.4100, current_speed: 30, fuel_level: 18, last_seen: new Date(Date.now() - 8 * 60000).toISOString() },
];

export const MOCK_DRIVERS = [
  { id: 'd1', org_id: 'org1', name: 'Emeka Obi',     phone: '+234 801 234 5678', score: 88, trips_this_week: 12, anomalies_this_week: 0, score_breakdown: { unauthorized_stops: 95, fuel_anomalies: 90, route_compliance: 85, idle_time: 80, speed_compliance: 90 } },
  { id: 'd2', org_id: 'org1', name: 'Tunde Fashola', phone: '+234 802 345 6789', score: 74, trips_this_week: 9,  anomalies_this_week: 2, score_breakdown: { unauthorized_stops: 70, fuel_anomalies: 65, route_compliance: 82, idle_time: 75, speed_compliance: 78 } },
  { id: 'd3', org_id: 'org1', name: 'Chidi Okeke',   phone: '+234 803 456 7890', score: 55, trips_this_week: 7,  anomalies_this_week: 5, score_breakdown: { unauthorized_stops: 50, fuel_anomalies: 45, route_compliance: 60, idle_time: 55, speed_compliance: 65 } },
  { id: 'd4', org_id: 'org1', name: 'Amaka Nwosu',   phone: '+234 804 567 8901', score: 92, trips_this_week: 14, anomalies_this_week: 0, score_breakdown: { unauthorized_stops: 98, fuel_anomalies: 95, route_compliance: 92, idle_time: 88, speed_compliance: 87 } },
  { id: 'd5', org_id: 'org1', name: 'Bola Adeyemi',  phone: '+234 805 678 9012', score: 61, trips_this_week: 6,  anomalies_this_week: 3, score_breakdown: { unauthorized_stops: 62, fuel_anomalies: 58, route_compliance: 70, idle_time: 60, speed_compliance: 55 } },
];

export const MOCK_ANOMALIES = [
  { id: 'a1', vehicle_id: '2', vehicle_plate: 'LND-882-KA', driver_name: 'Tunde Fashola', type: 'fuel_siphoning'    as const, severity: 'critical' as const, timestamp: new Date(Date.now() - 15 * 60000).toISOString(), description: 'Fuel level dropped 18L without engine running.', naira_value: 28800, resolved: false },
  { id: 'a2', vehicle_id: '6', vehicle_plate: 'LND-229-HK', driver_name: 'Chidi Okeke',   type: 'unauthorized_stop'  as const, severity: 'warning'  as const, timestamp: new Date(Date.now() - 40 * 60000).toISOString(), description: 'Vehicle stopped outside approved zone for 34 minutes.', naira_value: 5000, resolved: false },
  { id: 'a3', vehicle_id: '3', vehicle_plate: 'LND-119-BB', driver_name: 'Amaka Nwosu',   type: 'idle_abuse'         as const, severity: 'warning'  as const, timestamp: new Date(Date.now() - 90 * 60000).toISOString(), description: 'Engine running idle for 47 minutes at Apapa Wharf.', naira_value: 12000, resolved: false },
  { id: 'a4', vehicle_id: '1', vehicle_plate: 'LND-341-GF', driver_name: 'Emeka Obi',     type: 'speeding'           as const, severity: 'info'     as const, timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), description: 'Speed exceeded 100km/h on Lagos-Ibadan Expressway.', naira_value: undefined, resolved: true },
  { id: 'a5', vehicle_id: '2', vehicle_plate: 'LND-882-KA', driver_name: 'Tunde Fashola', type: 'route_deviation'    as const, severity: 'warning'  as const, timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), description: 'Vehicle deviated 3.2km from approved route.', naira_value: 8000, resolved: true },
];
