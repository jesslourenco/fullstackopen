/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import Togglable from './toggable';

function Post({ post }) {
  return (
    <div>
      { post.title }
      <Togglable buttonLabel="new note">
        {post.url}
        {post.likes}
        {post.author}
      </Togglable>
    </div>
  );
}

export default Post;
