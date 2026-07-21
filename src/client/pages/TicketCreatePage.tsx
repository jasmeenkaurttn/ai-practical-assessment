import { useNavigate } from 'react-router-dom';
import type { CreateTicketInput } from '@shared/types';
import { createTicket } from '../services/api';
import { TicketForm } from '../components/TicketForm';
import { ApiRequestError } from '../services/http';

export function TicketCreatePage() {
  const navigate = useNavigate();

  async function handleSubmit(data: CreateTicketInput) {
    try {
      const ticket = await createTicket(data);
      navigate(`/tickets/${ticket.id}`);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        const error = new Error(err.message) as Error & { details?: string[] };
        error.details = err.details;
        throw error;
      }
      throw err;
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Create Ticket</h1>
        <p>Submit a new support request</p>
      </div>
      <TicketForm
        submitLabel="Create Ticket"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/tickets')}
      />
    </div>
  );
}
