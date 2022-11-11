/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
function Logout({ setUser }) {
  const handleClick = () => {
    window.localStorage.removeItem('loggedPostappUser');
    setUser({});
  };
  return (<button type="button" onClick={handleClick}>logout</button>);
}

export default Logout;
