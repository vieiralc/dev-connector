import { setAlert } from "../../reducers/alertSlice"
import axios from "axios"
import { defaultHeaders } from "../../../utils/defaultHeaders"
import { loadUser } from "./loadUser"
import { authSuccess, authFail } from "../../reducers/authSlice"

export function loginUser(email, password) {
    return async function loginUser(dispatch, getState) {

        const body = JSON.stringify({ email, password })

        try {
            const response = await axios.post('api/auth', body, defaultHeaders)
            dispatch(authSuccess(response.data))
            dispatch(loadUser())
        } catch (err) {
            if (err.response.status === 500)
                dispatch(setAlert({ message: 'There was an error while processing this information. Please try again later.', alertType: 'danger' }))

            const errors = err.response.data.errors
            if (errors)
                errors.forEach(error => dispatch(setAlert({ message: error.msg, alertType: 'danger' })))
            
            dispatch(authFail())
        }
    }
}