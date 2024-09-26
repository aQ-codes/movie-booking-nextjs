import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Function to send WhatsApp message without QR code
export const sendMessage = async (to, message) => {
  try {
    console.log("entered twilio service");
    
    // Send WhatsApp message without the QR code
    const result = await client.messages.create({
      body: message, // Your message content
      from: 'whatsapp:+14155238886', // Twilio WhatsApp sandbox number
      to: `whatsapp:${to}`, // WhatsApp number of the recipient
    });
    
    return result;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error(error.message);
  }
};
