const { favoriteBlog } = require('../utils/list_helper');

describe('favorite Blog', () => {
  test('when array has only one blog the total number of likes equals to that blogs\' likes', () => {
    expect(favoriteBlog([{
      title: 'test',
      author: 'test',
      url: 'test',
      likes: 1,
    }])).toEqual({
      title: 'test',
      author: 'test',
      url: 'test',
      likes: 1,
    });
  });

  test('of many blogs is calculated right', () => {
    expect(favoriteBlog([
      {
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 0,
      },
      {
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 3,
      },
      {
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 7,
      },
    ]))
      .toEqual({
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 7,
      });
  });

  test('of empty array returns message', () => {
    expect(favoriteBlog([])).toBe('No blogs in the array');
  });
});
