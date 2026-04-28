import { format, formatDistanceToNow } from 'date-fns';
import { AnomalyType, AlertSeverity } from '../types';

export const formatNaira = (amount: number): string => {
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}K`;
  return `₦${amount.toLocaleString()}`;
};

export const formatLitres = (litres: number): string => `${litres.toFixed(1)}L`;

export const formatKm = (km: number): string => `${km.toFixed(0)} km`;

export const formatSpeed = (speed: number): string => `${speed.toFixed(0)} km/h`;

export const formatTimestamp = (ts: string): string =>
  format(new Date(ts), 'MMM d, HH:mm');

export const formatRelative = (ts: string): string =>
  formatDistanceToNow(new Date(ts), { addSuffix: true });

export const anomalyLabel: Record<AnomalyType, string> = {
  fuel_siphoning:    'Fuel Siphoning',
  unauthorized_stop: 'Unauthorized Stop',
  route_deviation:   'Route Deviation',
  idle_abuse:        'Idle Abuse',
  refuel_anomaly:    'Refuel Anomaly',
  night_movement:    'Night Movement',
  speeding:          'Speeding',
  geofence_breach:   'Geofence Breach',
};

export const severityColor: Record<AlertSeverity, string> = {
  critical: 'text-red-400',
  warning:  'text-amber-400',
  info:     'text-blue-400',
};

export const severityBg: Record<AlertSeverity, string> = {
  critical: 'bg-red-500/10 border border-red-500/20',
  warning:  'bg-amber-500/10 border border-amber-500/20',
  info:     'bg-blue-500/10 border border-blue-500/20',
};
