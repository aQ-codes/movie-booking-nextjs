import { sendMessage } from "../../../../services/twilioService.js"; 

export const sendTicket = async (req, res) => {

  console.log("entered ticket controller");
  console.log(req.body)
  const { to, message } = req.body;

  try {
    await sendMessage(to, message);
    return res.status(200).json({ success: true, msg: 'Message with QR code sent successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};
