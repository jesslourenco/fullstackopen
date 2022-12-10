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
    comment(state, action) {
      const comment = action.payload;
      console.log(comment);
      return (state.map((p) => (p.id !== comment.post.id
        ? p
        : p.comments.push(comment)))
      );
    },
    setAllPosts(state, action) {
      console.log(action.payload);
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
  setAllPosts, addPost, like, removePost, comment,
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

export const addComment = (id, content) => async (dispatch) => {
  const savedComment = await postService.newComment(id, content);
  dispatch(comment(savedComment));
};

export default postSlice.reducer;
