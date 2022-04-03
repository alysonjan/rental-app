const sgMail = require('@sendgrid/mail')

const {
  RESET_PASSWORD_TEMPLATE_ID,
  SENDGRID_API_KEY,
  SENDGRID_SENDER_EMAIL,
} = require('../configs/sendgrid')

sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async msg => {
  try {
    await sgMail.send(msg)
  } catch (err) {
    throw new Error(err.message)
  }
}

const sendResetPasswordMail = async (receiverMail, resetPasswordUri) => {
  const msg = {
    to: receiverMail,
    from: SENDGRID_SENDER_EMAIL,
    templateId: RESET_PASSWORD_TEMPLATE_ID,
    dynamic_template_data: {
      reset_password_uri: resetPasswordUri,
    },
  }
  await sendMail(msg)
}

module.exports = sendResetPasswordMail
