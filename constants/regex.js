// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const ISALPHA_REGEX = /^[A-Za-z\s]+$/
// const ALPHA_NUMERIC_WITH_UNDERSCORE = /^([a-zA-Z0-9 _-]+)$/
// const ALPHA_NUMERIC_ = /^([A-Za-z0-9]+)$/

module.exports = { PASSWORD_REGEX, ISALPHA_REGEX }
