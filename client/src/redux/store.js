import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './reducers/alertSlice'

export default configureStore({
    reducer: {
        alertReducer
    }
})