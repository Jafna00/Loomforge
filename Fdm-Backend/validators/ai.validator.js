import { body } from 'express-validator';

export const analyzeRequirementValidator = [
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Please describe what you want to manufacture')
    .isLength({ max: 1000 })
    .withMessage('Description is too long'),
];