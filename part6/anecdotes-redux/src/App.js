/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/button-has-type */
import { useSelector, useDispatch } from 'react-redux';
import { vote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

function App() {
  const anecdotes = useSelector((state) => state);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  const voteHandler = (id) => {
    dispatch(vote(id));
    console.log('vote', id);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has
          {' '}
          {anecdote.votes}
          <button onClick={() => voteHandler(anecdote.id)}>vote</button>
        </div>
      </div>)}
      <AnecdoteForm />
    </div>
  );
}

export default App;
