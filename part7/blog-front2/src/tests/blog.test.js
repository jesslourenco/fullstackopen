/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import Post from "../components/post";
// import Togglable from '../components/toggable';

let component;

beforeEach(() => {
  const post = {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 0,
    user: { username: "tester" },
  };

  component = render(
    <Post
      key={post.id}
      post={post}
      setPosts={post}
      setMessage="message"
      username="tester"
    />
  );
});

test("blog initially renders title and author only", () => {
  const title = component.getByText(/React patterns/);
  const author = component.getByText(/Michael Chan/);
  const url = component.queryByText(/ https:\/\/reactpatterns.com /);

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeNull();
});

test("blog post shows details when button is clicked", async () => {
  const user = userEvent.setup();

  const button = component.getByText(/view/);
  await user.click(button);

  const div = component.container.querySelector(".toggableContent");
  expect(div).not.toHaveStyle("display: none");
});

// test 5c step 3 is included in e2e tests to best fit my implementation

// test below is 5c step4, not activated since it does not match my current implementation
// i.e no handlers passed as props to components

/* test('event handler gets correct details when post is created', async () => {
  const user = userEvent.setup();

  const button = component.getByText(/new post/);
  await user.click(button);

  component.container.querySelector('#title').type('title');
  component.container.querySelector('#author').type('author');
  component.container.querySelector('#url').type('url');

  const btn = component.getByText(/create/);
  await user.click(btn);

  expect(createNote.mock.calls[0][0]).toBe('title');
  expect(createNote.mock.calls[0][1]).toBe('author');
  expect(createNote.mock.calls[0][2]).toBe('url');
}); */
