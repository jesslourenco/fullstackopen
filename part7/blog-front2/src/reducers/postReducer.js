import { createSlice } from '@reduxjs/toolkit';
import postService from '../services/posts';

const postSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    like(state, action) {
      const post = action.payload;
      return (state
        .map((p) => (p.id !== post.id ? p : post))
      );
    },
    setAllPosts(state, action) {
      return (action.payload);
    },
    addPost(state, action) {
      state.push(action.payload);
    },
    removePost(state, action) {
      const id = action.payload;
      return (state.filter((p) => (p.id !== id)));
    },
  },
});

export const {
  setAllPosts, addPost, like, removePost,
} = postSlice.actions;

export const getAllPosts = () => async (dispatch) => {
  const posts = await postService.getAll();
  dispatch(setAllPosts(posts));
};

export const createPost = (newObj) => async (dispatch) => {
  const newPost = await postService.create(newObj);
  dispatch(addPost(newPost));
};

export const updateLikes = (post) => async (dispatch) => {
  const updatedPost = await postService.update(post);
  dispatch(like(updatedPost));
};

export const deletePost = (post) => async (dispatch) => {
  await postService.remove(post);
  dispatch(removePost(post.id));
};

export default postSlice.reducer;
