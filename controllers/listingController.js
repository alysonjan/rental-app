const Listing = require('../models/Listing')
const { findByUsername } = require('../controllers/userController')
const {
  REQUEST_ERROR_MSG,
  CREATE_LISTING_SUCESS_MSG,
  UPDATE_LISTING_SUCESS_MSG,
  DELETE_LISTING_SUCESS_MSG,
  NO_LISTING_FOUND,
} = require('../constants/messages')

const findListingById = async id => {
  const listingId = await Listing.findById(id).exec()
  return listingId
}

const fetchListing = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ published_at: -1 })
    if (!listings) return res.status(404).json({ message: NO_LISTING_FOUND })
    return res.status(200).json(listings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const fetchListingById = async (req, res) => {
  try {
    const listingById = await Listing.findById(req.params.id)
    if (!listingById) return res.status(404).json({ message: NO_LISTING_FOUND })
    return res.status(200).json(listingById)
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(404).json({ message: NO_LISTING_FOUND })
    res.status(500).json({ message: err.message })
  }
}

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
  }
}

const updateListing = async (req, res) => {
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
    const listingById = await findListingById(req.params.id)
    if (!listingById) return res.status(404).json({ message: NO_LISTING_FOUND })
    const username = await findByUsername(req.username)
    if (!username) return res.status(400).json({ message: REQUEST_ERROR_MSG })
    const updatedListing = await Listing.findOneAndUpdate(
      {
        username: req.username,
        _id: req.params.id,
      },
      {
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
      },
      {
        new: true,
      }
    ).exec()
    if (updatedListing) return res.status(200).json({ message: UPDATE_LISTING_SUCESS_MSG })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteListing = async (req, res) => {
  try {
    const listingById = await findListingById(req.params.id)
    if (!listingById) return res.status(404).json({ message: NO_LISTING_FOUND })
    const username = await findByUsername(req.username)
    if (!username) return res.status(400).json({ message: REQUEST_ERROR_MSG })
    const deletedListing = await Listing.deleteOne({
      username: req.username,
      _id: req.params.id,
    })
    if (deletedListing) return res.status(200).json({ message: DELETE_LISTING_SUCESS_MSG })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { createListing, fetchListing, fetchListingById, updateListing, deleteListing }
