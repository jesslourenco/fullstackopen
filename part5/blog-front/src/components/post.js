/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
function Post({ post }) {
  return (
    <div>
      { post.title }
      { post.author }
    </div>
  );
}

export default Post;
