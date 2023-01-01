const router = require('express').Router()
const { User, Blog, ReadingList } = require('../models')
const { tokenExtractor, validateSession } = require('../util/middleware')

router.post('/', async (req, res) => {
    try{
    const readEntry = await ReadingList.create( req.body )
    return (
        readEntry
            ? res.json(readEntry)
            : res.status(400).end()
    )
    } catch (err) {
        console.log(err)
    }
})

router.put('/:id', tokenExtractor, validateSession, async (req, res) => {
    
    try{
    const readEntry = await ReadingList.findByPk( req.params.id )

    const user = await User.findByPk(req.decodedToken.id)
    if (user.id !== readEntry.userId) return res.status(403).json('user does not match that reading list')

    await readEntry.update({read: true})

    return res.status(200).end()

    } catch (err) {
        console.log(err)
        return res.status(400).end()
    }
})
module.exports = router