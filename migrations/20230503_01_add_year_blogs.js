const sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      // validate: {
      //   min: 1991,
      //   max: sequelize.fn('YEAR', sequelize.fn('NOW')),
      // },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}
