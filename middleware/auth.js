const jwt = require('jsonwebtoken')
const config = require('config')

const { STATUS_401, NOT_AUTHORIZED } = require('../commons/constants')

const auth_middleware = (req, res, next) => {

    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(STATUS_401).json({ msg: NOT_AUTHORIZED })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(STATUS_401).json({ msg: NOT_AUTHORIZED })
    }
}

module.exports = auth_middleware