const express = require('express');
const db = require('./config/db');
const users = require('./routes/api/users/users');
const profile = require('./routes/api/profile/profile');
const posts = require('./routes/api/posts/posts');
const auth = require('./routes/api/auth/auth');
const app = express();
const { SERVER_PORT } = require('./commons/constants');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ extended: false }));

db.getDBConnection();

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || SERVER_PORT;

let listener;

if (require.main === module) {
  listener = app.listen(port, () =>
    console.log(`Server running on port ${port}`)
  );
}

module.exports = {
  listener,
  app,
};
