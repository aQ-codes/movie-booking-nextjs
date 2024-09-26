import { axiosInstance } from "@/config/axiosConfig";

// Function to send booking details to the backend for sending via WhatsApp
export const sendTicketDetails = async (bookingDetails: {
  to: string; 
  message: string; 
}) => {
  try {
    console.log("entered send ticket detaisl")
    const response = await axiosInstance.post("/booking/ticket/send", bookingDetails);
    return response.data;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
};
