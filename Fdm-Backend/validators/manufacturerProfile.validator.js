import { body } from 'express-validator';

export const upsertManufacturerProfileValidator = [
  body('companyName').optional().trim().isLength({ max: 100 }),
  body('location').optional().trim(),
  body('minimumOrderQuantity').optional().isInt({ min: 0 }),
  body('productionCapacity').optional().trim(),
  body('specializations').optional().isArray(),
  body('certifications').optional().isArray(),
];