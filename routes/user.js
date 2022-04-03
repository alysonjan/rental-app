const express = require('express')

const router = express.Router()
const {
  VALIDATE_SIGN_UP_INPUT,
  VALIDATE_SIGN_IN_INPUT,
  VALIDATE_FORGET_PASSWORD_INPUT,
} = require('../validations/userValidator')
const { signUp, signIn, forgetPassword } = require('../controllers/userController')

router.route('/signup').post(VALIDATE_SIGN_UP_INPUT, signUp)
router.route('/signin').post(VALIDATE_SIGN_IN_INPUT, signIn)
router.route('/forget-password').post(VALIDATE_FORGET_PASSWORD_INPUT, forgetPassword)

module.exports = router
