const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
const { EXIT_WITH_FAILURE } = require('../commons/constants')

const getDBConnection = async () => {
    try {
        await mongoose.connect(db, 
            { 
                useNewUrlParser: true, 
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )
    } catch(err) {
        process.exit(EXIT_WITH_FAILURE)
    }
}

const closeDBConnection = async () => {
    mongoose.connection.close()
}

module.exports = {
    getDBConnection,
    closeDBConnection
}