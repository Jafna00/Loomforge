import { body } from 'express-validator';

export const createRfqValidator = [
  body('projectId').notEmpty().withMessage('Project is required'),
  body('manufacturerId').notEmpty().withMessage('Manufacturer is required'),
  body('message').optional().trim().isLength({ max: 1000 }),
];