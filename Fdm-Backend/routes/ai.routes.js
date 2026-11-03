import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { analyzeRequirementHandler, recommendManufacturersHandler } from '../controllers/ai.controller.js';
import { analyzeRequirementValidator } from '../validators/ai.validator.js';
import { verifyJWT, requireRole } from '../middleware/auth.middleware.js';

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { success: false, message: 'Too many AI requests, please try again later.' },
});

const router = Router();

router.use(verifyJWT);

router.post(
  '/analyze-requirement',
  requireRole('designer'),
  aiLimiter,
  analyzeRequirementValidator,
  analyzeRequirementHandler
);

router.get('/recommend-manufacturers/:projectId', requireRole('designer'), recommendManufacturersHandler);

export default router;