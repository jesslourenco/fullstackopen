/* eslint-disable no-console */
/* eslint-disable default-param-last */

import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

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
    addAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { vote, setAnecdotes, addAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const notes = await anecdoteService.getAll();
  dispatch(setAnecdotes(notes));
};

export const create = (content) => async (dispatch) => {
  const anecdote = await anecdoteService.createNew(content);
  dispatch(addAnecdote(anecdote));
};

export default anecdoteSlice.reducer;
