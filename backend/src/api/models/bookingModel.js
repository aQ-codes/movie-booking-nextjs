import mongoose from 'mongoose';

//customer books a particular show 
const bookingSchema = new mongoose.Schema({
    show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    seats: [{ type: String, required: true }], // Array of seat numbers or IDs
    amount: { type: Number, required: true },
    dateBooked: { type: Date, default: Date.now },
    bookingStatus: { type: String, enum: ["confirmed", "cancelled", "pending"], required: true },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater", required: true },
  });
  
  const Booking = mongoose.model("Booking", bookingSchema);
  
  export default Booking;
  