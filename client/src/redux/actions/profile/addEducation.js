import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { setAlert } from '../../reducers/alertSlice';
import { updateProfile } from '../../reducers/profileSlice';

export function addEducation(formData, navigate) {
  return async function addEducation(dispatch, getState) {
    try {
      const response = await axios.put(
        'api/profile/education',
        formData,
        defaultHeaders
      );
      dispatch(updateProfile(response.data));
      dispatch(setAlert({ message: 'Education Added', alertType: 'success' }));
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
