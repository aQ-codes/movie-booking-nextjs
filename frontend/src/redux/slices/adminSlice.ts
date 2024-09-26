import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/config/axiosConfig';
import { AppDispatch, RootState } from '../store/store'; // Adjust import based on your project structure

interface AdminState {
    username: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AdminState = {
    username: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action: PayloadAction<Partial<AdminState>>) => {
            const { username, accessToken, refreshToken } = action.payload;
            state.username = username || null;
            state.accessToken = accessToken || null;
            state.refreshToken = refreshToken || null;
            state.isAuthenticated = !!accessToken;

            // Store admin data in sessionStorage
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('admin', JSON.stringify({
                    username,
                    accessToken,
                    refreshToken,
                }));
            }
        },
        logout: (state) => {
            state.username = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            // Remove admin data from sessionStorage
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('admin');
            }
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;

            // Update access token in sessionStorage
            const admin = JSON.parse(sessionStorage.getItem('admin') || '{}');
            admin.accessToken = action.payload;
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('admin', JSON.stringify(admin));
            }
        },
    },
});

export const { setAdmin, logout, setAccessToken } = adminSlice.actions;
export default adminSlice.reducer;

// Thunk to refresh access token
export const refreshAdminAccessToken = createAsyncThunk<void, void, { dispatch: AppDispatch; state: RootState }>(
    'admin/refreshAccessToken',
    async (_, { dispatch, getState }) => {
        const { refreshToken } = getState().admin;
        if (!refreshToken) {
            console.error('No refresh token available');
            return;
        }

        try {
            const response = await axiosInstance.post('admin/auth/token/refresh', { refreshToken });
            dispatch(setAccessToken(response.data.accessToken));
        } catch (error) {
            console.error('Failed to refresh access token', error);
        }
    }
);
