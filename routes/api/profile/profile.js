const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth_middleware = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');
const profileService = require('../../../services/profile/profileService');

const Profile = require('../../../models/Profile');
const User = require('../../../models/User');
const Post = require('../../../models/Post');

const {
  STATUS_400,
  STATUS_404,
  STATUS_500,
  INTERNAL_ERROR,
  NO_PROFILE_FOUND,
  STATUS_REQUIRED,
  SKILL_REQUIRED,
  USER_DELETED,
  TITLE_REQUIRED,
  COMPANY_REQUIRED,
  FROM_DATE_REQUIRED,
  SCHOOL_REQUIRED,
  DEGREE_REQUIRED,
  FIELD_OF_STUDY_REQUIRED,
} = require('../../../commons/constants');

// @router  GET api/profile/me
// @dsc     Get current users profile
// @access  Private
router.get('/me', auth_middleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(STATUS_400).json({ msg: NO_PROFILE_FOUND });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_500).send(INTERNAL_ERROR);
  }
});

// @router  POST api/profile/
// @dsc     Create or edit user profile
// @access  Private
router.post(
  '/',
  [
    auth_middleware,
    check('status', STATUS_REQUIRED).not().isEmpty(),
    check('skills', SKILL_REQUIRED).not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(STATUS_400).json({ errors: errors.array() });
    }

    const profileFields = profileService.createProfileObject(req);

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(STATUS_500).send(INTERNAL_ERROR);
    }
  }
);

// @router  GET api/profile/all
// @dsc     Get all profiles
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_500).send(INTERNAL_ERROR);
  }
});

// @router  GET api/profile/user/:user_id
// @dsc     Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(STATUS_400).json({ msg: NO_PROFILE_FOUND });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(STATUS_400).json({ msg: NO_PROFILE_FOUND });
    }
    res.status(STATUS_500).send(INTERNAL_ERROR);
  }
});

// @router  PUT api/profile/experience
// @dsc     Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth_middleware,
    check('title', TITLE_REQUIRED).not().isEmpty(),
    check('company', COMPANY_REQUIRED).not().isEmpty(),
    check('from', FROM_DATE_REQUIRED).not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(STATUS_400).json({ errors: errors.array() });
    }

    const newExperience = profileService.createExperienceObject(req.body);

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExperience);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_500).send(INTERNAL_ERROR);
    }
  }
);

// @router  PUT api/profile/education
// @dsc     Add education to profile
// @access  Private
router.put(
  '/education',
  [
    auth_middleware,
    check('school', SCHOOL_REQUIRED).not().isEmpty(),
    check('degree', DEGREE_REQUIRED).not().isEmpty(),
    check('fieldofstudy', FIELD_OF_STUDY_REQUIRED).not().isEmpty(),
    check('from', FROM_DATE_REQUIRED).not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(STATUS_400).json({ errors: errors.array() });
    }

    const newEducation = profileService.createEducationObject(req.body);

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_500).send(INTERNAL_ERROR);
    }
  }
);

// @router  DELETE api/profile/experience/:exp_id
// @dsc     Delete experience from profile
// @access  Private
router.delete(
  '/experience/:experience_id',
  auth_middleware,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profileService.findExperienceAndRemove(profile, req.params.experience_id);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_500).send(INTERNAL_ERROR);
    }
  }
);

// // @router  DELETE api/profile/education/:education_id
// // @dsc     Delete education from profile
// // @access  Private
router.delete('/education/:education_id', auth_middleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profileService.findEducationAndRemove(profile, req.params.education_id);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_500).send(INTERNAL_ERROR);
  }
});

// @router  DELETE api/profile/
// @dsc     Delete profile, user and profile
// @access  Private
router.delete('/', auth_middleware, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: USER_DELETED });
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_500).send(INTERNAL_ERROR);
  }
});

// @router  GET api/profile/github/:username
// @dsc     Get user repos from github
// @access  Public
/* istanbul ignore next */
router.get('/github/:username', async (req, res) => {
  const githubClientId =
    process.env.NOVE_ENV !== 'production'
      ? config.get('githubClientId')
      : process.env.githubClientId;
  const githubSecret =
    process.env.NODE_ENV !== 'production'
      ? config.get('githubSecret')
      : process.env.githubSecret;

  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=updated:asc&client_id=${githubClientId}&client_secret=${githubSecret}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(STATUS_404).json({ msg: 'No Github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_500).send(INTERNAL_ERROR);
  }
});

module.exports = router;
