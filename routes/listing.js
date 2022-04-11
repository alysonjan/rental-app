const express = require('express')
const router = express.Router()
const { VALIDATE_CREATE_LISTING_INPUT } = require('../validations/listingValidator')
const { VALIDATE_PARAMS_ID } = require('../validations/paramsValidator')
const {
  createListing,
  fetchListing,
  fetchListingById,
  updateListing,
  deleteListing,
} = require('../controllers/listingController')
const ROLE_LIST = require('../constants/roles')
const verifyRoles = require('../middlewares/verifyRoles')

router
  .route('/create')
  .post(verifyRoles(ROLE_LIST.Editor), VALIDATE_CREATE_LISTING_INPUT, createListing)
router.route('/').get(fetchListing)
router.route('/:id').get(fetchListingById)
router
  .route('/update/:id')
  .put(verifyRoles(ROLE_LIST.Editor), VALIDATE_CREATE_LISTING_INPUT, updateListing)
router.route('/delete/:id').delete(verifyRoles(ROLE_LIST.Editor), VALIDATE_PARAMS_ID, deleteListing)

module.exports = router
