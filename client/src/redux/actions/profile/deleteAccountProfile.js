import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { setAlert } from '../../reducers/alertSlice';
import { clearProfile } from '../../reducers/profileSlice';
import { clearUserData } from '../../reducers/authSlice';

export function deleteAccount() {
  return async function deleteAccount(dispatch, getState) {
    if (window.confirm('Are you absolutely sure? This CANNOT be undone.')) {
        try {
            const response = await axios.delete(
                'api/profile',
                defaultHeaders
            );
            dispatch(clearProfile());
            dispatch(clearUserData());
            dispatch(setAlert({ message: 'Your account has been permanantly deleted.' }));
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