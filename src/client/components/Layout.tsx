import { Link, Outlet } from 'react-router-dom';
import { ToastProvider } from '../context/ToastContext';
import { ToastContainer } from './ToastContainer';

export function Layout() {
  return (
    <ToastProvider>
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
        <ToastContainer />
      </div>
    </ToastProvider>
  );
}
