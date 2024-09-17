import { getCinemasById } from "../repositories/cinemasRepository.js";

// Controller to get a cinema by ID
export const getCinemasByIdController = async (req, res) => {
  try {
    const cinema = await getCinemasById(req.params.id);
    if (!cinema) {
      return res.status(404).json({ message: 'Cinema not found' }); // Handle case where cinema is not found
    }
    res.status(200).json(cinema); // Return cinema
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

