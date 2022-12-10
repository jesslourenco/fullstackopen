/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import Logout from './logout';

function Menu({ username }) {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <a href="/" style={padding}>blogs</a>
      <a href="/users" style={padding}>users</a>
      {' '}
      <b>{username}</b>
      {' '}
      is logged in
      {' '}
      <Logout />
    </div>
  );
}
export default Menu;
