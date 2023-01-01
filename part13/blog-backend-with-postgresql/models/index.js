// this file concentrates all imports! 
const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')
const Session = require('./session')

// properties define o2m relationship
User.hasMany(Blog)
Blog.belongsTo(User)

// properties define o2o relationship
User.hasOne(Session)
Session.belongsTo(User)

// properties define m2m relationship
User.belongsToMany(Blog, {through: ReadingList, as: 'reading'})
Blog.belongsToMany(User, {through: ReadingList, as: 'user_readinglist'}) // 'as' can be used to rename the connection table to be something more meaningful given the relationship. It also helps accessing the connect table from the others

/* may use this instead of migrations to keep tables synced with models and up-to-date to any changes made
Blog.sync({ alter: true }) 
User.sync({ alter: true }) */

module.exports = {
  Blog, User, ReadingList
}