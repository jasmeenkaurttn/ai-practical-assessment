import { STATUS_LABELS, type TicketStatus } from '@shared/types';

const STATUS_CLASS: Record<TicketStatus, string> = {
  OPEN: 'badge-open',
  IN_PROGRESS: 'badge-progress',
  RESOLVED: 'badge-resolved',
  CLOSED: 'badge-closed',
};

interface StatusBadgeProps {
  status: TicketStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`badge ${STATUS_CLASS[status]}`}>{STATUS_LABELS[status]}</span>;
}
