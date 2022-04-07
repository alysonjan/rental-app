const jwt = require('jsonwebtoken')
const { INVALID_TOKEN } = require('../constants/messages')

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: INVALID_TOKEN })
    }
    req.username = decoded.UserInfo.username
    req.roles = decoded.UserInfo.roles
    next()
  })
}

module.exports = verifyJwt
