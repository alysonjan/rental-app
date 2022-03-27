require('dotenv-safe').config()
const mongoose = require('mongoose')

const DEVELOPMENT_DB = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_USERNAME}@${process.env.MONGODB_CLUSTERNAME}.zxcod.mongodb.net/${process.env.MONGODB_DATABASENAME}`
const PRODUCTION_DB = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_USERNAME}@${process.env.MONGODB_CLUSTERNAME}.zxcod.mongodb.net/${process.env.MONGODB_DATABASENAME}`
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true }

const DatabaseConnection = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV !== 'production' ? DEVELOPMENT_DB : PRODUCTION_DB,
      OPTIONS
    )
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = DatabaseConnection
