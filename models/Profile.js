const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    company: {
        type: String,
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [{
        title: {
            type:  String,
            required: true,
        },
        company: {
            type: String,
            require: true
        },
        location: {
            type: String,
        },
        from: {
            type: String,
            require: true
        },
        to: {
            type: String,
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    education: [{
        school: {
            type:  String,
            required: true,
        },
        degree: {
            type: String,
            require: true
        },
        fieldofstudy: {
            type: String,
            require: true
        },
        from: {
            type: String,
            require: true
        },
        to: {
            type: String,
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    social: {
        youtube: {
            type: String
        },
        github: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)