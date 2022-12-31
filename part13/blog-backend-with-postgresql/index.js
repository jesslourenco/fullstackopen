require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync()

app.get('/api/posts', async (req, res) => {
  const posts = await Blog.findAll()
  res.json(posts)
})

app.use(express.json())

app.post('/api/posts', async (req, res) => {
  try {
    const post = await Blog.create(req.body)
    return res.json(post)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Blog.destroy({ where: {id: req.params.id } })
    return res.status(204).json()
  } catch (error) {
    return res.status(400).json({ error })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
