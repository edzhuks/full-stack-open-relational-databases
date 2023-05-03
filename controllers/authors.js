const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { ValidationError } = require('sequelize')
const { Blog, User } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    order: [['likes', 'DESC']],
    group: 'author',
  })
  res.json(authors)
})

module.exports = router
