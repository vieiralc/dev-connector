import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { newPostAdded, postError } from '../../reducers/postSlice';
import { setAlert } from '../../reducers/alertSlice';

export const addPost = (text) => async (dispatch) => {
  try {
    const body = { text: text };
    const response = await axios.post('/api/posts', body, defaultHeaders);
    dispatch(newPostAdded(response.data));
    dispatch(
      setAlert({ message: 'Post added successfully', alertType: 'success' })
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
