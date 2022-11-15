const gravatar = require('gravatar');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { TOKEN_EXPIRATION_TIME } = require('../../commons/constants');

const createAvatar = (userEmail) => {
  const avatar = gravatar.url(userEmail, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });

  return avatar;
};

const createUser = (name, email, password, avatar) => {
  const user = new User({
    name,
    email,
    avatar,
    password,
  });

  return user;
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const generateUserToken = (payload) => {
  const token = new Promise((resolve, reject) => {
    const jwtSecret =
      process.env.NODE_ENV !== 'production'
        ? config.get('jwtSecret')
        : process.env.jwtSecret;

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: TOKEN_EXPIRATION_TIME },
      (err, token) => {
        if (err) reject(err);
        resolve({ token });
      }
    );
  });

  return token;
};

const checkPassword = async (password, encryptedPassword) => {
  const isPasswordCorrect = await bcrypt.compare(password, encryptedPassword);
  return isPasswordCorrect;
};

module.exports = userService = {
  createAvatar,
  createUser,
  encryptPassword,
  generateUserToken,
  checkPassword,
};
