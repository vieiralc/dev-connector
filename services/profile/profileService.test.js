const profileService = require('./profileService')
const profileData = require('../../mock/profile/profile.mock')

describe('Profile service test', () => {

    it('should create profile object', () => {
        const requestData = profileData.requestData
        const profileObj = profileService.createProfileObject(requestData)
        
        expect(profileObj).toHaveProperty('user')
        expect(profileObj).toHaveProperty('company')
        expect(profileObj).toHaveProperty('website')
        expect(profileObj).toHaveProperty('location')
        expect(profileObj).toHaveProperty('bio')
        expect(profileObj).toHaveProperty('status')
        expect(profileObj).toHaveProperty('githubusername')
        expect(profileObj).toHaveProperty('skills')
        expect(profileObj).toHaveProperty('social')

        const skills = profileObj.skills
        const social = profileObj.social

        expect(Array.isArray(skills)).toBe(true)
        expect(social).toHaveProperty('youtube')
        expect(social).toHaveProperty('twitter')
        expect(social).toHaveProperty('facebook')
        expect(social).toHaveProperty('linkedin')
        expect(social).toHaveProperty('instagram')
    })

    it('should create profile object with empty fields', () => {
        const requestData = profileData.requestDataWithEmptyFields
        const profileObj = profileService.createProfileObject(requestData)

        expect(Boolean(profileObj['skills']) && 
            Boolean(profileObj['social'])
        ).toBe(false)
    })

    it('should create educational object', () => {
        const education = profileService
            .createEducationObject(profileData.educationalObject.body)
        expect(education).toHaveProperty('school')
        expect(education).toHaveProperty('degree')
        expect(education).toHaveProperty('fieldofstudy')
        expect(education).toHaveProperty('from')
        expect(education).toHaveProperty('to')
        expect(education).toHaveProperty('current')
        expect(education).toHaveProperty('description')
    })

    it('should create experience object', () => {
        const experience = profileService
            .createExperienceObject(profileData.experienceObject.body)
        expect(experience).toHaveProperty('title')
        expect(experience).toHaveProperty('company')
        expect(experience).toHaveProperty('location')
        expect(experience).toHaveProperty('from')
        expect(experience).toHaveProperty('to')
        expect(experience).toHaveProperty('current')
        expect(experience).toHaveProperty('description')
    })

    it('should find experience and remove it from array', () => {
        const experience = profileData.experienceToRemove
        const experienceId = 2

        const result = profileService
            .findExperienceAndRemove(experience, experienceId)
        expect(result[0].id).toEqual(experienceId)
    })

    it('should find education and remove it from array', () => {
        const education = profileData.educationToRemove
        const educationId = 2

        const result = profileService.
            findEducationAndRemove(education, educationId)
        expect(result[0].id).toEqual(educationId)
    })

    it('should find index of element', () => {
        const arr = [ { id: 'foo' }, { id: 'baz'}, { id: 'abcd' } ]
        const result = profileService.findIndexOf(arr, 'abcd')
        expect(result).toEqual(2)
    })

})