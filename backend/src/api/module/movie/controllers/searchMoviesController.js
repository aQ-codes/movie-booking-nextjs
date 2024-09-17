import { searchMoviesByName } from "../repositories/movieRepository.js";

// Controller to search movies by name
export const searchMoviesController = async (req, res) => {
    try {
        const { name } = req.query; // Get the search term from query params
        if (!name) {
            return res.status(400).json({ message: "Movie name is required" });
        }

        const movies = await searchMoviesByName(name); // Fetch movies based on search term

        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: "No movies found" });
        }
        res.status(200).json(movies); // Return the found movies
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
};
