import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { setAlert } from '../../reducers/alertSlice';
import { updateProfile, profileError } from '../../reducers/profileSlice';
import { API_BASE_URL } from '../../../constants/constants';

export function createProfile(formData, navigate, updatingProfile = false) {
  return async function createProfile(dispatch, getState) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/profile`,
        formData,
        defaultHeaders
      );

      dispatch(updateProfile(response.data));

      const message = updatingProfile ? 'Profile Updated' : 'Profile Created';
      dispatch(setAlert({ message, alertType: 'success' }));

      if (!updatingProfile) {
        navigate('/dashboard');
      }
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
