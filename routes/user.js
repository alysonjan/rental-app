const express = require('express')

const router = express.Router()
const {
  VALIDATE_SIGN_UP_INPUT,
  VALIDATE_SIGN_IN_INPUT,
  VALIDATE_FORGET_PASSWORD_INPUT,
  VALIDATE_RESET_PASSWORD_INPUT,
} = require('../validations/userValidator')
const {
  signUp,
  signIn,
  forgetPassword,
  resetPassword,
  logoutHandler,
} = require('../controllers/userController')

router.route('/signup').post(VALIDATE_SIGN_UP_INPUT, signUp)
router.route('/signin').post(VALIDATE_SIGN_IN_INPUT, signIn)
router.route('/forget-password').post(VALIDATE_FORGET_PASSWORD_INPUT, forgetPassword)
router.route('/reset-password').put(VALIDATE_RESET_PASSWORD_INPUT, resetPassword)
router.route('/logout').get(logoutHandler)

module.exports = router
