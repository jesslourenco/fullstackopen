/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { notify } from '../reducers/notificationReducer';
import { getAllPosts, createPost } from '../reducers/postReducer';

function NewPost({ newPostRef }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleNewPost = async (event) => {
    event.preventDefault();

    const newPost = { title, author, url };

    try {
      await dispatch(createPost(newPost));
      dispatch(notify(`${newPost.title} has been added!`, 3));
      setTitle('');
      setAuthor('');
      setUrl('');
      newPostRef.current.toggleVisibility();
      await dispatch(getAllPosts());
    } catch (e) {
      dispatch(notify(e.response.data.error, 5));
    }
  };

  return (
    <Form onSubmit={handleNewPost}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>url</Form.Label>
        <Form.Control
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </Form.Group>
      <Button size="sm" id="newpost-button" type="submit">
        create
      </Button>
    </Form>
  );
}

export default NewPost;
