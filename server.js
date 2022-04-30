const express = require("express")
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const connectDB = require("./config/db")

// const users = require("./routes/api/users")
// const profile = require("./routes/api/profile")
// const posts = require("./routes/api/posts")

const app = express()

// Body parser middleware
// app.use(bodyParser.urlencoded({ useNewUrlParser: true }))
// app.use(bodyParser.json())

connectDB()

// Passport middleware
// app.use(passport.initialize())

// require('./config/passport')(passport)

// app.use("/api/users", users)
// app.use("/api/profile", profile)
// app.use("/api/posts", posts)

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

app.listen(port, () => console.log(`Server running on port ${port}`))
