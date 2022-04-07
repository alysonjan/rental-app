const Listing = require('../models/Listing')
const { findByUsername } = require('../controllers/userController')
const { REQUEST_ERROR_MSG, CREATE_LISTING_SUCESS_MSG } = require('../constants/messages')

const createListing = async (req, res) => {
  const {
    imageUrl,
    name,
    address,
    property_type,
    room_type,
    bedrooms,
    beds,
    bathrooms,
    price_per_night,
    total_occupancy,
    amenities,
  } = req.body

  try {
    const username = await findByUsername(req.username)
    if (!username) return res.status(400).json({ message: REQUEST_ERROR_MSG })
    const newListing = await Listing.create({
      imageUrl,
      name,
      address,
      property_type,
      room_type,
      bedrooms,
      beds,
      bathrooms,
      price_per_night,
      total_occupancy,
      amenities,
      owner_id: username._id,
    })
    if (newListing) return res.status(201).json({ message: CREATE_LISTING_SUCESS_MSG })
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.log(err)
  }
}

module.exports = { createListing }
