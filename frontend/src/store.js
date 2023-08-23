import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authslice'
// create a new store
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
})