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
    updatePostLikes: (state, { payload: { postId, likes } }) => {
      state.posts = state.posts.map((post) =>
        post._id === postId ? { ...post, likes: likes } : { ...post }
      );
    },
    postError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { postsAdded, updatePostLikes, postError } = postSlice.actions;

export default postSlice.reducer;
