const mongoose = require('mongoose');
const _ = require('lodash');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

const initialUsers = [
  {
    _id: '636ad3f7da62109cd5064bf0',
    username: 'jess',
    name: 'Jess Nakai',
    passwordHash: '$2b$10$ezjnbGripMNHHRO.5baQr.9hMOhH52m.BQmeEDxXjBfhdlV/DVjRC',
    __v: 0,
  },
  {
    _id: '636ad3f7da62109cd5064bf1',
    username: 'shan',
    name: 'Shan Nakai',
    passwordHash: '$2b$10$ezjnbGripMNHHRO.5baQr.9hMOhH52m.BQmeEDxXjBfhdlV/DVjRC',
    __v: 0,
  },
  {
    _id: '636ad3f7da62109cd5064bf2',
    username: 'karina',
    name: 'Karina',
    passwordHash: '$2b$10$ezjnbGripMNHHRO.5baQr.9hMOhH52m.BQmeEDxXjBfhdlV/DVjRC',
    __v: 0,
  },
  {
    _id: '636ad3f7da62109cd5064bf3',
    username: 'caio',
    name: 'Caio Henrique',
    passwordHash: '$2b$10$ezjnbGripMNHHRO.5baQr.9hMOhH52m.BQmeEDxXjBfhdlV/DVjRC',
    __v: 0,
  },
];

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = initialUsers.map((user) => new User(user));

  const promiseArray = userObjects.map(((user) => user.save()));

  await Promise.all(promiseArray);
});

describe('Invalid users', () => {
  test('user without a username cannot be created', async () => {
    const newUser = {
      name: 'test',
      password: 'whatever',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'User validation failed: username: Path `username` is required.' });
  });

  test('user with username length < 3 cannot be created', async () => {
    const newUser = {
      username: 'je',
      password: 'whatever',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'User validation failed: username: Path `username` (`je`) is shorter than the minimum allowed length (3).' });
  });

  test('user with a non-unique username cannot be created', async () => {
    const newUser = {
      username: 'jess',
      password: 'whatever',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'User validation failed: username: Error, expected `username` to be unique. Value: `jess`' });
  });

  test('user without a password cannot be created', async () => {
    const newUser = {
      username: 'test',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'a password is required' });
  });

  test('user with a password with length < 3 cannot be created', async () => {
    const newUser = {
      username: 'test',
      password: 'wh',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'minimum length of password is 3' });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
