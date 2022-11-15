/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import postService from '../services/posts';

function NewPost({ setPosts, setMessage, setNewPostVisible }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewPost = async (event) => {
    event.preventDefault();

    const newPost = { title, author, url };

    postService
      .create(newPost)
      .then(() => {
        postService.getAll().then((e) => setPosts(e));
        setMessage(`${newPost.title} has been added!`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setTitle('');
        setAuthor('');
        setUrl('');
        setNewPostVisible(false);
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
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
