const createProfileObject = requestData => {
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = requestData.body

    const profileFields = {}
    profileFields.user = requestData.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    return profileFields
}

const createEducationObject = ({
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
}) => {
    return {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
}

const createExperienceObject = ({ 
    title, 
    company, 
    location, 
    from, 
    to, 
    current, 
    description 
}) => {
    return {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
}

const findExperienceAndRemove = (profile, experienceId) => {
    const removeIndex = findIndexOf(profile.experience, experienceId)
    profile.experience.splice(removeIndex, 1)
}

const findEducationAndRemove = (profile, educationId) => {
    const removeIndex = findIndexOf(profile.education, educationId)
    profile.education.splice(removeIndex, 1)
}

const findIndexOf = (array, id) => {
    const index = array.map(item => item.id)
        .indexOf(id)
    return index
}

module.exports = profileService = {
    createProfileObject,
    createExperienceObject,
    findExperienceAndRemove,
    findEducationAndRemove,
    createEducationObject
}