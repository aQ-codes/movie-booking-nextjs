import mongoose from 'mongoose';

// Booking schema with bookingId
const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true }, // Unique booking ID, e.g., 'VBXXXX'
  show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  seats: [{ type: String, required: true }],
  amount: { type: Number, required: true },
  dateBooked: { type: Date, default: Date.now },
  bookingStatus: { type: String, enum: ["confirmed", "cancelled", "pending"], required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
