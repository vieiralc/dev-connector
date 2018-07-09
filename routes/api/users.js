const express = require('express')
const router = express.Router()

// @router  GET api/users/test
// @dsc     Testes users route
// @access  Public 
router.get('/test', (req, res) => res.json({msg: "Users Works"}))

module.exports = router