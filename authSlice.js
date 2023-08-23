import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  // name of slice (must be unique)
  name: 'auth',
  initialState: {
    status: false,
    userId: null,
  },
  reducers: {
    // action: action handler
    login: (state,action) => {
      state.status = true;
      state.userId = action.payload;
    },
    // action: action handler
    logout: (state) => {
      state.status = false;
      state.userId = null;
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer