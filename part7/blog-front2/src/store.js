/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import postReducer from './reducers/postReducer';
import userReducer from './reducers/loginReducer';
import usersReducer from './reducers/usersReducer';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    posts: postReducer,
    user: userReducer,
    allUsers: usersReducer,
  },
});
