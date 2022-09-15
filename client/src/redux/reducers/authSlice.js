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
        registerSuccess: (state, { payload }) => {
            localStorage.setItem('token', payload.token)
            state.token = payload.token
            state.isAuthenticated = true
            state.loading = false
        },
        registerFail: (state, action) => {
            localStorage.removeItem('token')
            state.token = null
            state.isAuthenticated = false
            state.loading = false
        },
        userLoaded: (state, { payload }) => {
            state.isAuthenticated = true
            state.loading = false
            state.user = payload.user
        },
        authFailed: (state, action) => {
            localStorage.removeItem('token')
            state.token = null
            state.isAuthenticated = false
            state.loading = false
        }
    }
})

export const { 
    registerSuccess, 
    registerFail,
    userLoaded,
    authFailed
} = authSlice.actions

export default authSlice.reducer