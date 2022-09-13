import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        user: null
    }, 
    reducers: {
        registerSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token)
            state.token = action.payload.token
            state.isAuthenticated = true
            state.loading = false
        },
        registerFail: (state, action) => {
            localStorage.removeItem('token')
            state.token = null
            state.isAuthenticated = false
            state.loading = false
        }
    }
})

export const { registerSuccess, registerFail } = authSlice.actions

export default authSlice.reducer