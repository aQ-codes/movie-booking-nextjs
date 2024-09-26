import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to check JWT token (access or refresh) and user role
const authMiddleware = (requiredRole) => (req, res, next) => {
  console.log("entered authmiddleware")
  const authHeader = req.header('Authorization');
  console.log("this is authheader: ",authHeader)
  const refreshToken = req.body.refreshToken; // Get refresh token from body

  // Check if access token is provided in the header
  if (authHeader) {
    console.log("auth header is there ")
    const accessToken = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

    if (!accessToken){
      console.log("access Token not there")
    }
    
    try {
      // Verify access token
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
      req.user = decoded; // Attach decoded token (user data) to req

      // If a requiredRole is provided, check if the user's role matches  
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).send('Access denied. Insufficient permissions.');
      }

      return next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.log('Access token verification failed:', error);
    }
  }

  else{
    console.log("authHeader Null")
  }



  // If no access token is provided or it's invalid, check for the refresh token
  if (!refreshToken) {
    return res.status(401).send('Access denied. No refresh token provided.');
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    req.user = { identity: decoded.identity, role: decoded.role }; // Attach user data for refresh token validation

    // If a requiredRole is provided, check if the user's role matches
    if (requiredRole && decoded.role !== requiredRole) {
      return res.status(403).send('Access denied. Insufficient permissions.');
    }

    return next(); // Proceed to the next middleware or controller
  } catch (err) {
    return res.status(401).send('Refresh token expired or invalid', err);
  }
};

export default authMiddleware;
