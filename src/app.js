const express = require("express")
const app = express()
const {users} = require('../routes/users')
const {fruits} = require('../routes/fruits')

app.use(express.json())
app.use(express.urlencoded())

app.use('/users', users)
app.use('/fruits', fruits)

module.exports = app;