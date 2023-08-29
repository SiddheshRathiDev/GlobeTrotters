import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  // name of slice (must be unique)
  name: 'auth',
  initialState: {
    status: false,
    userId: 0,
    currentUserName:null,

  },
  reducers: {
    // action: action handler
    login: (state,action) => {
 
      state.status = true;
      console.log("in rdux "+state.status);
      state.userId = action.payload;
      state.currentUserName = action.payload.currentUserName;

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