/* eslint-disable no-console */
/* eslint-disable default-param-last */

import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    create(state, action) {
      state.push(action.payload);
    },
    vote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return (state
        .map((a) => (a.id !== id ? a : updatedAnecdote))
        .sort((a, b) => b.votes - a.votes)
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { create, vote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
