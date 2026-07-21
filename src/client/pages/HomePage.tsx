import { HealthStatus } from '../components/HealthStatus';

export function HomePage() {
  return (
    <main className="page">
      <header>
        <h1>Support Ticket Management System</h1>
        <p>Foundation shell — M1 bootstrap complete. Ticket features coming in M3/M4.</p>
      </header>
      <HealthStatus />
    </main>
  );
}
