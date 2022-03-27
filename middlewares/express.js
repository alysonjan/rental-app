const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')

const corsConfig = require('../configs/cors')

const initExpressMiddleware = app => {
  app.use(helmet())
  app.disable('x-powered-by')
  app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors(corsConfig))
  app.use(cookieParser())
}

module.exports = initExpressMiddleware
