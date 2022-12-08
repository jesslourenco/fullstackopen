import { createSlice } from '@reduxjs/toolkit';
import postService from '../services/posts';

const postSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    /* vote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return (state
        .map((a) => (a.id !== id ? a : updatedAnecdote))
        .sort((a, b) => b.votes - a.votes)
      );
    }, */
    setAllPosts(state, action) {
      return action.payload;
    },
    addPost(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setAllPosts, addPost } = postSlice.actions;

export const getAllPosts = () => async (dispatch) => {
  const posts = await postService.getAll();
  dispatch(setAllPosts(posts));
};

export const createPost = (newObj) => async (dispatch) => {
  const newPost = await postService.create(newObj);
  dispatch(addPost(newPost));
};

/* export const updateVote = (anecdote) => async (dispatch) => {
  await anecdoteService.update(anecdote);
  dispatch(vote(anecdote.id));
}; */

export default postSlice.reducer;
