const router = require('express').Router()

const { ValidationError } = require('sequelize')
const { Blog, User, ReadingLists } = require('../models')

router.post('/', async (req, res) => {
  const reading_list = await ReadingLists.create({
    userId: req.body.userId,
    blogId: req.body.blogId,
  })
  res.json(reading_list)
})

module.exports = router
