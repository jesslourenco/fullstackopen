const testingRouter = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');

testingRouter.post('/reset', async (request, response) => {
  await Post.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
