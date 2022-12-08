/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useState, useEffect, useRef } from 'react';
import Post from './components/post';
import Notification from './components/notification';
import Login from './components/login';
import Logout from './components/logout';
import NewPost from './components/newpost';
import postService from './services/posts';
import Togglable from './components/toggable';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPostappUser');
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      setUser(userData);
      postService.setToken(userData.token);
      postService.getAll().then((e) => setPosts(e));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      postService.getAll().then((e) => setPosts(e));
    }
  }, [user]);

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
                setPosts={setPosts}
                newPostRef={newPostRef}
              />
            </Togglable>
          </div>

          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              setPosts={setPosts}
              username={user.username}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
