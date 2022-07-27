const express = require('express')
const router = express.Router()
const auth_middleware = require('../../../middleware/auth')
const { check, validationResult } = require('express-validator')

const { 
    STATUS_400,
    STATUS_401,
    STATUS_404,
    STATUS_500, 
    INTERNAL_ERROR,
    NO_POST_FOUND,
    TEXT_REQUIRED,
    USER_NOT_AUTHORIZED,
    POST_REMOVED,
    USER_ALREADY_LIKED_POST,
    USER_HAS_NOT_LIKED_POST_YET,
    COMMENT_DOES_NOT_EXISTS
} = require('../../../commons/constants')

const Post = require('../../../models/Post')
const Profile = require('../../../models/Profile')
const User = require('../../../models/User')

// @route  GET api/posts
// @desc   Get posts
// @access Private
router.get('/', auth_middleware, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch(err) {
        console.log(err.message)
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// @route  GET api/post/:id
// @desc   Get post by id
// @access Private
router.get('/:id', auth_middleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(STATUS_404).json({ msg: NO_POST_FOUND })
        }

        res.json(post)
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(STATUS_404).json({ msg: NO_POST_FOUND })
        }
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// @route  POST api/posts
// @desc   Create post
// @access Private
router.post('/', [
    auth_middleware,
    check('text', TEXT_REQUIRED).not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(STATUS_400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()
        res.json(post)
    } catch (err) {
        console.log(err.message)
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// @route  DELETE api/posts/:id
// @desc   Delete a post
// @access Private
router.delete('/:id', auth_middleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(STATUS_404).json({ msg: NO_POST_FOUND })
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(STATUS_401).json({ msg: USER_NOT_AUTHORIZED })
        }

        await post.remove()

        res.json({ msg: POST_REMOVED })
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(STATUS_404).json({ msg: NO_POST_FOUND })
        }
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// @route  PUT api/posts/like/:id
// @desc   Like post
// @access Private
router.put('/like/:id', auth_middleware, async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(STATUS_404).json({ msg: NO_POST_FOUND })
        }

        const authenticatedUserId = req.user.id
        const hasAuthenticatedUserLikedPost = post.likes.filter(like => like.user.toString() === authenticatedUserId).length > 0

        if (hasAuthenticatedUserLikedPost) {
            return res.status(STATUS_400).json({ msg: USER_ALREADY_LIKED_POST })
        }

        post.likes.unshift({ user: authenticatedUserId })
        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(STATUS_404).json({ msg: NO_POST_FOUND })
        }
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// @route  PUT api/posts/unlike/:id
// @desc   Unlike post
// @access Private
router.put('/unlike/:id', auth_middleware, async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(STATUS_404).json({ msg: NO_POST_FOUND })
        }

        const authenticatedUserId = req.user.id
        const hasAuthenticatedUserLikedPost = post.likes.filter(like => like.user.toString() === authenticatedUserId).length > 0

        if (!hasAuthenticatedUserLikedPost) {
            return res.status(STATUS_400).json({ msg: USER_HAS_NOT_LIKED_POST_YET })
        }

        const likesArray = post.likes.map(like => like.user.toString())
        const removeIndex = likesArray.indexOf(authenticatedUserId)

        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(STATUS_404).json({ msg: NO_POST_FOUND })
        }
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// @route  PUT api/posts/comment/:id
// @desc   Comment on a post
// @access Private
router.put('/comment/:id', [
        auth_middleware,
        check('text', TEXT_REQUIRED).not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(STATUS_400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment)
        await post.save()
        res.json(post.comments)
    } catch(err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(STATUS_404).json({ msg: NO_POST_FOUND })
        }
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Remove comment from post
// @access Private
router.delete('/comment/:id/:comment_id', auth_middleware, async (req, res) => {
    try {
        const postId = req.params.id
        const commentId = req.params.comment_id
        const userId = req.user.id

        const post = await Post.findById(postId)
        const comment = post.comments.find(comment => comment.id === commentId)

        if (!comment) {
            return res.status(STATUS_404).json({ msg: COMMENT_DOES_NOT_EXISTS })
        }

        if (comment.user.toString() !== userId) {
            return res.status(STATUS_401).json({ msg: USER_NOT_AUTHORIZED })
        }

        const commentsIdsArray = post.comments.map(comment => comment._id.toString())
        const removeIndex = commentsIdsArray.indexOf(commentId)

        post.comments.splice(removeIndex, 1)
        await post.save()
        res.json(post.comments)
    } catch(err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(STATUS_404).json({ msg: NO_POST_FOUND })
        }
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

module.exports = router