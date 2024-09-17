import { addScreen } from "../repositories/screenRepository.js";


// Add a new screen
export const addScreenController = async (req, res) => {
    try {
      const screenData = req.body; // Extract screen data from the request body
      const newScreen = await addScreen(screenData); // Use the repository to add the screen
      res.status(201).json(newScreen); // Respond with the newly created screen
    } catch (error) {
      res.status(500).json({ message: error.message }); // Respond with an error message if something goes wrong
    }
  };