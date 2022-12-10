/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';
import Notification from './components/notification';
import Blog from './components/blog';
import Post from './components/post';
import { getAllPosts } from './reducers/postReducer';
import { userLocalStorage, sendToken } from './reducers/loginReducer';
import { getAllUsers } from './reducers/usersReducer';
import Users from './components/users';
import Login from './components/login';
import Menu from './components/menu';

import UserPage from './components/userPage';

function App() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const userList = useSelector((state) => state.allUsers);
  const posts = useSelector((state) => state.posts);

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
  const matchPost = useMatch('/posts/:id');

  return (
    <div className="container">
      <div>
        <Notification />
        {loggedUser === null ? (
          <Login />
        ) : (
          <div>
            <Menu username={loggedUser.username} />
            <Routes>
              <Route path="/users" element={<Users userList={userList} />} />
              <Route path="/" element={<Blog username={loggedUser.username} posts={posts} />} />
              <Route path="/users/:id" element={<UserPage matchUser={matchUser} userList={userList} />} />
              <Route path="/posts/:id" element={<Post matchPost={matchPost} posts={posts} />} />
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
