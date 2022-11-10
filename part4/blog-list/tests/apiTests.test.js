/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const _ = require('lodash');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

const api = supertest(app);
const Post = require('../models/post');
const User = require('../models/user');

const initialPosts = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

let user = null;
let token = null;

const extractUser = async () => {
  const decodedToken = jwt.verify(token, process.env.SECRET);
  user = await User.findById(decodedToken.id);
};

beforeEach(async () => {
  await User.deleteMany({});

  const newUser = { username: 'test', name: 'test', password: 'passcode' };
  await api.post('/api/users').send(newUser).expect(201);

  const info = await api.post('/api/login').send({ username: newUser.username, password: newUser.password }); // token, username, name
  token = info.body.token;
  user = extractUser();

  await Post.deleteMany({});

  const postObjects = initialPosts.map((post) => new Post({ ...post, user: user._id }));
  const savedPosts = postObjects.map((post) => post.save());
  await Promise.all(savedPosts);

  user.posts = user.posts.concat(initialPosts.map((post) => post._id));
  await user.save();
}, 10000);

test('POST does not create new post without token', async () => {
  const newPost = {
    title: 'a test title',
    author: 'a test author',
    url: 'https://atesturl.com',
    likes: 15,
  };

  await api
    .post('/api/posts')
    .send(newPost)
    .expect(401);
});

test('posts are returned as json', async () => {
  await api
    .get('/api/posts')
    .set('authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are six posts', async () => {
  const response = await api.get('/api/posts').set('authorization', `Bearer ${token}`);
  expect(response.body).toHaveLength(6);
});

test('id property is named id', async () => {
  const response = await api.get('/api/posts').set('authorization', `Bearer ${token}`);
  const post = _.head(response.body);

  expect(post.id).toBeDefined();
});

test('POST creates new post', async () => {
  const newPost = {
    title: 'a test title',
    author: 'a test author',
    url: 'https://atesturl.com',
    likes: 15,
  };

  await api
    .post('/api/posts')
    .set('authorization', `Bearer ${token}`)
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/posts').set('authorization', `Bearer ${token}`);
  expect(response.body).toHaveLength(7);
});

test('Default value of likes is zero', async () => {
  const newPost = {
    title: 'a test title',
    author: 'a test author',
    url: 'https://atesturl.com',
  };

  const response = await api.post('/api/posts').set('authorization', `Bearer ${token}`).send(newPost);
  expect(response.status).toBe(201);
  expect(response.body.likes).toBe(0);
});

test('New post req with missing title returns 400', async () => {
  const newPost = {
    author: 'a test author',
    url: 'https://atesturl.com',
  };

  await api
    .post('/api/posts')
    .set('authorization', `Bearer ${token}`)
    .send(newPost)
    .expect(400);
});

test('New post req with missing url returns 400', async () => {
  const newPost = {
    title: 'a test title',
    author: 'a test author',
  };

  await api
    .post('/api/posts')
    .set('authorization', `Bearer ${token}`)
    .send(newPost)
    .expect(400);
});

test('Successfully deletes a post', async () => {
  const response = await api.get('/api/posts').set('authorization', `Bearer ${token}`);
  const post = _.head(response.body);

  await api
    .delete(`/api/posts/${post.id}`)
    .set('authorization', `Bearer ${token}`)
    .expect(204);
});

test('Successfully updates the likes of a post', async () => {
  const likes = { likes: 13 };

  const response = await api.get('/api/posts').set('authorization', `Bearer ${token}`);
  const post = _.head(response.body);

  const updateResponse = await api.put(`/api/posts/${post.id}`).set('authorization', `Bearer ${token}`).send(likes);
  expect(updateResponse.body.likes).toBe(13);
});

afterAll(() => {
  mongoose.connection.close();
});
