import { body } from 'express-validator';

export const validateCinemas = [
  body('name').notEmpty().withMessage('Cinema name is required'),
  body('location').notEmpty().withMessage('Location is required'),
];
