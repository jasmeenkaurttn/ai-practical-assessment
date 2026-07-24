import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Ticket } from '@shared/types';
import { deleteTicket, fetchTicket } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { ConfirmModal } from '../components/ConfirmModal';
import { useToast } from '../context/ToastContext';

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
  const { showToast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchTicket(id)
      .then(setTicket)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function confirmDelete() {
    if (!id) return;

    setDeleting(true);
    try {
      await deleteTicket(id);
      showToast('Ticket deleted successfully');
      navigate('/tickets');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete ticket');
      setDeleting(false);
      setShowDeleteModal(false);
    }
  }

  if (loading) return <div className="page"><p className="loading">Loading ticket...</p></div>;
  if (error && !ticket) return <div className="page"><p className="error">{error}</p></div>;
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
            onClick={() => setShowDeleteModal(true)}
            disabled={deleting}
          >
            Delete
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

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

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete ticket?"
        message={`"${ticket.title}" will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
