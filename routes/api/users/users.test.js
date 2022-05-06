const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../../server')
const userData = require('../../../mock/users/userData')
const crypto = require("crypto")

describe('Post api/users', () => {

    describe('Register an user', () => {

        it("should respond with a 200 status code", async () => {
            const id = crypto.randomBytes(20).toString('hex')
            const response = await request(app).post('/api/users/register')
                .send({
                    "name": userData.name,
                    "email": `${id}@email.com`,
                    "password": "123456"
                })
            expect(response.statusCode).toBe(200)
        })

        afterAll((done) => {
            mongoose.disconnect(done)
        })

    })

})