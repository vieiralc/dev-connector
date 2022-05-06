const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const EXIT_WITH_FAILURE = 1

const connectDB = async () => {
    try {
        await mongoose.connect(db, 
            { 
                useNewUrlParser: true, 
                useCreateIndex: true,
                useUnifiedTopology: true
            }
        )
    } catch(err) {
        process.exit(EXIT_WITH_FAILURE)
    }
}

module.exports = connectDB