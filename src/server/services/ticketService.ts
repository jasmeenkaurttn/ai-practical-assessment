import { Ticket, Prisma } from '@prisma/client';
import { prisma } from '../lib/db';
import {
  getAllowedStatusTransitions,
  isValidStatusTransition,
} from '../../shared/validation';
import type {
  CreateTicketInput,
  PaginatedTickets,
  TicketListQuery,
  TicketPriority,
  TicketStatus,
  UpdateTicketInput,
} from '../../shared/types';

function toTicketResponse(ticket: Ticket) {
  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status as TicketStatus,
    priority: ticket.priority as TicketPriority,
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
  };
}

export async function listTickets(query: TicketListQuery): Promise<PaginatedTickets> {
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;
  const skip = (page - 1) * limit;

  const where: Prisma.TicketWhereInput = {};

  if (query.status) {
    where.status = query.status;
  }

  if (query.priority) {
    where.priority = query.priority;
  }

  if (query.search?.trim()) {
    where.OR = [
      { title: { contains: query.search.trim(), mode: 'insensitive' } },
      { description: { contains: query.search.trim(), mode: 'insensitive' } },
    ];
  }

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.ticket.count({ where }),
  ]);

  return {
    data: tickets.map(toTicketResponse),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

export async function getTicketById(id: string) {
  const ticket = await prisma.ticket.findUnique({ where: { id } });
  return ticket ? toTicketResponse(ticket) : null;
}

export async function createTicket(input: CreateTicketInput) {
  const ticket = await prisma.ticket.create({
    data: {
      title: input.title.trim(),
      description: input.description.trim(),
      priority: input.priority ?? 'MEDIUM',
    },
  });

  return toTicketResponse(ticket);
}

export async function updateTicket(id: string, input: UpdateTicketInput) {
  const existing = await prisma.ticket.findUnique({ where: { id } });

  if (!existing) {
    return null;
  }

  if (input.status && !isValidStatusTransition(existing.status as TicketStatus, input.status)) {
    const allowed = getAllowedStatusTransitions(existing.status as TicketStatus);
    throw new StatusTransitionError(existing.status as TicketStatus, input.status, allowed);
  }

  const ticket = await prisma.ticket.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title.trim() }),
      ...(input.description !== undefined && { description: input.description.trim() }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.priority !== undefined && { priority: input.priority }),
    },
  });

  return toTicketResponse(ticket);
}

export async function deleteTicket(id: string) {
  const existing = await prisma.ticket.findUnique({ where: { id } });

  if (!existing) {
    return false;
  }

  await prisma.ticket.delete({ where: { id } });
  return true;
}

export class StatusTransitionError extends Error {
  statusCode = 400;

  constructor(
    public from: TicketStatus,
    public to: TicketStatus,
    public allowed: TicketStatus[]
  ) {
    super(
      `Cannot transition status from ${from} to ${to}. Allowed: ${allowed.join(', ')}.`
    );
    this.name = 'StatusTransitionError';
  }
}
