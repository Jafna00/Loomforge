import { body } from 'express-validator';

export const upsertDesignerProfileValidator = [
  body('brandName').optional().trim().isLength({ max: 100 }),
  body('bio').optional().trim().isLength({ max: 500 }),
  body('location').optional().trim(),
  body('categories').optional().isArray().withMessage('Categories must be an array'),
  body('experience').optional().trim(),
];