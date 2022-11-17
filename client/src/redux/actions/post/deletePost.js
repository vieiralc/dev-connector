import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { postDeleted, postError } from '../../reducers/postSlice';
import { setAlert } from '../../reducers/alertSlice';
import { API_BASE_URL } from '../../../constants/constants';

export const deletePost = (postId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/posts/${postId}`,
      defaultHeaders
    );
    dispatch(postDeleted({ postId }));
    dispatch(setAlert({ message: response.data.msg, alertType: 'success' }));
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
