import { getActiveShowsForMovie } from "../repositories/showRepository.js";

// Controller to fetch all active shows for a particular movie
export const getActiveShowsForMovieController = async (req, res) => {
    const { movieId } = req.params;

    try {
        const shows = await getActiveShowsForMovie(movieId);
        res.status(200).json({ shows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};