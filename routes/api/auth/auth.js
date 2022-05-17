const express = require('express')
const router = express.Router()
const auth_middleware = require('../../../middleware/auth')

// @router  GET api/auth
// @dsc     Test route
// @access  Public 
router.get('/', auth_middleware, (req, res) => {
    res.send('Auth route')
})

module.exports = router