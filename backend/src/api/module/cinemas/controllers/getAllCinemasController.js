
import {getAllCinemas} from '../repositories/cinemasRepository.js';

// Controller to get all cinemas
export const getAllCinemasController = async (req, res) => {
  try {
    console.log("entered getallcinemscontroller")
    const cinemas = await getAllCinemas();
    res.status(200).json(cinemas); // Return list of cinemas
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};