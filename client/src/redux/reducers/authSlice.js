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
        authSuccess: (state, { payload }) => {
            localStorage.setItem('token', payload.token)
            state.token = payload.token
            state.loading = false
        },
        authFail: (state, action) => {
            localStorage.removeItem('token')
            state.token = null
            state.isAuthenticated = false
            state.loading = false
            state.user = null
        },
        userLoaded: (state, { payload }) => {
            state.isAuthenticated = true
            state.loading = false
            state.user = payload.user
        }
    }
})

export const { 
    authSuccess, 
    authFail,
    userLoaded
} = authSlice.actions

export default authSlice.reducer