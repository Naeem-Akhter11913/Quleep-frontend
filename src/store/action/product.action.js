import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios.lib/lib";
import { API_KEY } from "../conf/config";

export const getProduct = createAsyncThunk('product/get',
    async (_, { rejectWithValue , getState }) => {
        try {
            const {accessToken} = getState().auth;
            
            const response = await api.get("/get-product",  {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    apikey: API_KEY
                }
            });

            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)