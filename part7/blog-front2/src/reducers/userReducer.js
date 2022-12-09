/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import postService from '../services/posts';
import loginService from '../services/login';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    cleanUser(state) {
      state = null;
      return state;
    },
  },
});

export const { setUser, cleanUser } = userSlice.actions;

export const sendToken = (token) => {
  postService.setToken(token);
};

export const loginUser = (credentials) => async (dispatch) => {
  const userData = await loginService.login(credentials);
  window.localStorage.setItem(
    'loggedPostappUser',
    JSON.stringify(userData),
  );
  sendToken(userData.token);
  dispatch(setUser(userData));
};

export const userLocalStorage = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedPostappUser');
  const userData = JSON.parse(loggedUserJSON);
  await dispatch(setUser(userData));
  sendToken(userData.token);
};

export default userSlice.reducer;
