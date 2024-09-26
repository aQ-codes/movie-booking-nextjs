import { generateAccessToken } from './generateToken.js';
import User from '../../../models/userModel.js';

const refreshAccessToken = async (req, res) => {
  // Get the user information from the middleware
  const { identity, role } = req.user; // Access identity and role directly from req.user

  // Find the user by email
  const user = await User.findOne({ email: identity });

  if (!user || user.refreshToken !== req.body.refreshToken) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  // Generate new access token
  const newAccessToken = generateAccessToken(identity, role);

  return res.status(200).json({ accessToken: newAccessToken });
};

export default refreshAccessToken;
