const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { Session, User } = require('../models')
const { where } = require('sequelize')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)
      const decodedToken = jwt.verify(token, SECRET)
      console.log(decodedToken)
      const session = await Session.findOne({ where: { token: token } })
      if (!session.active) {
        return res.status(401).json({ error: 'token expired' })
      }
      const user = await User.findByPk(decodedToken.id)
      if (user.disabled) {
        return res.status(401).json({ error: 'user disabled' })
      }
      req.decodedToken = decodedToken
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { tokenExtractor }
