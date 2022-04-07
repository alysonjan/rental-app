const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { createAccessToken, createRefreshToken } = require('../utils/jwt')

const refreshTokenHandler = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

  const foundUser = await User.findOne({ refreshToken }).exec()

  if (!foundUser) {
    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN, async (err, decoded) => {
      if (err) return res.sendStatus(403)
      const hackedUser = await User.findOne({ username: decoded.username }).exec()
      hackedUser.refreshToken = []
      await hackedUser.save()
    })
    return res.sendStatus(403)
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken)
  jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN, async (err, decoded) => {
    if (err) {
      foundUser.refreshToken = [...newRefreshTokenArray]
      await foundUser.save()
    }
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403)

    const newAccessToken = createAccessToken(decoded.username, foundUser.roles)
    const newRefreshToken = createRefreshToken(foundUser.username)

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
    await foundUser.save()

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      sameSite: 'None',
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ newAccessToken })
  })
}

module.exports = { refreshTokenHandler }
