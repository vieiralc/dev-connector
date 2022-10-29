import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    post: null,
    loading: true,
    error: {},
  },
  reducers: {
    postsAdded: (state, { payload }) => {
      state.posts = payload;
      state.loading = false;
    },
    postError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { postsAdded, postError } = postSlice.actions;

export default postSlice.reducer;
