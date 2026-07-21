import { Router } from 'express';
import healthRouter from './health';
import ticketsRouter from './tickets';

const router = Router();

router.use(healthRouter);
router.use('/tickets', ticketsRouter);

export default router;
