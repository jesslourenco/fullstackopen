/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Post from '../components/post';
// import Togglable from '../components/toggable';

test('blog initially renders title and author only', () => {
  const post = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: { username: 'tester' },
  };

  const component = render(<Post key={post.id} post={post} setPosts={post} setMessage="message" username="tester" />);

  const title = component.getByText(/React patterns/);
  const author = component.getByText(/Michael Chan/);
  const url = component.queryByText(/ https:\/\/reactpatterns.com /);

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeNull();
});
