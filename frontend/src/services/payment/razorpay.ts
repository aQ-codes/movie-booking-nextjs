
import { axiosInstance } from "@/config/axiosConfig"; 

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const createOrder = async (amount: number, currency: string = 'INR') => {
  try {
    const { data: order } = await axiosInstance.post('/booking/create-order', {
      amount, // Amount in smallest unit of currency
      currency,
    });
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Error creating order');
  }
};

export const verifyPayment = async (response: RazorpayResponse) => {
  try {
    const { data: verificationResponse } = await axiosInstance.post('/booking/verify-payment', {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    });
    return verificationResponse;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw new Error('Error verifying payment');
  }
};

export const initializeRazorpay = (order: any, onSuccess: (response: RazorpayResponse) => void) => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    amount: order.amount,
    currency: 'INR',
    name: 'Your Company Name',
    description: 'Test Transaction',
    order_id: order.orderId, // Razorpay order ID returned from backend
    handler: onSuccess,
    theme: {
      color: '#F37254',
    },
  };

  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();
};
