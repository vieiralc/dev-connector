const request = require('supertest')
const server = require('../../../server')
const db = require("../../../config/db")
const userData = require('../../../mock/users/userData')
const crypto = require("crypto")
const { getErrorMessages } = require('../../../utils/testUtils')

const {
    STATUS_200,
    STATUS_400,
    NAME_REQUIRED,
    EMAIL_INVALID,
    PWD_INVALID,
    USER_ALREADY_EXISTS
} = require("../../../commons/constants")

describe('Testing api/users/register', () => {

    const api = '/api/users/register'
    let newUser = {}

    it('should register a new user', async () => {
        const id = crypto.randomBytes(20).toString('hex')
        newUser = {
            "name": userData.newUser.name,
            "email": `${id}@email.com`,
            "password": userData.newUser.password
        }

        const response = await request(server.app).post(api)
            .send(newUser)
        expect(response.statusCode).toBe(STATUS_200)
    })

    it('should fail creating an already registered user', async () => {
        const alreadyRegisteredUser = newUser
        const response = await request(server.app).post(api)
            .send(alreadyRegisteredUser)
        const errorsQuantity = 1
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toBe(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(USER_ALREADY_EXISTS)
    })

    it('should fail when sending an empty body request', async () => {
        const response = await request(server.app).post(api)
            .send({})
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