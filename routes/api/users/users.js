const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const userService = require('../../../services/user/userService')
const User = require('../../../models/User')

const {
    STATUS_400,
    STATUS_500,
    INTERNAL_ERROR,
    NAME_REQUIRED,
    EMAIL_INVALID,
    PWD_INVALID,
    MIN_PWD_LEN,
    USER_ALREADY_EXISTS
} = require('../../../commons/constants')

// @router  POST api/users/register
// @dsc     Register user
// @access  Public 
router.post('/register', [
    check('name', NAME_REQUIRED).notEmpty(),
    check('email', EMAIL_INVALID).isEmail(),
    check('password', PWD_INVALID).isLength({ min: MIN_PWD_LEN })
], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(STATUS_400).json({ errors: errors.array() })

    const { name, email, password } = req.body

    try {

        let user = await User.findOne({ email })

        if (user)
            return res.status(STATUS_400).json({ errors: [{ msg: USER_ALREADY_EXISTS }] })

        const avatar = userService.createAvatar(email)
        user = userService.createUser(name, email, password, avatar)
        user.password = await userService.encryptPassword(password)

        await user.save()

        const payload = { user: { id: user.id } }
        const token = await userService.generateUserToken(payload)
        res.json(token)
    } catch (err) {
        console.error(err.message)
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

module.exports = router