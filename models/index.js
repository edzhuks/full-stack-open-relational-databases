const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'in_reading_list' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_reading' })

module.exports = { Blog, User, ReadingList }
