import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config(); 

console.log('Razorpay Key:', process.env.RAZORPAY_KEY_ID); // Debugging

// Initialize Razorpay instance with your keys
const razorpay = new Razorpay({

  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,

});


// Create an order
export const createOrder = async (req, res) => {
  try {
    console.log("entered razorpay")
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Amount is in the smallest unit of the currency, so convert to paise for INR
      currency: currency || 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Verify payment signature
export const verifyPayment = async (req, res) => {
  try {
    "entered verify payment"
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      // Payment is successful
      res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid signature, payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying payment', error });
  }
};
