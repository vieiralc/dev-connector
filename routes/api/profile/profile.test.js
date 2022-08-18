const server = require('../../../server')
const db = require('../../../config/db')
const profileData = require('../../../mock/profile/profile.mock')
const { findIndexOf, sendRequest } = require('../../../utils/utils')

const {
    STATUS_200,
    USER_DELETED
} = require('../../../commons/constants')

describe('Testing api/profile', () => {
    
    let token = null
    let experienceId = null
    let educationId = null
    let userId = null
    let requestData = {
        server: server.app,
        api: '/api/profile',
        method: 'post',
        requestBody: {},
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': ''
        }
    }
    const testUser = {
        name: 'test user',
        email: 'test_user@email.com',
        password: '123456'
    }

    beforeAll(async () => {
        requestData.api = '/api/users/register'
        requestData.requestBody = testUser

        const response = await sendRequest(requestData)
        token = JSON.parse(response.text).token
        expect(response.statusCode).toBe(STATUS_200)
    })

    it('should create user profile', async () => {
        requestData.api = '/api/profile'
        requestData.headers['x-auth-token'] = token
        requestData.requestBody = {
            status: 'developer',
            skills: 'HTML5, CSS3, SASS, REACT, JAVASCRIPT, NODE'
        }

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)
    })

    it('should get current user profile', async () => {
        requestData.api = '/api/profile/me'
        requestData.headers['x-auth-token'] = token
        requestData.method = 'get'

        const response = await sendRequest(requestData)
        userId = response._body.user._id
        expect(response.statusCode).toEqual(STATUS_200)
        expect(response._body.user).toHaveProperty('name')
    })
    
    it('should get all user public profiles', async () => {
        requestData.api = '/api/profile/all'
        requestData.method = 'get'

        const response = await sendRequest(requestData)
        const parsedResponse = JSON.parse(response.text)
        expect(response.statusCode).toEqual(STATUS_200)
        expect(Array.isArray(parsedResponse)).toBe(true)
    })

    it('should get user profile by id', async () => {
        requestData.api = `/api/profile/user/${userId}`
        requestData.method = 'get'

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)

        const parsedResponse = JSON.parse(response.text)
        expect(parsedResponse).toHaveProperty('user')
        const user = parsedResponse.user
        expect(user).toHaveProperty('name')
        expect(user).toHaveProperty('avatar')
    })

    it('should add experience', async () => {
        requestData.api = '/api/profile/experience'
        requestData.method = 'put'

        const { title, company, from } = profileData.experienceObject.body
        requestData.requestBody = {
            title, 
            company, 
            from 
        }
        requestData.headers['x-auth-token'] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)

        const parsedResponse = JSON.parse(response.text)
        const experience = parsedResponse.experience
        expect(Array.isArray(experience)).toBe(true)

        experienceId = experience[0]._id
        expect(experience[0].title).toEqual(title)
    })
    
    it('should add education', async () => {
        requestData.api = '/api/profile/education'
        requestData.method = 'put'

        const { school, degree, fieldofstudy, from } = profileData.educationalObject.body
        requestData.requestBody = {
            school,
            degree, 
            fieldofstudy,
            from
        }
        requestData.headers['x-auth-token'] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)

        const parsedResponse = JSON.parse(response.text)
        const education = parsedResponse.education
        expect(Array.isArray(education)).toBe(true)

        educationId = education[0]._id
        expect(education[0].school).toEqual(school)
    })

    it('should delete experience', async () => {
        requestData.api = `/api/profile/experience/${experienceId}`
        requestData.method = 'delete'
        requestData.headers['x-auth-token'] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)
        
        const experience = JSON.parse(response.text).experience
        const result = findIndexOf(experience, experienceId)
        expect(result).toEqual(-1)
    })
    
    it('should delete education', async () => {
        requestData.api = `/api/profile/education/${educationId}`
        requestData.method = 'delete'
        requestData.headers['x-auth-token'] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)
        
        const education = JSON.parse(response.text).education
        const result = findIndexOf(education, educationId)
        expect(result).toEqual(-1)
    })

    it('should remove user', async () => {
        requestData.api = '/api/profile'
        requestData.method = 'delete'
        requestData.headers['x-auth-token'] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)
        expect(JSON.parse(response.text).msg).toEqual(USER_DELETED)
    })

    afterAll(async () => {
        await db.closeDBConnection()
    })
})