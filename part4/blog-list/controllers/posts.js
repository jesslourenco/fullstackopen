const postsRouter = require('express').Router();
const Post = require('../models/post');

postsRouter.get('/', async (request, response) => {
  const posts = await Post.find({});
  response.json(posts);
});

postsRouter.post('/', async (request, response) => {
  const post = new Post(request.body);
  const result = await post.save();
  response.status(201).json(result);
});

module.exports = postsRouter;
