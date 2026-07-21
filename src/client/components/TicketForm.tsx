import { FormEvent, useState } from 'react';
import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  PRIORITY_LABELS,
  STATUS_LABELS,
  type CreateTicketInput,
  type Ticket,
  type TicketPriority,
  type TicketStatus,
  type UpdateTicketInput,
} from '@shared/types';

interface TicketFormProps {
  initial?: Ticket;
  allowedStatuses?: TicketStatus[];
  submitLabel: string;
  onSubmit: (data: CreateTicketInput | UpdateTicketInput) => Promise<void>;
  onCancel: () => void;
}

export function TicketForm({
  initial,
  allowedStatuses = TICKET_STATUSES,
  submitLabel,
  onSubmit,
  onCancel,
}: TicketFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [status, setStatus] = useState<TicketStatus>(initial?.status ?? 'OPEN');
  const [priority, setPriority] = useState<TicketPriority>(initial?.priority ?? 'MEDIUM');
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    try {
      if (initial) {
        await onSubmit({ title, description, status, priority });
      } else {
        await onSubmit({ title, description, priority });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save ticket';
      const details = (err as { details?: string[] }).details;
      setErrors(details?.length ? details : [message]);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="form-errors" role="alert">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief summary of the issue"
          maxLength={200}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue in detail (min 10 characters)"
          rows={6}
          required
        />
      </div>

      <div className="form-row">
        {initial && (
          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TicketStatus)}
            >
              {allowedStatuses.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
          >
            {TICKET_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
