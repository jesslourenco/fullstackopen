/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { notify } from '../reducers/notificationReducer';
import { cleanUser } from '../reducers/loginReducer';

function Logout() {
  const dispatch = useDispatch();

  const handleClick = () => {
    window.localStorage.removeItem('loggedPostappUser');
    dispatch(notify('User has been logged out', 3));
    dispatch(cleanUser());
  };
  return (
    <Button variant="link" type="button" onClick={handleClick}>
      logout
    </Button>
  );
}

export default Logout;
