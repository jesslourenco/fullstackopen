/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Notification from './components/notification';
import Blog from './components/blog';
import { getAllPosts } from './reducers/postReducer';
import { userLocalStorage, sendToken } from './reducers/loginReducer';
import Users from './components/users';
import Login from './components/login';
import Logout from './components/logout';

function App() {
  const dispatch = useDispatch();
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
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Blog user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
