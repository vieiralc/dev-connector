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

const sendRequest = async ({server, api, method, requestBody, headers}) => {
    const response = await request(server)
        [method](api)
        .send(requestBody)
        .set(headers)

    return response
}

const findIndexOf = (array, id) => {
    const index = array.map(item => item.id)
        .indexOf(id)
    return index
}

module.exports = {
    getErrorMessages,
    sendRequest,
    findIndexOf
}