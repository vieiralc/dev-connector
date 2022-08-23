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
    NO_POST_FOUND,
    USER_ALREADY_LIKED_POST,
    USER_HAS_NOT_LIKED_POST_YET,
    STATUS_401,
    USER_NOT_AUTHORIZED,
    COMMENT_DOES_NOT_EXISTS,
    POST_REMOVED
} = require('../../../commons/constants')

describe('Testing api/auth', () => {

    let token, postId, commentId = null

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

    it('should fail getting post with wrong id format', async() => {
        requestData.api = `/api/posts/${postData.wrongIdFormat}`
        requestData.method = 'get'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)

        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
    })

    it('should like a post', async () => {
        requestData.api = `/api/posts/like/${postId}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        const likesArray = JSON.parse(response.text)
        expect(Array.isArray(likesArray)).toBe(true)
        expect(likesArray.length).toEqual(1)
    })

    it('should fail liking same post twice', async () => {
        requestData.api = `/api/posts/like/${postId}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        
        expect(response.statusCode).toEqual(STATUS_400)
        expect(JSON.parse(response.text).msg).toEqual(USER_ALREADY_LIKED_POST)
    })

    it('should not find post to like', async () => {
        requestData.api = `/api/posts/like/${postData.wrongPostId}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        
        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
    })

    it('should fail send wrong format id to like post', async () => {
        requestData.api = `/api/posts/like/${postData.wrongIdFormat}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        
        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
    })

    it('should unlike post', async () => {
        requestData.api = `/api/posts/unlike/${postId}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        const likesArray = JSON.parse(response.text)

        expect(Array.isArray(likesArray)).toBe(true)
        expect(likesArray.length).toEqual(0)
    })

    it('should fail unlike post: user has never liked post before', async () => {
        requestData.api = `/api/posts/unlike/${postId}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)

        expect(response.statusCode).toEqual(STATUS_400)
        expect(JSON.parse(response.text).msg).toEqual(USER_HAS_NOT_LIKED_POST_YET)
    })

    it('should fail unliking post: post id not find', async() => {
        requestData.api = `/api/posts/unlike/${postData.wrongPostId}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)

        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
    })

    it('should fail unliking post: post id with wrong format', async() => {
        requestData.api = `/api/posts/unlike/${postData.wrongIdFormat}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)

        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
    })

    it('should comment on a post', async () => {
        requestData.api = `/api/posts/comment/${postId}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token
        requestData.requestBody = postData.comment

        const response = await sendRequest(requestData)
        const commentsArray = JSON.parse(response.text)
        commentId = commentsArray[0]._id
        expect(response.statusCode).toEqual(STATUS_200)
        expect(commentsArray.length).toEqual(1)
    })

    it('should fail commenting on post: no required params provided', async () => {
        requestData.api = `/api/posts/comment/${postId}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token
        requestData.requestBody = {}

        const response = await sendRequest(requestData)
        const errorsQuantity = 1
        const errorMsgsArray = getErrorMessages(response, errorsQuantity)

        expect(response.statusCode).toEqual(STATUS_400)
        expect(errorMsgsArray[0]).toEqual(TEXT_REQUIRED)
    })

    it('should fail comment on a post: wrong format post id', async () => {
        requestData.api = `/api/posts/comment/${postData.wrongIdFormat}`
        requestData.method = 'put'
        requestData.headers["x-auth-token"] = token
        requestData.requestBody = postData.comment

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
    })

    it('should fail remove comment on a post', async () => {
        requestData.api = `/api/posts/comment/${postId}/${postData.wrongCommentId}`
        requestData.method = 'delete'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(COMMENT_DOES_NOT_EXISTS)
    })

    it('should fail remove comment on a post: wrong comment id format', async () => {
        requestData.api = `/api/posts/comment/${postData.wrongIdFormat}/${commentId}`
        requestData.method = 'delete'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
    })

    it('should remove comment on a post', async () => {
        requestData.api = `/api/posts/comment/${postId}/${commentId}`
        requestData.method = 'delete'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        const commentsArray = JSON.parse(response.text)
        expect(response.statusCode).toEqual(STATUS_200)
        expect(commentsArray.length).toEqual(0)
    })

    it('should fail delete post', async () => {
        requestData.api = `/api/posts/${postData.wrongPostId}`
        requestData.method = 'delete'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
    })

    it('should fail delete post: wrong id format for post', async () => {
        requestData.api = `/api/posts/${postData.wrongIdFormat}`
        requestData.method = 'delete'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_404)
        expect(JSON.parse(response.text).msg).toEqual(NO_POST_FOUND)
    })

    it('should delete post', async () => {
        requestData.api = `/api/posts/${postId}`
        requestData.method = 'delete'
        requestData.headers["x-auth-token"] = token

        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)
        expect(JSON.parse(response.text).msg).toEqual(POST_REMOVED)
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