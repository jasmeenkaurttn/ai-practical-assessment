import { describe, expect, it } from 'vitest';
import {
  getAllowedStatusTransitions,
  isTicketPriority,
  isTicketStatus,
  isValidStatusTransition,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  validateCreateTicketInput,
  validateTicketListQuery,
  validateUpdateTicketInput,
} from '../src/shared/validation';
import { TICKET_STATUSES } from '../src/shared/types';

const validDescription = 'A'.repeat(MIN_DESCRIPTION_LENGTH);
const maxTitle = 'T'.repeat(MAX_TITLE_LENGTH);
const overMaxTitle = 'T'.repeat(MAX_TITLE_LENGTH + 1);

describe('isTicketStatus', () => {
  it.each(TICKET_STATUSES)('returns true for valid status %s', (status) => {
    expect(isTicketStatus(status)).toBe(true);
  });

  it('returns false for invalid status', () => {
    expect(isTicketStatus('INVALID')).toBe(false);
    expect(isTicketStatus('')).toBe(false);
  });
});

describe('isTicketPriority', () => {
  it('returns true for valid priorities', () => {
    expect(isTicketPriority('LOW')).toBe(true);
    expect(isTicketPriority('MEDIUM')).toBe(true);
    expect(isTicketPriority('HIGH')).toBe(true);
  });

  it('returns false for invalid priority', () => {
    expect(isTicketPriority('URGENT')).toBe(false);
  });
});

describe('validateCreateTicketInput', () => {
  it('accepts valid input with all fields', () => {
    const errors = validateCreateTicketInput({
      title: 'Test ticket',
      description: 'This is a valid description.',
      priority: 'HIGH',
    });
    expect(errors).toHaveLength(0);
  });

  it('accepts valid input without priority', () => {
    const errors = validateCreateTicketInput({
      title: 'Test ticket',
      description: validDescription,
    });
    expect(errors).toHaveLength(0);
  });

  it('accepts title at exactly max length', () => {
    const errors = validateCreateTicketInput({
      title: maxTitle,
      description: validDescription,
    });
    expect(errors).toHaveLength(0);
  });

  it('accepts description at exactly min length', () => {
    const errors = validateCreateTicketInput({
      title: 'Valid title',
      description: validDescription,
    });
    expect(errors).toHaveLength(0);
  });

  it('rejects empty title', () => {
    const errors = validateCreateTicketInput({
      title: '',
      description: validDescription,
    });
    expect(errors).toContain('Title is required.');
  });

  it('rejects whitespace-only title', () => {
    const errors = validateCreateTicketInput({
      title: '   ',
      description: validDescription,
    });
    expect(errors).toContain('Title is required.');
  });

  it('rejects title over max length', () => {
    const errors = validateCreateTicketInput({
      title: overMaxTitle,
      description: validDescription,
    });
    expect(errors).toContain(`Title must be at most ${MAX_TITLE_LENGTH} characters.`);
  });

  it('rejects empty description', () => {
    const errors = validateCreateTicketInput({
      title: 'Valid title',
      description: '',
    });
    expect(errors).toContain('Description is required.');
  });

  it('rejects description one character below minimum', () => {
    const errors = validateCreateTicketInput({
      title: 'Valid title',
      description: 'A'.repeat(MIN_DESCRIPTION_LENGTH - 1),
    });
    expect(errors).toContain(
      `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`
    );
  });

  it('rejects invalid priority', () => {
    const errors = validateCreateTicketInput({
      title: 'Valid title',
      description: validDescription,
      priority: 'URGENT' as 'HIGH',
    });
    expect(errors).toContain('Priority must be LOW, MEDIUM, or HIGH.');
  });

  it('collects multiple validation errors', () => {
    const errors = validateCreateTicketInput({
      title: '',
      description: 'short',
      priority: 'INVALID' as 'HIGH',
    });
    expect(errors.length).toBeGreaterThanOrEqual(3);
  });
});

describe('validateUpdateTicketInput', () => {
  it('accepts empty update object', () => {
    expect(validateUpdateTicketInput({})).toHaveLength(0);
  });

  it('accepts valid partial update', () => {
    const errors = validateUpdateTicketInput({
      title: 'Updated title',
      priority: 'LOW',
    });
    expect(errors).toHaveLength(0);
  });

  it('rejects empty title when provided', () => {
    const errors = validateUpdateTicketInput({ title: '  ' });
    expect(errors).toContain('Title cannot be empty.');
  });

  it('rejects title over max length', () => {
    const errors = validateUpdateTicketInput({ title: overMaxTitle });
    expect(errors).toContain(`Title must be at most ${MAX_TITLE_LENGTH} characters.`);
  });

  it('rejects short description when provided', () => {
    const errors = validateUpdateTicketInput({ description: 'too short' });
    expect(errors).toContain(
      `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`
    );
  });

  it('rejects invalid status', () => {
    const errors = validateUpdateTicketInput({ status: 'INVALID' as 'OPEN' });
    expect(errors).toContain('Status must be OPEN, IN_PROGRESS, RESOLVED, or CLOSED.');
  });

  it('rejects invalid priority', () => {
    const errors = validateUpdateTicketInput({ priority: 'INVALID' as 'HIGH' });
    expect(errors).toContain('Priority must be LOW, MEDIUM, or HIGH.');
  });
});

describe('validateTicketListQuery', () => {
  it('accepts empty query', () => {
    expect(validateTicketListQuery({})).toHaveLength(0);
  });

  it('accepts valid filters and pagination', () => {
    const errors = validateTicketListQuery({
      status: 'OPEN',
      priority: 'HIGH',
      page: 1,
      limit: 10,
    });
    expect(errors).toHaveLength(0);
  });

  it('rejects invalid status filter', () => {
    const errors = validateTicketListQuery({ status: 'INVALID' as 'OPEN' });
    expect(errors).toContain('Invalid status filter.');
  });

  it('rejects invalid priority filter', () => {
    const errors = validateTicketListQuery({ priority: 'INVALID' as 'HIGH' });
    expect(errors).toContain('Invalid priority filter.');
  });

  it('rejects non-positive page', () => {
    expect(validateTicketListQuery({ page: 0 })).toContain(
      'Page must be a positive integer.'
    );
    expect(validateTicketListQuery({ page: -1 })).toContain(
      'Page must be a positive integer.'
    );
  });

  it('rejects non-integer page', () => {
    const errors = validateTicketListQuery({ page: 1.5 });
    expect(errors).toContain('Page must be a positive integer.');
  });

  it('rejects limit below 1', () => {
    const errors = validateTicketListQuery({ limit: 0 });
    expect(errors).toContain('Limit must be between 1 and 100.');
  });

  it('rejects limit above 100', () => {
    const errors = validateTicketListQuery({ limit: 101 });
    expect(errors).toContain('Limit must be between 1 and 100.');
  });

  it('accepts limit at boundaries', () => {
    expect(validateTicketListQuery({ limit: 1 })).toHaveLength(0);
    expect(validateTicketListQuery({ limit: 100 })).toHaveLength(0);
  });
});

describe('isValidStatusTransition', () => {
  it('allows staying on the same status', () => {
    for (const status of TICKET_STATUSES) {
      expect(isValidStatusTransition(status, status)).toBe(true);
    }
  });

  it('allows OPEN to IN_PROGRESS and CLOSED', () => {
    expect(isValidStatusTransition('OPEN', 'IN_PROGRESS')).toBe(true);
    expect(isValidStatusTransition('OPEN', 'CLOSED')).toBe(true);
  });

  it('blocks OPEN to RESOLVED', () => {
    expect(isValidStatusTransition('OPEN', 'RESOLVED')).toBe(false);
  });

  it('allows IN_PROGRESS to OPEN, RESOLVED, and CLOSED', () => {
    expect(isValidStatusTransition('IN_PROGRESS', 'OPEN')).toBe(true);
    expect(isValidStatusTransition('IN_PROGRESS', 'RESOLVED')).toBe(true);
    expect(isValidStatusTransition('IN_PROGRESS', 'CLOSED')).toBe(true);
  });

  it('allows RESOLVED to IN_PROGRESS and CLOSED', () => {
    expect(isValidStatusTransition('RESOLVED', 'IN_PROGRESS')).toBe(true);
    expect(isValidStatusTransition('RESOLVED', 'CLOSED')).toBe(true);
  });

  it('blocks RESOLVED to OPEN', () => {
    expect(isValidStatusTransition('RESOLVED', 'OPEN')).toBe(false);
  });

  it('allows CLOSED to OPEN (reopen)', () => {
    expect(isValidStatusTransition('CLOSED', 'OPEN')).toBe(true);
  });

  it('blocks CLOSED to IN_PROGRESS', () => {
    expect(isValidStatusTransition('CLOSED', 'IN_PROGRESS')).toBe(false);
  });
});

describe('getAllowedStatusTransitions', () => {
  it('includes current status plus allowed transitions for OPEN', () => {
    expect(getAllowedStatusTransitions('OPEN')).toEqual([
      'OPEN',
      'IN_PROGRESS',
      'CLOSED',
    ]);
  });

  it('includes current status plus allowed transitions for IN_PROGRESS', () => {
    expect(getAllowedStatusTransitions('IN_PROGRESS')).toEqual([
      'IN_PROGRESS',
      'OPEN',
      'RESOLVED',
      'CLOSED',
    ]);
  });

  it('includes current status plus allowed transitions for RESOLVED', () => {
    expect(getAllowedStatusTransitions('RESOLVED')).toEqual([
      'RESOLVED',
      'IN_PROGRESS',
      'CLOSED',
    ]);
  });

  it('includes current status plus allowed transitions for CLOSED', () => {
    expect(getAllowedStatusTransitions('CLOSED')).toEqual(['CLOSED', 'OPEN']);
  });
});
