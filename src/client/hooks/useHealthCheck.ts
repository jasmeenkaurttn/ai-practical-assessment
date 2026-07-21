import { useEffect, useState } from 'react';
import { fetchHealth } from '../services/api';
import type { HealthResponse } from '@shared/types';

export function useHealthCheck() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { health, loading, error };
}
