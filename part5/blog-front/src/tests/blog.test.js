/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Post from '../components/post';
// import Togglable from '../components/toggable';

let component;

beforeEach(() => {
  const post = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: { username: 'tester' },
  };

  component = render(<Post key={post.id} post={post} setPosts={post} setMessage="message" username="tester" />);
});

test('blog initially renders title and author only', () => {
  const title = component.getByText(/React patterns/);
  const author = component.getByText(/Michael Chan/);
  const url = component.queryByText(/ https:\/\/reactpatterns.com /);

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeNull();
});

test('blog post shows details when button is clicked', async () => {
  const user = userEvent.setup();

  const button = component.getByText(/view/);
  await user.click(button);

  const div = component.container.querySelector('.toggableContent');
  expect(div).not.toHaveStyle('display: none');
});
