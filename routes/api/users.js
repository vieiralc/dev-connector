const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
//const keys = require('../../config/keys')
const passport = require('passport')
const { check, validationResult } = require("express-validator")

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput    = require('../../validation/login')

const User = require('../../models/User')

// @router  POST api/users/register
// @dsc     Register user
// @access  Public 
router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

    const check = await checkErrors(req)

    if (check.hasError) {
        return res.status(400).json(check.response)
    }

    const { name, email, password } = req.body

    try {

        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists'}] })
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        res.send('User registered')

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error")
    }
})

const checkErrors = request => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
        return { 
            hasError: true,
            response: { errors: errors.array() }
        }
    }
    
    return { hasError: false }
}

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