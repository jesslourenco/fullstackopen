/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useDispatch } from 'react-redux';
import { notify } from '../reducers/notificationReducer';

function Logout({ setUser }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    window.localStorage.removeItem('loggedPostappUser');
    dispatch(notify('User has been logged out', 3));
    setUser({});
  };
  return (
    <button type="button" onClick={handleClick}>
      logout
    </button>
  );
}

export default Logout;
