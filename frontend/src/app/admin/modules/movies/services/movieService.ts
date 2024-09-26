import { Movie, MovieWithId } from "@/models/models";
import { axiosInstance } from "@/config/axiosConfig";

// Function to add a new movie
export const addMovie = async (movieData: Movie) => {
  try {
    const response = await axiosInstance.post("/movies/add", movieData);
    return response;
  } catch (error: any) {
    throw error;
  }
};

// Fetch all movies
export const fetchMovies = async (): Promise<MovieWithId[]> => {
    const response = await axiosInstance.get("/movies/all");
    return response.data;
  };

  // Delete a movie by ID
export const deleteMovie = async (movieId: string): Promise<void> => {
    await axiosInstance.delete(`/api/movies/${movieId}`); // Adjust the endpoint as needed
  };