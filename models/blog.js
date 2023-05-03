const { Model, DataTypes, ValidationError } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}
Blog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.TEXT },
    url: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isValidYear(value) {
          if (parseInt(value) < 1991) {
            throw new ValidationError('Year must be greater or equal to 1991')
          } else if (parseInt(value) > new Date().getFullYear()) {
            throw new ValidationError('Year must be at most the current year')
          }
        },
      },
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'blog' }
)

module.exports = Blog
