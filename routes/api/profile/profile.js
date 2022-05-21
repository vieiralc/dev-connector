const express = require('express')
const router = express.Router()
const auth_middleware = require('../../../middleware/auth')
const { check, validationResult } = require('express-validator')
const profileService = require('../../../services/profile/profileService')

const Profile = require('../../../models/Profile')
const User = require('../../../models/User')

const { 
    STATUS_400,
    STATUS_500, 
    INTERNAL_ERROR,
    NO_PROFILE_FOUND,
    STATUS_REQUIRED,
    SKILL_REQUIRED
} = require('../../../commons/constants')

// @router  GET api/profile/me
// @dsc     Get current users profile
// @access  Private
router.get('/me', auth_middleware, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])
        
        if (!profile) {
            return res.status(STATUS_400).json({ msg: NO_PROFILE_FOUND })
        }

        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// @router  POST api/profile/
// @dsc     Create or edit user profile
// @access  Private
router.post('/', [
    auth_middleware,
    check('status', STATUS_REQUIRED).not().isEmpty(),
    check('skills', SKILL_REQUIRED).not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(STATUS_400).json({ errors: errors.array() })
    }

    const profileFields = profileService.createProfileObject(req)

    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )

            return res.json(profile)
        }

        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
    } catch(err) {
        console.log(err.message)
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// @router  GET api/profile/all
// @dsc     Get all profiles
// @access  Public
router.get('/all', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch(err) {
        console.error(err.message)
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// @router  GET api/profile/user/:user_id
// @dsc     Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(STATUS_400).json({ msg: NO_PROFILE_FOUND })
        }

        res.json(profile)
    } catch(err) {
        console.error(err.message)
        if (err.kind == 'ObjectId') {
            return res.status(STATUS_400).json({ msg: NO_PROFILE_FOUND })
        }
        res.status(STATUS_500).send(INTERNAL_ERROR)
    }
})

// // @router  GET api/profile/handle/:handle
// // @dsc     Get profile by handle
// // @access  Public
// router.get('/handle/:handle', (req, res) => {
//     const errors = {}

//     Profile.findOne({ handle: req.params.handle })
//         .populate('user', ['name', 'avatar'])
//         .then(profile => {
//             if (!profile) {
//                 errors.noprofile = 'There is no profile for this user'
//                 return res.status(404).json(errors)
//             }

//             res.json(profile)
//         })
//         .catch(err => res.status(404).json(err))
// })

// // @router  POST api/profile/experience
// // @dsc     Add experience to profile
// // @access  Private
// router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
//     console.log(JSON.stringify(req.body))
//     const {errors, isValid} = validateExperienceInput(req.body)

//     // Check Validation
//     if (!isValid) return res.status(400).json(errors)
    
//     Profile.findOne({ user: req.user.id })
//         .then(profile => {
//             const newExp = {
//                 title: req.body.title,
//                 company: req.body.company,
//                 location: req.body.location,
//                 from: req.body.from,
//                 to: req.body.to,
//                 current: req.body.current,
//                 description: req.body.description
//             }

//             // Add to exp array
//             profile.experience.unshift(newExp)
            
//             profile.save().then(profile => res.json(profile))
//         })
//         .catch(err => res.status(404).json(err))
// })


// // @router  POST api/profile/education
// // @dsc     Add education to profile
// // @access  Private
// router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
//     const {errors, isValid} = validateEducationInput(req.body)

//     // Check Validation
//     if (!isValid) return res.status(400).json(errors)
    
//     Profile.findOne({ user: req.user.id })
//         .then(profile => {
//             const newEdu = {
//                 school: req.body.school,
//                 degree: req.body.degree,
//                 fieldofstudy: req.body.fieldofstudy,
//                 from: req.body.from,
//                 to: req.body.to,
//                 current: req.body.current,
//                 description: req.body.description
//             }

//             // Add to exp array
//             profile.education.unshift(newEdu)
            
//             profile.save().then(profile => res.json(profile))
//         })
//         .catch(err => res.status(404).json(err))
// })

// // @router  DELETE api/profile/experience/:exp_id
// // @dsc     Delete experience from profile
// // @access  Private
// router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    
//     Profile.findOne({ user: req.user.id }).then(profile => {
//         // Get remove index
//         const removeIndex = profile.experience
//             .map(item => item.id)
//             .indexOf(req.params.exp_id)

//         // Splice out of array
//         profile.experience.splice(removeIndex, 1)

//         // Save
//         profile.save().then(profile => res.json(profile))
//     })
//     .catch(err => res.status(404).json(err))

// })

// // @router  DELETE api/profile/education/:edu_id
// // @dsc     Delete education from profile
// // @access  Private
// router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    
//     Profile.findOne({ user: req.user.id }).then(profile => {
//         // Get remove index
//         const removeIndex = profile.education
//             .map(item => item.id)
//             .indexOf(req.params.edu_id)

//         // Splice out of array
//         profile.education.splice(removeIndex, 1)

//         // Save
//         profile.save().then(profile => res.json(profile))
//     })
//     .catch(err => res.status(404).json(err))

// })

// // @router  DELETE api/profile/
// // @dsc     Delete user and profile
// // @access  Private
// router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    
//     Profile.findOneAndRemove({ user: req.user.id })
//         .then(() => {
//             User.findOneAndRemove({ _id: req.user.id })
//                 .then(() => res.json({success: true}))
//         })

// })

module.exports = router