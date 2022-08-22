const db = require("../../../config/db")
const requestData = require('../../../mock/requestData/requestData.mock')
const postData = require('../../../mock/post/postData.mock')
const { getErrorMessages, sendRequest } = require('../../../utils/utils')

const { 
    STATUS_200, 
    STATUS_400,
    USER_DELETED,
    TEXT_REQUIRED,
    STATUS_404,
    NO_POST_FOUND
} = require('../../../commons/constants')

describe('Testing api/auth', () => {

    let token, postId = null

    beforeAll(async () => {
        // should register user and log him in 
        // to see posts
        requestData.api = '/api/users/register'
        requestData.method = 'post'
        requestData.requestBody = postData.testUser

        const response = await sendRequest(requestData)
        token = JSON.parse(response.text).token
        expect(response.statusCode).toBe(STATUS_200)
    })

    it('should create a post', async() => {
        requestData.api = '/api/posts'
        requestData.method = 'post'
        requestData.headers["x-auth-token"] = token
        requestData.requestBody = postData.post

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)

        const parsedResponse = JSON.parse(response.text)
        postId = parsedResponse._id
        expect(typeof(postId)).toBe('string')
        expect(parsedResponse.text).toEqual(postData.post.text)
    })

    it('should fail creating post: no required params provided', async () => {
        requestData.api = '/api/posts'
        requestData.method = 'post'
        requestData.headers["x-auth-token"] = token
        requestData.requestBody = {}

        const response = await sendRequest(requestData)
        const errorsQuantity = 1
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toBe(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(TEXT_REQUIRED)
    })

    it('should get all posts', async () => {
        requestData.api = '/api/posts'
        requestData.method = 'get'
        requestData.headers["x-auth-token"] = token
        
        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)

        const parsedResponse = JSON.parse(response.text)
        expect(Array.isArray(parsedResponse)).toBe(true)
        expect(parsedResponse[0]).toHaveProperty('text')
        expect(parsedResponse[0]).toHaveProperty('likes')
        expect(parsedResponse[0]).toHaveProperty('comments')
    })

    it('should get post by id', async () => {
        requestData.api = `/api/posts/${postId}`
        requestData.method = 'get'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)

        const parsedResponse = JSON.parse(response.text)
        expect(parsedResponse._id).toEqual(postId)
        expect(parsedResponse.text).toEqual(postData.post.text)
    })

    it('should not find post: wrong id', async () => {
        requestData.api = `/api/posts/${postData.wrongPostId}`
        requestData.method = 'get'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)

        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
    })

    it('should fail getting post with from id format', async() => {
        requestData.api = `/api/posts/${postData.wrongIdFormat}`
        requestData.method = 'get'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)

        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
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