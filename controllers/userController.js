const User = require('../models/User')
const {
  EMAIL_ALREADY_EXISTS,
  SIGN_UP_SUCCESS_MSG,
  INVALID_EMAIL_OR_PASSWORD,
  RESET_PASSWORD_MSG,
  REQUEST_ERROR_MSG,
} = require('../constants/messages')
const { encryptPassword, decryptPassword } = require('../utils/bcrypt')
const { createAccessToken, createRefreshToken } = require('../utils/jwt')
const sendResetPasswordMail = require('../sendgrid/sendMail')
const { resetPasswordUri } = require('../configs/paths')

const checkIfEmailExists = async email => {
  const checkEmail = await User.findOne({ email })
  return checkEmail
}

const signUp = async (req, res) => {
  const { lastname, firstname, email, username, password } = req.body

  try {
    const userEmail = await checkIfEmailExists(email)
    if (userEmail) return res.status(409).json({ message: EMAIL_ALREADY_EXISTS })
    const encryptedPassword = await encryptPassword(password)
    const newUser = await User.create({
      lastname,
      firstname,
      email,
      username,
      password: encryptedPassword,
    })
    if (newUser) return res.status(201).json({ message: SIGN_UP_SUCCESS_MSG })
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.log(err)
  }
  return null
}

const signIn = async (req, res) => {
  const cookies = req.cookies
  const { email, password } = req.body

  try {
    const user = await checkIfEmailExists(email)
    if (!user) return res.status(401).json({ message: INVALID_EMAIL_OR_PASSWORD })

    const matchPassword = await decryptPassword(password, user.password)
    if (!matchPassword) return res.status(401).json({ message: INVALID_EMAIL_OR_PASSWORD })

    const accessToken = createAccessToken(user.username, user.roles)
    const newRefreshToken = createRefreshToken(user.username)

    let newRefreshTokenArray = !cookies?.jwt
      ? user.refreshToken
      : user.refreshToken.filter(rt => rt !== cookies.jwt)

    if (!cookies?.jwt) {
      const refreshToken = cookies.jwt
      const foundToken = await User.findOne({ refreshToken }).exec()

      if (!foundToken) newRefreshTokenArray = []
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    }

    user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
    await user.save()
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  return null
}

const forgetPassword = async (req, res) => {
  const { email } = req.body
  try {
    await sendResetPasswordMail(email, resetPasswordUri)
    return res.status(200).json({ message: RESET_PASSWORD_MSG })
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.log(err)
  }
}

module.exports = { signUp, signIn, forgetPassword }
