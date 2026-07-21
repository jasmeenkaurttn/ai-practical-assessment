import type {
  CreateTicketInput,
  HealthResponse,
  PaginatedTickets,
  Ticket,
  TicketListQuery,
  UpdateTicketInput,
} from '@shared/types';
import { apiDelete, apiGet, apiPatch, apiPost } from './http';

function buildQueryString(query: TicketListQuery): string {
  const params = new URLSearchParams();

  if (query.status) params.set('status', query.status);
  if (query.priority) params.set('priority', query.priority);
  if (query.search) params.set('search', query.search);
  if (query.page) params.set('page', String(query.page));
  if (query.limit) params.set('limit', String(query.limit));

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export async function fetchHealth(): Promise<HealthResponse> {
  return apiGet<HealthResponse>('/health');
}

export async function fetchTickets(query: TicketListQuery = {}): Promise<PaginatedTickets> {
  return apiGet<PaginatedTickets>(`/tickets${buildQueryString(query)}`);
}

export async function fetchTicket(id: string): Promise<Ticket> {
  return apiGet<Ticket>(`/tickets/${id}`);
}

export async function createTicket(input: CreateTicketInput): Promise<Ticket> {
  return apiPost<Ticket>('/tickets', input);
}

export async function updateTicket(id: string, input: UpdateTicketInput): Promise<Ticket> {
  return apiPatch<Ticket>(`/tickets/${id}`, input);
}

export async function deleteTicket(id: string): Promise<void> {
  return apiDelete(`/tickets/${id}`);
}
