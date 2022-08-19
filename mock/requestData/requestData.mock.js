const server = require('../../server')

const requestData = {
    server: server.app,
    api: '',
    method: '',
    requestBody: {},
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': ''
    }
}

module.exports = requestData