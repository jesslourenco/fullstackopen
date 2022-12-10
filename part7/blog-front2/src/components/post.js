/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { notify } from '../reducers/notificationReducer';
import { updateLikes } from '../reducers/postReducer';
import NewComment from './newcomment';

function Post({ matchPost, posts }) {
  const dispatch = useDispatch();

  const post = matchPost
    ? posts.find((p) => p.id === matchPost.params.id)
    : null;

  if (!post) {
    return null;
  }

  const handleLikeClick = async (event) => {
    event.preventDefault();
    try {
      await dispatch(updateLikes(post));
      dispatch(notify(`You liked ${post.title}!`, 3));
    } catch (e) {
      dispatch(notify(e.response.data.error, 5));
    }
  };

  return (
    <div className="blog">
      <br />
      <h2>{post.title}</h2>
      By {post.author}
      <br />
      <a href={post.url}>link</a>
      <br />
      {post.likes} likes
      {' '}
      <Button variant="primary" size="sm" id="like-btn" type="button" onClick={handleLikeClick}>
        +like
      </Button>
      <br /><br />
      <p>
        <h5>comments...</h5>
        <NewComment postId={post.id} />
        {post.comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </p>
    </div>
  );
}

export default Post;
