const mongoose = require('mongoose')

const { Types } = mongoose

module.exports = {
  toObjectId: id => {
    return Types.ObjectId(id)
  },
}
