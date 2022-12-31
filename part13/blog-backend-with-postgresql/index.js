const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const postsRouter = require('./controllers/posts-router')
const usersRouter = require('./controllers/users-router')
const loginRouter = require('./controllers/login-router')

app.use(express.json())
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
