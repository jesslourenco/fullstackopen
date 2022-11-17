/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import Togglable from './toggable';

function Post({ post }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
        <br />
        {post.author}
        <br />
      </Togglable>
    </div>
  );
}

export default Post;
