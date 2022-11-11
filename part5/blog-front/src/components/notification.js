/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
function Notification({ message }) {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );
}

export default Notification;
