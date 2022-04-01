const User = require('../models/User')
const { EMAIL_OR_USERNAME_ALREADY_EXISTS } = require('../constants/messages')
const { encryptPassword } = require('../utils/bcrypt')

const handleNewUser = async (req, res) => {
  const { lastname, firstname, email, username, password } = req.body

  try {
    const checkDuplicate = await User.findOne({ email, username }).exec()
    if (checkDuplicate) return res.status(409).json({ msg: EMAIL_OR_USERNAME_ALREADY_EXISTS })

    const encryptedPassword = await encryptPassword(password)
    const newUser = await User.create({
      lastname,
      firstname,
      email,
      username,
      encryptedPassword,
    })
    if (newUser) return res.status(201).json({ success: `New user ${newUser.username} created` })
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.log(err)
  }
  return null
}

module.exports = { handleNewUser }
