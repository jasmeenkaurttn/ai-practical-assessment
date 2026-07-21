import { PrismaClient, TicketPriority, TicketStatus } from '@prisma/client';

const prisma = new PrismaClient();

const seedTickets = [
  {
    id: 'a1000000-0000-4000-8000-000000000001',
    title: 'Cannot reset password',
    description: 'User reports the password reset email never arrives. Checked spam folder.',
    status: TicketStatus.OPEN,
    priority: TicketPriority.HIGH,
  },
  {
    id: 'a1000000-0000-4000-8000-000000000002',
    title: 'Dashboard loading slowly',
    description: 'Analytics dashboard takes over 10 seconds to load on first visit.',
    status: TicketStatus.IN_PROGRESS,
    priority: TicketPriority.MEDIUM,
  },
  {
    id: 'a1000000-0000-4000-8000-000000000003',
    title: 'Export CSV feature request',
    description: 'Customer wants to export ticket history as CSV from the admin panel.',
    status: TicketStatus.OPEN,
    priority: TicketPriority.LOW,
  },
  {
    id: 'a1000000-0000-4000-8000-000000000004',
    title: 'Login page mobile layout broken',
    description: 'Submit button is cut off on iPhone 14 viewport.',
    status: TicketStatus.RESOLVED,
    priority: TicketPriority.HIGH,
  },
  {
    id: 'a1000000-0000-4000-8000-000000000005',
    title: 'Duplicate charge on invoice',
    description: 'Billing shows two charges for the same subscription period.',
    status: TicketStatus.CLOSED,
    priority: TicketPriority.HIGH,
  },
];

async function main() {
  for (const ticket of seedTickets) {
    await prisma.ticket.upsert({
      where: { id: ticket.id },
      update: ticket,
      create: ticket,
    });
  }

  console.log(`Seeded ${seedTickets.length} tickets.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
