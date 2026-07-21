import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <Link to="/tickets" className="brand">
            Support Tickets
          </Link>
          <nav className="nav-links">
            <Link to="/tickets">All Tickets</Link>
            <Link to="/tickets/new" className="btn btn-primary btn-sm">
              + New Ticket
            </Link>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
