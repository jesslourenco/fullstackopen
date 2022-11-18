/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import Togglable from './toggable';
import postService from '../services/posts';

function Post({
  post, setPosts, setMessage, username,
}) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikeClick = async (event) => {
    event.preventDefault();

    postService
      .update(post)
      .then(() => {
        postService.getAll().then((e) => setPosts(e));
        setMessage(`You liked ${post.title}!`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const handleDelClick = async (event) => {
    event.preventDefault();

    postService
      .remove(post)
      .then(() => {
        postService.getAll().then((e) => setPosts(e));
        setMessage(`${post.title} has been removed!`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  return (
    <div style={blogStyle}>
      { post.title }
      <Togglable buttonLabel="view">
        {post.url}
        <br />
        {post.likes}
        {' '}
        likes
        <button type="button" onClick={handleLikeClick}>+like</button>
        <br />
        {post.author}
        <br />
        {username === post.user.username
          ? <button type="button" onClick={handleDelClick}>delete</button>
          : ' '}
      </Togglable>
    </div>
  );
}

export default Post;
