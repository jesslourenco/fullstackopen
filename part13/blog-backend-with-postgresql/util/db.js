const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

/* the umzug lib allows us to do migrations from within the code.
   To do migration commands on terminal, install sequelize cli package */

const sequelize = new Sequelize(DATABASE_URL, { dialect: 'postgres'});

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }), // record migration in the postgres db
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('database connected')
  } catch (err) {
    console.log('connecting database failed')
    console.log(err)
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }