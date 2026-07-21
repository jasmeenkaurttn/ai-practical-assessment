import { useHealthCheck } from '../hooks/useHealthCheck';

export function HealthStatus() {
  const { health, loading, error } = useHealthCheck();

  if (loading) {
    return <p className="status loading">Checking system status...</p>;
  }

  if (error) {
    return <p className="status error">API unreachable: {error}</p>;
  }

  if (!health) {
    return null;
  }

  return (
    <div className="status-card">
      <h2>System Status</h2>
      <ul>
        <li>
          API: <span className={health.services.api === 'up' ? 'ok' : 'warn'}>{health.services.api}</span>
        </li>
        <li>
          Database:{' '}
          <span className={health.services.database === 'connected' ? 'ok' : 'warn'}>
            {health.services.database}
          </span>
        </li>
        <li>
          Overall: <span className={health.status === 'ok' ? 'ok' : 'warn'}>{health.status}</span>
        </li>
      </ul>
    </div>
  );
}
