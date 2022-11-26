/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/button-has-type */
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const anecdotes = useSelector((state) => state);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  const vote = (id) => {
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
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>)}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  );
}

export default App;
