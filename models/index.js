const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./reading_list')
const Session = require('./session')

User.hasMany(Session)
Session.belongsTo(User)

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'in_reading_list' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'users_reading' })

module.exports = { Blog, User, ReadingLists, Session }
