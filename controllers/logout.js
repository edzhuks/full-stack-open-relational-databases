const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', tokenExtractor, async (request, response) => {
  const user = await User.findByPk(request.decodedToken.id)
  if (user) {
    Session.update({ active: false }, { where: { userId: user.id } })
    return response.status(200).end()
  } else {
    response.status(401).end()
  }
})

module.exports = router
