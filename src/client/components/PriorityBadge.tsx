import { PRIORITY_LABELS, type TicketPriority } from '@shared/types';

const PRIORITY_CLASS: Record<TicketPriority, string> = {
  LOW: 'badge-priority-low',
  MEDIUM: 'badge-priority-medium',
  HIGH: 'badge-priority-high',
};

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`badge ${PRIORITY_CLASS[priority]}`}>{PRIORITY_LABELS[priority]}</span>
  );
}
