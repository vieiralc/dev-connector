import { userLoaded, authFailed } from '../../reducers/authSlice'
import axios from 'axios'
import setAuthToken from '../../../utils/setAuthToken'

export function loadUser() {
    return async function loadUser(dispatch, getState) {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const response = await axios.get('/api/auth')

            dispatch(userLoaded({ user: response.data }))
        } catch(err) {
            dispatch(authFailed())
        }
    }
}