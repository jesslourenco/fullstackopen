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

postsRouter.delete('/:id', async (request, response) => {
  await Post.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = postsRouter;
