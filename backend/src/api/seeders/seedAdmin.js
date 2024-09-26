import { findAdminByUsername, createAdmin } from '../module/admin/repositories/adminRepository.js'; 
import dotenv from 'dotenv';

dotenv.config(); 

const seedAdmin = async () => {
    try {
        const adminExists = await findAdminByUsername(process.env.ADMIN_USERNAME);

        if (!adminExists) {
            const admin = await createAdmin(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
            console.log('Admin created:', admin.username);
        } else {
            console.log('Admin already exists:', adminExists.username);
        }
    } catch (error) {
        console.error('Error creating admin:', error);
    }
};

export default seedAdmin;
