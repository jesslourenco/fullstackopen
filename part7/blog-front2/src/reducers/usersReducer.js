import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/allUsers';

const usersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setAllUsers } = usersSlice.actions;

export const getAllUsers = () => async (dispatch) => {
  const users = await usersService.getAll();
  dispatch(setAllUsers(users));
};

export default usersSlice.reducer;
