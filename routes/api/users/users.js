const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const userService = require('../../../services/userService')
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

// // @router  POST api/users/login
// // @dsc     Login User / returns JWT Token
// // @access  Public
// router.post('/login', (req, res) => {
    
//     const {errors, isValid} = validateLoginInput(req.body)
    
//     if (!isValid) {
//         return res.status(400).json(errors)
//     }

//     const email = req.body.email
//     const password = req.body.password

//     // Find User by email
//     User.findOne({ email })
//         .then(user => {
//             // Check for user
//             if (!user) {
//                 errors.email = 'User not found'
//                 return res.status(404).json(errors)
//             }
//             // Check password
//             bcrypt.compare(password, user.password)
//                 .then(isMatch => {
//                     if (isMatch) {
//                         // Create jwt payload
//                         const payload = { id: user.id, name: user.name, avatar: user.avatar }                    

//                         // Sign Token
//                         jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
//                             res.json({
//                                 success: true,
//                                 token: 'Bearer ' + token
//                             })
//                         })
//                     } else {
//                         errors.password = 'Password incorrect'
//                         return res.status(400).json(errors)
//                     }
//                 })
//         })
// })



// Example of private route
// @router  GET api/users/current
// @dsc     Return current user
// @access  Private
// router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.json({
//         id: req.user.id,
//         name: req.user.name
//     })
// })

module.exports = router