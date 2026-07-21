export interface HealthResponse {
  status: 'ok' | 'degraded';
  timestamp: string;
  services: {
    api: string;
    database: 'connected' | 'disconnected';
  };
}

export interface ApiError {
  error: {
    message: string;
    statusCode: number;
  };
}
