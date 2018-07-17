const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Post Model
const Post = require('../../models/Post')

// Load post validation
const validatePostInput = require('../../validation/post')


// @route  POST api/post
// @desc   Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    // Check validation
    if (!isValid) res.status(400).json(errors)

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })

    newPost.save().then(post => res.json(post))
})

module.exports = router