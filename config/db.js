const mongoose = require('mongoose');
const config = require('config');
const { EXIT_WITH_FAILURE } = require('../commons/constants');

const database =
  process.env.NODE_ENV !== 'production'
    ? config.get('mongoURI')
    : process.env.mongoURI;

const getDBConnection = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (err) {
    process.exit(EXIT_WITH_FAILURE);
  }
};

const closeDBConnection = async () => {
  mongoose.connection.close();
};

module.exports = {
  getDBConnection,
  closeDBConnection,
};
