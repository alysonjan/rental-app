const express = require('express')
const router = express.Router()
const { VALIDATE_CREATE_LISTING_INPUT } = require('../validations/listingValidator')
const {
  createListing,
  fetchListing,
  fetchListingById,
} = require('../controllers/listingController')
const ROLE_LIST = require('../constants/roles')
const verifyRoles = require('../middlewares/verifyRoles')

router
  .route('/create')
  .post(verifyRoles(ROLE_LIST.Editor), VALIDATE_CREATE_LISTING_INPUT, createListing)
router.route('/').get(fetchListing)
router.route('/:id').get(fetchListingById)

module.exports = router
