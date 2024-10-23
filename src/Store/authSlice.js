import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { uid: null, loading: false, error: null },
  reducers: {
    
    setUid: (state, action) => {
      state.uid = action.payload; 
    },
    
    clearUid: (state) => {
      state.uid = null; 
    },
  },
});

export const { setUid, clearUid } = authSlice.actions;

export default authSlice.reducer;
