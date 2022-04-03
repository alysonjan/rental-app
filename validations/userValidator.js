const { check, validationResult } = require('express-validator')

const { PASSWORD_REGEX, ISALPHA_REGEX } = require('../constants/regex')
const {
  FIELD_IS_REQUIRED,
  FIELD_NAME_REQ,
  ENTER_A_VALID_EMAIL,
  INVALID_PASSWORD_REQ,
  USERNAME_REQ,
  PASSWORD_REQ,
} = require('../constants/messages')

exports.VALIDATE_SIGN_UP_INPUT = [
  check('lastname', FIELD_IS_REQUIRED)
    .trim()
    .not()
    .isEmpty()
    .isString()
    .matches(ISALPHA_REGEX)
    .withMessage(FIELD_NAME_REQ)
    .bail(),
  check('firstname', FIELD_IS_REQUIRED)
    .trim()
    .not()
    .isEmpty()
    .isString()
    .matches(ISALPHA_REGEX)
    .withMessage(FIELD_NAME_REQ)
    .bail(),
  check('email', FIELD_IS_REQUIRED)
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage(ENTER_A_VALID_EMAIL)
    .bail(),
  check('username', FIELD_IS_REQUIRED)
    .trim()
    .not()
    .isEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage(USERNAME_REQ)
    .bail(),
  check('password', FIELD_IS_REQUIRED)
    .trim()
    .not()
    .isEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage(PASSWORD_REQ)
    .matches(PASSWORD_REGEX)
    .withMessage(INVALID_PASSWORD_REQ)
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
    }
    return next()
  },
]

exports.VALIDATE_SIGN_IN_INPUT = [
  check('email', FIELD_IS_REQUIRED)
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage(ENTER_A_VALID_EMAIL)
    .bail(),
  check('password', FIELD_IS_REQUIRED)
    .trim()
    .not()
    .isEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage(PASSWORD_REQ)
    .matches(PASSWORD_REGEX)
    .withMessage(INVALID_PASSWORD_REQ)
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
    }
    return next()
  },
]

exports.VALIDATE_FORGET_PASSWORD_INPUT = [
  check('email', FIELD_IS_REQUIRED)
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage(ENTER_A_VALID_EMAIL)
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
    }
    return next()
  },
]
