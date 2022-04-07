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
    bedrooms: String,
    beds: String,
    bathrooms: String,
    price_per_night: Number,
    total_occupancy: Number,
    amenities: [String],
    published_at: {
      type: Date,
      default: Date.now,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Listing', ListingSchema)
