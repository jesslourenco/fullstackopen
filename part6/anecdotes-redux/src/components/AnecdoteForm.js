/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useDispatch } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';

function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.new.value;
    // eslint-disable-next-line no-param-reassign
    event.target.new.value = '';
    dispatch(create(anecdote));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="new" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
export default AnecdoteForm;
