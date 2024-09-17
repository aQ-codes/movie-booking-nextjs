import mongoose from 'mongoose';

// these are the different users participating in the movie booking 

// user who is the customer 
const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true }, // Google OAuth ID
  email: { type: String, required: true, unique: true },
  isEmailVerified: { type: Boolean, default: false }, // Two-step verification status
});

// Creating Model
const User = mongoose.model('User', userSchema);


export default User;

