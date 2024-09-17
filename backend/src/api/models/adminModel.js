import mongoose from 'mongoose';

// Admin Schema : main admin to manage movies and theatres
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Creating Models
const Admin = mongoose.model('Admin', adminSchema);

// Export Model
export default Admin;