import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { commentAdded, postError } from '../../reducers/postSlice';
import { setAlert } from '../../reducers/alertSlice';
import { API_BASE_URL } from '../../../constants/constants';

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/posts/comment/${postId}`,
      formData,
      defaultHeaders
    );
    dispatch(commentAdded(response.data));
    dispatch(
      setAlert({ message: 'Comment added successfully', alertType: 'success' })
    );
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
