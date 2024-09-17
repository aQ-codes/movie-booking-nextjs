// controllers/cinemaController.js

import { validationResult } from 'express-validator';
import { addCinemas } from '../repositories/cinemasRepository.js';

// Controller to add a cinema
export const addCinemasController = async (req, res) => {
  console.log("entered addCinemasController")
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors
  }
  try {
    const cinemasData = req.body; // Get cinema data from request body
    const cinemas = await addCinemas(cinemasData); // Add cinema using the repository function
    res.status(201).json({ message: 'Cinema added successfully', cinemas }); 
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};


// // Controller to update a cinema by ID
// export const updateCinemaController = async (req, res) => {
//   try {
//     const cinema = await updateCinema(req.params.id, req.body);
//     if (!cinema) {
//       return res.status(404).json({ message: 'Cinema not found' }); // Handle case where cinema is not found
//     }
//     res.status(200).json({ message: 'Cinema updated successfully', cinema }); // Return success response
//   } catch (error) {
//     res.status(500).json({ message: error.message }); // Handle server errors
//   }
// };

// // Controller to delete a cinema by ID
// export const deleteCinemaController = async (req, res) => {
//   try {
//     const cinema = await deleteCinema(req.params.id);
//     if (!cinema) {
//       return res.status(404).json({ message: 'Cinema not found' }); // Handle case where cinema is not found
//     }
//     res.status(200).json({ message: 'Cinema deleted successfully' }); // Return success response
//   } catch (error) {
//     res.status(500).json({ message: error.message }); // Handle server errors
//   }
// };
