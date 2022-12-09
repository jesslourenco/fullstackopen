/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './components/post';
import Notification from './components/notification';
import Login from './components/login';
import Logout from './components/logout';
import NewPost from './components/newpost';
import Togglable from './components/toggable';
import { getAllPosts } from './reducers/postReducer';
// eslint-disable-next-line no-unused-vars
import { userLocalStorage, sendToken } from './reducers/userReducer';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (window.localStorage.getItem('loggedPostappUser') !== null) {
      dispatch(userLocalStorage());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      sendToken(user.token);
      dispatch(getAllPosts());
    }
  }, [user, dispatch]);

  const newPostRef = useRef();

  return (
    <div>
      <h2>Blog</h2>

      <Notification />

      {user === null ? (
        <Login />
      ) : (
        <div>
          <p>
            {user.name}
            {' '}
            logged-in
            <Logout />
          </p>
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
      )}
    </div>
  );
}

export default App;
