import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { postsAdded, postError } from '../../reducers/postSlice';

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
