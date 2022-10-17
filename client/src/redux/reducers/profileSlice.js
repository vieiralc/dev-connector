import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
  },
  reducers: {
    updateProfile: (state, { payload }) => {
      state.profile = payload;
      state.loading = false;
    },
    updateProfiles: (state, { payload }) => {
      state.profiles = payload;
      state.loading = false;
    },
    updateRepos: (state, { payload }) => {
      state.repos = payload;
      state.loading = false;
    },
    profileError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    clearProfile: (state, action) => {
      state.profile = null;
      state.repos = [];
      state.loading = false;
    },
  },
});

export const { updateProfile, updateProfiles, profileError, clearProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
