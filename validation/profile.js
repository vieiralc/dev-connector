const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
    let errors = {}
    
    data.handle = !isEmpty(data.handle) ? data.handle : ''
    data.status = !isEmpty(data.status) ? data.status : ''
    data.skills = !isEmpty(data.skills) ? data.skills : ''

    if (!Validator.isLength(data.handle, {min: 2, max: 40}))
        errors.handle = 'Handle needs to be between 2 and 40 characters'

    if (Validator.isEmpty(data.handle))
        errors.handle = 'Profile handle is required'

    if (Validator.isEmpty(data.status) || data.status === 0)
        errors.status = 'Status field is required'

    if (Validator.isEmpty(data.skills))
        errors.skills = 'Skills field is required'

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website))
            errors.website = 'Not a valid url'
    }

    if (!isEmpty(data.github)) {
        if (!Validator.isURL(data.github))
            errors.github = 'Not a valid url'
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook))
            errors.facebook = 'Not a valid url'
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram))
            errors.instagram = 'Not a valid url'
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin))
            errors.linkedin = 'Not a valid url'
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube))
            errors.youtube = 'Not a valid url'
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}