const request = require('supertest')
const server = require('../../../server')
const db = require("../../../config/db")
const userData = require('../../../mock/users/userData')
const crypto = require("crypto")
const { getErrorMessages, fetchData } = require('../../../utils/testUtils')

const {
    STATUS_200,
    STATUS_400,
    NAME_REQUIRED,
    EMAIL_INVALID,
    PWD_INVALID,
    USER_ALREADY_EXISTS
} = require("../../../commons/constants")

describe('Testing api/users/register', () => {

    let requestData = {
        server: server.app,
        api: '/api/users/register',
        method: 'post',
        requestBody: {}
    }
    let newUser = {}

    it('should register a new user', async () => {
        const id = crypto.randomBytes(20).toString('hex')
        newUser = {
            "name": userData.newUser.name,
            "email": `${id}@email.com`,
            "password": userData.newUser.password
        }
        requestData.requestBody = newUser

        const response = await fetchData(requestData)
        expect(response.statusCode).toBe(STATUS_200)
    })

    it('should fail creating an already registered user', async () => {
        const alreadyRegisteredUser = newUser
        requestData.requestBody = alreadyRegisteredUser
        const response = await fetchData(requestData)
        const errorsQuantity = 1
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toBe(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(USER_ALREADY_EXISTS)
    })

    it('should fail when sending an empty body request', async () => {
        requestData.requestBody = {}
        const response = await fetchData(requestData)
        const errorsQuantity = 3
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toBe(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(NAME_REQUIRED)
        expect(errorMsgsArray[1]).toEqual(EMAIL_INVALID)
        expect(errorMsgsArray[2]).toEqual(PWD_INVALID)
    })

    afterAll(async () => {
        await db.closeDBConnection()
    })

})