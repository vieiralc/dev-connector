import axios from 'axios';
import { removeComment, postError } from '../../reducers/postSlice';
import { setAlert } from '../../reducers/alertSlice';

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `/api/posts/comment/${postId}/${commentId}`
    );
    dispatch(removeComment({ commentId }));
    dispatch(
      setAlert({
        message: 'Comment removed successfully',
        alertType: 'success',
      })
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
