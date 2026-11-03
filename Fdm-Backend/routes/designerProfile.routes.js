import { Router } from 'express';
import {
  upsertMyProfile,
  getMyProfile,
  getProfileByUserId,
} from '../controllers/designerProfile.controller.js';
import { upsertDesignerProfileValidator } from '../validators/designerProfile.validator.js';
import { verifyJWT, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.get('/me', requireRole('designer'), getMyProfile);
router.put('/me', requireRole('designer'), upsertDesignerProfileValidator, upsertMyProfile);
router.get('/:userId', getProfileByUserId); // manufacturers can view, no role restriction

export default router;