import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import adminReducer from '../slices/adminSlice'; // Import the admin slice

// Function to load admin data from sessionStorage
const loadAdminFromStorage = () => {
  if (typeof window !== 'undefined') {
    const storedAdmin = sessionStorage.getItem('admin');
    if (storedAdmin) {
      return JSON.parse(storedAdmin); // Parse the admin object from sessionStorage
    }
  }
  return undefined;
};

// Function to load user data from sessionStorage
const loadUserFromStorage = () => {
  if (typeof window !== 'undefined') {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser); // Parse the user object from sessionStorage
    }
  }
  return undefined;
};

// Define the store
export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
  // Preload the user and admin states from sessionStorage, if available
  preloadedState: {
    user: loadUserFromStorage(), // Set the initial state for user from sessionStorage
    admin: loadAdminFromStorage(), // Set the initial state for admin from sessionStorage
  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
