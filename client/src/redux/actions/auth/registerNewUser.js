import { setAlert } from '../../reducers/alertSlice';
import { authSuccess, clearUserData } from '../../reducers/authSlice';
import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { loadUser } from './loadUser';
import { API_BASE_URL } from '../../../constants/constants';

export function registerNewUser(newUserData) {
  return async function registerNewUser(dispatch, getState) {
    const body = JSON.stringify(newUserData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/register`,
        body,
        defaultHeaders
      );
      dispatch(authSuccess(response.data));
      dispatch(loadUser());
    } catch (err) {
      if (err.response.status === 500)
        dispatch(
          setAlert({
            message:
              'There was an error while processing this information. Please try again later.',
            alertType: 'danger',
          })
        );

      const errors = err.response.data.errors;
      if (errors)
        errors.forEach((error) =>
          dispatch(setAlert({ message: error.msg, alertType: 'danger' }))
        );

      dispatch(clearUserData());
    }
  };
}
