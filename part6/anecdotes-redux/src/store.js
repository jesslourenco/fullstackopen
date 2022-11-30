/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import anecdoteService from './services/anecdotes';

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});

anecdoteService.getAll().then((a) => store.dispatch(setAnecdotes(a)));
