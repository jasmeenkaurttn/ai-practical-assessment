import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Ticket, TicketStatus, UpdateTicketInput } from '@shared/types';
import { fetchTicket, updateTicket } from '../services/api';
import { TicketForm } from '../components/TicketForm';
import { ApiRequestError } from '../services/http';
import { getAllowedStatusTransitions } from '@shared/validation';

export function TicketEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allowedStatuses, setAllowedStatuses] = useState<TicketStatus[]>([]);

  useEffect(() => {
    if (!id) return;

    fetchTicket(id)
      .then((t) => {
        setTicket(t);
        setAllowedStatuses(getAllowedStatusTransitions(t.status));
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: UpdateTicketInput) {
    if (!id) return;

    try {
      const updated = await updateTicket(id, data);
      navigate(`/tickets/${updated.id}`);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        const error = new Error(err.message) as Error & { details?: string[] };
        error.details = err.details;
        throw error;
      }
      throw err;
    }
  }

  if (loading) return <div className="page"><p className="loading">Loading ticket...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;
  if (!ticket) return <div className="page"><p className="error">Ticket not found.</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Edit Ticket</h1>
        <p>Update ticket details and status</p>
      </div>
      <TicketForm
        initial={ticket}
        allowedStatuses={allowedStatuses}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/tickets/${ticket.id}`)}
      />
    </div>
  );
}
