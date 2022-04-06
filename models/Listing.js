const mongoose = require('mongoose')

const { Schema } = mongoose

const ListingSchema = new Schema(
  {
    imageUrl: [String],
    name: String,
    description: String,
    address: String,
    property_type: String,
    room_type: String,
    bedrooms: Number,
    beds: Number,
    bathrooms: Number,
    price_per_night: Number,
    total_occupancy: Number,
    amenities: [String],
    published_at: Date,
    owner_id: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Listing', ListingSchema)
