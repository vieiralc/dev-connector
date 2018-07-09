const express = require('express')
const router = express.Router()

// @router  GET api/posts/test
// @dsc     Testes post route
// @access  Public 
router.get('/test', (req, res) => res.json({msg: "Posts Works"}))

module.exports = router