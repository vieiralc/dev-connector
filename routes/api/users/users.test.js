const db = require('../../../config/db')
const userData = require('../../../mock/users/userData.mock')
const requestData = require('../../../mock/requestData/requestData.mock')
const crypto = require('crypto')
const { getErrorMessages, sendRequest } = require('../../../utils/utils')

const {
    STATUS_200,
    STATUS_400,
    NAME_REQUIRED,
    EMAIL_INVALID,
    PWD_INVALID,
    USER_ALREADY_EXISTS,
    USER_DELETED
} = require('../../../commons/constants')

describe('Testing api/users/register', () => {

    let newUser = {}
    let token = null

    beforeAll(() => {
        requestData.api = '/api/users/register'
        requestData.method = 'post'
    })

    it('should register a new user', async () => {
        const id = crypto.randomBytes(20).toString('hex')
        newUser = {
            "name": userData.newUser.name,
            "email": `${id}@email.com`,
            "password": userData.newUser.password
        }
        requestData.requestBody = newUser

        const response = await sendRequest(requestData)
        token = JSON.parse(response.text).token
        expect(response.statusCode).toBe(STATUS_200)
    })

    it('should fail creating an already registered user', async () => {
        const alreadyRegisteredUser = newUser
        requestData.requestBody = alreadyRegisteredUser
        const response = await sendRequest(requestData)
        const errorsQuantity = 1
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toBe(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(USER_ALREADY_EXISTS)
    })

    it('should fail when sending an empty body request', async () => {
        requestData.requestBody = {}
        const response = await sendRequest(requestData)
        const errorsQuantity = 3
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toBe(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(NAME_REQUIRED)
        expect(errorMsgsArray[1]).toEqual(EMAIL_INVALID)
        expect(errorMsgsArray[2]).toEqual(PWD_INVALID)
    })

    afterAll(async () => {
        // should delete test user
        requestData.api = '/api/profile'
        requestData.method = 'delete'
        requestData.headers['x-auth-token'] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)
        expect(JSON.parse(response.text).msg).toEqual(USER_DELETED)

        await db.closeDBConnection()
    })

})