const mongoose = require('mongoose');
const _ = require('lodash');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Post = require('../models/post');

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

beforeEach(async () => {
  await Post.deleteMany({});

  const postObjects = initialPosts
    .map((post) => new Post(post));

  const promiseArray = postObjects
    .map((post) => post.save());

  await Promise.all(promiseArray);
});

test('posts are returned as json', async () => {
  await api
    .get('/api/posts')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are six posts', async () => {
  const response = await api.get('/api/posts');
  expect(response.body).toHaveLength(6);
});

test('id property is named id', async () => {
  const response = await api.get('/api/posts');
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
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/posts');
  expect(response.body).toHaveLength(7);
});

test('Default value of likes is zero', async () => {
  const newPost = {
    title: 'a test title',
    author: 'a test author',
    url: 'https://atesturl.com',
  };

  const response = await api.post('/api/posts').send(newPost);
  expect(response.status).toBe(201);
  expect(response.body.likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
