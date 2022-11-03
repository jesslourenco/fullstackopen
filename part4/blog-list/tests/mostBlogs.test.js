const { mostBlogs } = require('../utils/list_helper');

describe('author with most Blogs', () => {
  test('when array has only one blog it should return that author', () => {
    expect(mostBlogs([{
      title: 'test',
      author: 'test author',
      url: 'test',
      likes: 1,
    }])).toEqual({
      author: 'test author',
      blogs: 1,
    });
  });

  test('of many blogs is calculated right', () => {
    expect(mostBlogs([
      {
        title: 'test',
        author: 'author1',
        url: 'test',
        likes: 1,
      },
      {
        title: 'test',
        author: 'author1',
        url: 'test',
        likes: 1,
      },
      {
        title: 'test',
        author: 'author2',
        url: 'test',
        likes: 1,
      },
    ]))
      .toEqual({
        author: 'author1',
        blogs: 2,
      });
  });

  test('of empty array is none', () => {
    expect(mostBlogs([])).toBe('Array is empty');
  });
});
