import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Ticket } from '@shared/types';
import { deleteTicket, fetchTicket } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchTicket(id)
      .then(setTicket)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!id || !window.confirm('Delete this ticket? This cannot be undone.')) return;

    setDeleting(true);
    try {
      await deleteTicket(id);
      navigate('/tickets');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete ticket');
      setDeleting(false);
    }
  }

  if (loading) return <div className="page"><p className="loading">Loading ticket...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;
  if (!ticket) return <div className="page"><p className="error">Ticket not found.</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/tickets" className="back-link">← Back to tickets</Link>
        <div className="detail-actions">
          <Link to={`/tickets/${ticket.id}/edit`} className="btn btn-secondary btn-sm">
            Edit
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <article className="ticket-detail">
        <div className="ticket-detail-header">
          <h1>{ticket.title}</h1>
          <div className="ticket-card-badges">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
        </div>

        <section className="ticket-detail-body">
          <h2>Description</h2>
          <p>{ticket.description}</p>
        </section>

        <footer className="ticket-detail-meta">
          <span>Created: {formatDateTime(ticket.createdAt)}</span>
          <span>Updated: {formatDateTime(ticket.updatedAt)}</span>
          <span className="ticket-id">ID: {ticket.id}</span>
        </footer>
      </article>
    </div>
  );
}
