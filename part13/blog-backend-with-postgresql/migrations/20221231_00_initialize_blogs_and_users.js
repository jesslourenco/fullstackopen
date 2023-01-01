const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.TEXT
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      created_at: {type: DataTypes.DATE },
      updated_at: {type: DataTypes.DATE}    
    })
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
      },
      created_at: {type: DataTypes.DATE },
      updated_at: {type: DataTypes.DATE}
    })
    await queryInterface.addColumn('blogs', 'user_id', { // use snake case for foreign keys in migrations
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })

    await queryInterface.addColumn('users', 'post_id', { 
        type: [DataTypes.INTEGER],
        allowNull: true,
        references: { model: 'users', key: 'id' },
      })
  },
  down: async ({ context: queryInterface }) => { 
    // what to do when rolling back a migration
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}