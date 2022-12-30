const { mostLikes } = require('../utils/list_helper');

describe('author with most likes', () => {
  test('when array has only one blog it should return that blogs likes', () => {
    expect(mostLikes([{
      title: 'test',
      author: 'test author',
      url: 'test',
      likes: 1,
    }])).toEqual({
      author: 'test author',
      likes: 1,
    });
  });

  test('of many blogs is calculated right', () => {
    expect(mostLikes([
      {
        title: 'test',
        author: 'author1',
        url: 'test',
        likes: 3,
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
        likes: 4,
      });
  });

  test('of empty array is none', () => {
    expect(mostLikes([])).toBe('Array is empty');
  });
});
