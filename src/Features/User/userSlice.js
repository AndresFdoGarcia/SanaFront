import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;