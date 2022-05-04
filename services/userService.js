const gravatar = require('gravatar')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const createAvatar = userEmail => {
    const avatar = gravatar.url(userEmail, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    return avatar
}

const createUser = (name, email, password, avatar) => {
    const user = new User({
        name,
        email,
        avatar,
        password
    })

    return user
}

const encryptPassword = async password => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

module.exports = userService = {
    createAvatar,
    createUser,
    encryptPassword
}