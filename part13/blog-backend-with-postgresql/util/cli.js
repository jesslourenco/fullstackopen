require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
    try {
      await sequelize.authenticate()
      const posts = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
      posts.map(p => console.log(`${p.author}: '${p.title}', ${p.likes} likes`))
      sequelize.close()
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }
  
main()