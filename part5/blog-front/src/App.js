/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useState, useEffect } from 'react';
import Post from './components/post';
import Notification from './components/notification';
import Login from './components/login';
import postService from './services/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

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

  return (
    <div>
      <h2>Blog</h2>

      <Notification message={errorMessage} />

      {Object.keys(user).length === 0
        ? (
          <Login
            setUser={setUser}
            setErrorMessage={setErrorMessage}
          />
        )
        : (
          <div>
            <p>
              {user.name}
              {' '}
              logged-in
            </p>
            {posts.map((post) => <Post key={post.id} post={post} />)}
          </div>
        )}

    </div>
  );
}

export default App;
