const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// eslint-disable-next-line consistent-return
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) {
    return response.status(400).json({ error: 'a password is required' });
  }

  if (password.length < 3) {
    return response.status(400).json({ error: 'minimum length of password is 3' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
