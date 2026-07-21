import { Router } from 'express';
import {
  getTicket,
  getTickets,
  patchTicket,
  postTicket,
  removeTicket,
} from '../controllers/ticketController';

const router = Router();

router.get('/', getTickets);
router.get('/:id', getTicket);
router.post('/', postTicket);
router.patch('/:id', patchTicket);
router.delete('/:id', removeTicket);

export default router;
