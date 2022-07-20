const STATUS_200 = 200
const STATUS_400 = 400
const STATUS_401 = 401
const STATUS_404 = 404
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
const USER_DELETED = 'User deleted'
const TITLE_REQUIRED = 'Title is required'
const COMPANY_REQUIRED = 'Company is required'
const FROM_DATE_REQUIRED = 'From date is required'
const SCHOOL_REQUIRED = 'School is required'
const DEGREE_REQUIRED = 'Degree is required'
const FIELD_OF_STUDY_REQUIRED = 'Field of study is required'

// posts route
const TEXT_REQUIRED = 'Text is required'
const NO_POST_FOUND = 'No post found'
const USER_NOT_AUTHORIZED = 'User not authorized'
const POST_REMOVED = 'Post removed'
const USER_ALREADY_LIKED_POST = 'User already liked this post'
const USER_HAS_NOT_LIKED_POST_YET = 'You have not yet liked this post'

module.exports = {
    STATUS_200,
    STATUS_400,
    STATUS_401,
    STATUS_404,
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
    SKILL_REQUIRED,
    USER_DELETED,
    TITLE_REQUIRED,
    COMPANY_REQUIRED,
    FROM_DATE_REQUIRED,
    SCHOOL_REQUIRED,
    DEGREE_REQUIRED,
    FIELD_OF_STUDY_REQUIRED,
    TEXT_REQUIRED,
    NO_POST_FOUND,
    USER_NOT_AUTHORIZED,
    POST_REMOVED,
    USER_ALREADY_LIKED_POST,
    USER_HAS_NOT_LIKED_POST_YET
}