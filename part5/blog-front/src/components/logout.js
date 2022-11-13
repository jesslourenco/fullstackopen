/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
function Logout({ setUser, setMessage }) {
  const handleClick = () => {
    window.localStorage.removeItem('loggedPostappUser');
    setMessage('User has been logged out');
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setUser({});
  };
  return (<button type="button" onClick={handleClick}>logout</button>);
}

export default Logout;
