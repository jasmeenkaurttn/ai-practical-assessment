import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { PaginatedTickets, TicketPriority, TicketStatus } from '@shared/types';
import { TICKET_PRIORITIES, TICKET_STATUSES, PRIORITY_LABELS, STATUS_LABELS } from '@shared/types';
import { fetchTickets } from '../services/api';
import { TicketCard } from '../components/TicketCard';

export function TicketListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState<PaginatedTickets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const status = (searchParams.get('status') as TicketStatus | null) ?? undefined;
  const priority = (searchParams.get('priority') as TicketPriority | null) ?? undefined;
  const search = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page') ?? '1');

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTickets({
        status,
        priority,
        search: search || undefined,
        page,
        limit: 10,
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, [status, priority, search, page]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete('page');
    setSearchParams(next);
  }

  function goToPage(nextPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Tickets</h1>
          <p>Manage and track support requests</p>
        </div>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="Search tickets..."
          defaultValue={search}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              updateFilter('search', (e.target as HTMLInputElement).value);
            }
          }}
          className="filter-search"
        />
        <select
          value={status ?? ''}
          onChange={(e) => updateFilter('status', e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {TICKET_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <select
          value={priority ?? ''}
          onChange={(e) => updateFilter('priority', e.target.value)}
          aria-label="Filter by priority"
        >
          <option value="">All priorities</option>
          {TICKET_PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="loading">Loading tickets...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && result && (
        <>
          {result.data.length === 0 ? (
            <div className="empty-state">
              <p>No tickets found.</p>
              <p>Try adjusting your filters or create a new ticket.</p>
            </div>
          ) : (
            <div className="ticket-list">
              {result.data.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}

          {result.pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-secondary btn-sm"
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
              >
                Previous
              </button>
              <span>
                Page {result.pagination.page} of {result.pagination.totalPages}
                {' '}({result.pagination.total} total)
              </span>
              <button
                className="btn btn-secondary btn-sm"
                disabled={page >= result.pagination.totalPages}
                onClick={() => goToPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
