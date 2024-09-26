import express from "express";
import { createOrder, verifyPayment } from "../module/booking/controllers/paymentController.js";
import { createNewBooking } from "../module/booking/controllers/bookingController.js";
import { validateBooking } from "../module/booking/validators/bookingValidator.js";
import { sendTicket } from "../module/booking/controllers/ticketController.js";

const router = express.Router();

// Create a new booking
router.post('/create', validateBooking,  createNewBooking); 
router.post('/ticket/send',sendTicket ); 

// Create Razorpay order
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

export default router;
