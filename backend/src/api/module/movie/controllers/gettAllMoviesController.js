import { getAllMovies } from "../repositories/movieRepository.js"; 

// Controller to get all movies
export const getAllMoviesController = async (req, res) => {
    try {
    console.log("entered getallmoviescontroller")
    const movies = await getAllMovies(); // Fetch all movies from the repository

    if (!movies || movies.length === 0) {
        // If no movies are found
        return res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json(movies); // Send movies as JSON response
    } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message }); // Handle server errors
    }
};


