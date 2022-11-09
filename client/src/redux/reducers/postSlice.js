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
    newPostAdded: (state, { payload }) => {
      state.posts.unshift(payload);
      state.loading = false;
    },
    postFetchedById: (state, { payload }) => {
      state.post = payload;
      state.loading = false;
    },
    updatePostLikes: (state, { payload: { postId, likes } }) => {
      state.posts = state.posts.map((post) =>
        post._id === postId ? { ...post, likes: likes } : { ...post }
      );
    },
    postDeleted: (state, { payload: { postId } }) => {
      state.posts = state.posts.filter((post) => post._id !== postId);
    },
    commentAdded: (state, { payload }) => {
      state.post.comments = payload;
      state.loading = false;
    },
    removeComment: (state, { payload: { commentId } }) => {
      state.post.comments = state.post.comments.filter(
        (comment) => comment._id !== commentId
      );
      state.loading = false;
    },
    setPostSliceLoading: (state, { payload }) => {
      state.loading = payload;
    },
    postError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const {
  postsAdded,
  newPostAdded,
  postFetchedById,
  updatePostLikes,
  postDeleted,
  commentAdded,
  removeComment,
  setPostSliceLoading,
  postError,
} = postSlice.actions;

export default postSlice.reducer;
