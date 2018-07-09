const express = require('express')
const router = express.Router()

// @router  GET api/profile/test
// @dsc     Testes profile route
// @access  Public 
router.get('/test', (req, res) => res.json({msg: "Profile Works"}))

module.exports = router