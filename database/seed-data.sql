-- Support Ticket Management System
-- Seed data for local development

INSERT INTO "tickets" ("id", "title", "description", "status", "priority", "created_at", "updated_at")
VALUES
  (
    'a1000000-0000-4000-8000-000000000001',
    'Cannot reset password',
    'User reports the password reset email never arrives. Checked spam folder.',
    'OPEN',
    'HIGH',
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '2 days'
  ),
  (
    'a1000000-0000-4000-8000-000000000002',
    'Dashboard loading slowly',
    'Analytics dashboard takes over 10 seconds to load on first visit.',
    'IN_PROGRESS',
    'MEDIUM',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '6 hours'
  ),
  (
    'a1000000-0000-4000-8000-000000000003',
    'Export CSV feature request',
    'Customer wants to export ticket history as CSV from the admin panel.',
    'OPEN',
    'LOW',
    NOW() - INTERVAL '5 hours',
    NOW() - INTERVAL '5 hours'
  ),
  (
    'a1000000-0000-4000-8000-000000000004',
    'Login page mobile layout broken',
    'Submit button is cut off on iPhone 14 viewport.',
    'RESOLVED',
    'HIGH',
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '1 day'
  ),
  (
    'a1000000-0000-4000-8000-000000000005',
    'Duplicate charge on invoice',
    'Billing shows two charges for the same subscription period.',
    'CLOSED',
    'HIGH',
    NOW() - INTERVAL '7 days',
    NOW() - INTERVAL '4 days'
  );
