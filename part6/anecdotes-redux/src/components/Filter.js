/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

function Filter() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    const query = event.target.value;
    dispatch(setFilter(query));
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

export default Filter;
