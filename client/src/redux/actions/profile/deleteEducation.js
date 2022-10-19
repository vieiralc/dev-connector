import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { setAlert } from '../../reducers/alertSlice';
import { updateProfile } from '../../reducers/profileSlice';

export function deleteEducation(education_id) {
  return async function deleteEducation(dispatch, getState) {
    try {
        const response = await axios.delete(
            `api/profile/education/${education_id}`,
            defaultHeaders
        );
        dispatch(updateProfile(response.data));
        dispatch(setAlert({ message: 'Education Removed', alertType: 'success' }));
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
