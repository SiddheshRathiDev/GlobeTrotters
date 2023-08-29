import { createSlice } from '@reduxjs/toolkit'

export const postIdSlice = createSlice({
  // name of slice (must be unique)
  name: 'postIds',
  initialState: {
    postIdArray: [],
    
  },
  reducers: {
    // action: action handler
    setPostId: (state,action) => {
      state.postIdArray = action.payload.postIdArray;
      
    }
  },
})

export const { setPostId } = postIdSlice.actions
export default postIdSlice.reducer