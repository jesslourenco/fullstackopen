/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

function Filter(props) {
  const handleChange = (event) => {
    event.preventDefault();
    const query = event.target.value;
    props.setFilter(query);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      {' '}
      <input onChange={handleChange} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  filter: state.filter,
});

const mapDispatchToProps = {
  setFilter,
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default ConnectedFilter;
