const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const { check, validationResult } = require('express-validator')
const userService = require('../../../services/user/userService')
const auth_middleware = require('../../../middleware/auth')

const { 
    STATUS_400, 
    STATUS_500, 
    INTERNAL_ERROR, 
    PASSWORD_REQUIRED, 
    EMAIL_INVALID,
    INVALID_CREDENTIALS
} = require("../../../commons/constants")

// @router GET api/auth
// @desc   Test route
// @access Public
router.get('/', auth_middleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err) {
        console.error(err.message)
        res.status(STATUS_500).send('Server Error')
    }
})

// @router  POST api/auth
// @dsc     Authenticate user & get token
// @access  Public 
router.post('/', [
    check('email', EMAIL_INVALID).isEmail(),
    check('password', PASSWORD_REQUIRED).exists()
], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(STATUS_400).json({ errors: errors.array() })

    const { email, password } = req.body

    try {

        let userFoundOnDataBase = await User.findOne({ email })

        if (!userFoundOnDataBase)
            return res.status(STATUS_400)
                .json({ errors: [{ msg: INVALID_CREDENTIALS }] })

        const encryptedPassword = userFoundOnDataBase.password
        const isPasswordCorrect = await userService.checkPassword(password, encryptedPassword)
        
        if (!isPasswordCorrect)
            return res.status(STATUS_400)
                .json({ errors: [{ msg: INVALID_CREDENTIALS }] })

        const payload = { user: { id: userFoundOnDataBase.id } }
        const token = await userService.generateUserToken(payload)
        res.json(token)
    } catch (err) {
        console.error(err.message)
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

module.exports = router