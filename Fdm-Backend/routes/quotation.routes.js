import { Router } from 'express';
import {
  createQuotation,
  getQuotationsForProject,
  getMySubmittedQuotations,
  getQuotationById,
  acceptQuotation,
   getMyQuotationsAsDesigner,
} from '../controllers/quotation.controller.js';
import { createQuotationValidator } from '../validators/quotation.validator.js';
import { verifyJWT, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.post('/', requireRole('manufacturer'), createQuotationValidator, createQuotation);
router.get('/mine', requireRole('manufacturer'), getMySubmittedQuotations);
router.get('/designer/mine', requireRole('designer'), getMyQuotationsAsDesigner);
router.get('/project/:projectId', requireRole('designer'), getQuotationsForProject);
router.get('/:id', getQuotationById);
router.patch('/:id/accept', requireRole('designer'), acceptQuotation);

export default router;