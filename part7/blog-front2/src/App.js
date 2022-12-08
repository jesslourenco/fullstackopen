/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './components/post';
import Notification from './components/notification';
import Login from './components/login';
import Logout from './components/logout';
import NewPost from './components/newpost';
import postService from './services/posts';
import Togglable from './components/toggable';
import { getAllPosts } from './reducers/postReducer';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPostappUser');
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      setUser(userData);
      postService.setToken(userData.token);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      dispatch(getAllPosts());
    }
  }, [user, dispatch]);

  const newPostRef = useRef();

  return (
    <div>
      <h2>Blog</h2>

      <Notification />

      {Object.keys(user).length === 0 ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <p>
            {user.name}
            {' '}
            logged-in
            <Logout setUser={setUser} />
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
