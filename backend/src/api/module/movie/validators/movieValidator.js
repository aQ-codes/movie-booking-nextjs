// /validators/movieValidator.js
import { body } from 'express-validator';

export const validateMovie = [
  body('title').notEmpty().withMessage('Title is required'),
  body('cast').isArray({ min: 1 }).withMessage('Cast must be an array with at least one member'),
  body('synopsis').notEmpty().withMessage('Synopsis is required'),
  body('runningTime').isInt({ min: 1 }).withMessage('Running time must be a positive integer'),
  body('poster').notEmpty().withMessage('Poster URL is required'),
  body('status')
    .isIn(['active', 'upcoming', 'completed'])
    .withMessage('Status must be one of: active, upcoming, completed'),
  body('genres')
    .isArray({ min: 1 }).withMessage('Genres must be an array with at least one genre')
    .custom((genres) => genres.every(genre => typeof genre === 'string')).withMessage('Each genre must be a string'),
];
