// /validators/showValidator.js
import { body } from 'express-validator';

export const validateShow = [
  body('movieId')
    .notEmpty().withMessage('Movie ID is required')
    .isMongoId().withMessage('Movie ID must be a valid MongoDB ObjectId'),
  body('screenId')
    .notEmpty().withMessage('Screen ID is required')
    .isMongoId().withMessage('Screen ID must be a valid MongoDB ObjectId'),
  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Date must be a valid ISO 8601 date'),
  body('time')
    .notEmpty().withMessage('Time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Time must be in HH:MM format'),
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['disabled', 'completed', 'active']).withMessage('Status must be one of: disabled, completed, active'),
  body('prices')
    .isArray({ min: 1 }).withMessage('Prices must be an array with at least one entry')
    .custom((prices) => {
      return prices.every(priceEntry => {
        if (typeof priceEntry !== 'object' || !priceEntry.sectionId || typeof priceEntry.price !== 'number') {
          return false;
        }
        return true;
      });
    }).withMessage('Each price entry must be an object with a valid sectionId and price'),
  body('prices.*.sectionId')
    .notEmpty().withMessage('Section ID is required for each price entry')
    .isMongoId().withMessage('Section ID must be a valid MongoDB ObjectId'),
  body('prices.*.price')
    .notEmpty().withMessage('Price is required for each section')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('language')
    .optional()
    .isString().withMessage('Language must be a string'),
];
