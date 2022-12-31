const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { SECRET } = require('../util/config')
const User = require('../models/user')

const error = (err, req, res, next) => {
    // This is a custom middleware!
    console.log(err)
        res.status(400)
        next()
}

router.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    const passwordCorrect = body.password === 'secret'

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    response
        .status(200)
        .json({ token, username: user.username, name: user.name })
})

router.use(error)

module.exports = router