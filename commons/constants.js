const STATUS_200 = 200
const STATUS_400 = 400
const STATUS_401 = 401
const STATUS_500 = 500
const INTERNAL_ERROR = 'Internal server error'

// users route
const NAME_REQUIRED = 'Name is required'
const EMAIL_INVALID = 'Please include a valid email'
const PWD_INVALID = 'Please enter a password with 6 or more characters'
const MIN_PWD_LEN = 6
const USER_ALREADY_EXISTS = 'User already exists'

// auth route
const TOKEN_EXPIRATION_TIME = 360000
const NOT_AUTHORIZED = 'Access denied. Please login to see this page'
const PASSWORD_REQUIRED = 'Password is required'
const INVALID_CREDENTIALS = 'Invalid Credentials'

// profile route
const NO_PROFILE_FOUND = 'Profile not found'
const STATUS_REQUIRED = 'Status is required'
const SKILL_REQUIRED = 'Skill is required'

module.exports = {
    STATUS_200,
    STATUS_400,
    STATUS_401,
    STATUS_500,
    INTERNAL_ERROR,
    NAME_REQUIRED,
    EMAIL_INVALID,
    PWD_INVALID,
    MIN_PWD_LEN,
    USER_ALREADY_EXISTS,
    TOKEN_EXPIRATION_TIME,
    NOT_AUTHORIZED,
    PASSWORD_REQUIRED,
    INVALID_CREDENTIALS,
    NO_PROFILE_FOUND,
    STATUS_REQUIRED,
    SKILL_REQUIRED
}