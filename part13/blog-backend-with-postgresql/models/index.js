// this file concentrates all imports! 
const Blog = require('./blog')
const User = require('./user')

// properties define m2m relationships
User.hasMany(Blog)
Blog.belongsTo(User)

/* may use this instead of migrations to keep tables synced with models and up-to-date to any changes made
Blog.sync({ alter: true }) 
User.sync({ alter: true }) */

module.exports = {
  Blog, User
}