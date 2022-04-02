const jwt = require('jsonwebtoken')

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN } = require('../configs/security')

const createAccessToken = (username, roles) => {
  const userRoles = Object.values(roles)
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: username,
        roles: userRoles,
      },
    },
    JWT_SECRET_ACCESS_TOKEN,
    { expiresIn: '30m' }
  )
  return accessToken
}

const createRefreshToken = username => {
  const refreshToken = jwt.sign({ username }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: '1d' })
  return refreshToken
}

module.exports = { createAccessToken, createRefreshToken }
