/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';

function Notification() {
  const notification = useSelector((state) => state.notification);

  if (notification === '') return null;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div style={style}>
      {notification}
    </div>
  );
}

export default Notification;
