require('dotenv-safe').config()
const express = require('express')
const mongoose = require('mongoose')
const initExpressMiddleware = require('./middlewares/express')
const DatabaseConnection = require('./configs/mongodb')
const { PORT } = require('./configs/server')
const verifyJwt = require('./middlewares/verifyJwt')

const app = express()

DatabaseConnection()
initExpressMiddleware(app)

app.get('/', (_, res) => res.send('🔥Server is on fire🔥'))

// public Routes
app.use('/api/user', require('./routes/user'))

// auth Routes
app.use(verifyJwt)
app.use('/api/listing', require('./routes/listing'))

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB🚀⚡')
  app.listen(PORT, () => console.log(`Server running on port http//:localhost:${PORT} 🚀`))
})
