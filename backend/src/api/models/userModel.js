import mongoose from 'mongoose';

// user who is the customer 
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  isEmailVerified: { type: Boolean, default: false }, // Two-step verification status
});

// Creating Model
const User = mongoose.model('User', userSchema);


export default User;

