import React from 'react';
import { AlertSeverity } from '../../types';
import { Badge, severityVariant } from '../ui/Badge';

const severityLabels: Record<AlertSeverity, string> = {
  critical: 'Critical',
  warning:  'Warning',
  info:     'Info',
};

export function AlertBadge({ severity }: { severity: AlertSeverity }) {
  return <Badge label={severityLabels[severity]} variant={severityVariant[severity]} dot />;
}
