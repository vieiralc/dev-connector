import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { setAlert } from '../../reducers/alertSlice';
import { updateProfile } from '../../reducers/profileSlice';

export function deleteExperience(experience_id) {
  return async function deleteExperience(dispatch, getState) {
    try {
      const response = await axios.delete(
        `api/profile/experience/${experience_id}`,
        defaultHeaders
      );
      dispatch(updateProfile(response.data));
      dispatch(
        setAlert({ message: 'Experience Removed', alertType: 'success' })
      );
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
