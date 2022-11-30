/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdoteService from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAll().then((a) => dispatch(setAnecdotes(a)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
}

export default App;
