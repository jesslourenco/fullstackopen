/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import loginService from '../services/login';
import postService from '../services/posts';

// eslint-disable-next-line react/prop-types
function Login({ setUser, setMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userForLogin = await loginService.login({
        username, password,
      });

      window.localStorage.setItem('loggedPostappUser', JSON.stringify(userForLogin));

      postService.setToken(userForLogin.token);
      setUser(userForLogin);
      setUsername('');
      setPassword('');
      setMessage('Login successful');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage('Wrong credentials');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

export default Login;
