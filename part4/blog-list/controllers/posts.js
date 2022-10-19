const postsRouter = require('express').Router();
const Post = require('../models/post');

postsRouter.get('/', (request, response) => {
  Post
    .find({})
    .then((posts) => {
      response.json(posts);
    });
});

postsRouter.post('/', (request, response) => {
  const post = new Post(request.body);

  post
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

module.exports = postsRouter;
