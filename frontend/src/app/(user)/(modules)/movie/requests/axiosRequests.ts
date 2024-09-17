import axiosInstance from "@/utils/axiosConfig";


export const fetchActiveDatesForMovie = async (movieId: string): Promise<string[]> => {
    try {
        const response = await axiosInstance.get(`/shows/active/${movieId}/dates`);
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching active dates:', error);
        throw error;
    }
};

export const fetchCinemasForMovieAndDate = async (movieId: string, date: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/cinemas/${movieId}/${date}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching cinemas:', error);
        throw error;
    }
};