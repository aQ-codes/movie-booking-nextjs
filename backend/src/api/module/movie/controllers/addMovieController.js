// controllers/movieController.js

import { validationResult } from 'express-validator'; 
// custom import 
import { addMovie } from '../repositories/movieRepository.js'; // 

// Controller to add a movie
export const addMovieController = async (req, res) => {
     // Check for validation errors
    console.log("entered addMovie controller")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }
    try {
    const movieData = req.body; // Get movie data from request body
    const movie = await addMovie(movieData); // Add movie using the repository function
    res.status(201).json({ message: 'Movie added successfully', movie }); // Return success response
    } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
    }
};
