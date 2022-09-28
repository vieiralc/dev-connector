import { createSlice } from "@reduxjs/toolkit"

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {
            name: 'test'
        },
        profiles: [],
        repos: [],
        loading: true,
        error: {}
    },
    reducers: {
        getProfile: (state, { payload }) => {
            state.profile = payload
            state.loading = false
        },
        profileError: (state, { payload }) => {
            state.error = payload
            state.loading = false
        },
        clearProfile: (state, action) => {
            state.profile = null,
            state.profiles = [],
            state.repos = [],
            state.loading = true,
            state.error = {}
        }
    }
})

export const { getProfile, profileError, clearProfile } = profileSlice.actions

export default profileSlice.reducer