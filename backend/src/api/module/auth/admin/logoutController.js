import { removeAdminRefreshToken } from "../../admin/repositories/adminRepository.js";

// Admin logout controller
const adminLogout = async (req, res) => {
    console.log("entered admin logout")
    const { identity: username } = req.user; 

    try {
        await removeAdminRefreshToken(username); // Remove the refresh token from the database
        res.status(200).send('Logout successful');
    } catch (error) {
        res.status(500).send('Logout failed', error);
    }
};

export default adminLogout;