import { getScreenDetailsById } from "../repositories/screenRepository.js";

// Controller to get a screen by ID
export const getScreenByIdController = async (req, res) => {
    try {
      console.log('Entered getScreenByIdController');
      console.log('req.params:', req.params);  // Log the entire req.params object
  
      const { screenId } = req.params; // Extract screenId from request parameters
      console.log('Screen ID:', screenId);  // Log screenId to verify it's being received
  
      if (!screenId) {
        return res.status(400).json({ message: 'Screen ID is required' });
      }
  
      const screen = await getScreenDetailsById(screenId); // Fetch screen using repository
      if (!screen) {
        return res.status(404).json({ message: 'Screen not found' });
      }

      console.log(screen)

      res.status(200).json(screen);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };