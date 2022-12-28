const express = require('express');
const { Todo } = require('../mongo');
const { setAsync, getAsync } = require('../redis');
const router = express.Router();


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  if(await getAsync('counter') === '0')  await setAsync('counter', '0');
  const count = Number(await getAsync('counter')) +1;
  await setAsync('counter', String(count));
  
  res.send(todo);
});

router.get('/statistics', async (_, res) => {
  
  const data = await getAsync('counter');

  res.json({added_todos: Number(data)});
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await Todo.updateOne({_id: req.todo.id}, { text: req.body.text, done: req.body.done })
  res.sendStatus(204);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
