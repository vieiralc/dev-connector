const server = require('../../../server')
const db = require('../../../config/db')
const profileData = require('../../../mock/profile/profile.mock')
const requestData = require('../../../mock/requestData/requestData.mock')
const { findIndexOf, sendRequest, getErrorMessages } = require('../../../utils/utils')

const {
    STATUS_200,
    STATUS_400,
    USER_DELETED,
    SKILL_REQUIRED,
    STATUS_REQUIRED,
    NO_PROFILE_FOUND,
    TITLE_REQUIRED,
    COMPANY_REQUIRED,
    FROM_DATE_REQUIRED,
    SCHOOL_REQUIRED,
    DEGREE_REQUIRED,
    FIELD_OF_STUDY_REQUIRED
} = require('../../../commons/constants')

describe('Testing api/profile', () => {
    
    let token, experienceId, educationId, userId = null

    beforeAll(async () => {
        requestData.api = '/api/users/register'
        requestData.method = 'post'
        requestData.requestBody = profileData.testUser

        const response = await sendRequest(requestData)
        token = JSON.parse(response.text).token
        expect(response.statusCode).toBe(STATUS_200)
    })

    it('should not find current user profile', async () => {
        requestData.api = '/api/profile/me'
        requestData.headers['x-auth-token'] = token
        requestData.method = 'get'

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_400)
    })

    it('should fail creating user profile with mandatory fields not filled', async () => {
        requestData.api = '/api/profile'
        requestData.method = 'post'
        requestData.headers['x-auth-token'] = token
        requestData.requestBody = {}

        const errorsQuantity = 2
        const response = await sendRequest(requestData)
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toEqual(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(STATUS_REQUIRED)
        expect(errorMsgsArray[1]).toEqual(SKILL_REQUIRED)
    })

    it('should create user profile', async () => {
        requestData.api = '/api/profile'
        requestData.method = 'post'
        requestData.headers['x-auth-token'] = token
        requestData.requestBody = {
            status: 'developer',
            skills: 'HTML5, CSS3, SASS, REACT, JAVASCRIPT, NODE'
        }

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)
    })

    it('should update user profile', async () => {
        requestData.api = '/api/profile'
        requestData.method = 'post'
        requestData.headers['x-auth-token'] = token
        requestData.requestBody = {
            status: 'new status',
            skills: 'HTML5, CSS3, SASS, REACT, JAVASCRIPT, NODE'
        }

        const response = await sendRequest(requestData)
        const parsedResponse = JSON.parse(response.text)
        expect(response.statusCode).toEqual(STATUS_200)
        expect(parsedResponse.status).toEqual('new status')
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

    it('should fail getting user profile', async () => {
        requestData.api = `/api/profile/user/${profileData.testIds.wronUserId}`
        requestData.method = 'get'

        const response = await sendRequest(requestData)
        const parsedResponse = JSON.parse(response.text)
        expect(response.statusCode).toEqual(STATUS_400)
        expect(parsedResponse.msg).toEqual(NO_PROFILE_FOUND)
    })

    it('should fail because of wrong format id when getting user by id', async () => {
        requestData.api = `/api/profile/user/${profileData.testIds.wrongFormatId}`
        requestData.method = 'get'

        const response = await sendRequest(requestData)
        const parsedResponse = JSON.parse(response.text)
        expect(response.statusCode).toEqual(STATUS_400)
        expect(parsedResponse.msg).toEqual(NO_PROFILE_FOUND)
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

    it('should fail adding experience: no required params provided', async () => {
        requestData.api = '/api/profile/experience'
        requestData.method = 'put'
        requestData.requestBody = {}
        requestData.headers['x-auth-token'] = token

        const errorsQuantity = 3
        const response = await sendRequest(requestData)
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toEqual(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(TITLE_REQUIRED)
        expect(errorMsgsArray[1]).toEqual(COMPANY_REQUIRED)
        expect(errorMsgsArray[2]).toEqual(FROM_DATE_REQUIRED)
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

    it('should fail adding education: no required params provided', async () => {
        requestData.api = '/api/profile/education'
        requestData.method = 'put'
        requestData.requestBody = {}
        requestData.headers['x-auth-token'] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_400)

        const errorsQuantity = 4
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toEqual(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(SCHOOL_REQUIRED)
        expect(errorMsgsArray[1]).toEqual(DEGREE_REQUIRED)
        expect(errorMsgsArray[2]).toEqual(FIELD_OF_STUDY_REQUIRED)
        expect(errorMsgsArray[3]).toEqual(FROM_DATE_REQUIRED)
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