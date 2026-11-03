import { body } from 'express-validator';

export const createProjectValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('budget').isFloat({ min: 0 }).withMessage('Budget must be a positive number'),
  body('deadline').isISO8601().withMessage('Deadline must be a valid date'),
  body('visibility')
    .optional()
    .isIn(['public', 'private'])
    .withMessage('Visibility must be public or private'),
];