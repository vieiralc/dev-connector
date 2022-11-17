import axios from 'axios';
import { updateProfile, profileError } from '../../reducers/profileSlice';
import { API_BASE_URL } from '../../../constants/constants';

export function getCurrentProfile() {
  return async function getCurrentProfile(dispatch, getState) {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile/me`);
      dispatch(updateProfile(response.data));
    } catch (err) {
      dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
}
