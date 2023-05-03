const router = require('express').Router()
const { Op } = require('sequelize')

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ['userId'] } },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  where = {}
  if (req.query.read) {
    where = {
      read: {
        [Op.eq]: req.query.read,
      },
    }
  }
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: 'in_reading_list',
        through: { attributes: ['read', 'id'], where },
      },
    ],
  })
  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  })
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.post('/switchability/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  user.disabled = !user.disabled
  await user.save()
  res.json(user)
})

module.exports = router
