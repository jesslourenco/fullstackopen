const router = require('express').Router()
const { Op } = require('sequelize')
require('express-async-errors');
const { Blog, User } = require('../models')
const { tokenExtractor, validateSession } = require('../util/middleware')

router.get('/', async (req, res) => {
    let where = {}

    if(req.query.search){
        where = { 
            [Op.or]: [
                { title: { [Op.iLike]:`%${req.query.search}%` } },
                { author: { [Op.iLike]:`%${req.query.search}%` } }
            ]
        }
    }

    const posts = await Blog.findAll({
        include: { 
            model: User,
            attributes: ['name'] 
        },
        where,
        order: [['likes', 'DESC']]
    })
    res.json(posts)
})

router.post('/', tokenExtractor, validateSession, async (req, res) => {
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

router.delete('/:id', postFinder, tokenExtractor, validateSession, async (req, res) => {
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