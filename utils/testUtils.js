const request = require('supertest')

const getErrorMessages = (response, errorsQuantity) => {
    if (errorsQuantity) {
        let messages = []
        for(let i = 0; i < errorsQuantity; i++) {
            messages.push(JSON.parse(response.text).errors[i].msg)
        }
        return  messages
    }
}

const fetchData = async ({server, api, method, requestBody}) => {
    const response = await request(server)
        [method](api)
        .send(requestBody)

    return response
}

module.exports = {
    getErrorMessages,
    fetchData
}