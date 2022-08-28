import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import vehicleReducer from '../features/Admin/getAllSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle:vehicleReducer
  },
})