const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')

const { ValidationError } = require('sequelize')
const { Blog, User, ReadingLists } = require('../models')

router.post('/', async (req, res) => {
  const reading_list = await ReadingLists.create({
    userId: req.body.userId,
    blogId: req.body.blogId,
  })
  res.json(reading_list)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const reading_list = await ReadingLists.findByPk(req.params.id)
  if (reading_list) {
    if (reading_list.userId === req.decodedToken.id) {
      if (req.body.read) {
        reading_list.read = req.body.read
        await reading_list.save()
        res.status(200).end()
      } else {
        throw new Error('Wrong request body')
      }
    } else {
      console.log(reading_list)
      console.log(req.decodedToken.id)
      res.status(401).end()
    }
  }
  res.status(404).end()
})

module.exports = router
