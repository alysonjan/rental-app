const { param, validationResult } = require('express-validator')
const { REQUEST_ERROR_MSG } = require('../constants/messages')

exports.VALIDATE_PARAMS_ID = [
  param('id', REQUEST_ERROR_MSG).isMongoId().not().isEmpty(),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
    }
    return next()
  },
]
