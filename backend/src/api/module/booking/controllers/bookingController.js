import { createBooking } from '../repositories/bookingRepository.js';

export const createNewBooking = async (req, res) => {
  try {
    console.log("entered booking controller")
    const { bookingId, show, customer, seats, amount } = req.body;

    const bookingData = {
      bookingId,
      show,
      customer,
      seats,
      amount,
      bookingStatus: 'confirmed'
    };

    const newBooking = await createBooking(bookingData);
    res.status(201).json({ booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error });
  }
};
