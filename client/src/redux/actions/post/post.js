import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import {
  postsAdded,
  updatePostLikes,
  postError,
} from '../../reducers/postSlice';
import { setAlert } from '../../reducers/alertSlice';

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/posts', defaultHeaders);
    dispatch(postsAdded(response.data));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const likePostAction = (postId) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/posts/like/${postId}`);
    dispatch(updatePostLikes({ postId, likes: response.data }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert({ message: error.msg, alertType: 'danger' }));
      });
    }

    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch(updatePostLikes({ postId, likes: response.data }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert({ message: error.msg, alertType: 'danger' }));
      });
    }

    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};
