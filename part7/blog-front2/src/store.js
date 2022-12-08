/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import postReducer from './reducers/postReducer';
// import anecdoteService from './services/anecdotes';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    posts: postReducer,
  },
});

// anecdoteService.getAll().then((a) => store.dispatch(setAnecdotes(a)));
