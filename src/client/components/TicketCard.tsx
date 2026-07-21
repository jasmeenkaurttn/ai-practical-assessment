import { Link } from 'react-router-dom';
import type { Ticket } from '@shared/types';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';

interface TicketCardProps {
  ticket: Ticket;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <article className="ticket-card">
      <div className="ticket-card-header">
        <Link to={`/tickets/${ticket.id}`} className="ticket-card-title">
          {ticket.title}
        </Link>
        <div className="ticket-card-badges">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>
      </div>
      <p className="ticket-card-description">{ticket.description}</p>
      <footer className="ticket-card-footer">
        <span>Created {formatDate(ticket.createdAt)}</span>
        <Link to={`/tickets/${ticket.id}`} className="link">
          View details →
        </Link>
      </footer>
    </article>
  );
}
