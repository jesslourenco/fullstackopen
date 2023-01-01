const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isValidYear: (value) => {
            const currentYear = new Date().getFullYear()
            if (Number(value) < 1991 || Number(value) > currentYear)
                throw new Error('Invalid year value')
            return true
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}