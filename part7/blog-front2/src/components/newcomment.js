/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { notify } from '../reducers/notificationReducer';
import { addComment, getAllPosts } from '../reducers/postReducer';

function NewComment({ postId }) {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleComment = async (event) => {
    event.preventDefault();

    const newComment = { content: comment };

    try {
      await dispatch(addComment(postId, newComment));
      dispatch(notify('Your reply has been posted!', 3));
      setComment('');
      await dispatch(getAllPosts());
    } catch (e) {
      dispatch(notify(e.response.data.error, 5));
    }
  };

  return (
    <form onSubmit={handleComment}>
      <div>
        <input
          type="text"
          value={comment}
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        {' '}
        <button type="submit">post</button>
      </div>
    </form>
  );
}

export default NewComment;
