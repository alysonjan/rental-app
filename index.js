require('dotenv-safe').config()
const express = require('express')
const mongoose = require('mongoose')
const initExpressMiddleware = require('./middlewares/express')
const DatabaseConnection = require('./configs/mongodb')
const { PORT } = require('./configs/server')

const app = express()

DatabaseConnection()
initExpressMiddleware(app)

app.get('/', (_, res) => res.send('🔥Server is on fire🔥'))

// Routes
app.use('/register', require('./routes/register'))

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB🚀⚡')
  app.listen(PORT, () => console.log(`Server running on port http//:localhost:${PORT} 🚀`))
})
