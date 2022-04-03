require('dotenv-safe').config()

module.exports = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  RESET_PASSWORD_TEMPLATE_ID: process.env.RESET_PASSWORD_TEMPLATE_ID,
  SENDGRID_SENDER_EMAIL: process.env.SENDGRID_SENDER_EMAIL,
}
