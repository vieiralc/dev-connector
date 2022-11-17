import { userLoaded, clearUserData } from '../../reducers/authSlice';
import axios from 'axios';
import { API_BASE_URL } from '../../../constants/constants';
import setAuthToken from '../../../utils/setAuthToken';

export function loadUser() {
  return async function loadUser(dispatch, getState) {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/auth`);

      dispatch(userLoaded({ user: response.data }));
    } catch (err) {
      dispatch(clearUserData());
    }
  };
}
