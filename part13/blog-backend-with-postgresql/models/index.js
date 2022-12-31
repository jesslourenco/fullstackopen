// this file concentrates all imports! 
const Blog = require('./blog')
const User = require('./user')

// properties define m2m relationships
User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({ alter: true }) // alters the db table if necessary to match model
User.sync({ alter: true })

module.exports = {
  Blog, User
}