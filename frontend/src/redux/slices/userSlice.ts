import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/config/axiosConfig';
import { AppDispatch, RootState } from '../store/store'; // Adjust import based on your project structure

interface UserState {
  email: string | null;
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  email: null,
  userId: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      const { email, userId, accessToken, refreshToken } = action.payload;
      state.email = email || null;
      state.userId = userId || null;
      state.accessToken = accessToken || null;
      state.refreshToken = refreshToken || null;
      state.isAuthenticated = !!accessToken;

      // Store user data in sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify({
          email,
          userId,
          accessToken,
          refreshToken,
        }));
      }
    },
    logout: (state) => {
      state.email = null;
      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Remove user data from sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user');
      }
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;

      // Update access token in sessionStorage
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      user.accessToken = action.payload;
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    },
  },
});


export const { setUser, logout, setAccessToken } = userSlice.actions;
export default userSlice.reducer;

// Thunk to refresh access token
export const refreshAccessToken = createAsyncThunk<void, void, { dispatch: AppDispatch; state: RootState }>(
  'user/refreshAccessToken',
  async (_, { dispatch, getState }) => {
    const { refreshToken } = getState().user;
    if (!refreshToken) {
      console.error('No refresh token available');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/token/refresh', { refreshToken });
      dispatch(setAccessToken(response.data.accessToken));
    } catch (error) {
      console.error('Failed to refresh access token', error);
    }
  }
);
