const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

// Load User modal
const User = require('../../models/User')

// @router  GET api/users/test
// @dsc     Tests users route
// @access  Public 
router.get('/test', (req, res) => res.json({msg: "Users Works"}))

// @router  POST api/users/register
// @dsc     Register user
// @access  Public 
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) 
                return res.status(400).json({email: 'Email already exists'})
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    r: 'pg',  // rating
                    d: 'mm'   // default 
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

// @router  POST api/users/login
// @dsc     Login User / returns JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // Find User by email
    User.findOne({ email })
        .then(user => {
            // Check for user
            if (!user) 
                return res.status(404).json({email: 'User not found'})

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch)
                        res.json({msg: 'Success'})
                    else
                        return res.status(400).json({password: 'Password incorrect'})
                })
        })
})

module.exports = router