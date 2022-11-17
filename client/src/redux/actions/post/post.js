import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import {
  postsAdded,
  updatePostLikes,
  postError,
} from '../../reducers/postSlice';
import { setAlert } from '../../reducers/alertSlice';
import { API_BASE_URL } from '../../../constants/constants';

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, defaultHeaders);
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
    const response = await axios.put(`${API_BASE_URL}/posts/like/${postId}`);
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
    const response = await axios.put(`${API_BASE_URL}/posts/unlike/${postId}`);
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
