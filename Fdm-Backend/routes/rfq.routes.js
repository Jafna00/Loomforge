import { Router } from 'express';
import {
  createRfq,
  getMySentRfqs,
  getMyReceivedRfqs,
  getRfqById,
  markRfqReviewed,
} from '../controllers/rfq.controller.js';
import { createRfqValidator } from '../validators/rfq.validator.js';
import { verifyJWT, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.post('/', requireRole('designer'), createRfqValidator, createRfq);
router.get('/sent', requireRole('designer'), getMySentRfqs);
router.get('/received', requireRole('manufacturer'), getMyReceivedRfqs);
router.get('/:id', getRfqById);
router.patch('/:id/review', requireRole('manufacturer'), markRfqReviewed);

export default router;