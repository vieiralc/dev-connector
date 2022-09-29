import { clearUserData } from "../../reducers/authSlice"
import { clearProfile } from "../../reducers/profileSlice"

export function logoutUser() {
    return async function logoutUser(dispatch, getState) {
        dispatch(clearProfile())
        dispatch(clearUserData())
    }
}