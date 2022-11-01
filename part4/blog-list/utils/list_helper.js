/* eslint-disable no-unused-vars */
const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (!blogs.length) return 'No blogs in the array';
  let top = { likes: 0 };
  blogs.forEach((e) => { if (e.likes > top.likes) top = e; });
  return top;
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return 'Array is empty';

  return (
    _
      .chain(blogs)
      .countBy('author')
      .map((cnt, author) => ({ author, blogs: cnt }))
      .sortBy('blogs')
      .last()
      .toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
