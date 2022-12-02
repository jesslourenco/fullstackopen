/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import {
  Routes, Route, useMatch, Link, useNavigate,
} from 'react-router-dom';

// eslint-disable-next-line import/named
import { useField } from './hooks';

function Menu() {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <a href="/" style={padding}>anecdotes</a>
      <a href="/create" style={padding}>create new</a>
      <a href="/about" style={padding}>about</a>
    </div>
  );
}

function AnecdoteList({ anecdotes }) {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Anecdote({ anecdote }) {
  return (
    <div>
      <h2>
        {anecdote.content}
        {' '}
        by
        {' '}
        {anecdote.author}
      </h2>
      <p>
        has
        {' '}
        {' '}
        {anecdote.votes}
        {' '}
        votes

      </p>
      <p>
        <a href={anecdote.info}>more info</a>
      </p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>
        An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."
      </em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
  );
}

function Footer() {
  return (
    <div>
      Anecdote app for
      {' '}
      <a href="https://fullstackopen.com/">Full Stack Open</a>
      .

      See
      <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a>
      {' '}
      for the source code.
    </div>
  );
}

function CreateNew(props) {
  const navigate = useNavigate();

  const content = useField('content');
  const author = useField('author');
  const info = useField('info');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}

function App() {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification('the anecdote has been succesfully created!');
    setTimeout(() => { setNotification(''); }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  // eslint-disable-next-line no-unused-vars
  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch('/anecdote/:id');
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification || ''}
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdote/:id" element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
