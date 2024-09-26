import { axiosInstance } from '@/config/axiosConfig';
import { AdminAxiosInstance } from '@/config/axiosConfig';
import { AdminLoginResponse } from '../response/adminResponse';

// admin login request 
export const adminLoginRequest = (username: string, password: string) => {
  return axiosInstance.post<AdminLoginResponse>('/admin/login', { username, password });
};


// admin logout request
export const adminLogoutRequest = async (accessToken: string | null) => {
  console.log("Entered adminLogoutRequest");
  const axiosAdmin = AdminAxiosInstance(accessToken); 
  return await axiosAdmin.post('/logout');
};
