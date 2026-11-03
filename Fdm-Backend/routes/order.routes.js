import { Router } from 'express';
import {
  getMyOrdersAsDesigner,
  getMyOrdersAsManufacturer,
  getOrderById,
  updateProductionStage,
} from '../controllers/order.controller.js';
import { verifyJWT, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.get('/designer/mine', requireRole('designer'), getMyOrdersAsDesigner);
router.get('/manufacturer/mine', requireRole('manufacturer'), getMyOrdersAsManufacturer);
router.get('/:id', getOrderById);
router.patch('/:id/stage', requireRole('manufacturer'), updateProductionStage);

export default router;