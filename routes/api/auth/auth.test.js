const server = require('../../../server')
const db = require("../../../config/db")
const userData = require('../../../mock/users/userData.mock')
const authMockData = require('../../../mock/auth/auth.mock')
const requestData = require('../../../mock/requestData/requestData.mock')
const { getErrorMessages, sendRequest } = require('../../../utils/utils')

const { 
    STATUS_200, 
    STATUS_400,
    EMAIL_INVALID,
    PASSWORD_REQUIRED,
    INVALID_CREDENTIALS 
} = require('../../../commons/constants')

describe('Testing api/auth', () => {

    const api = '/api/auth'
    const alreadyRegisteredUser = userData.alreadyRegisteredUser

    beforeAll(() => {
        requestData.api = api
        requestData.method = 'post'
    })

    it('should authenticate user', async () => {
        const requestBody = {
            email: alreadyRegisteredUser.email,
            password: alreadyRegisteredUser.password
        }
        requestData.requestBody = requestBody

        const response = await sendRequest(requestData)
        expect(response.statusCode).toBe(STATUS_200)
    })

    it('should fail for wrong password', async () => {
        const requestBody = {
            email: alreadyRegisteredUser.email,
            password: 'wrongpassword'
        }
        requestData.requestBody = requestBody

        const response = await sendRequest(requestData)
        const errorsQuantity = 1
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toBe(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(INVALID_CREDENTIALS)
    })

    it('should not find user on DB', async () => {
        const requestBody = authMockData.unregisteredUser
        requestData.requestBody = requestBody
        
        const response = await sendRequest(requestData)
        const errorsQuantity = 1
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toBe(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(INVALID_CREDENTIALS)
    })

    it('should fail when sending an empty body request', async () => {
        const requestBody = {}
        requestData.requestBody = requestBody
        
        const response = await sendRequest(requestData)
        const errorsQuantity = 2
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toBe(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(EMAIL_INVALID)
        expect(errorMsgsArray[1]).toEqual(PASSWORD_REQUIRED)
    })

    afterAll(async () => {
        await db.closeDBConnection()
    })
})