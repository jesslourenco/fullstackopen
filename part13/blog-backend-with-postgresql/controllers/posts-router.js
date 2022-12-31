const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
require('express-async-errors');
const { Blog, User } = require('../models')
const { SECRET } = require('../util/config')


router.get('/', async (req, res) => {
    const where = {}

    if(req.query.search){
        where.title = { [Op.iLike]: `%${req.query.search}%`}
    }

    const posts = await Blog.findAll({
        include: { 
            model: User,
            attributes: ['name'] 
        },
        where
    })
    res.json(posts)
})

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch {
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const post = await Blog.create({...req.body, userId: user.id})
    return (
        post
            ? res.json(post)
            : res.status(400).end()
    )
})

const postFinder = async (req, res, next) => {
    // This is a custom middleware!
    req.post = await Blog.findByPk(req.params.id)
    next()
}

router.get('/:id', postFinder, async (req, res) => {
    if (req.post) {
        res.json(req.post)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', postFinder, tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    if (req.post.userId === user.id) {
        await req.post.destroy()
    }
    res.status(204).end()
})

router.put('/:id', postFinder, async (req, res) => {
    if (req.post) {
        const incrementedPost = await req.post.increment('likes')
        res.json(incrementedPost)
    } else {
        res.status(404).end()
    }
})

module.exports = router