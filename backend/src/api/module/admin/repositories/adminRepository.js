import bcrypt from 'bcrypt';
import Admin from '../../../models/adminModel.js'; 

//find existing admin
export const findAdminByUsername = async (username) => {
    return await Admin.findOne({ username });
};

// create a new admin 
export const createAdmin = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
        username,
        password: hashedPassword,
    });
    return await admin.save();
};

// Repository function to remove refresh token from admin
export const removeAdminRefreshToken = async (username) => {
    try {
        await Admin.findOneAndUpdate({ username }, { refreshToken: null });
    } catch (error) {
        console.error('Error removing refresh token:', error);
        throw new Error('Database error');
    }
};