const { check, param, validationResult } = require('express-validator')
const { FIELD_IS_REQUIRED, IS_NUMBER_ERR_MSG, REQUEST_ERROR_MSG } = require('../constants/messages')

exports.VALIDATE_CREATE_LISTING_INPUT = [
  param('id', REQUEST_ERROR_MSG)
    .isMongoId()
    .not()
    .isEmpty()
    .optional({ nullable: true, checkFalsy: true }),
  check('imageUrl', FIELD_IS_REQUIRED).isArray().notEmpty().bail(),
  check('name', FIELD_IS_REQUIRED).trim().not().isEmpty().isString().bail(),
  check('address', FIELD_IS_REQUIRED).trim().not().isEmpty().isString().bail(),
  check('property_type', FIELD_IS_REQUIRED).trim().not().isEmpty().isString().bail(),
  check('room_type', FIELD_IS_REQUIRED).trim().not().isEmpty().isString().bail(),
  check('bedrooms', FIELD_IS_REQUIRED).trim().not().isEmpty().isString().bail(),
  check('beds', FIELD_IS_REQUIRED).trim().not().isEmpty().isString().bail(),
  check('bathrooms', FIELD_IS_REQUIRED).trim().not().isEmpty().isString().bail(),
  check('price_per_night', FIELD_IS_REQUIRED)
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage(IS_NUMBER_ERR_MSG)
    .bail(),
  check('total_occupancy', FIELD_IS_REQUIRED)
    .trim()
    .not()
    .isEmpty()
    .isString()
    .withMessage(IS_NUMBER_ERR_MSG)
    .bail(),
  check('amenities', FIELD_IS_REQUIRED).isArray().notEmpty().bail(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
    }
    return next()
  },
]
