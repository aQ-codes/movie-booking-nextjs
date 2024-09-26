import { adminLoginRequest } from '../requests/adminRequests';
import { AdminLoginResponse } from '../response/adminResponse';
import { adminLogoutRequest } from '../requests/adminRequests';

//admin login service
export const adminLogin = async (username: string, password: string): Promise<AdminLoginResponse> => {
  try {
    const response = await adminLoginRequest(username, password);
    if (response.status === 200) {
      return response.data;  
    } else {
      throw new Error('Failed to log in');
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Admin Logout Service
export const adminLogout = async (accessToken: string | null): Promise<void> => {
  try {
    console.log("Entered adminLogout service");
    const response = await adminLogoutRequest(accessToken); // Pass the token to the request
    if (response.status !== 200) {
      throw new Error('Failed to log out');
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};
