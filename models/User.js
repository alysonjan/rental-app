const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    lastname: String,
    firstname: String,
    email: {
      type: String,
      unique: true,
    },
    phone_number: String,
    username: {
      type: String,
      unique: true,
    },
    password: String,
    roles: {
      User: {
        type: Number,
        default: 2500,
      },
      Editor: Number,
      Admin: Number,
    },
    refreshToken: [String],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
