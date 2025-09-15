import { createSlice } from "@reduxjs/toolkit"
import { createUser, loginUser, logoutUser } from "../action/auth.action";



const initialState = {
    user: null,
    products: [],
    successMessage: null,
    errorMessage: null,
    loading: false,
    accessToken: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.errorMessage = null;
            state.successMessage = null
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    },

    extraReducers: builder => {
        builder
            .addCase(createUser.pending, state => {
                state.loading = true
            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.message;
                state.products = payload.products;
                state.user = payload.user
            })
            .addCase(createUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload.message;
            })


            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.accessToken = payload.accessToken;
                state.successMessage = payload.message;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload?.message || payload;
            })

            .addCase(logoutUser.pending, state =>{
                state.loading = true;
            })

            .addCase(logoutUser.fulfilled, (state , {payload}) =>{
                state.loading = false;
                state.accessToken = null;
                state.products = [];
                state.successMessage = payload.message
            })

            .addCase(logoutUser.rejected, (state, {payload}) =>{
                state.loading = false;
                state.errorMessage = payload.message || payload
            })

    }
});

export const { clearMessage, setAccessToken , logout } = authSlice.actions;

export default authSlice.reducer;