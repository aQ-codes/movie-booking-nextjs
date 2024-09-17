import { getActiveMoviesWithActiveShows } from "../repositories/activeMoviesRepository.js";

// Controller to fetch all active movies with active shows

export const getActiveMoviesController = async (req, res) => {
    try {
        console.log('entered active movies controller')
        const movies = await getActiveMoviesWithActiveShows();
        console.log('activemoviescontroller',movies)
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};