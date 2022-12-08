/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useDispatch } from 'react-redux';
import Togglable from './toggable';
import postService from '../services/posts';
import { notify } from '../reducers/notificationReducer';
import { updateLikes, getAllPosts } from '../reducers/postReducer';

function Post({
  post, username,
}) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();

  const handleLikeClick = async (event) => {
    event.preventDefault();

    dispatch(updateLikes(post))
      .then(() => {
        dispatch(getAllPosts());
        dispatch(notify(`You liked ${post.title}!`, 3));
      })
      .catch((error) => {
        dispatch(notify(error.response.data.error, 5));
      });
  };

  const handleDelClick = async (event) => {
    event.preventDefault();

    postService
      .remove(post)
      .then(() => {
        // postService.getAll().then((e) => setPosts(e));
        dispatch(notify(`${post.title} has been removed!`, 3));
      })
      .catch((error) => {
        dispatch(notify(error.response.data.error, 5));
      });
  };

  return (
    <div className="blog" style={blogStyle}>
      {post.title}
      {' '}
      {post.author}
      <Togglable buttonLabel="view">
        {post.url}
        <br />
        {post.likes}
        {' '}
        likes
        <button id="like-btn" type="button" onClick={handleLikeClick}>
          +like
        </button>
        {username === post.user.username ? (
          <button id="del-btn" type="button" onClick={handleDelClick}>
            delete
          </button>
        ) : (
          ' '
        )}
      </Togglable>
    </div>
  );
}

export default Post;
