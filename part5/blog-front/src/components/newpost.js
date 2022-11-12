/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import postService from '../services/posts';

function NewPost({ setPosts }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewPost = async (event) => {
    event.preventDefault();

    try {
      const newPost = { title, author, url };

      postService
        .create(newPost)
        .then(() => {
          postService.getAll().then((e) => setPosts(e));
          setTitle('');
          setAuthor('');
          setUrl('');
        });
    } catch (exception) { console.log(exception); }
  };

  return (
    <form onSubmit={handleNewPost}>
      <div>
        Title
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
}

export default NewPost;
