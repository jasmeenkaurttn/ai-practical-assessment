import { Router, Request, Response } from 'express';
import { checkDatabaseConnection } from '../lib/db';

const router = Router();

router.get('/health', async (_req: Request, res: Response) => {
  const databaseConnected = await checkDatabaseConnection();

  const status = databaseConnected ? 'ok' : 'degraded';
  const statusCode = databaseConnected ? 200 : 503;

  res.status(statusCode).json({
    status,
    timestamp: new Date().toISOString(),
    services: {
      api: 'up',
      database: databaseConnected ? 'connected' : 'disconnected',
    },
  });
});

export default router;
