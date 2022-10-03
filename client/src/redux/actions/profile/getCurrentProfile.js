import axios from 'axios';
import { updateProfile, profileError } from '../../reducers/profileSlice';

export function getCurrentProfile() {
  return async function getCurrentProfile(dispatch, getState) {
    try {
      const response = await axios.get('api/profile/me');

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
