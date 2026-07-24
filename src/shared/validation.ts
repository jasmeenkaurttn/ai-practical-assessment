import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  type CreateTicketInput,
  type TicketListQuery,
  type TicketPriority,
  type TicketStatus,
  type UpdateTicketInput,
} from './types';

const MAX_TITLE_LENGTH = 200;
const MIN_DESCRIPTION_LENGTH = 10;

export { MAX_TITLE_LENGTH, MIN_DESCRIPTION_LENGTH };

export function isTicketStatus(value: string): value is TicketStatus {
  return TICKET_STATUSES.includes(value as TicketStatus);
}

export function isTicketPriority(value: string): value is TicketPriority {
  return TICKET_PRIORITIES.includes(value as TicketPriority);
}

export function validateCreateTicketInput(input: CreateTicketInput): string[] {
  const errors: string[] = [];

  if (!input.title?.trim()) {
    errors.push('Title is required.');
  } else if (input.title.trim().length > MAX_TITLE_LENGTH) {
    errors.push(`Title must be at most ${MAX_TITLE_LENGTH} characters.`);
  }

  if (!input.description?.trim()) {
    errors.push('Description is required.');
  } else if (input.description.trim().length < MIN_DESCRIPTION_LENGTH) {
    errors.push(`Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`);
  }

  if (input.priority !== undefined && !isTicketPriority(input.priority)) {
    errors.push('Priority must be LOW, MEDIUM, or HIGH.');
  }

  return errors;
}

export function validateUpdateTicketInput(input: UpdateTicketInput): string[] {
  const errors: string[] = [];

  if (input.title !== undefined) {
    if (!input.title.trim()) {
      errors.push('Title cannot be empty.');
    } else if (input.title.trim().length > MAX_TITLE_LENGTH) {
      errors.push(`Title must be at most ${MAX_TITLE_LENGTH} characters.`);
    }
  }

  if (input.description !== undefined) {
    if (!input.description.trim()) {
      errors.push('Description cannot be empty.');
    } else if (input.description.trim().length < MIN_DESCRIPTION_LENGTH) {
      errors.push(`Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`);
    }
  }

  if (input.status !== undefined && !isTicketStatus(input.status)) {
    errors.push('Status must be OPEN, IN_PROGRESS, RESOLVED, or CLOSED.');
  }

  if (input.priority !== undefined && !isTicketPriority(input.priority)) {
    errors.push('Priority must be LOW, MEDIUM, or HIGH.');
  }

  return errors;
}

export function validateTicketListQuery(query: TicketListQuery): string[] {
  const errors: string[] = [];

  if (query.status !== undefined && !isTicketStatus(query.status)) {
    errors.push('Invalid status filter.');
  }

  if (query.priority !== undefined && !isTicketPriority(query.priority)) {
    errors.push('Invalid priority filter.');
  }

  if (query.page !== undefined && (query.page < 1 || !Number.isInteger(query.page))) {
    errors.push('Page must be a positive integer.');
  }

  if (query.limit !== undefined && (query.limit < 1 || query.limit > 100 || !Number.isInteger(query.limit))) {
    errors.push('Limit must be between 1 and 100.');
  }

  return errors;
}

const ALLOWED_STATUS_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  OPEN: ['IN_PROGRESS', 'CLOSED'],
  IN_PROGRESS: ['OPEN', 'RESOLVED', 'CLOSED'],
  RESOLVED: ['IN_PROGRESS', 'CLOSED'],
  CLOSED: ['OPEN'],
};

export function isValidStatusTransition(from: TicketStatus, to: TicketStatus): boolean {
  if (from === to) {
    return true;
  }

  return ALLOWED_STATUS_TRANSITIONS[from].includes(to);
}

export function getAllowedStatusTransitions(from: TicketStatus): TicketStatus[] {
  return [from, ...ALLOWED_STATUS_TRANSITIONS[from]];
}
