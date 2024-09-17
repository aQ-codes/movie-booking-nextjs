import axiosInstance from "@/utils/axiosConfig";

export const fetchActiveMovies = async () => {
  try {
    const response = await axiosInstance.get('/movies/active');
    return response.data; // Assuming the API returns the movies array in the data field
  } catch (error) {
    console.error('Error fetching active movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId: string) => {
  try {
    const response = await axiosInstance.get(`/movies/details/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};