const express = require('express')

const router = express.Router()
const { VALIDATE_SIGN_UP_INPUT, VALIDATE_SIGN_IN_INPUT } = require('../validations/userValidator')
const { signUp, signIn } = require('../controllers/userController')

router.route('/signup').post(VALIDATE_SIGN_UP_INPUT, signUp)
router.route('/signin').post(VALIDATE_SIGN_IN_INPUT, signIn)

module.exports = router
