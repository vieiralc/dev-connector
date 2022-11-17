import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { setAlert } from '../../reducers/alertSlice';
import { clearProfile } from '../../reducers/profileSlice';
import { clearUserData } from '../../reducers/authSlice';
import { API_BASE_URL } from '../../../constants/constants';

export function deleteAccount() {
  return async function deleteAccount(dispatch, getState) {
    if (window.confirm('Are you absolutely sure? This CANNOT be undone.')) {
      try {
        await axios.delete(`${API_BASE_URL}/profile`, defaultHeaders);
        dispatch(clearProfile());
        dispatch(clearUserData());
        dispatch(
          setAlert({ message: 'Your account has been permanantly deleted.' })
        );
      } catch (err) {
        dispatch(
          profileError({
            msg: err.response.statusText,
            status: err.response.status,
          })
        );
      }
    }
  };
}
