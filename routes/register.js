const express = require('express')

const router = express.Router()
const { VALIDATE_NEW_USER_INPUT } = require('../validations/userValidator')
const { handleNewUser } = require('../controllers/registerController')

router.route('/').post(VALIDATE_NEW_USER_INPUT, handleNewUser)

module.exports = router
