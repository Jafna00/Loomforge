import { Router } from 'express';
import {
  createProject,
  getMyProjects,
  getProjectById,
  getAllPublicProjects,
} from '../controllers/project.controller.js';
import { createProjectValidator } from '../validators/project.validator.js';
import { verifyJWT, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyJWT); // every project route requires login

router.post('/', requireRole('designer'), createProjectValidator, createProject);
router.get('/mine', requireRole('designer'), getMyProjects);
router.get('/public', getAllPublicProjects);
router.get('/:id', getProjectById);

export default router;