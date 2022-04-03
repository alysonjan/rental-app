require('dotenv-safe').config()

module.exports = {
  resetPasswordUri: `${process.env.CLIENT_URL_DEVELOPMENT}/reset-password`,
}
