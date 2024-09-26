import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

//axios instance for user protected routes
export const UserAxiosInstance = () => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken); // Specify RootState type // Get user token from Redux

  const userAxiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", 
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "", // Attach user token if available
    }
  });

  return userAxiosInstance;
}

// AdminAxiosInstance to take accessToken as a parameter
export const AdminAxiosInstance = (accessToken: string | null) => {
  const adminAxiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/admin",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : ""
    },
  });

  console.log('Access Token being sent:', accessToken);

  return adminAxiosInstance;
};




