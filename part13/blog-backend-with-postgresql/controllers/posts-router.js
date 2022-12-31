const router = require('express').Router()
require('express-async-errors');
const { Blog } = require('../models')

router.get('/', async (req, res) => {
    const posts = await Blog.findAll()
    res.json(posts)
})

router.post('/', async (req, res) => {
    const post = await Blog.create(req.body)
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

router.delete('/:id', postFinder, async (req, res) => {
    if (req.post) {
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