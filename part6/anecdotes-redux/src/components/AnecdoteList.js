/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */

import { useSelector, useDispatch } from 'react-redux';
import { updateVote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes);
  const query = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const voteHandler = (anecdote) => {
    dispatch(updateVote(anecdote));
    dispatch(notify(`voted for anecdote ${anecdote.id}!`, 1));
  };

  const display = query
    ? anecdotes.filter((a) => a.content
      .toLowerCase()
      .includes(query))
    : anecdotes;

  return (
    <div>
      {display
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has
              {' '}
              {anecdote.votes}
              <button type="submit" onClick={() => voteHandler(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;
