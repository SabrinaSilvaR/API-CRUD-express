const express = require('express')

const app = express.Router();

app.all('/about', (req, res) => {
    res.send("about page")
})

app.get('/dashboard', (req, res) => {
    res.send('dashboard pages')
})

module.exports = app;
