import {axiosInstance} from "@/config/axiosConfig";

// Function to search movies by name
export const searchMovies = async (searchTerm: string) => {
    try {
        const response = await axiosInstance.get(`/movies/search?name=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error("Error searching for movies:", error);
        throw new Error("Could not fetch movies");
    }
};
