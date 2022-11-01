// eslint-disable-next-line prefer-destructuring
const totalLikes = require('../utils/list_helper').totalLikes;

describe('total likes', () => {
  test('when array has only one blog the total number of likes equals to that blogs\' likes', () => {
    expect(totalLikes([{
      title: 'test',
      author: 'test',
      url: 'test',
      likes: 1,
    }])).toBe(1);
  });

  test('of many blogs is calculated right', () => {
    expect(totalLikes([
      {
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 1,
      },
      {
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 1,
      },
      {
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 1,
      },
    ]))
      .toBe(3);
  });

  test('of empty array is zero', () => {
    expect(totalLikes([])).toBe(0);
  });
});
