const router = require('express').Router()
const { fn, col } = require('sequelize')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
    try{
    const posts = await Blog.findAll({
        attributes: [
            [col('blog.author'), 'author'], 
            [fn('COUNT', col('title')), 'articles'],
            [fn('SUM', col('likes')), 'likes']
        ],
        group: ['author'],
        order: [['likes', 'DESC']]
    })

    return res.json(posts)
} catch(err) {
    console.log(err)
    res.json({err})
}   
})

module.exports = router