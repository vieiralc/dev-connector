const request = require('supertest')
const server = require('../../../server')
const db = require("../../../config/db")
const userData = require('../../../mock/users/userData')
const crypto = require("crypto")

const {
    STATUS_200,
    STATUS_400,
    NAME_REQUIRED,
    EMAIL_INVALID,
    PWD_INVALID,
    USER_ALREADY_EXISTS
} = require("../../../commons/constants")

describe('Post api/users', () => {

    describe('Register an user', () => {

        const api = '/api/users/register'

        const getErrorMessage = (response, msgErrors) => {
            if (msgErrors) {
                let messages = []
                for(let i = 0; i < msgErrors; i++) {
                    messages.push(JSON.parse(response.text).errors[i].msg)
                }
                return  messages
            }
        }

        it('should respond with a 200 status code', async () => {
            const id = crypto.randomBytes(20).toString('hex')
            const response = await request(server.app).post(api)
                .send({
                    "name": userData.newUser.name,
                    "email": `${id}@email.com`,
                    "password": userData.newUser.password
                })

            expect(response.statusCode).toBe(STATUS_200)
        })

        it('should fail when creating an already registered user', async () => {
            const response = await request(server.app).post(api)
                .send(userData.alreadyRegisteredUser)
            const msgErrors = 1
            const errorMsgsArray = getErrorMessage(response, msgErrors)

            expect(response.statusCode).toBe(STATUS_400)
            expect(errorMsgsArray[0]).toEqual(USER_ALREADY_EXISTS)
        })

        it('should fail when sending and empty object', async () => {
            const response = await request(server.app).post(api)
                .send(userData.noData)
            const msgErrors = 3
            const errorMsgsArray = getErrorMessage(response, msgErrors)

            expect(response.statusCode).toBe(STATUS_400)
            expect(errorMsgsArray[0]).toEqual(NAME_REQUIRED)
            expect(errorMsgsArray[1]).toEqual(EMAIL_INVALID)
            expect(errorMsgsArray[2]).toEqual(PWD_INVALID)
        })

        afterAll(async () => {
            await db.closeDBConnection()
            server.listener.close()
        })

    })

})