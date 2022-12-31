const router = require('express').Router()
const { User, Blog, ReadingList } = require('../models')
require('express-async-errors');

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

module.exports = router