import { axiosInstance } from "@/config/axiosConfig";

export const fetchShowDetailsById = async (showId: string): Promise<any> => {
    try {
      const response = await axiosInstance.get(`/shows/get/${showId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching show details:', error);
      throw error; // Re-throw the error so it can be handled by the caller
    }
};

export const getShowPricesWithSections = async (showId: string) => {
  try {
    const response = await axiosInstance.get(`/shows/get/price/${showId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching show prices with sections:', error);
    throw error;
  }
};