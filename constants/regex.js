// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// const ALPHA_NUMERIC = /^([a-zA-Z0-9 _-]+)$/

const ISALPHA_REGEX = /^[A-Za-z\s]+$/

module.exports = { PASSWORD_REGEX, ISALPHA_REGEX }
