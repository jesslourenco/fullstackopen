/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';
import Notification from './components/notification';
import Blog from './components/blog';
import { getAllPosts } from './reducers/postReducer';
import { userLocalStorage, sendToken } from './reducers/loginReducer';
import { getAllUsers } from './reducers/usersReducer';
import Users from './components/users';
import Login from './components/login';
import Logout from './components/logout';
import UserPage from './components/userPage';

function App() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const userList = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (window.localStorage.getItem('loggedPostappUser') !== null) {
      dispatch(userLocalStorage());
      dispatch(getAllUsers());
    }
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser !== null) {
      sendToken(loggedUser.token);
      dispatch(getAllPosts());
    }
  }, [loggedUser, dispatch]);

  const matchUser = useMatch('/users/:id');

  return (
    <div>
      <h2>Blog</h2>
      <Notification />
      {loggedUser === null ? (
        <Login />
      ) : (
        <div>
          <p>
            {loggedUser.name}
            {' '}
            logged-in
            <Logout />
          </p>
          <Routes>
            <Route path="/users" element={<Users userList={userList} />} />
            <Route path="/" element={<Blog user={loggedUser} />} />
            <Route path="/users/:id" element={<UserPage matchUser={matchUser} userList={userList} />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
