import { body } from 'express-validator';

// Validator for adding or updating a Screen
export const validateScreen = [
  // Validate screenNumber
  body('screenNumber')
    .isInt({ min: 1 })
    .withMessage('Screen number must be a positive integer'),

  // Validate screenType
  body('screenType')
    .isString()
    .withMessage('Screen type must be a string'),

  // Validate sections array
  body('sections')
    .isArray({ min: 1 })
    .withMessage('Sections must be an array with at least one section')
    .custom((sections) => {
      return sections.every(section =>
        typeof section.sectionNumber === 'number' &&
        section.sectionNumber >= 1 &&
        typeof section.sectionName === 'string'
      );
    })
    .withMessage('Each section must have a valid section number and name'),

  // Validate seatArrangement
  body('seatArrangement')
    .isString()
    .withMessage('Seat arrangement must be a string'),

  // Validate cinemas
  body('cinemas')
    .isMongoId()
    .withMessage('Cinema ID must be a valid MongoDB ObjectId'),
];
