const router = require('express').Router()
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: { // JOIN query
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
    })
    res.json(users)
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    if (user) {
        res.json(user)
    } else {
        return res.status(400).end()
    }
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

const error = (err, req, res, next) => {
    // This is a custom middleware!
    if( err.name === "SequelizeValidationError"){
        res.status(400).json({error: err.errors[0].message}).end()
        next()
    }
}

router.put('/:username', async (req, res) => {
    const user = await User.findOne({ where: { username: req.params.username}})
    
    if (user) {
        await User.update({username: req.body.username }, {where: {id: user.id}})
        res.status(200).end()
    } else {
        res.status(404).end()
    }
})

router.use(error)

module.exports = router