import { describe, expect, it } from 'vitest';
import {
  isValidStatusTransition,
  validateCreateTicketInput,
  validateUpdateTicketInput,
} from '../src/shared/validation';

describe('validateCreateTicketInput', () => {
  it('accepts valid input', () => {
    const errors = validateCreateTicketInput({
      title: 'Test ticket',
      description: 'This is a valid description.',
      priority: 'HIGH',
    });
    expect(errors).toHaveLength(0);
  });

  it('rejects empty title', () => {
    const errors = validateCreateTicketInput({
      title: '',
      description: 'This is a valid description.',
    });
    expect(errors).toContain('Title is required.');
  });

  it('rejects short description', () => {
    const errors = validateCreateTicketInput({
      title: 'Test',
      description: 'short',
    });
    expect(errors.some((e) => e.includes('Description'))).toBe(true);
  });
});

describe('validateUpdateTicketInput', () => {
  it('rejects invalid status', () => {
    const errors = validateUpdateTicketInput({ status: 'INVALID' as 'OPEN' });
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('isValidStatusTransition', () => {
  it('allows OPEN to IN_PROGRESS', () => {
    expect(isValidStatusTransition('OPEN', 'IN_PROGRESS')).toBe(true);
  });

  it('blocks OPEN to RESOLVED', () => {
    expect(isValidStatusTransition('OPEN', 'RESOLVED')).toBe(false);
  });

  it('allows CLOSED to OPEN (reopen)', () => {
    expect(isValidStatusTransition('CLOSED', 'OPEN')).toBe(true);
  });
});
