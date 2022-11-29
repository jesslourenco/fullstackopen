/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */

import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setMessage, clearMessage } from '../reducers/notificationReducer';

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const voteHandler = (id) => {
    dispatch(vote(id));
    dispatch(setMessage(`voted for anecdote ${id}!`));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  };

  return (
    <div>
      {anecdotes
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has
              {' '}
              {anecdote.votes}
              <button type="submit" onClick={() => voteHandler(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;
