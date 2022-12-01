/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { connect } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

function AnecdoteForm(props) {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.new.value;
    // eslint-disable-next-line no-param-reassign
    event.target.new.value = '';
    props.create(anecdote);
    props.notify('new anecdote created!', 5);
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

const mapDispatchToProps = {
  create,
  notify,
};

const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedForm;
