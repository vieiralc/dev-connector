import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { setAlert } from '../../reducers/alertSlice';
import { updateProfile } from '../../reducers/profileSlice';
import { API_BASE_URL } from '../../../constants/constants';

export function addExperience(formData, navigate) {
  return async function addExperience(dispatch, getState) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/profile/experience`,
        formData,
        defaultHeaders
      );
      dispatch(updateProfile(response.data));
      dispatch(setAlert({ message: 'Experience Added', alertType: 'success' }));
      navigate('/dashboard');
    } catch (err) {
      if (err.response.status === 500) {
        dispatch(
          setAlert({
            message:
              'There was an error while processing this information. Please try again later.',
            alertType: 'danger',
          })
        );
      }

      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert({ message: error.msg, alertType: 'danger' }))
        );
      }

      dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
}
