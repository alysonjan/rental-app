const { UNAUTHORIZED_MSG } = require('../constants/messages')

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.status(401).json({ message: UNAUTHORIZED_MSG })
    const rolesArray = [...allowedRoles]
    const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)
    if (!result) return res.status(401).json({ message: UNAUTHORIZED_MSG })
    next()
  }
}

module.exports = verifyRoles
