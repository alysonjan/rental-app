const express = require('express')
const router = express.Router()
const { refreshTokenHandler } = require('../controllers/refreshTokenController')

router.route('/').get(refreshTokenHandler)

module.exports = router
