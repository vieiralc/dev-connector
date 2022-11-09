import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import {
  setPostSliceLoading,
  postFetchedById,
  postError,
} from '../../reducers/postSlice';

export const getPost = (postId) => async (dispatch) => {
  try {
    dispatch(setPostSliceLoading(true));
    const response = await axios.get(`/api/posts/${postId}`, defaultHeaders);
    dispatch(postFetchedById(response.data));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};
