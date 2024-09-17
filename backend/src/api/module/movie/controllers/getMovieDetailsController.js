// movieController.js
import { getMovieDetailsById } from "../repositories/movieRepository.js";

export const getMovieDetailsController = async (req, res) => {
    const { movieId } = req.params;

    try {
        const movie = await getMovieDetailsById(movieId);
        
        if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie details', error: error.message });
    }
};
