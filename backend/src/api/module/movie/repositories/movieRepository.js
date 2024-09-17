import Movie from '../../../models/movieModel.js';

//add movie 
export const addMovie = async (movieData) => {
    try {
        const newMovie = new Movie(movieData);
        return await newMovie.save(); // Save the movie to the database
    } catch (error) {
        console.log(error)
        throw new Error('Error adding movie to the database'); 
    }
};

//get all movies list
export const getAllMovies = async () => {
  return await Movie.find();  // Fetches all movies from the database
};

//find the details of a movie by its id
export const getMovieDetailsById = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    return movie;
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching movie details');
  }
};


export const updateMovie = async (id, movieData) => {
  return await Movie.findByIdAndUpdate(id, movieData, { new: true });  // Updates a movie by ID
};

export const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);  // Deletes a movie by ID
};


// Repository function to search for movies by name
export const searchMoviesByName = async (name) => {
    try {
        // Use regex to search for movies that start with the given name (case-insensitive)
        const movies = await Movie.find({ title: { $regex: `^${name}`, $options: 'i' } });
        return movies;
    } catch (error) {
        throw new Error("Error fetching movies: " + error.message);
    }
};


