/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useState, useEffect } from 'react';
import Post from './components/post';
import Notification from './components/notification';
import Login from './components/login';
import Logout from './components/logout';
import NewPost from './components/newpost';
import postService from './services/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [postFormVisible, setNewPostVisible] = useState(false);

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

      <Notification message={message} />

      {Object.keys(user).length === 0
        ? (
          <Login
            setUser={setUser}
            setMessage={setMessage}
          />
        )
        : (
          <div>
            <p>
              {user.name}
              {' '}
              logged-in
              <Logout
                setUser={setUser}
                setMessage={setMessage}
              />
            </p>
            { postFormVisible
              ? (
                <>
                  <h2>New Post</h2>
                  <div>
                    <NewPost
                      setPosts={setPosts}
                      setMessage={setMessage}
                      setNewPostVisible={setNewPostVisible}
                    />
                  </div>
                </>
              )
              : <button type="button" onClick={() => setNewPostVisible(true)}>New Post</button>}

            {posts.map((post) => <Post key={post.id} post={post} />)}
          </div>
        )}

    </div>
  );
}

export default App;
