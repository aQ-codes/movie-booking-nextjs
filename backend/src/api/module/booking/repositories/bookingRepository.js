// bookingRepository.ts
import Booking from "../../../models/bookingModel.js";

export const createBooking = async (bookingData) => {
    console.log("entered booking repository")

  const newBooking = new Booking(bookingData);
  return await newBooking.save();
};
