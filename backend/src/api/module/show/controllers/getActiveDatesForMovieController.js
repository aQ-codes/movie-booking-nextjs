import { getActiveDatesForMovie } from '../repositories/showRepository.js';

export const getActiveMovieDates = async (req, res) => {
    const { movieId } = req.params; // Extract movieId from the request params

    try {
    // Call the repository function to fetch active dates for the movie
    const activeDates = await getActiveDatesForMovie(movieId);

    // Respond with the list of active dates
    res.status(200).json({
        success: true,
        data: activeDates
    });
    } catch (error) {
    // Handle errors
    res.status(500).json({
        success: false,
        message: 'Failed to fetch active dates',
        error: error.message,
    });
    }
};
