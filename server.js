const express = require("express")
const db = require("./config/db")
const users = require("./routes/api/users/users")
const profile = require("./routes/api/profile/profile")
const posts = require("./routes/api/posts/posts")
const auth = require("./routes/api/auth/auth")
const app = express()
const { SERVER_PORT } = require('./commons/constants')

app.use(express.json({ extended: false }))

db.getDBConnection()

app.use("/api/users", users)
app.use("/api/profile", profile)
app.use("/api/posts", posts)
app.use("/api/auth", auth)

app.get('/', (req, res) => res.send('API Running'))

const port = process.env.PORT || SERVER_PORT

let listener 

if (require.main === module) {
    listener = app.listen(port, () => console.log(`Server running on port ${port}`))
}

module.exports = {
    listener,
    app
}
