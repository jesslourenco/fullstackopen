/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

function Notification() {
  const notification = useSelector((state) => state.notification);

  if (notification === '') return null;

  return (
    <Alert variant="info">
      {notification}
    </Alert>
  );
}

export default Notification;
