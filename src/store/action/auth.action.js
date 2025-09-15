import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../axios.lib/lib";
import { API_KEY } from "../conf/config";

export const createUser = createAsyncThunk(
    'auth/create',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post("/register", userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            console.log('before')
            const response = await api.post("/login", credentials);
            console.log('after')
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = getState().auth
            const response = await api.post('/logout',{}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    apikey: API_KEY
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
