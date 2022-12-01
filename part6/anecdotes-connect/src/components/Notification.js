/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { connect } from 'react-redux';

function Notification(props) {
  // const notification = useSelector((state) => state.notification);

  if (props.notification === '') return null;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div style={style}>
      {props.notification}
    </div>
  );
}

const mapStateToProps = (state) => ({
  notification: state.notification,
});

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
