 // Function to generate a 6-character booking ID starting with "VB"
 export const generateBookingId = () => {
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `VB${randomChars}`;
  };