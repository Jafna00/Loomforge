import { Router } from 'express';
import {
  upsertMyProfile,
  getMyProfile,
  getAllManufacturers,
  getManufacturerById,
} from '../controllers/manufacturerProfile.controller.js';
import { upsertManufacturerProfileValidator } from '../validators/manufacturerProfile.validator.js';
import { verifyJWT, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.get('/me', requireRole('manufacturer'), getMyProfile);
router.put('/me', requireRole('manufacturer'), upsertManufacturerProfileValidator, upsertMyProfile);
router.get('/', getAllManufacturers); // any logged-in user (designers) can browse
router.get('/:id', getManufacturerById);

export default router;