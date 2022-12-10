/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const postsRouter = require('express').Router();
const Post = require('../models/post');
const Comment = require('../models/comment');

postsRouter.get('/', async (request, response) => {
  let posts = await Post.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 });
  posts = posts.sort((a, b) => b.likes - a.likes);
  response.json(posts);
});

postsRouter.post('/', async (request, response) => {
  const { user } = request;

  const post = new Post({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.likes,
    user: user._id,
  });

  const savedPost = await post.save();

  user.posts = user.posts.concat(savedPost._id);
  await user.save();
  response.status(201).json(savedPost);
});

postsRouter.delete('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id);
  const { user } = request;

  if (!post.user || (post.user.toString() !== user.id.toString())) {
    return response.status(401).json({ error: 'deletion unauthorized for this user' });
  }
  await Post.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

postsRouter.put('/:id', async (request, response) => {
  const query = { _id: request.body.id };
  const result = await Post.findOneAndUpdate(query, { $inc: { likes: 1 } }, { new: true }).exec();
  response.status(200).json(result);
});

postsRouter.post('/:id/comments', async (request, response) => {
  const post = await Post.findById(request.params.id);

  const comment = new Comment({
    content: request.body.content,
    post: post._id,
  });

  const savedComment = await comment.save();

  post.comments = post.comments.concat(savedComment._id);
  await post.save();
  response.status(201).json(savedComment);
});

postsRouter.get('/comments', async (request, response) => {
  const comments = await Comment.find({}).populate('post', { title: 1, author: 1 });
  response.json(comments);
});

postsRouter.delete('/comments/:id', async (request, response) => {
  await Comment.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = postsRouter;
