const router = require('express').Router()
const { ActiveSession } = require('../models')

const error = (err, req, res, next) => {
    // This is a custom middleware!
    console.log(err)
    res.status(400)
    next()
}

router.delete('/', async (req, res) => {
    const userId = req.body.userId

    const session = await ActiveSession.findOne({ where: { userId: userId }})
    await session.destroy()

    res.status(200).end()
})
router.use(error)

module.exports = router