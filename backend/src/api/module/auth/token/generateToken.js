import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

// Generate Access Token with identity and role
export const generateAccessToken = (identity, role) => {
  return jwt.sign(
    { identity, role },  // Add role to the payload
    process.env.JWT_ACCESS_TOKEN_SECRET, 
    { expiresIn: '15m' }  // Set expiration for 15 minutes
  );
};

// Generate Refresh Token with identity and role
export const generateRefreshToken = (identity, role) => {
  return jwt.sign(
    { identity, role },  // Add role to the payload
    process.env.JWT_REFRESH_TOKEN_SECRET, 
    { expiresIn: '1d' }  // Set expiration for 1 day
  );
};
