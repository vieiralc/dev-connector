import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './reducers/alertSlice'
import authReducer from './reducers/authSlice'

export default configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer
    }
})