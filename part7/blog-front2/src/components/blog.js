/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Togglable from './toggable';
import NewPost from './newpost';
import Post from './post';

function Blog({ user }) {
  const newPostRef = useRef();
  const posts = useSelector((state) => state.posts);

  return (
    <div>
      <h2>New Post</h2>
      <div>
        <Togglable buttonLabel="new post" ref={newPostRef}>
          <NewPost
            newPostRef={newPostRef}
          />
        </Togglable>
      </div>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          username={user.username}
        />
      ))}
    </div>
  );
}

export default Blog;
