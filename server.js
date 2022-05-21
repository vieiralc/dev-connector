const express = require("express")
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const db = require("./config/db")

const users = require("./routes/api/users/users")
const profile = require("./routes/api/profile/profile")
const posts = require("./routes/api/posts")
const auth = require("./routes/api/auth/auth")

const app = express()

app.use(express.json({ extended: false }))

db.getDBConnection()

// Passport middleware
// app.use(passport.initialize())

// require('./config/passport')(passport)

app.use("/api/users", users)
app.use("/api/profile", profile)
app.use("/api/posts", posts)
app.use("/api/auth", auth)

// Server static assets if in production
// if (process.env.NODE_ENV == 'production') {
//   // Set static folder
//   app.use(express.static('client/build'))
  
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }

app.get('/', (req, res) => res.send('API Running'))

const port = process.env.PORT || 5000

const listener = app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = {
    listener,
    app
}
