import { Request, Response, NextFunction } from 'express';
import {
  createTicket,
  deleteTicket,
  getTicketById,
  listTickets,
  StatusTransitionError,
  updateTicket,
} from '../services/ticketService';
import {
  isTicketPriority,
  isTicketStatus,
  validateCreateTicketInput,
  validateTicketListQuery,
  validateUpdateTicketInput,
} from '../../shared/validation';
import type { CreateTicketInput, TicketListQuery, UpdateTicketInput } from '../../shared/types';

function parseListQuery(req: Request): TicketListQuery {
  const query: TicketListQuery = {};

  if (typeof req.query.status === 'string' && isTicketStatus(req.query.status)) {
    query.status = req.query.status;
  }

  if (typeof req.query.priority === 'string' && isTicketPriority(req.query.priority)) {
    query.priority = req.query.priority;
  }

  if (typeof req.query.search === 'string' && req.query.search.trim()) {
    query.search = req.query.search.trim();
  }

  if (typeof req.query.page === 'string') {
    query.page = parseInt(req.query.page, 10);
  }

  if (typeof req.query.limit === 'string') {
    query.limit = parseInt(req.query.limit, 10);
  }

  return query;
}

export async function getTickets(req: Request, res: Response, next: NextFunction) {
  try {
    const query = parseListQuery(req);
    const errors = validateTicketListQuery(query);

    if (errors.length > 0) {
      res.status(400).json({ error: { message: 'Validation failed', statusCode: 400, details: errors } });
      return;
    }

    const result = await listTickets(query);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getTicket(req: Request, res: Response, next: NextFunction) {
  try {
    const ticket = await getTicketById(req.params.id);

    if (!ticket) {
      res.status(404).json({ error: { message: 'Ticket not found', statusCode: 404 } });
      return;
    }

    res.json(ticket);
  } catch (error) {
    next(error);
  }
}

export async function postTicket(req: Request, res: Response, next: NextFunction) {
  try {
    const input = req.body as CreateTicketInput;
    const errors = validateCreateTicketInput(input);

    if (errors.length > 0) {
      res.status(400).json({ error: { message: 'Validation failed', statusCode: 400, details: errors } });
      return;
    }

    const ticket = await createTicket(input);
    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
}

export async function patchTicket(req: Request, res: Response, next: NextFunction) {
  try {
    const input = req.body as UpdateTicketInput;
    const errors = validateUpdateTicketInput(input);

    if (errors.length > 0) {
      res.status(400).json({ error: { message: 'Validation failed', statusCode: 400, details: errors } });
      return;
    }

    if (Object.keys(input).length === 0) {
      res.status(400).json({ error: { message: 'No fields to update', statusCode: 400 } });
      return;
    }

    try {
      const ticket = await updateTicket(req.params.id, input);

      if (!ticket) {
        res.status(404).json({ error: { message: 'Ticket not found', statusCode: 404 } });
        return;
      }

      res.json(ticket);
    } catch (error) {
      if (error instanceof StatusTransitionError) {
        res.status(400).json({
          error: {
            message: error.message,
            statusCode: 400,
            details: [`Allowed transitions from ${error.from}: ${error.allowed.join(', ')}`],
          },
        });
        return;
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

export async function removeTicket(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await deleteTicket(req.params.id);

    if (!deleted) {
      res.status(404).json({ error: { message: 'Ticket not found', statusCode: 404 } });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
