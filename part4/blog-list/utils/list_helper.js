// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (!blogs.length) return 'No blogs in the array';
  let top = { likes: 0 };
  blogs.forEach((e) => { if (e.likes > top.likes) top = e; });
  return top;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
