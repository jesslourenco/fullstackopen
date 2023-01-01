const { SECRET } = require('../util/config')
const jwt = require('jsonwebtoken')
const {ActiveSession, User} = require('../models')

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

const validateSession = async(req, res, next) => {
    
    const token = req.get('authorization').split(' ')[1]

    try{
        const session = await ActiveSession.findOne({ 
            where: {token: token }, 
            include: [{
                model: User
            }]
    })

        if (!session) return res.status(401).json({ error: 'expired token. Please login'})

        console.log(session.toJSON())

        if (!session.user.active) return res.status(401).json({
            error: 'Your account is deactivated. Please contact admin'
        })
    } catch (err) {
        console.log(err)
        return res.status(401).end()
    }
    next()
}

module.exports = { tokenExtractor, validateSession }