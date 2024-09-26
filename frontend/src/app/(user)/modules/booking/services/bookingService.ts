import { axiosInstance } from '@/config/axiosConfig';

export const createBooking = async (bookingDetails: any) => {
  try {
    const response = await axiosInstance.post("/booking/create", bookingDetails);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Booking creation failed");
  }
};
