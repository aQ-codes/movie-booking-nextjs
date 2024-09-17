import { getScreensByCinemasId } from "../repositories/screenRepository.js";

export const getScreensByCinemasIdController = async (req, res) => {
  try {
    console.log('Entered getScreensByCinemasIdController controller');
    console.log('req.params:', req.params);  // Log the entire req.params object

    const { cinemasId } = req.params; // Extract cinemasId from request parameters
    console.log('Cinemas ID:', cinemasId);  // Log cinemasId to verify it's being received

    if (!cinemasId) {
      return res.status(400).json({ message: 'Cinemas ID is required' });
    }

    const screens = await getScreensByCinemasId(cinemasId); // Fetch screens using repository
    if (!screens) {
      return res.status(404).json({ message: 'Screens not found' });
    }
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
