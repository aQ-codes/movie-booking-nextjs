import { findAdminByUsername } from '../../admin/repositories/adminRepository.js'; 
import { validateAdminLogin } from '../../admin/validators/validateAdmin.js'; 
import { generateAccessToken, generateRefreshToken } from '../token/generateToken.js'; 
import bcrypt from 'bcrypt';

// Admin Login controller
const adminLogin = async (req, res) => {
    console.log("entered admin signin");
    const { username, password } = req.body;

    // Validate username and password
    const { error } = validateAdminLogin({ username, password });
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // Check if the admin exists in the database
        const admin = await findAdminByUsername(username);
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Issue tokens
        const accessToken = generateAccessToken(admin.username, 'admin');
        const refreshToken = generateRefreshToken(admin.username, 'admin');

        // Store refresh token in the database
        admin.refreshToken = refreshToken;
        await admin.save(); // Update admin with the refresh token  

        // Send tokens to the client
        return res.status(200).json({ accessToken, refreshToken, username: admin.username });
    } catch (err) {
        return res.status(500).send('Server error', err);
    }
};

export default adminLogin;
