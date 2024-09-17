import { validationResult } from 'express-validator';
import { addShow } from '../repositories/showRepository.js'; // Adjust the path as needed

export const addShowController = async (req, res) => {
    // Check for validation errors
    console.log("Entered addShowController");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    try {
        const showData = req.body; // Get show data from request body
        const show = await addShow(showData); // Add show using the repository function
        res.status(201).json({ message: 'Show added successfully', show }); // Return success response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};
 