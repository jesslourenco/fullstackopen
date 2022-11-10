/* eslint-disable consistent-return */
const postsRouter = require('express').Router();
const Post = require('../models/post');

postsRouter.get('/', async (request, response) => {
  const posts = await Post.find({}).populate('user', { username: 1, name: 1 });
  response.json(posts);
});

postsRouter.post('/', async (request, response) => {
  const { user } = request;

  const post = new Post({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.likes,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  });

  const savedPost = await post.save();

  // eslint-disable-next-line no-underscore-dangle
  user.posts = user.posts.concat(savedPost._id);
  await user.save();
  response.status(201).json(savedPost);
});

postsRouter.delete('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id);
  const { user } = request;

  if (!post.user || post.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'deletion unauthorized for this user' });
  }
  await Post.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

postsRouter.put('/:id', async (request, response) => {
  const updateLikes = { likes: request.body.likes };

  const result = await Post.findByIdAndUpdate(request.params.id, updateLikes, { new: true });
  response.status(200).json(result);
});

module.exports = postsRouter;
