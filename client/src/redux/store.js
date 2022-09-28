import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './reducers/alertSlice'
import authReducer from './reducers/authSlice'
import profileSlice from './reducers/profileSlice'

export default configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        profile: profileSlice
    }
})