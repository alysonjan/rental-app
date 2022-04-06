const mongoose = require('mongoose')

const { Schema } = mongoose

const ReservationSchema = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    roomid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
    },
    start_date: Date,
    end_date: Date,
    price_per_night: Number,
    total: Number,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Reservation', ReservationSchema)
