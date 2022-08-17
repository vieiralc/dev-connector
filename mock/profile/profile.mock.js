const profileData = {
    requestData: {
        user: {
            id: 'testid'
        },
        body: {
            company: 'test company',
            website: 'test website',
            location: 'test location', 
            bio: 'test bio', 
            status: 'test status',
            githubusername: 'test githubusername',
            skills: 'JS, REACT, Angular, Redux, CSS, HTML', 
            youtube: 'test youtube',
            facebook: 'test fb',
            twitter: 'test tt',
            instagram: 'test insta',
            linkedin: 'test linkedin'
        }
    },
    requestDataWithEmptyFields: {
        user: {
            id: 'test id'
        },
        body: {
            company: '',
            website: '',
            location: '', 
            bio: '', 
            status: '',
            githubusername: '',
            skills: '', 
            youtube: '',
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
        }
    },
    educationalObject: {
        body: {
            school: 'school',
            degree: 'degree',
            fieldofstudy: 'field of study',
            from: 'from',
            to: 'to',
            current: 'current',
            description: 'description'
        }
    },
    experienceObject: {
        body: {
            title: 'title', 
            company: 'company', 
            location: 'location', 
            from: 'from', 
            to: 'to', 
            current: 'current', 
            description: 'description'
        }
    },
    experienceToRemove: {
        experience: [
            {
                id: 1,
                title: 'exp1'
            },
            {
                id: 2,
                title: 'exp2'
            }
        ]
    },
    educationToRemove: {
        education: [
            {
                id: 1,
                title: 'education1'
            },
            {
                id: 2,
                title: 'education2'
            }
        ]
    }
}


module.exports = profileData