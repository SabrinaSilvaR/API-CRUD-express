const express = require('express')

const app = express.Router()
app.get('/profile', (req, res) => {
    res.sendStatus("profile page")
})

module.exports = app