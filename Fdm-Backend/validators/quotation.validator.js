import { body } from 'express-validator';

export const createQuotationValidator = [
  body('rfqId').notEmpty().withMessage('RFQ is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('productionDays').isInt({ min: 1 }).withMessage('Production days must be at least 1'),
  body('message').optional().trim().isLength({ max: 1000 }),
];