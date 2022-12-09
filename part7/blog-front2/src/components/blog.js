/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Togglable from './toggable';
import NewPost from './newpost';
import { deletePost } from '../reducers/postReducer';
import { notify } from '../reducers/notificationReducer';

function Blog({ posts, username }) {
  const newPostRef = useRef();
  const dispatch = useDispatch();

  const handleDelClick = async (post) => {
    try {
      await dispatch(deletePost(post));
      dispatch(notify(`${post.title} has been removed!`, 3));
    } catch (e) {
      dispatch(notify(e.response.data.error, 5));
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
  return (
    <div>
      <h3>New Post</h3>
      <div>
        <Togglable buttonLabel="new post" ref={newPostRef}>
          <NewPost
            newPostRef={newPostRef}
          />
        </Togglable>
        <br />
      </div>
      <h3>Blog list</h3>
      {posts.map((post) => (
        <li key={post.id} style={{ listStyle: 'none' }}>

          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          {' '}
          {username === post.user.username ? (
            <button id="del-btn" type="button" onClick={() => handleDelClick(post)}>
              delete
            </button>
          ) : (
            ' '
          )}
        </li>
      ))}
    </div>
  );
}

export default Blog;
